import { record } from "./saved-state.ts";

export type CourseSeed = {
  slug: string;
  lessonIds: readonly string[];
  completedLessonIds: readonly string[];
  initialLessonId: string;
};

export type CourseLearningState = {
  completedLessonIds: readonly string[];
  lastLessonId: string;
  positions: Readonly<Record<string, number>>;
};

export type LearningAction =
  | { type: "complete"; lessonId: string }
  | { type: "select"; lessonId: string }
  | { type: "position"; lessonId: string; seconds: number };

export function initialCourseState(seed: CourseSeed): CourseLearningState {
  if (!seed.lessonIds.length)
    throw new Error(`Course ${seed.slug} has no lessons`);
  const valid = new Set(seed.lessonIds);
  return {
    completedLessonIds: [
      ...new Set(seed.completedLessonIds.filter((id) => valid.has(id))),
    ],
    lastLessonId: valid.has(seed.initialLessonId)
      ? seed.initialLessonId
      : seed.lessonIds[0],
    positions: {},
  };
}

export function updateCourseState(
  state: CourseLearningState,
  seed: CourseSeed,
  action: LearningAction,
): CourseLearningState {
  if (!seed.lessonIds.includes(action.lessonId)) return state;
  switch (action.type) {
    case "complete":
      return state.completedLessonIds.includes(action.lessonId)
        ? state
        : {
            ...state,
            completedLessonIds: [...state.completedLessonIds, action.lessonId],
          };
    case "select":
      return state.lastLessonId === action.lessonId
        ? state
        : { ...state, lastLessonId: action.lessonId };
    case "position":
      if (
        !Number.isFinite(action.seconds) ||
        action.seconds < 0 ||
        state.positions[action.lessonId] === action.seconds
      )
        return state;
      return {
        ...state,
        positions: { ...state.positions, [action.lessonId]: action.seconds },
      };
  }
}

// A provider owns one store: no shared mutable server singleton or cross-user state.
export function createLearningStore(seeds: readonly CourseSeed[]) {
  const definitions = new Map(seeds.map((seed) => [seed.slug, seed]));
  const initial: Record<string, CourseLearningState> = Object.fromEntries(
    seeds.map((seed) => [seed.slug, initialCourseState(seed)]),
  );
  let current = initial;
  const listeners = new Set<() => void>();
  function get(slug: string) {
    if (!current[slug]) throw new Error(`Unknown course ${slug}`);
    return current[slug];
  }
  return {
    get,
    snapshot: () => current,
    restore(value: unknown) {
      const saved = record(value);
      current = Object.fromEntries(
        seeds.map((seed) => {
          const entry = record(saved[seed.slug]);
          const defaults = initialCourseState(seed);
          const ids = Array.isArray(entry.completedLessonIds)
            ? entry.completedLessonIds.filter(
                (id): id is string =>
                  typeof id === "string" && seed.lessonIds.includes(id),
              )
            : defaults.completedLessonIds;
          const positions = Object.fromEntries(
            Object.entries(record(entry.positions)).filter(
              ([id, seconds]) =>
                seed.lessonIds.includes(id) &&
                typeof seconds === "number" &&
                Number.isFinite(seconds) &&
                seconds >= 0 &&
                seconds <= 86400,
            ),
          );
          return [
            seed.slug,
            {
              completedLessonIds: [...new Set(ids)],
              lastLessonId:
                typeof entry.lastLessonId === "string" &&
                seed.lessonIds.includes(entry.lastLessonId)
                  ? entry.lastLessonId
                  : defaults.lastLessonId,
              positions: positions as Record<string, number>,
            },
          ];
        }),
      );
      listeners.forEach((listener) => listener());
    },
    reset() {
      current = initial;
      listeners.forEach((listener) => listener());
    },
    getInitial: (slug: string) => initial[slug],
    subscribe(listener: () => void) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    dispatch(slug: string, action: LearningAction) {
      const seed = definitions.get(slug);
      if (!seed) return;
      const previous = get(slug);
      const next = updateCourseState(previous, seed, action);
      if (previous === next) return;
      current = { ...current, [slug]: next };
      listeners.forEach((listener) => listener());
    },
  };
}

export type LearningStore = ReturnType<typeof createLearningStore>;
