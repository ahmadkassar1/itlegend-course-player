import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { courses, getCourse } from "@/data/courses";
import { CourseHeader } from "@/features/course/course-header";
import { CourseExperience } from "@/features/course/course-experience";
import { CourseMaterials } from "@/features/course/course-materials";
import { CommentsSection } from "@/features/course/comments-section";
import { resolveLesson } from "@/lib/course";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lesson?: string | string[] }>;
};

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  return { title: course?.title ?? "Course not found" };
}

export default async function CoursePage({ params, searchParams }: Props) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  const course = getCourse(slug);
  if (!course) notFound();
  const lesson = resolveLesson(
    course,
    typeof query.lesson === "string" ? query.lesson : undefined,
  );
  return (
    <>
      <CourseHeader title={course.title} />
      <CourseExperience
        key={course.slug}
        course={course}
        selectedLessonId={lesson.id}
        materials={<CourseMaterials course={course} />}
        comments={<CommentsSection comments={course.comments} />}
      />
    </>
  );
}
