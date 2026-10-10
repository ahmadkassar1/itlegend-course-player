"use client";

import { useCourseLearning } from "@/features/learning/learning-provider";
import { getProgress, getStudentLevel, rankLearners } from "@/lib/course";
import { motivationalMessages } from "@/data/motivation";
import { TypingMotivation } from "@/components/typing-motivation";
import type { Course } from "@/types/course";
import styles from "./dialogs.module.css";

export function LeaderboardDialog({
  courseSlug,
  total,
  peers,
}: {
  courseSlug: string;
  total: number;
  peers: Course["peers"];
}) {
  const state = useCourseLearning(courseSlug);
  const completed = state.completedLessonIds.length;
  const level = getStudentLevel(getProgress(completed, total));
  const rows = rankLearners(peers, completed, total);
  return (
    <div className={styles.leaderboard}>
      <TypingMotivation key={level} messages={motivationalMessages[level]} />
      <p className={styles.sampleNote}>
        Demo leaderboard · Sample learners. Your row uses your saved progress.
      </p>
      <ol className={styles.ranking} aria-label="Course leaderboard">
        {rows.map((row) => (
          <li
            key={row.id}
            value={row.rank}
            aria-current={row.id === "you" ? "true" : undefined}
          >
            {peers.length > 0 ? (
              <span className={styles.rank}>
                <span className={styles.srOnly}>Rank </span>
                {row.rank}
              </span>
            ) : null}
            <span className={styles.learner}>
              {row.name}
              <small className={styles.rowLabel}>
                {row.id === "you" ? "Your activity" : "Sample learner"}
              </small>
            </span>
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
        Fictional examples for this demo, not live classmates or a competition.
      </p>
    </div>
  );
}
