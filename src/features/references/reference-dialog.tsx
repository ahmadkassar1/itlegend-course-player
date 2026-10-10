"use client";

import { useEffect, useRef, useState } from "react";
import { Dialog } from "@/components/dialog";
import { creatorChannel } from "@/data/video-references";
import type { VideoReference } from "@/types/reference";
import styles from "./references.module.css";

export function ReferenceDialog({
  reference,
  onClose,
}: {
  reference: VideoReference;
  onClose: () => void;
}) {
  const [loaded, setLoaded] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (loaded) heading.current?.focus();
  }, [loaded]);
  const watchURL = `https://www.youtube.com/watch?v=${reference.videoId}`;
  return (
    <Dialog
      title="Watch a reference"
      subtitle="Ali Shahin · YouTube"
      onClose={onClose}
    >
      <div className={styles.dialogBody}>
        <h3 ref={heading} tabIndex={-1} dir="auto">
          {reference.videoTitle}
        </h3>
        {loaded ? (
          <iframe
            className={styles.embed}
            src={`https://www.youtube-nocookie.com/embed/${reference.videoId}?playsinline=1&rel=0&cc_load_policy=1`}
            title={`Ali Shahin: ${reference.videoTitle}`}
            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <div className={styles.consent}>
            <p>
              Load the YouTube player to watch here. This connects to YouTube;
              playback needs an internet connection.
            </p>
            <button
              type="button"
              className={styles.primary}
              onClick={() => setLoaded(true)}
            >
              Load YouTube player
            </button>
          </div>
        )}
        <p className={styles.note}>
          Reference viewing does not change your practice-course progress.
        </p>
        <div className={styles.sourceLinks}>
          <a href={watchURL} target="_blank" rel="noopener noreferrer">
            Watch on YouTube ↗
          </a>
          {reference.playlistId ? (
            <a
              href={`https://www.youtube.com/playlist?list=${reference.playlistId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Full collection ↗
            </a>
          ) : null}
          <a href={creatorChannel} target="_blank" rel="noopener noreferrer">
            Creator’s channel ↗
          </a>
        </div>
        {loaded ? (
          <p className={styles.note}>
            If the player is blocked or unavailable, use Watch on YouTube.
          </p>
        ) : null}
      </div>
    </Dialog>
  );
}
