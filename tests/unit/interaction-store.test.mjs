import assert from "node:assert/strict";
import test from "node:test";
import {
  createInteractionStore,
  initialInteractions,
  updateInteractions,
  restoreInteractions,
  MAX_MESSAGE_LENGTH,
} from "../../src/features/learning/interaction-store.ts";
import { rankLearners } from "../../src/lib/course.ts";

const seed = {
  slug: "alpha",
  exams: [
    {
      id: "exam",
      questions: [
        { id: "one", optionIds: ["a", "b"], correctOptionId: "a" },
        { id: "two", optionIds: ["x", "y"], correctOptionId: "y" },
      ],
    },
  ],
};
const date = "2026-10-04T09:00:00.000Z";

test("practice clock starts once, validates restored times and freezes only a valid submitted attempt", () => {
  const initial = initialInteractions(seed);
  const started = updateInteractions(initial, seed, {
    type: "start-exam",
    examId: "exam",
    at: 10000,
  });
  assert.equal(started.attempts.exam.startedAt, 10000);
  for (const at of [20000, NaN, -1, Infinity])
    assert.equal(
      updateInteractions(started, seed, {
        type: "start-exam",
        examId: "exam",
        at,
      }),
      started,
    );
  assert.equal(
    updateInteractions(initial, seed, {
      type: "start-exam",
      examId: "exam",
      at: NaN,
    }),
    initial,
  );
  let answered = updateInteractions(started, seed, {
    type: "answer",
    examId: "exam",
    questionId: "one",
    optionId: "a",
  });
  answered = updateInteractions(answered, seed, {
    type: "answer",
    examId: "exam",
    questionId: "two",
    optionId: "y",
  });
  const finished = updateInteractions(answered, seed, {
    type: "submit-exam",
    examId: "exam",
    at: 25000,
  });
  assert.equal(finished.attempts.exam.finishedAt, 25000);
  assert.equal(
    restoreInteractions(seed, finished).attempts.exam.finishedAt,
    25000,
  );
  const backwards = restoreInteractions(seed, {
    ...finished,
    attempts: { exam: { ...finished.attempts.exam, finishedAt: 1 } },
  });
  assert.equal(backwards.attempts.exam.finishedAt, undefined);
  const invalid = restoreInteractions(seed, {
    attempts: { exam: { startedAt: "fake", finishedAt: Infinity } },
  });
  assert.equal(invalid.attempts.exam.startedAt, undefined);
  assert.equal(invalid.attempts.exam.finishedAt, undefined);
  assert.equal(
    restoreInteractions(seed, initial).attempts.exam.startedAt,
    undefined,
  );
});

test("drafts reject oversized values and posts reject blanks/duplicates/invalid metadata", () => {
  const initial = initialInteractions(seed);
  assert.equal(
    updateInteractions(initial, seed, {
      type: "draft",
      kind: "question",
      body: "x".repeat(MAX_MESSAGE_LENGTH + 1),
    }),
    initial,
  );
  assert.equal(
    updateInteractions(initial, seed, {
      type: "post",
      kind: "question",
      id: "q",
      date,
    }),
    initial,
  );
  const drafted = updateInteractions(initial, seed, {
    type: "draft",
    kind: "question",
    body: "  سؤال مفيد  ",
  });
  const posted = updateInteractions(drafted, seed, {
    type: "post",
    kind: "question",
    id: "q",
    date,
  });
  assert.equal(posted.questionDraft, "");
  assert.deepEqual(posted.questions, [{ id: "q", date, body: "سؤال مفيد" }]);
  assert.equal(posted.comments.length, 0);
  assert.equal(
    updateInteractions(drafted, seed, {
      type: "post",
      kind: "question",
      id: "q",
      date: "invalid",
    }),
    drafted,
  );
  const another = updateInteractions(posted, seed, {
    type: "draft",
    kind: "question",
    body: "Another",
  });
  assert.equal(
    updateInteractions(another, seed, {
      type: "post",
      kind: "question",
      id: "q",
      date,
    }),
    another,
  );
});

test("literal comment text is trimmed once and independent of question drafts", () => {
  let state = initialInteractions(seed);
  state = updateInteractions(state, seed, {
    type: "draft",
    kind: "question",
    body: "Keep my question",
  });
  state = updateInteractions(state, seed, {
    type: "draft",
    kind: "comment",
    body: "  <script>alert(1)</script>\nشكراً  ",
  });
  state = updateInteractions(state, seed, {
    type: "post",
    kind: "comment",
    id: "c",
    date,
  });
  assert.equal(state.comments[0].body, "<script>alert(1)</script>\nشكراً");
  assert.equal(state.questionDraft, "Keep my question");
  assert.equal(state.commentDraft, "");
});

