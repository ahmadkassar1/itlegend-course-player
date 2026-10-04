import type { Exam, Worksheet } from "./interaction";

export type LessonKind = "video" | "pdf" | "exam";

export type LessonMedia = { src: string; captions: string; transcript: string };

type LessonBase = {
  id: string;
  title: string;
  description: string;
  minutes: number;
};

export type Lesson = LessonBase &
  (
    | { kind: "video"; media: LessonMedia }
    | { kind: "pdf"; resource: Worksheet }
    | { kind: "exam"; exam: Exam }
  );

export type CourseSection = {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
};

export type Comment = {
  id: string;
  name: string;
  date: string;
  body: string;
  avatar: string;
};

export type Course = {
  slug: string;
  title: string;
  description: string;
  instructor: string;
  category: string;
  durationWeeks: number;
  enrolled: number;
  language: string;
  thumbnail: string;
  poster: string;
  sections: CourseSection[];
  initialCompletedLessonIds: string[];
  initialLessonId: string;
  comments: Comment[];
};

export type CourseSummary = Pick<
  Course,
  | "slug"
  | "title"
  | "description"
  | "instructor"
  | "category"
  | "thumbnail"
  | "initialLessonId"
> & {
  lessonCount: number;
};
