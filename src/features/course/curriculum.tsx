"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/icon";
import { getLessons } from "@/lib/course";
import type { Course } from "@/types/course";
import styles from "./course.module.css";
import { useMediaQuery } from "@/lib/use-media-query";
import { useCourseLearning } from "@/features/learning/learning-provider";
import { CourseProgress } from "./course-progress";

export function Curriculum({
  course,
  selectedLessonId,
}: {
  course: Pick<Course, "slug" | "sections">;
  selectedLessonId: string;
}) {
  const desktop = useMediaQuery("(min-width: 1024px)");
  const learning = useCourseLearning(course.slug);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const completedIds = new Set(learning.completedLessonIds);
  const total = getLessons(course).length;
  return (
    <aside
      id="curriculum"
      tabIndex={-1}
      className={styles.curriculum}
      aria-labelledby="curriculum-heading"
    >
      <h2 id="curriculum-heading">Topics for This Course</h2>
      <CourseProgress completed={completedIds.size} total={total} />
      <div className={styles.sections}>
        {course.sections.map((section, index) => {
          const activeGroup = section.lessons.some(
            (lesson) => lesson.id === selectedLessonId,
          );
          const open =
            expanded[section.id] ?? (desktop || index === 0 || activeGroup);
          const panelId = `section-${section.id}`;
          return (
            <section className={styles.curriculumSection} key={section.id}>
              <h3>
                <button
                  className={styles.sectionToggle}
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() =>
                    setExpanded((current) => ({
                      ...current,
                      [section.id]: !open,
                    }))
                  }
                >
                  {section.title}
                  <Icon name={open ? "minus" : "plus"} />
                </button>
              </h3>
              <div id={panelId} hidden={!open}>
                <p className={styles.sectionDescription}>
                  {section.description}
                </p>
                <ol className={styles.lessonList}>
                  {section.lessons.map((lesson) => {
                    const active = lesson.id === selectedLessonId;
                    const completed = completedIds.has(lesson.id);
                    return (
                      <li key={lesson.id}>
                        <Link
                          className={`${styles.lessonRow} ${active ? styles.selectedLesson : ""}`}
                          href={`/courses/${course.slug}?lesson=${lesson.id}`}
                          aria-current={active ? "step" : undefined}
                          onClick={() =>
                            setExpanded((current) => ({
                              ...current,
                              [section.id]: true,
                            }))
                          }
                        >
                          <Icon name="document" />
                          <span className={styles.lessonTitle}>
                            {lesson.title}
                            {active ? (
                              <span className={styles.currentLabel}>
                                Current lesson
                              </span>
                            ) : null}
                          </span>
                          <span className={styles.lessonMeta}>
                            {lesson.kind === "exam" ? (
                              <span className={styles.questionBadge}>
                                {lesson.questionCount} QUESTIONS
                              </span>
                            ) : null}
                            {lesson.kind === "pdf" ? (
                              <span className={styles.questionBadge}>PDF</span>
                            ) : (
                              <span className={styles.durationBadge}>
                                {lesson.minutes} MIN
                              </span>
                            )}
                          </span>
                          {completed ? (
                            <span className={styles.completionIcon}>
                              <Icon name="check" />
                              <span className={styles.srOnly}>Completed</span>
                            </span>
                          ) : null}
                        </Link>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </section>
          );
        })}
      </div>
    </aside>
  );
}