test("attempt rejects foreign IDs/options/indices and incomplete submit without resetting work", () => {
  const state = initialInteractions(seed);
  for (const action of [
    { type: "answer", examId: "missing", questionId: "one", optionId: "a" },
    { type: "answer", examId: "exam", questionId: "foreign", optionId: "a" },
    { type: "answer", examId: "exam", questionId: "one", optionId: "y" },
    ...[-1, 2, 0.5, NaN].map((index) => ({
      type: "navigate",
      examId: "exam",
      index,
    })),
    { type: "submit-exam", examId: "exam" },
  ])
    assert.equal(updateInteractions(state, seed, action), state);
  const answered = updateInteractions(state, seed, {
    type: "answer",
    examId: "exam",
    questionId: "one",
    optionId: "b",
  });
  assert.equal(
    updateInteractions(answered, seed, { type: "submit-exam", examId: "exam" }),
    answered,
  );
  assert.deepEqual(state.attempts.exam.answers, {});
});

test("submitted grade is immutable/idempotent; review navigation keeps answers and score", () => {
  let state = initialInteractions(seed);
  state = updateInteractions(state, seed, {
    type: "answer",
    examId: "exam",
    questionId: "one",
    optionId: "b",
  });
  state = updateInteractions(state, seed, {
    type: "answer",
    examId: "exam",
    questionId: "two",
    optionId: "y",
  });
  state = updateInteractions(state, seed, {
    type: "submit-exam",
    examId: "exam",
  });
  assert.equal(state.attempts.exam.correct, 1);
  assert.equal(state.attempts.exam.submitted, true);
  assert.equal(
    updateInteractions(state, seed, {
      type: "answer",
      examId: "exam",
      questionId: "one",
      optionId: "a",
    }),
    state,
  );
  assert.equal(
    updateInteractions(state, seed, { type: "submit-exam", examId: "exam" }),
    state,
  );
  const reviewed = updateInteractions(state, seed, {
    type: "navigate",
    examId: "exam",
    index: 1,
  });
  assert.equal(reviewed.attempts.exam.correct, 1);
  assert.equal(reviewed.attempts.exam.index, 1);
});

test("course and exam isolation preserve initial snapshots and suppress redundant notifications", () => {
  const otherExam = { ...seed.exams[0], id: "other" };
  const store = createInteractionStore([
    { ...seed, exams: [...seed.exams, otherExam] },
    { ...seed, slug: "beta" },
  ]);
  const alpha = store.get("alpha");
  const beta = store.get("beta");
  let notifications = 0;
  const unsubscribe = store.subscribe(() => {
    notifications++;
  });
  store.dispatch("alpha", {
    type: "answer",
    examId: "exam",
    questionId: "one",
    optionId: "a",
  });
  assert.equal(store.get("beta"), beta);
  assert.equal(store.get("alpha").attempts.other, alpha.attempts.other);
  assert.equal(store.getInitial("alpha"), alpha);
  store.dispatch("alpha", {
    type: "answer",
    examId: "exam",
    questionId: "one",
    optionId: "a",
  });
  store.dispatch("unknown", { type: "draft", kind: "question", body: "No" });
  assert.equal(notifications, 1);
  unsubscribe();
  store.dispatch("alpha", { type: "draft", kind: "question", body: "Keep" });
  assert.equal(notifications, 1);
});

test("ranking uses consistent counts and shared ranks for ties, including zero/complete", () => {
  const peers = [
    { id: "first", name: "First", fraction: 1 },
    { id: "tie", name: "Tie", fraction: 0.5 },
  ];
  const rows = rankLearners(peers, 4, 8);
  assert.deepEqual(
    rows.map(({ rank, progress }) => ({ rank, progress })),
    [
      { rank: 1, progress: 100 },
      { rank: 2, progress: 50 },
      { rank: 2, progress: 50 },
    ],
  );
  assert.equal(
    rankLearners(peers, 8, 8).find((row) => row.id === "you").rank,
    1,
  );
  assert.ok(
    rankLearners(peers, 0, 0).every(
      (row) => row.progress === 0 && row.rank === 1,
    ),
  );
});
