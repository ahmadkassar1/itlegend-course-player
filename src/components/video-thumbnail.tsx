"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./video-thumbnail.module.css";

export function VideoThumbnail({
  src,
  title,
  sizes,
}: {
  src: string;
  title: string;
  sizes?: string;
}) {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <div
      className={styles.unavailable}
      role="img"
      aria-label={`Thumbnail unavailable: ${title}`}
    >
      Thumbnail unavailable
    </div>
  ) : (
    <Image
      src={src}
      alt={`YouTube thumbnail: ${title}`}
      width={480}
      height={360}
      unoptimized
      sizes={sizes}
      className={styles.image}
      onError={() => setFailed(true)}
    />
  );
}
