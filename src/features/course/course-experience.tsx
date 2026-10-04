import type { ReactNode } from "react";
import type { Course } from "@/types/course";
import { resolveLesson } from "@/lib/course";
import { CourseLayout } from "./course-layout";

// Server slots keep static materials/comments out of the client module graph.
export function CourseExperience({
  course,
  selectedLessonId,
  materials,
  comments,
}: {
  course: Course;
  selectedLessonId: string;
  materials: ReactNode;
  comments: ReactNode;
}) {
  return (
    <CourseLayout
      course={{
        slug: course.slug,
        title: course.title,
        poster: course.poster,
        sections: course.sections,
        peers: course.peers,
      }}
      lesson={resolveLesson(course, selectedLessonId)}
      materials={materials}
      comments={comments}
    />
  );
}
