export type ExamQuestion = {
  id: string;
  prompt: string;
  options: { id: string; label: string }[];
  correctOptionId: string;
  explanation: string;
};

export type Exam = { id: string; questions: ExamQuestion[] };

export type Worksheet = {
  src: string;
  preview: string;
  title: string;
  introduction: string;
  sections: { title: string; body: string }[];
};

export type DemoMessage = { id: string; body: string; date: string };

export type ExamAttempt = {
  index: number;
  answers: Readonly<Record<string, string>>;
  submitted: boolean;
  correct: number | null;
};
