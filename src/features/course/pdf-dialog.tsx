"use client";

import Image from "next/image";
import { Select } from "@/components/select";
import { useState } from "react";
import {
  useCourseLearning,
  useLearningStore,
} from "@/features/learning/learning-provider";
import type { Lesson } from "@/types/course";
import styles from "./dialogs.module.css";

export function PdfDialog({
  courseSlug,
  lesson,
}: {
  courseSlug: string;
  lesson: Extract<Lesson, { kind: "pdf" }>;
}) {
  const [zoom, setZoom] = useState(100);
  const [failed, setFailed] = useState(false);
  const state = useCourseLearning(courseSlug);
  const store = useLearningStore();
  const completed = state.completedLessonIds.includes(lesson.id);
  const { resource } = lesson;
  return (
    <div className={styles.pdf}>
      <div className={styles.resourceToolbar}>
        <Select
          label="Page size"
          accessibleLabel="PDF page size"
          inline
          value={String(zoom)}
          onChange={(value) => setZoom(Number(value))}
          options={[
            { value: "100", label: "Fit width" },
            { value: "150", label: "150%" },
            { value: "200", label: "200%" },
          ]}
        />
        <a href={resource.src} target="_blank" rel="noreferrer">
          Open original PDF <span className={styles.srOnly}>(new tab)</span>
        </a>
        <button
          type="button"
          disabled={completed}
          onClick={() =>
            store.dispatch(courseSlug, {
              type: "complete",
              lessonId: lesson.id,
            })
          }
        >
          {completed ? "Read ✓" : "Mark read"}
        </button>
      </div>
      <div
        className={styles.pdfViewport}
        tabIndex={0}
        role="region"
        aria-label="PDF document page"
      >
        {failed ? (
          <p role="alert">
            The page preview could not load. Read the text below or open the
            original PDF.
          </p>
        ) : (
          <div className={styles.pdfPage} style={{ width: `${zoom}%` }}>
            <Image
              src={resource.preview}
              width={910}
              height={1287}
              sizes="(max-width: 767px) 100vw, 910px"
              alt={`Page 1 of ${resource.title}. Full text is available below.`}
              onError={() => setFailed(true)}
            />
          </div>
        )}
      </div>
      <details className={styles.pdfText} open={failed || undefined}>
        <summary>Read worksheet as text</summary>
        <h3>{resource.title}</h3>
        <p>{resource.introduction}</p>
        {resource.sections.map((section) => (
          <section key={section.title}>
            <h4>{section.title}</h4>
            <p>{section.body}</p>
          </section>
        ))}
      </details>
    </div>
  );
}
