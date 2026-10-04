"use client";

import Link from "next/link";
import { Icon } from "@/components/icon";
import type { Lesson } from "@/types/course";
import styles from "./course.module.css";

export function CurriculumLesson({
  courseSlug,
  lesson,
  active,
  completed,
  onSelect,
}: {
  courseSlug: string;
  lesson: Lesson;
  active: boolean;
  completed: boolean;
  onSelect: (lesson: Lesson) => void;
}) {
  return (
    <li>
      <Link
        className={`${styles.lessonRow} ${active ? styles.selectedLesson : ""}`}
        href={`/courses/${courseSlug}?lesson=${lesson.id}`}
        scroll={lesson.kind === "video"}
        aria-current={active ? "step" : undefined}
        onClick={() => onSelect(lesson)}
      >
        <Icon name="document" />
        <span className={styles.lessonTitle}>
          {lesson.curriculumTitle ?? lesson.title}
          {active ? (
            <span className={styles.currentLabel}>Current lesson</span>
          ) : null}
        </span>
        {lesson.kind === "exam" ? (
          <span className={styles.lessonMeta}>
            <span className={styles.questionBadge}>
              {lesson.exam.questions.length} QUESTIONS
            </span>
            <span className={styles.durationBadge}>
              {lesson.minutes} MINUTES
            </span>
          </span>
        ) : null}
        {completed ? (
          <span className={styles.completionIcon}>
            <Icon name="check" />
            <span className={styles.srOnly}>Completed</span>
          </span>
        ) : null}
      </Link>
    </li>
  );
}
