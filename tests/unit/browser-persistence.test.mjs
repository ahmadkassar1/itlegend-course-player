import { test } from "node:test";
import assert from "node:assert/strict";
import { createLearningStore } from "../../src/features/learning/learning-store.ts";
import { createInteractionStore } from "../../src/features/learning/interaction-store.ts";
import {
  createBrowserPersistence,
  STORAGE_KEY,
  CONTENT_VERSION,
} from "../../src/features/learning/browser-persistence.ts";

const seeds = ["alpha", "beta"].map((slug) => ({
  slug,
  lessonIds: ["one", "two"],
  completedLessonIds: ["one"],
  initialLessonId: "one",
}));
const interactionSeeds = seeds.map(({ slug }) => ({
  slug,
  exams: [
    {
      id: "exam",
      lessonId: "two",
      questions: [{ id: "q", optionIds: ["a", "b"], correctOptionId: "b" }],
    },
  ],
}));
function stores() {
  const learning = createLearningStore(seeds);
  const interactions = createInteractionStore(interactionSeeds);
  return {
    learning,
    interactions,
    persistence: createBrowserPersistence(learning, interactions),
  };
}
function memory(raw = null) {
  let value = raw;
  return {
    getItem: (key) => {
      assert.equal(key, STORAGE_KEY);
      return value;
    },
    setItem: (key, next) => {
      assert.equal(key, STORAGE_KEY);
      value = next;
    },
  };
}

test("validated submitted exams recover missed completion after an interrupted or failed write", () => {
  const saved = stores();
  saved.interactions.dispatch("alpha", {
    type: "answer",
    examId: "exam",
    questionId: "q",
    optionId: "b",
  });
  saved.interactions.dispatch("alpha", { type: "submit-exam", examId: "exam" });
  const storage = memory(
    JSON.stringify({
      version: 1,
      contentVersion: CONTENT_VERSION,
      learning: saved.learning.snapshot(),
      interactions: saved.interactions.snapshot(),
    }),
  );
  const restored = stores();
  restored.persistence.connect(() => storage);
  assert.deepEqual(restored.learning.get("alpha").completedLessonIds, [
    "one",
    "two",
  ]);
  assert.equal(restored.interactions.get("alpha").attempts.exam.correct, 1);
  assert.deepEqual(restored.learning.get("beta").completedLessonIds, ["one"]);
});

test("atomic reload restores isolated progress, position, literal drafts and a recomputed exam score; SSR snapshots remain initial", () => {
  const storage = memory();
  const first = stores();
  const disconnect = first.persistence.connect(() => storage);
  first.learning.dispatch("alpha", { type: "complete", lessonId: "two" });
  first.learning.dispatch("alpha", {
    type: "position",
    lessonId: "two",
    seconds: 4.25,
  });
  first.interactions.dispatch("alpha", {
    type: "draft",
    kind: "question",
    body: "<script>نص فقط</script>",
  });
  first.interactions.dispatch("alpha", {
    type: "answer",
    examId: "exam",
    questionId: "q",
    optionId: "b",
  });
  first.interactions.dispatch("alpha", { type: "submit-exam", examId: "exam" });
  disconnect();
  const next = stores();
  const initial = next.learning.getInitial("alpha");
  next.persistence.connect(() => storage);
  assert.deepEqual(next.learning.get("alpha"), first.learning.get("alpha"));
  assert.deepEqual(
    next.interactions.get("alpha"),
    first.interactions.get("alpha"),
  );
  assert.equal(next.learning.getInitial("alpha"), initial);
  assert.deepEqual(next.learning.get("beta").completedLessonIds, ["one"]);
  assert.equal(next.interactions.get("beta").questionDraft, "");
  assert.equal(next.persistence.getStatus(), "saved");
});

test("untrusted values cannot invent lessons, options, scores or duplicate messages", () => {
  const storage = memory(
    JSON.stringify({
      version: 1,
      contentVersion: CONTENT_VERSION,
      learning: {
        alpha: {
          completedLessonIds: ["two", "two", "deleted", null],
          lastLessonId: "deleted",
          positions: { two: -1, deleted: 8, one: 4 },
        },
      },
      interactions: {
        alpha: {
          questionDraft: "x".repeat(2001),
          comments: [
            { id: "ok", body: " hello ", date: "2026-10-04" },
            { id: "ok", body: "duplicate", date: "2026-10-04" },
            { id: "bad", body: "wrong date", date: "nonsense" },
          ],
          attempts: {
            exam: {
              index: 100,
              submitted: true,
              correct: 999,
              answers: { q: "a", extra: "b" },
            },
          },
        },
      },
    }),
  );
  const next = stores();
  next.persistence.connect(() => storage);
  assert.deepEqual(next.learning.get("alpha"), {
    completedLessonIds: ["two"],
    lastLessonId: "one",
    positions: { one: 4 },
  });
  assert.equal(next.interactions.get("alpha").questionDraft, "");
  assert.equal(next.interactions.get("alpha").comments.length, 1);
  assert.deepEqual(next.interactions.get("alpha").attempts.exam, {
    index: 0,
    answers: { q: "a" },
    submitted: true,
    correct: 0,
  });
  next.interactions.restore({
    alpha: {
      attempts: {
        exam: { submitted: true, answers: { q: "deleted" }, correct: 999 },
      },
    },
  });
  assert.equal(next.interactions.get("alpha").attempts.exam.submitted, false);
  assert.equal(next.interactions.get("alpha").attempts.exam.correct, null);
});

test("corrupt and incompatible saves recover anonymously; unavailable and quota storage report memory-only without losing actions", () => {
  for (const raw of [
    "{bad",
    "[]",
    JSON.stringify({ version: 9 }),
    JSON.stringify({ version: 1, contentVersion: "old" }),
  ]) {
    const next = stores();
    next.persistence.connect(() => memory(raw));
    assert.deepEqual(next.learning.get("alpha").completedLessonIds, ["one"]);
    assert.equal(next.persistence.getStatus(), "saved");
  }
  for (const getStorage of [
    () => {
      throw new Error("SecurityError");
    },
    () => ({
      getItem: () => null,
      setItem: () => {
        throw new Error("QuotaExceededError");
      },
    }),
  ]) {
    const next = stores();
    next.persistence.connect(getStorage);
    next.learning.dispatch("alpha", { type: "complete", lessonId: "two" });
    assert.equal(next.learning.get("alpha").completedLessonIds.length, 2);
    assert.equal(next.persistence.getStatus(), "session");
  }
});

test("reset replaces all saved state with the demo baseline and detached subscriptions stop writing", () => {
  const storage = memory();
  const next = stores();
  const disconnect = next.persistence.connect(() => storage);
  next.learning.dispatch("alpha", { type: "complete", lessonId: "two" });
  next.interactions.dispatch("beta", {
    type: "draft",
    kind: "comment",
    body: "Keep before reset",
  });
  next.persistence.reset();
  const after = stores();
  after.persistence.connect(() => storage);
  assert.deepEqual(after.learning.get("alpha").completedLessonIds, ["one"]);
  assert.equal(after.interactions.get("beta").commentDraft, "");
  disconnect();
  next.learning.dispatch("alpha", { type: "complete", lessonId: "two" });
  assert.deepEqual(
    JSON.parse(storage.getItem(STORAGE_KEY)).learning.alpha.completedLessonIds,
    ["one"],
  );
});
