"use client";

import { Icon } from "@/components/icon";
import type { CourseSection, Lesson } from "@/types/course";
import { CurriculumLesson } from "./curriculum-lesson";
import { ProgressMarker } from "./course-progress";
import styles from "./course.module.css";

export function CurriculumSection({
  courseSlug,
  section,
  selectedLessonId,
  completedIds,
  open,
  progress,
  onToggle,
  onSelect,
}: {
  courseSlug: string;
  section: CourseSection;
  selectedLessonId: string;
  completedIds: ReadonlySet<string>;
  open: boolean;
  progress?: number;
  onToggle: () => void;
  onSelect: (lesson: Lesson) => void;
}) {
  const panelId = `section-${courseSlug}-${section.id}`;
  return (
    <section className={styles.curriculumSection}>
      <h3>
        <button
          className={styles.sectionToggle}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
        >
          {section.title}
          <Icon name={open ? "minus" : "plus"} />
        </button>
      </h3>
      <div id={panelId} hidden={!open}>
        {progress !== undefined ? (
          <div className={styles.mobileProgressMarker} data-section-progress>
            <ProgressMarker progress={progress} />
          </div>
        ) : null}
        <p className={styles.sectionDescription}>{section.description}</p>
        <ol className={styles.lessonList}>
          {section.lessons.map((lesson) => (
            <CurriculumLesson
              key={lesson.id}
              courseSlug={courseSlug}
              lesson={lesson}
              active={lesson.id === selectedLessonId}
              completed={completedIds.has(lesson.id)}
              onSelect={onSelect}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
