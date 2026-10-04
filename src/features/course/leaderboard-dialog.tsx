"use client";

import { useCourseLearning } from "@/features/learning/learning-provider";
import { getProgress, getStudentLevel, rankLearners } from "@/lib/course";
import { motivationalMessages, sampleLearners } from "@/data/motivation";
import styles from "./dialogs.module.css";

export function LeaderboardDialog({
  courseSlug,
  total,
}: {
  courseSlug: string;
  total: number;
}) {
  const state = useCourseLearning(courseSlug);
  const completed = state.completedLessonIds.length;
  const level = getStudentLevel(getProgress(completed, total));
  const rows = rankLearners(sampleLearners, completed, total);
  return (
    <div className={styles.leaderboard}>
      <p className={styles.motivation} lang="ar" dir="rtl">
        {motivationalMessages[level]}
      </p>
      <ol className={styles.ranking} aria-label="Course leaderboard">
        {rows.map((row) => (
          <li
            key={row.id}
            value={row.rank}
            aria-current={row.id === "you" ? "true" : undefined}
          >
            <span className={styles.rank}>
              <span className={styles.srOnly}>Rank </span>
              {row.rank}
            </span>
            <span className={styles.learner}>{row.name}</span>
            <span className={styles.score}>
              {row.progress}%
              <small>
                {row.completed}/{total} lessons
              </small>
            </span>
          </li>
        ))}
      </ol>
      <p className={styles.sampleNote}>
        Sample learners • ranked by course completion
      </p>
    </div>
  );
}
