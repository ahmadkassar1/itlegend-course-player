import assert from "node:assert/strict";
import test from "node:test";
import {
  createLearningStore,
  initialCourseState,
  updateCourseState,
} from "../../src/features/learning/learning-store.ts";
import { getProgress } from "../../src/lib/course.ts";

const seed = {
  slug: "alpha",
  lessonIds: ["a", "b", "c"],
  completedLessonIds: ["a", "a", "foreign"],
  initialLessonId: "foreign",
};

test("initial data rejects unknown completion and selection, and deduplicates credit", () => {
  assert.deepEqual(initialCourseState(seed), {
    completedLessonIds: ["a"],
    lastLessonId: "a",
    positions: {},
  });
  assert.throws(() => initialCourseState({ ...seed, lessonIds: [] }));
});
test("completion is idempotent and unknown IDs cannot alter progress", () => {
  const initial = initialCourseState(seed);
  const complete = updateCourseState(initial, seed, {
    type: "complete",
    lessonId: "b",
  });
  assert.deepEqual(complete.completedLessonIds, ["a", "b"]);
  assert.equal(
    updateCourseState(complete, seed, { type: "complete", lessonId: "b" }),
    complete,
  );
  assert.equal(
    updateCourseState(complete, seed, {
      type: "complete",
      lessonId: "foreign",
    }),
    complete,
  );
  assert.deepEqual(initial.completedLessonIds, ["a"]);
});
test("positions and selection stay per lesson and reject corrupt numeric values", () => {
  let state = initialCourseState(seed);
  state = updateCourseState(state, seed, {
    type: "position",
    lessonId: "a",
    seconds: 4,
  });
  state = updateCourseState(state, seed, {
    type: "position",
    lessonId: "b",
    seconds: 7,
  });
  state = updateCourseState(state, seed, { type: "select", lessonId: "c" });
  assert.deepEqual(state.positions, { a: 4, b: 7 });
  assert.equal(state.lastLessonId, "c");
  for (const seconds of [-1, NaN, Infinity])
    assert.equal(
      updateCourseState(state, seed, {
        type: "position",
        lessonId: "a",
        seconds,
      }),
      state,
    );
});
test("course isolation and stable SSR snapshots survive notifications", () => {
  const store = createLearningStore([seed, { ...seed, slug: "beta" }]);
  const alpha = store.get("alpha");
  const beta = store.get("beta");
  let calls = 0;
  const unsubscribe = store.subscribe(() => {
    calls++;
  });
  store.dispatch("alpha", { type: "complete", lessonId: "b" });
  assert.equal(store.get("beta"), beta);
  assert.equal(store.getInitial("alpha"), alpha);
  assert.equal(calls, 1);
  store.dispatch("alpha", { type: "complete", lessonId: "b" });
  store.dispatch("unknown", { type: "complete", lessonId: "b" });
  assert.equal(calls, 1);
  unsubscribe();
  store.dispatch("alpha", { type: "complete", lessonId: "c" });
  assert.equal(calls, 1);
});
test("progress handles zero lessons, rounding, invalid counts and endpoints", () => {
  assert.equal(getProgress(0, 0), 0);
  assert.equal(getProgress(5, 8), 63);
  assert.equal(getProgress(-1, 8), 0);
  assert.equal(getProgress(9, 8), 100);
  assert.equal(getProgress(8, 8), 100);
  assert.equal(getProgress(NaN, 8), 0);
  assert.equal(getProgress(1, Infinity), 0);
});
