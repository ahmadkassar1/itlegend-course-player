import type { Course, CourseSummary, Lesson } from "@/types/course";

export function getLessons(course: Pick<Course, "sections">): Lesson[] {
  return course.sections.flatMap((section) => section.lessons);
}

export function getProgress(completed: number, total: number): number {
  return Number.isFinite(completed) && Number.isFinite(total) && total > 0
    ? Math.min(100, Math.max(0, Math.round((completed / total) * 100)))
    : 0;
}

export function getCourseStatus(
  progress: number,
): "Not started" | "In progress" | "Completed" {
  return progress === 0
    ? "Not started"
    : progress === 100
      ? "Completed"
      : "In progress";
}

export function getStudentLevel(progress: number): string {
  return progress === 0
    ? "Getting started"
    : progress === 100
      ? "Completed"
      : progress < 50
        ? "Building momentum"
        : "Progressing";
}

export function summarizeCourse(course: Course): CourseSummary {
  const lessons = getLessons(course);
  return {
    slug: course.slug,
    title: course.title,
    description: course.description,
    instructor: course.instructor,
    category: course.category,
    thumbnail: course.thumbnail,
    initialLessonId: course.initialLessonId,
    lessonCount: lessons.length,
  };
}

export function resolveLesson(course: Course, requested?: string): Lesson {
  const lessons = getLessons(course);
  const lesson =
    lessons.find((item) => item.id === requested) ??
    lessons.find((item) => item.id === course.initialLessonId) ??
    lessons[0];
  if (!lesson) throw new Error(`Course ${course.slug} has no lessons`);
  return lesson;
}
