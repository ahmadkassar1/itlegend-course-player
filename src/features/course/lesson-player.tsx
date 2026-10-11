"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icon";
import { YouTubePlayer } from "@/components/youtube-player";
import {
  useCourseLearning,
  useLearningStore,
} from "@/features/learning/learning-provider";
import { usePersistence } from "@/features/learning/persistence-provider";
import type { Lesson } from "@/types/course";
import styles from "./course.module.css";

export function LessonPlayer({
  courseSlug,
  lesson,
  wide,
  onWide,
}: {
  courseSlug: string;
  lesson: Extract<Lesson, { kind: "video" }>;
  wide: boolean;
  onWide: () => void;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const store = useLearningStore();
  const learning = useCourseLearning(courseSlug);
  const { status } = usePersistence();
  // Capture restored position only when the connected player mounts.
  const [fullscreen, setFullscreen] = useState(false);
  const [message, setMessage] = useState("");
  const complete = useCallback(
    () => store.dispatch(courseSlug, { type: "complete", lessonId: lesson.id }),
    [courseSlug, lesson.id, store],
  );
  const savePosition = useCallback(
    (seconds: number) =>
      store.dispatch(courseSlug, {
        type: "position",
        lessonId: lesson.id,
        seconds,
      }),
    [courseSlug, lesson.id, store],
  );
  useEffect(() => {
    function sync() {
      setFullscreen(document.fullscreenElement === frame.current);
    }
    document.addEventListener("fullscreenchange", sync);
    return () => document.removeEventListener("fullscreenchange", sync);
  }, []);
  async function maximize() {
    setMessage("");
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (frame.current?.requestFullscreen && document.fullscreenEnabled)
        await frame.current.requestFullscreen();
      else
        setMessage(
          "Use the YouTube player’s fullscreen control in this browser.",
        );
    } catch {
      setMessage(
        "Fullscreen could not open. Use the YouTube controls or continue inline.",
      );
    }
  }
  return (
    <>
      <section
        className={styles.preview}
        aria-label="Current lesson"
        tabIndex={0}
      >
        <h2 id="lesson-title" className={styles.srOnly} dir="auto">
          {lesson.title}
        </h2>
        <div className={styles.youtubeModes}>
          <button
            type="button"
            aria-label={wide ? "Exit Wide mode" : "Wide mode"}
            aria-pressed={wide}
            onClick={onWide}
          >
            <Icon name="wide" />
          </button>
          <button
            type="button"
            aria-label={fullscreen ? "Exit fullscreen" : "Maximize player"}
            onClick={maximize}
          >
            <Icon name={fullscreen ? "shrink" : "expand"} />
          </button>
        </div>
        <div ref={frame} data-player-frame className={styles.youtubeFrame}>
          {status !== "loading" ? (
            <RestoredPlayer
              key={lesson.id}
              courseSlug={courseSlug}
              lesson={lesson}
              onEnded={complete}
              onPosition={savePosition}
            />
          ) : (
            <div className={styles.youtubeLoading}>
              Opening your learning history…
            </div>
          )}
        </div>
      </section>
      <div className={styles.playerDetails}>
        <div className={styles.youtubeActions}>
          <a href={lesson.media.src} target="_blank" rel="noopener noreferrer">
            Watch on YouTube ↗
          </a>
          <button
            type="button"
            disabled={learning.completedLessonIds.includes(lesson.id)}
            onClick={complete}
          >
            {learning.completedLessonIds.includes(lesson.id)
              ? "Watched ✓"
              : "I watched this video"}
          </button>
        </div>
        <p className={styles.videoNote}>
          Completion is saved on this device when the video ends, or when you
          mark it watched.
        </p>
        {message ? <p role="status">{message}</p> : null}
      </div>
    </>
  );
}

function RestoredPlayer({
  courseSlug,
  lesson,
  onEnded,
  onPosition,
}: {
  courseSlug: string;
  lesson: Extract<Lesson, { kind: "video" }>;
  onEnded: () => void;
  onPosition: (seconds: number) => void;
}) {
  const store = useLearningStore();
  const [startSeconds] = useState(
    () => store.get(courseSlug).positions[lesson.id] ?? 0,
  );
  return (
    <YouTubePlayer
      videoId={lesson.media.youtubeId}
      title={lesson.title}
      startSeconds={startSeconds}
      onEnded={onEnded}
      onPosition={onPosition}
    />
  );
}
