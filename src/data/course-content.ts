import contentData from "./course-content.json";
import type { Comment, LessonMedia } from "@/types/course";
import type { Exam, Worksheet } from "@/types/interaction";

type CourseContent = {
  lessons: Record<string, { summary: string; points: string[] }>;
  reviews: Pick<Comment, "name" | "body" | "date">[];
  worksheet: Worksheet;
  exam: Exam;
  peers: { id: string; name: string; completed: number }[];
};

const content: Record<string, CourseContent> = contentData;

export function getCourseContent(slug: string): CourseContent {
  const entry = content[slug];
  if (!entry) throw new Error(`Missing course content: ${slug}`);
  return entry;
}

export function getLessonMedia(slug: string, id: string): LessonMedia {
  const lesson = getCourseContent(slug).lessons[id];
  if (!lesson || lesson.points.length !== 4)
    throw new Error(`Missing video outline: ${id}`);
  return {
    src: `/media/${id}.webm`,
    captions: `/media/${id}.vtt`,
    poster: `/media/${id}.png`,
    transcript: lesson.points.join(" "),
  };
}

export function getCourseComments(slug: string): Comment[] {
  return getCourseContent(slug).reviews.map((review, index) => ({
    ...review,
    id: `${slug}-review-${index + 1}`,
    avatar: `/images/avatar-${index + 1}.svg`,
  }));
}
