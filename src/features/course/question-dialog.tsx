"use client";

import Link from "next/link";
import {
  useCourseInteractions,
  useInteractionStore,
} from "@/features/learning/interaction-provider";
import { TextEntryForm } from "./text-entry-form";
import { MessageHistory } from "./message-history";
import styles from "./dialogs.module.css";
import { usePersistence } from "@/features/learning/persistence-provider";

export function QuestionDialog({
  courseSlug,
  onClose,
}: {
  courseSlug: string;
  onClose: () => void;
}) {
  const state = useCourseInteractions(courseSlug);
  const store = useInteractionStore();
  const { status } = usePersistence();
  return (
    <div className={styles.question}>
      <p className={styles.muted}>
        Share what you tried and where you need help.
      </p>
      <TextEntryForm
        label="Write your question"
        submitLabel="Submit Question"
        value={state.questionDraft}
        onChange={(body) =>
          store.dispatch(courseSlug, { type: "draft", kind: "question", body })
        }
        onSubmit={() =>
          store.dispatch(courseSlug, {
            type: "post",
            kind: "question",
            id: crypto.randomUUID(),
            date: new Date().toISOString(),
          })
        }
        confirmation="Thank you for submitting your question! It will be reviewed soon."
        afterSubmit={(askAnother) => (
          <section
            className={styles.questionNext}
            aria-label="Question next steps"
          >
            <p className={styles.muted}>
              {status === "saved"
                ? "Your question is saved on this device."
                : "Your question is kept for this visit. Saving is unavailable."}{" "}
              Review is simulated in this demo; nothing is sent to an
              instructor.
            </p>
            <div className={styles.nextActions}>
              <button type="button" onClick={askAnother}>
                Ask another question
              </button>
              <Link href="/#courses" onClick={onClose}>
                Explore more videos
              </Link>
            </div>
          </section>
        )}
      />
      {state.questions.length ? (
        <section aria-label="Your saved questions">
          <h3>Your questions</h3>
          <MessageHistory
            label="Saved question list"
            latestMessageId={state.questions.at(-1)?.id}
            variant="questions"
          >
            <ul className={styles.savedQuestions}>
              {[...state.questions].reverse().map((question) => (
                <li key={question.id} dir="auto">
                  {question.body}
                </li>
              ))}
            </ul>
          </MessageHistory>
        </section>
      ) : null}
    </div>
  );
}
