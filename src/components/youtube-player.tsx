"use client";

import { useEffect, useRef, useState } from "react";
import { loadYouTubeAPI, type YouTubePlayerHandle } from "@/lib/youtube";
import styles from "./youtube-player.module.css";

export function YouTubePlayer({
  videoId,
  title,
  startSeconds = 0,
  onEnded,
  onPosition,
}: {
  videoId: string;
  title: string;
  startSeconds?: number;
  onEnded?: () => void;
  onPosition?: (seconds: number) => void;
}) {
  const host = useRef<HTMLDivElement>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const container = host.current!;
    let cancelled = false;
    let player: YouTubePlayerHandle | undefined;
    let timer: ReturnType<typeof setInterval> | undefined;
    let ended = false;
    let ready = false;
    const frame = document.createElement("iframe");
    const params = new URLSearchParams({
      enablejsapi: "1",
      origin: window.location.origin,
      playsinline: "1",
      rel: "0",
      cc_load_policy: "1",
      start: String(Math.max(0, Math.floor(startSeconds))),
    });
    frame.title = title;
    frame.allow =
      "accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen";
    frame.allowFullscreen = true;
    frame.referrerPolicy = "strict-origin-when-cross-origin";
    frame.src = `https://www.youtube-nocookie.com/embed/${videoId}?${params}`;
    container.append(frame);

    function savePosition() {
      if (ready && player && onPosition)
        onPosition(ended ? 0 : player.getCurrentTime());
    }
    function stopTimer() {
      clearInterval(timer);
      timer = undefined;
    }
    void loadYouTubeAPI()
      .then((api) => {
        if (cancelled) return;
        player = new api.Player(frame, {
          events: {
            onReady: () => {
              if (cancelled) return;
              ready = true;
              setError("");
            },
            onStateChange: (event) => {
              if (cancelled) return;
              stopTimer();
              ended = event.data === 0;
              if (ended) onEnded?.();
              if (event.data === 1 && onPosition)
                timer = setInterval(savePosition, 10000);
              if (event.data === 0 || event.data === 2) savePosition();
            },
            onError: () => {
              if (cancelled) return;
              stopTimer();
              setError(
                "YouTube could not play this video here. Try Watch on YouTube.",
              );
            },
          },
        });
      })
      .catch(() => {
        if (!cancelled)
          setError(
            "Automatic progress is unavailable. You can still use the native player or Watch on YouTube.",
          );
      });
    window.addEventListener("pagehide", savePosition);
    document.addEventListener("visibilitychange", savePosition);
    return () => {
      cancelled = true;
      stopTimer();
      savePosition();
      window.removeEventListener("pagehide", savePosition);
      document.removeEventListener("visibilitychange", savePosition);
      player?.destroy();
      frame.remove();
    };
    // Resume offset is read once per video; progress writes must not remount it.
  }, [videoId, title, onEnded, onPosition, startSeconds]);

  return (
    <>
      <div ref={host} className={styles.frame} />
      {error ? (
        <p role="status" className={styles.notice}>
          {error}
        </p>
      ) : null}
    </>
  );
}
