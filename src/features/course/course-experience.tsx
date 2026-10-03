import type { ReactNode } from "react";
import { Icon } from "@/components/icon";
import type { Course } from "@/types/course";
import { resolveLesson } from "@/lib/course";
import { Curriculum } from "./curriculum";
import { LessonPreview } from "./lesson-preview";
import styles from "./course.module.css";

export function CourseExperience({
  course,
  selectedLessonId,
  materials,
  comments,
}: {
  course: Course;
  selectedLessonId: string;
  materials: ReactNode;
  comments: ReactNode;
}) {
  const selected = resolveLesson(course, selectedLessonId);
  return (
    <main id="main-content" className={styles.courseLayout}>
      <LessonPreview lesson={selected} poster={course.poster} />
      <nav className={styles.sectionControls} aria-label="Course sections">
        <a
          href="#curriculum"
          aria-label="Jump to curriculum"
          title="Curriculum"
        >
          <Icon name="book" />
        </a>
        <a href="#comments" aria-label="Jump to comments" title="Comments">
          <Icon name="message" />
        </a>
        <button
          type="button"
          disabled
          aria-label="Ask a question"
          title="Not available"
        >
          <Icon name="question" />
        </button>
        <button
          type="button"
          disabled
          aria-label="Leaderboard"
          title="Not available"
        >
          <Icon name="trophy" />
        </button>
      </nav>
      {materials}
      <Curriculum
        course={{
          slug: course.slug,
          sections: course.sections,
          initialCompletedLessonIds: course.initialCompletedLessonIds,
        }}
        selectedLessonId={selected.id}
      />
      {comments}
    </main>
  );
}
