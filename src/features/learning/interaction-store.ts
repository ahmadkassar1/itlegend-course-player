import type { DemoMessage, ExamAttempt } from "../../types/interaction";
import { record, boundedText } from "./saved-state.ts";

export const MAX_MESSAGE_LENGTH = 2000;

export type InteractionSeed = {
  slug: string;
  exams: readonly {
    id: string;
    lessonId?: string;
    questions: readonly {
      id: string;
      optionIds: readonly string[];
      correctOptionId: string;
    }[];
  }[];
};

export type CourseInteractions = {
  questionDraft: string;
  commentDraft: string;
  questions: readonly DemoMessage[];
  comments: readonly DemoMessage[];
  attempts: Readonly<Record<string, ExamAttempt>>;
};

export type InteractionAction =
  | { type: "draft"; kind: "question" | "comment"; body: string }
  | { type: "post"; kind: "question" | "comment"; id: string; date: string }
  | { type: "answer"; examId: string; questionId: string; optionId: string }
  | { type: "navigate"; examId: string; index: number }
  | { type: "submit-exam"; examId: string };

export function validMessage(body: string) {
  return body.trim().length > 0 && body.length <= MAX_MESSAGE_LENGTH;
}

export function initialInteractions(seed: InteractionSeed): CourseInteractions {
  return {
    questionDraft: "",
    commentDraft: "",
    questions: [],
    comments: [],
    attempts: Object.fromEntries(
      seed.exams.map((exam) => [
        exam.id,
        { index: 0, answers: {}, submitted: false, correct: null },
      ]),
    ),
  };
}

function restoreMessages(value: unknown): DemoMessage[] {
  if (!Array.isArray(value)) return [];
  const seen = new Set<string>();
  return value.slice(-50).flatMap((item) => {
    const entry = record(item);
    const id = boundedText(entry.id, 100);
    const body = boundedText(entry.body, MAX_MESSAGE_LENGTH).trim();
    const date = boundedText(entry.date, 40);
    if (
      !id.trim() ||
      !validMessage(body) ||
      !Number.isFinite(Date.parse(date)) ||
      seen.has(id)
    )
      return [];
    seen.add(id);
    return [{ id, body, date }];
  });
}

export function restoreInteractions(
  seed: InteractionSeed,
  value: unknown,
): CourseInteractions {
  const saved = record(value);
  const attempts = record(saved.attempts);
  return {
    questionDraft: boundedText(saved.questionDraft, MAX_MESSAGE_LENGTH),
    commentDraft: boundedText(saved.commentDraft, MAX_MESSAGE_LENGTH),
    questions: restoreMessages(saved.questions),
    comments: restoreMessages(saved.comments),
    attempts: Object.fromEntries(
      seed.exams.map((exam) => {
        const entry = record(attempts[exam.id]);
        const rawAnswers = record(entry.answers);
        const answers = Object.fromEntries(
          exam.questions.flatMap((question) => {
            const option = rawAnswers[question.id];
            return typeof option === "string" &&
              question.optionIds.includes(option)
              ? [[question.id, option]]
              : [];
          }),
        );
        const submitted =
          entry.submitted === true &&
          exam.questions.length > 0 &&
          exam.questions.every(
            (question) => answers[question.id] !== undefined,
          );
        return [
          exam.id,
          {
            index:
              typeof entry.index === "number" &&
              Number.isInteger(entry.index) &&
              entry.index >= 0 &&
              entry.index < exam.questions.length
                ? entry.index
                : 0,
            answers,
            submitted,
            correct: submitted
              ? exam.questions.filter(
                  (question) =>
                    answers[question.id] === question.correctOptionId,
                ).length
              : null,
          },
        ];
      }),
    ),
  };
}

export function updateInteractions(
  state: CourseInteractions,
  seed: InteractionSeed,
  action: InteractionAction,
): CourseInteractions {
  if (action.type === "draft") {
    const key = action.kind === "question" ? "questionDraft" : "commentDraft";
    return action.body.length > MAX_MESSAGE_LENGTH || state[key] === action.body
      ? state
      : { ...state, [key]: action.body };
  }
  if (action.type === "post") {
    const draft = action.kind === "question" ? "questionDraft" : "commentDraft";
    const list = action.kind === "question" ? "questions" : "comments";
    if (
      !validMessage(state[draft]) ||
      !action.id.trim() ||
      !Number.isFinite(Date.parse(action.date)) ||
      state[list].some((message) => message.id === action.id)
    )
      return state;
    return {
      ...state,
      [draft]: "",
      [list]: [
        ...state[list].slice(-49),
        { id: action.id, date: action.date, body: state[draft].trim() },
      ],
    };
  }
  const exam = seed.exams.find((item) => item.id === action.examId);
  const attempt = state.attempts[action.examId];
  if (!exam || !attempt || !exam.questions.length) return state;
  let next: ExamAttempt;
  if (action.type === "navigate") {
    if (
      !Number.isInteger(action.index) ||
      action.index < 0 ||
      action.index >= exam.questions.length ||
      action.index === attempt.index
    )
      return state;
    next = { ...attempt, index: action.index };
  } else if (action.type === "answer") {
    const question = exam.questions.find(
      (item) => item.id === action.questionId,
    );
    if (
      attempt.submitted ||
      !question?.optionIds.includes(action.optionId) ||
      attempt.answers[action.questionId] === action.optionId
    )
      return state;
    next = {
      ...attempt,
      answers: { ...attempt.answers, [action.questionId]: action.optionId },
    };
  } else {
    if (
      attempt.submitted ||
      exam.questions.some(
        (question) =>
          !question.optionIds.includes(attempt.answers[question.id]),
      )
    )
      return state;
    next = {
      ...attempt,
      submitted: true,
      correct: exam.questions.filter(
        (question) => attempt.answers[question.id] === question.correctOptionId,
      ).length,
    };
  }
  return { ...state, attempts: { ...state.attempts, [action.examId]: next } };
}

// Separate interaction snapshots keep typing from rerendering the media/progress store.
export function createInteractionStore(seeds: readonly InteractionSeed[]) {
  const definitions = new Map(seeds.map((seed) => [seed.slug, seed]));
  const initial: Record<string, CourseInteractions> = Object.fromEntries(
    seeds.map((seed) => [seed.slug, initialInteractions(seed)]),
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
    submittedLessons: () =>
      seeds.flatMap((seed) =>
        seed.exams.flatMap((exam) =>
          exam.lessonId && get(seed.slug).attempts[exam.id].submitted
            ? [{ slug: seed.slug, lessonId: exam.lessonId }]
            : [],
        ),
      ),
    restore(value: unknown) {
      const saved = record(value);
      current = Object.fromEntries(
        seeds.map((seed) => [
          seed.slug,
          restoreInteractions(seed, saved[seed.slug]),
        ]),
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
    dispatch(slug: string, action: InteractionAction) {
      const seed = definitions.get(slug);
      if (!seed) return;
      const previous = get(slug);
      const next = updateInteractions(previous, seed, action);
      if (previous === next) return;
      current = { ...current, [slug]: next };
      listeners.forEach((listener) => listener());
    },
  };
}
