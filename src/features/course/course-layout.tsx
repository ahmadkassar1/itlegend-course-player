"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { Icon } from "@/components/icon";
import { useMediaQuery } from "@/lib/use-media-query";
import { useLearningStore } from "@/features/learning/learning-provider";
import type { Course, Lesson } from "@/types/course";
import { Curriculum } from "./curriculum";
import { LessonPlayer } from "./lesson-player";
import { LessonPreview } from "./lesson-preview";
import styles from "./course.module.css";

export function CourseLayout({
  course,
  lesson,
  materials,
  comments,
}: {
  course: Pick<Course, "slug" | "poster" | "sections">;
  lesson: Lesson;
  materials: ReactNode;
  comments: ReactNode;
}) {
  const [wide, setWide] = useState(false);
  const [playerHeight, setPlayerHeight] = useState(0);
  const main = useRef<HTMLElement>(null);
  const desktop = useMediaQuery("(min-width: 1024px)");
  const store = useLearningStore();
  useEffect(() => {
    store.dispatch(course.slug, { type: "select", lessonId: lesson.id });
  }, [course.slug, lesson.id, store]);
  useEffect(() => {
    const player = main.current?.querySelector<HTMLElement>(
      '[aria-label="Current lesson"]',
    );
    if (!player) return;
    const observer = new ResizeObserver(() =>
      setPlayerHeight(Math.ceil(player.getBoundingClientRect().height)),
    );
    observer.observe(player);
    return () => observer.disconnect();
  }, [lesson.id]);

  return (
    <main
      ref={main}
      id="main-content"
      className={`${styles.courseLayout} ${wide && desktop ? styles.wideCourse : ""}`}
      data-wide={wide && desktop}
      style={{ "--sticky-player-height": `${playerHeight}px` } as CSSProperties}
    >
      {lesson.kind === "video" ? (
        <LessonPlayer
          key={lesson.id}
          courseSlug={course.slug}
          lesson={lesson}
          poster={course.poster}
          wide={wide && desktop}
          onWide={() => setWide((value) => !value)}
        />
      ) : (
        <LessonPreview key={lesson.id} lesson={lesson} poster={course.poster} />
      )}
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
      <Curriculum course={course} selectedLessonId={lesson.id} />
      {comments}
    </main>
  );
}
