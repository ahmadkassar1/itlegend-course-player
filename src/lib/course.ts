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

export function getStudentLevel(progress: number) {
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

export function rankLearners(
  peers: readonly {
    id: string;
    name: string;
    fraction?: number;
    completed?: number;
  }[],
  completed: number,
  total: number,
) {
  const rows = [
    ...peers.map((peer) => ({
      id: peer.id,
      name: peer.name,
      completed: Math.max(
        0,
        Math.min(
          total,
          peer.completed ?? Math.floor(total * (peer.fraction ?? 0)),
        ),
      ),
    })),
    { id: "you", name: "You", completed },
  ].sort((a, b) => b.completed - a.completed || a.id.localeCompare(b.id));
  return rows.map((row) => ({
    ...row,
    progress: getProgress(row.completed, total),
    rank: rows.findIndex((entry) => entry.completed === row.completed) + 1,
  }));
}
