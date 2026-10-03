"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { Icon } from "@/components/icon";
import { getLessons, getProgress, getStudentLevel } from "@/lib/course";
import type { Course } from "@/types/course";
import styles from "./course.module.css";

const desktopQuery = "(min-width: 1024px)";
function subscribeDesktop(callback: () => void) {
  const query = window.matchMedia(desktopQuery);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}
const getDesktopSnapshot = () => window.matchMedia(desktopQuery).matches;
const getServerSnapshot = () => false;

export function Curriculum({
  course,
  selectedLessonId,
}: {
  course: Pick<Course, "slug" | "sections" | "initialCompletedLessonIds">;
  selectedLessonId: string;
}) {
  const desktop = useSyncExternalStore(
    subscribeDesktop,
    getDesktopSnapshot,
    getServerSnapshot,
  );
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const completedIds = new Set(course.initialCompletedLessonIds);
  const total = getLessons(course).length;
  const progress = getProgress(completedIds.size, total);
  return (
    <aside
      id="curriculum"
      tabIndex={-1}
      className={styles.curriculum}
      aria-labelledby="curriculum-heading"
    >
      <h2 id="curriculum-heading">Topics for This Course</h2>
      <div className={styles.courseProgress}>
        <div
          className={styles.progressMarker}
          style={{ left: `clamp(21px, ${progress}%, calc(100% - 21px))` }}
        >
          <span>You</span>
          <small>{progress}%</small>
        </div>
        <div
          className={styles.progressTrack}
          role="progressbar"
          aria-label="Course completion"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <span style={{ width: `${progress}%` }} />
        </div>
        <p>
          {getStudentLevel(progress)} <span aria-hidden="true">·</span>{" "}
          {completedIds.size} of {total} lessons completed
        </p>
      </div>
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
