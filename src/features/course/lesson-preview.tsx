import Image from "next/image";
import { Icon } from "@/components/icon";
import type { Lesson } from "@/types/course";
import styles from "./course.module.css";

export function LessonPreview({
  lesson,
  poster,
  onOpen,
}: {
  lesson: Exclude<Lesson, { kind: "video" }>;
  poster: string;
  onOpen: () => void;
}) {
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
          {lesson.kind === "pdf" ? "Course resource" : "Knowledge check"}
        </span>
        <button
          className={styles.playButton}
          type="button"
          onClick={onOpen}
          aria-label={lesson.kind === "pdf" ? "Open PDF" : "Open exam"}
          title={lesson.kind === "pdf" ? "Open PDF" : "Open exam"}
        >
          <Icon name="document" />
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
