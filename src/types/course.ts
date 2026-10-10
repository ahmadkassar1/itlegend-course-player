import type { Exam, Worksheet } from "./interaction";

export type LessonKind = "video" | "pdf" | "exam";

export type LessonMedia = {
  src: string;
  poster?: string;
  youtubeId: string;
};

type LessonBase = {
  id: string;
  title: string;
  curriculumTitle?: string;
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
  sample?: boolean;
};

export type Course = {
  slug: string;
  title: string;
  desktopTitle?: string;
  description: string;
  instructor: string;
  category: string;
  sourceURL?: string;
  playlistURL?: string;
  language: string;
  thumbnail: string;
  poster: string;
  sections: CourseSection[];
  initialCompletedLessonIds: string[];
  initialLessonId: string;
  comments: Comment[];
  peers: { id: string; name: string; completed: number }[];
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
