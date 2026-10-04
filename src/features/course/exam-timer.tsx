"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/icon";
import { useCourseInteractions } from "@/features/learning/interaction-provider";
import styles from "./dialogs.module.css";

export function ExamTimer({
  courseSlug,
  examId,
  minutes,
}: {
  courseSlug: string;
  examId: string;
  minutes: number;
}) {
  const attempt = useCourseInteractions(courseSlug).attempts[examId];
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (attempt.submitted || attempt.startedAt === undefined) return;
    const deadline = attempt.startedAt + minutes * 60_000;
    const interval = window.setInterval(() => {
      const currentTime = Date.now();
      setNow(currentTime);
      if (currentTime >= deadline) window.clearInterval(interval);
    }, 1000);
    return () => window.clearInterval(interval);
  }, [attempt.submitted, attempt.startedAt, minutes]);
  const elapsed =
    attempt.startedAt === undefined
      ? 0
      : Math.max(0, (attempt.finishedAt ?? now) - attempt.startedAt);
  const seconds = Math.max(0, Math.ceil(minutes * 60 - elapsed / 1000));
  const clock = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
  return (
    <span
      className={styles.examTimer}
      role="timer"
      aria-label="Practice time remaining"
      aria-live="off"
      title="Practice countdown. You can continue when time runs out; your answers remain saved."
    >
      <Icon name="stopwatch" />
      <span>
        {attempt.submitted && attempt.finishedAt === undefined
          ? "Completed"
          : clock}
      </span>
    </span>
  );
}
