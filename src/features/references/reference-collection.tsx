"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Icon } from "@/components/icon";
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
      {references.map((reference, index) => (
        <div key={reference.id} className={styles.card}>
          {!compact ? (
            <div className={styles.cover} aria-hidden="true">
              <span>ALI SHAHIN / YOUTUBE</span>
              <strong>{String(index + 1).padStart(2, "0")}</strong>
              <Icon name="play" />
            </div>
          ) : null}
          <div className={styles.body}>
            <p className={styles.topic}>
              {reference.topic} ·{" "}
              {reference.playlistId ? "Collection" : "Video"}
            </p>
            <h3 dir="auto">{reference.title}</h3>
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
            Optional background viewing, separate from this practice syllabus.
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
