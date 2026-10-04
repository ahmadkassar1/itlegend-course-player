"use client";

import { useState } from "react";
import { getLessons, getProgress } from "@/lib/course";
import type { Course, Lesson } from "@/types/course";
import { useMediaQuery } from "@/lib/use-media-query";
import { useCourseLearning } from "@/features/learning/learning-provider";
import { CourseProgress } from "./course-progress";
import { CurriculumSection } from "./curriculum-section";
import styles from "./course.module.css";

export function Curriculum({
  course,
  selectedLessonId,
  onResourceSelect,
}: {
  course: Pick<Course, "slug" | "sections">;
  selectedLessonId: string;
  onResourceSelect: (lesson: Exclude<Lesson, { kind: "video" }>) => void;
}) {
  const desktop = useMediaQuery("(min-width: 1024px)");
  const learning = useCourseLearning(course.slug);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const completedIds = new Set(learning.completedLessonIds);
  const total = getLessons(course).length;
  return (
    <aside
      id="curriculum"
      tabIndex={-1}
      className={styles.curriculum}
      aria-labelledby="curriculum-heading"
    >
      <h2 id="curriculum-heading">Topics for This Course</h2>
      <CourseProgress completed={completedIds.size} total={total} />
      <div className={styles.sections}>
        {course.sections.map((section, index) => {
          const activeGroup = section.lessons.some(
            (lesson) => lesson.id === selectedLessonId,
          );
          const open =
            expanded[section.id] ?? (desktop || index === 0 || activeGroup);
          return (
            <CurriculumSection
              key={section.id}
              courseSlug={course.slug}
              section={section}
              selectedLessonId={selectedLessonId}
              completedIds={completedIds}
              open={open}
              progress={
                index === 0 ? getProgress(completedIds.size, total) : undefined
              }
              onToggle={() =>
                setExpanded((current) => ({ ...current, [section.id]: !open }))
              }
              onSelect={(lesson) => {
                setExpanded((current) => ({ ...current, [section.id]: true }));
                if (lesson.kind !== "video") onResourceSelect(lesson);
              }}
            />
          );
        })}
      </div>
    </aside>
  );
}
