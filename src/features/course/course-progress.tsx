"use client";

import { useEffect, useRef, useState } from "react";
import { getProgress, getStudentLevel } from "@/lib/course";
import { useMediaQuery } from "@/lib/use-media-query";
import styles from "./course.module.css";

export function CourseProgress({
  completed,
  total,
}: {
  completed: number;
  total: number;
}) {
  const target = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const progress = getProgress(completed, total);
  const fill = entered || reducedMotion ? progress : 0;
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    if (target.current) observer.observe(target.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={target} className={styles.courseProgress}>
      <div
        className={styles.progressMarker}
        style={{ left: `clamp(21px, ${fill}%, calc(100% - 21px))` }}
      >
        <span>You</span>
        <small>{progress}%</small>
      </div>
      <div
        className={styles.progressTrack}
        role="progressbar"
        aria-label="Course completion"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
      >
        <span style={{ width: `${fill}%` }} />
      </div>
      <p>
        {getStudentLevel(progress)} <span aria-hidden="true">·</span>{" "}
        {completed} of {total} lessons completed
      </p>
    </div>
  );
}
