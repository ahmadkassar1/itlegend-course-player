"use client";

import { VideoThumbnail } from "@/components/video-thumbnail";
import Link from "next/link";
import { Icon } from "@/components/icon";
import { getCourseStatus, getProgress } from "@/lib/course";
import type { CourseSummary } from "@/types/course";
import styles from "./catalogue.module.css";
import { useCourseLearning } from "@/features/learning/learning-provider";

export function CourseCard({ course }: { course: CourseSummary }) {
  const learning = useCourseLearning(course.slug);
  const progress = getProgress(
    learning.completedLessonIds.length,
    course.lessonCount,
  );
  const status = getCourseStatus(progress);
  return (
    <article className={styles.card}>
      <div className={styles.artwork}>
        <VideoThumbnail
          src={course.thumbnail}
          title={course.title}
          sizes="(max-width: 639px) 100vw, (max-width: 1099px) 50vw, 33vw"
        />
      </div>
      <div className={styles.cardContent}>
        <span className={styles.category}>{course.category}</span>
        <p className={styles.instructor}>
          {course.instructor} <span aria-hidden="true">·</span> 1 video · 2 site
          exercises
        </p>
        <h3 dir="auto">{course.title}</h3>
        <p className={styles.description}>{course.description}</p>
        <div className={styles.progressLabel}>
          <span className={progress === 100 ? styles.complete : ""}>
            {status}
          </span>
          <span>{progress}%</span>
        </div>
        <p className={styles.completionCount}>
          {learning.completedLessonIds.length} of {course.lessonCount} learning
          steps completed
        </p>
        <div
          className={styles.track}
          role="progressbar"
          aria-label={`${course.title} progress`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <span style={{ width: `${progress}%` }} />
        </div>
        <Link
          className={styles.courseLink}
          href={
            learning.lastLessonId === course.initialLessonId
              ? `/courses/${course.slug}`
              : `/courses/${course.slug}?lesson=${learning.lastLessonId}`
          }
          aria-label={`${progress > 0 ? "Continue" : "Start"} ${course.title}`}
        >
          {progress > 0 ? "Continue learning" : "Watch & learn"}
          <Icon name="arrow" />
        </Link>
      </div>
    </article>
  );
}
