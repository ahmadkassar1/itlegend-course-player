"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { Icon } from "@/components/icon";
import dynamic from "next/dynamic";
import type { CourseDialog } from "./course-dialogs";
import { getLessons } from "@/lib/course";
import { useMediaQuery } from "@/lib/use-media-query";
import { useLearningStore } from "@/features/learning/learning-provider";
import { usePersistence } from "@/features/learning/persistence-provider";
import type { Course, Lesson } from "@/types/course";
import { Curriculum } from "./curriculum";
import { LessonPlayer } from "./lesson-player";
import { LessonPreview } from "./lesson-preview";
import styles from "./course.module.css";

const CourseDialogs = dynamic(() =>
  import("./course-dialogs").then((module) => module.CourseDialogs),
);

export function CourseLayout({
  course,
  lesson,
  materials,
  comments,
}: {
  course: Pick<Course, "slug" | "title" | "poster" | "sections" | "peers">;
  lesson: Lesson;
  materials: ReactNode;
  comments: ReactNode;
}) {
  const [wide, setWide] = useState(false);
  const [dialog, setDialog] = useState<CourseDialog | null>(null);
  const [playerHeight, setPlayerHeight] = useState(0);
  const main = useRef<HTMLElement>(null);
  const desktop = useMediaQuery("(min-width: 1024px)");
  const store = useLearningStore();
  const { status } = usePersistence();
  useEffect(() => {
    if (status === "loading") return;
    store.dispatch(course.slug, { type: "select", lessonId: lesson.id });
  }, [course.slug, lesson.id, store, status]);
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
      tabIndex={-1}
      className={`${styles.courseLayout} ${wide && desktop ? styles.wideCourse : ""}`}
      data-wide={wide && desktop}
      style={
        playerHeight > 0
          ? ({ "--sticky-player-height": `${playerHeight}px` } as CSSProperties)
          : undefined
      }
    >
      {lesson.kind === "video" ? (
        <LessonPlayer
          key={lesson.id}
          courseSlug={course.slug}
          lesson={lesson}
          wide={wide && desktop}
          onWide={() => setWide((value) => !value)}
        />
      ) : (
        <LessonPreview
          key={lesson.id}
          lesson={lesson}
          poster={course.poster}
          onOpen={() => setDialog({ kind: "resource", lesson })}
        />
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
          aria-label="Ask a question"
          title="Ask a question"
          onClick={() => setDialog({ kind: "question" })}
        >
          <Icon name="question" />
        </button>
        <button
          type="button"
          aria-label="Leaderboard"
          title="Leaderboard"
          onClick={() => setDialog({ kind: "leaderboard" })}
        >
          <Icon name="trophy" />
        </button>
      </nav>
      {materials}
      <Curriculum
        course={course}
        selectedLessonId={lesson.id}
        onResourceSelect={(resourceLesson) =>
          setDialog({ kind: "resource", lesson: resourceLesson })
        }
      />
      {comments}
      {dialog ? (
        <CourseDialogs
          dialog={dialog}
          courseSlug={course.slug}
          courseTitle={course.title}
          total={getLessons(course).length}
          peers={course.peers}
          onClose={() => setDialog(null)}
        />
      ) : null}
    </main>
  );
}
