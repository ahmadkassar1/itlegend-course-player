import type { DemoMessage, ExamAttempt } from "../../types/interaction";

export const MAX_MESSAGE_LENGTH = 2000;

export type InteractionSeed = {
  slug: string;
  exams: readonly {
    id: string;
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
        ...state[list],
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
