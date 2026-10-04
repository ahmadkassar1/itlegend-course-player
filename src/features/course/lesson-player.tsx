"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icon";
import { useLearningStore } from "@/features/learning/learning-provider";
import type { Lesson } from "@/types/course";
import styles from "./course.module.css";

type Props = {
  courseSlug: string;
  lesson: Extract<Lesson, { kind: "video" }>;
  poster: string;
  wide: boolean;
  onWide: () => void;
};
type MobileVideo = HTMLVideoElement & { webkitEnterFullscreen?: () => void };

export function LessonPlayer({
  courseSlug,
  lesson,
  poster,
  wide,
  onWide,
}: Props) {
  const frame = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const store = useLearningStore();
  const [started, setStarted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [message, setMessage] = useState("");
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const element = video.current;
    function syncFullscreen() {
      setFullscreen(document.fullscreenElement === frame.current);
    }
    function nativeEnter() {
      setFullscreen(true);
    }
    function nativeExit() {
      setFullscreen(false);
    }
    document.addEventListener("fullscreenchange", syncFullscreen);
    element?.addEventListener("webkitbeginfullscreen", nativeEnter);
    element?.addEventListener("webkitendfullscreen", nativeExit);
    return () => {
      document.removeEventListener("fullscreenchange", syncFullscreen);
      element?.removeEventListener("webkitbeginfullscreen", nativeEnter);
      element?.removeEventListener("webkitendfullscreen", nativeExit);
      if (element) {
        store.dispatch(courseSlug, {
          type: "position",
          lessonId: lesson.id,
          seconds: element.ended ? 0 : element.currentTime,
        });
        element.pause();
      }
    };
  }, [courseSlug, lesson.id, store]);

  function savePosition() {
    const element = video.current;
    if (element)
      store.dispatch(courseSlug, {
        type: "position",
        lessonId: lesson.id,
        seconds: element.ended ? 0 : element.currentTime,
      });
  }

  async function play() {
    const element = video.current;
    if (!element) return;
    setMessage("");
    try {
      await element.play();
    } catch {
      if (element.isConnected)
        setMessage(
          "Playback could not start. Try Play again or use the video controls.",
        );
    }
  }

  async function maximize() {
    const element = video.current as MobileVideo | null;
    setMessage("");
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (frame.current?.requestFullscreen && document.fullscreenEnabled)
        await frame.current.requestFullscreen();
      else if (element?.webkitEnterFullscreen) element.webkitEnterFullscreen();
      else
        setMessage(
          "Fullscreen is unavailable here. Use your browser's video controls.",
        );
    } catch {
      setMessage("Fullscreen could not open. You can continue playing inline.");
    }
  }

  return (
    <section className={styles.preview} aria-label="Current lesson">
      <h2 id="lesson-title" className={styles.srOnly}>
        {lesson.title}
      </h2>
      <div ref={frame} className={styles.previewFrame} data-player-frame>
        <video
          ref={video}
          className={styles.video}
          src={lesson.media.src}
          poster={poster}
          preload="none"
          playsInline
          controls={started}
          aria-labelledby="lesson-title"
          onLoadedMetadata={() => {
            const element = video.current;
            const saved = store.get(courseSlug).positions[lesson.id] ?? 0;
            if (element && saved > 0 && saved < element.duration)
              element.currentTime = saved;
          }}
          onPlay={() => {
            setStarted(true);
            setFailed(false);
          }}
          onPause={savePosition}
          onSeeked={savePosition}
          onEnded={() => {
            store.dispatch(courseSlug, {
              type: "complete",
              lessonId: lesson.id,
            });
            store.dispatch(courseSlug, {
              type: "position",
              lessonId: lesson.id,
              seconds: 0,
            });
          }}
          onError={() => {
            setFailed(true);
            setMessage("The lesson video could not load. Retry playback.");
          }}
        >
          <track
            kind="captions"
            src={lesson.media.captions}
            srcLang="en"
            label="English captions"
          />
          Your browser cannot play this video.{" "}
          <a href={lesson.media.src}>Download the lesson video</a>.
        </video>
        {!started && !failed ? (
          <>
            <div className={styles.posterShade} />
            <button
              className={styles.playButton}
              type="button"
              aria-label={`Play ${lesson.title}`}
              onClick={play}
            >
              <Icon name="play" />
            </button>
          </>
        ) : null}
        <div className={styles.playerModes}>
          <button
            className={styles.wideButton}
            type="button"
            aria-label={wide ? "Exit Wide mode" : "Wide mode"}
            aria-pressed={wide}
            title={wide ? "Exit Wide mode" : "Wide"}
            onClick={onWide}
          >
            <Icon name="wide" />
          </button>
          <button
            type="button"
            aria-label={fullscreen ? "Exit fullscreen" : "Maximize player"}
            title={fullscreen ? "Exit fullscreen" : "Maximize"}
            onClick={maximize}
          >
            <Icon name={fullscreen ? "shrink" : "expand"} />
          </button>
        </div>
        {message ? (
          <div className={styles.playerNotice} role="status">
            {message}
            {failed ? (
              <button
                type="button"
                onClick={() => {
                  setFailed(false);
                  setMessage("");
                  video.current?.load();
                  void play();
                }}
              >
                Retry playback
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
      <p className={styles.srOnly}>{lesson.description}</p>
      <p className={styles.srOnly}>{lesson.media.transcript}</p>
    </section>
  );
}
