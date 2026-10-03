import Image from "next/image";
import { Icon } from "@/components/icon";
import type { Lesson } from "@/types/course";
import styles from "./course.module.css";

export function LessonPreview({
  lesson,
  poster,
}: {
  lesson: Lesson;
  poster: string;
}) {
  const isVideo = lesson.kind === "video";
  return (
    <section className={styles.preview} aria-label="Current lesson">
      <div className={styles.previewFrame}>
        <Image
          src={poster}
          alt="Illustration of an instructor teaching at a desk"
          fill
          sizes="(max-width: 1023px) 100vw, 65vw"
          preload
        />
        <div className={styles.posterShade} />
        <span className={styles.previewLabel}>
          {isVideo
            ? "Video lesson"
            : lesson.kind === "pdf"
              ? "Course resource"
              : "Knowledge check"}
        </span>
        <button
          className={styles.playButton}
          type="button"
          disabled
          aria-label={isVideo ? "Video unavailable" : "Resource unavailable"}
          title={isVideo ? "Video unavailable" : "Resource unavailable"}
        >
          <Icon name={isVideo ? "play" : "document"} />
        </button>
        <div className={styles.lessonCaption}>
          <span>{lesson.minutes} MINUTES</span>
          <h2>{lesson.title}</h2>
        </div>
      </div>
      <p className={styles.lessonDescription} aria-live="polite">
        {lesson.description}
      </p>
    </section>
  );
}
