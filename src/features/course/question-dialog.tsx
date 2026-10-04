"use client";

import {
  useCourseInteractions,
  useInteractionStore,
} from "@/features/learning/interaction-provider";
import { TextEntryForm } from "./text-entry-form";
import styles from "./dialogs.module.css";

export function QuestionDialog({ courseSlug }: { courseSlug: string }) {
  const state = useCourseInteractions(courseSlug);
  const store = useInteractionStore();
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
        confirmation="Your question was saved in this demo session."
      />
      {state.questions.length ? (
        <section aria-label="Your saved questions">
          <h3>Your questions</h3>
          <ul className={styles.savedQuestions}>
            {state.questions.map((question) => (
              <li key={question.id} dir="auto">
                {question.body}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
