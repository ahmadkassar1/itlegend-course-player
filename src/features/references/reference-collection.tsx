"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Icon } from "@/components/icon";
import Image from "next/image";
import type { VideoReference } from "@/types/reference";
import styles from "./references.module.css";

const ReferenceDialog = dynamic(() =>
  import("./reference-dialog").then((module) => module.ReferenceDialog),
);

export function ReferenceCollection({
  references,
  compact = false,
}: {
  references: VideoReference[];
  compact?: boolean;
}) {
  const [selected, setSelected] = useState<VideoReference | null>(null);
  const items = (
    <div className={compact ? styles.list : styles.grid}>
      {references.map((reference) => (
        <div key={reference.id} className={styles.card}>
          <div className={styles.cover}>
            <Image
              src={reference.thumbnail}
              alt={`YouTube thumbnail: ${reference.videoTitle}`}
              width={480}
              height={360}
              unoptimized
            />
          </div>
          <div className={styles.body}>
            <p className={styles.topic}>
              {reference.topic} ·{" "}
              {reference.playlistId ? "Collection" : "Video"}
            </p>
            <h3 dir="auto">{reference.videoTitle}</h3>
            <p className={styles.description}>{reference.description}</p>
            <button
              type="button"
              className={styles.watch}
              onClick={() => setSelected(reference)}
              aria-label={`Preview ${reference.title}`}
            >
              {reference.playlistId ? "Preview collection" : "Watch video"}
              <Icon name="play" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
  return (
    <>
      {compact ? (
        <details className={styles.related}>
          <summary>Related videos from Ali Shahin</summary>
          <p className={styles.note}>
            More published videos. Watching a preview does not update your saved
            learning steps.
          </p>
          {items}
        </details>
      ) : (
        items
      )}
      {selected ? (
        <ReferenceDialog
          key={selected.id}
          reference={selected}
          onClose={() => setSelected(null)}
        />
      ) : null}
    </>
  );
}
