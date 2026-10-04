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
      <h2 className={styles.srOnly}>{lesson.title}</h2>
      <div className={styles.previewFrame}>
        <Image
          src={poster}
          alt="Illustration of an instructor teaching at a desk"
          fill
          sizes="(max-width: 1023px) 100vw, 65vw"
          preload
        />
        <div className={styles.posterShade} />
        <button
          className={styles.playButton}
          type="button"
          onClick={onOpen}
          aria-label={lesson.kind === "pdf" ? "Open PDF" : "Open exam"}
          title={lesson.kind === "pdf" ? "Open PDF" : "Open exam"}
        >
          <Icon name="document" />
        </button>
      </div>
      <p className={styles.srOnly}>{lesson.description}</p>
    </section>
  );
}
