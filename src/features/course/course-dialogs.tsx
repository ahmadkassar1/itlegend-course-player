"use client";

import { Dialog } from "@/components/dialog";
import type { Course, Lesson } from "@/types/course";
import { ExamDialog } from "./exam-dialog";
import { ExamTimer } from "./exam-timer";
import { PdfDialog } from "./pdf-dialog";
import { QuestionDialog } from "./question-dialog";
import { LeaderboardDialog } from "./leaderboard-dialog";

export type CourseDialog =
  | { kind: "question" }
  | { kind: "leaderboard" }
  | { kind: "resource"; lesson: Exclude<Lesson, { kind: "video" }> };

export function CourseDialogs({
  dialog,
  courseSlug,
  courseTitle,
  total,
  peers,
  onClose,
}: {
  dialog: CourseDialog;
  courseSlug: string;
  courseTitle: string;
  total: number;
  peers: Course["peers"];
  onClose: () => void;
}) {
  const title =
    dialog.kind === "resource"
      ? dialog.lesson.title
      : dialog.kind === "question"
        ? "Ask a question"
        : "Leaderboard";
  return (
    <Dialog
      title={title}
      subtitle={dialog.kind === "leaderboard" ? courseTitle : undefined}
      fullScreen={dialog.kind === "resource"}
      compact={dialog.kind === "leaderboard"}
      exam={dialog.kind === "resource" && dialog.lesson.kind === "exam"}
      headerContent={
        dialog.kind === "resource" && dialog.lesson.kind === "exam" ? (
          <ExamTimer
            courseSlug={courseSlug}
            examId={dialog.lesson.exam.id}
            minutes={dialog.lesson.minutes}
          />
        ) : undefined
      }
      onClose={onClose}
    >
      {dialog.kind === "question" ? (
        <QuestionDialog courseSlug={courseSlug} />
      ) : dialog.kind === "leaderboard" ? (
        <LeaderboardDialog
          courseSlug={courseSlug}
          total={total}
          peers={peers}
        />
      ) : dialog.lesson.kind === "pdf" ? (
        <PdfDialog courseSlug={courseSlug} lesson={dialog.lesson} />
      ) : (
        <ExamDialog courseSlug={courseSlug} lesson={dialog.lesson} />
      )}
    </Dialog>
  );
}
