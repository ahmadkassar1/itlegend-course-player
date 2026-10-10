import type { Metadata } from "next";
import "./globals.css";
import { bodyFont, headingFont } from "./fonts";
import { courses } from "@/data/courses";
import { getLessons } from "@/lib/course";
import { LearningProvider } from "@/features/learning/learning-provider";
import { InteractionProvider } from "@/features/learning/interaction-provider";
import { PersistenceProvider } from "@/features/learning/persistence-provider";

export const metadata: Metadata = {
  title: { default: "Course Library", template: "%s | Course Library" },
  description:
    "Learn with published Ali Shahin videos, original YouTube thumbnails and your own saved learning activity.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${headingFont.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <LearningProvider
          seeds={courses.map((course) => ({
            slug: course.slug,
            lessonIds: getLessons(course).map((lesson) => lesson.id),
            completedLessonIds: course.initialCompletedLessonIds,
            initialLessonId: course.initialLessonId,
          }))}
        >
          <InteractionProvider
            seeds={courses.map((course) => ({
              slug: course.slug,
              exams: getLessons(course)
                .filter((lesson) => lesson.kind === "exam")
                .map((lesson) => ({
                  id: lesson.exam.id,
                  lessonId: lesson.id,
                  questions: lesson.exam.questions.map((question) => ({
                    id: question.id,
                    optionIds: question.options.map((option) => option.id),
                    correctOptionId: question.correctOptionId,
                  })),
                })),
            }))}
          >
            <PersistenceProvider>{children}</PersistenceProvider>
          </InteractionProvider>
        </LearningProvider>
      </body>
    </html>
  );
}
