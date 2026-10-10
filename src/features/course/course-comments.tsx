"use client";

import type { ReactNode } from "react";
import {
  useCourseInteractions,
  useInteractionStore,
} from "@/features/learning/interaction-provider";
import { CommentItem } from "./comment-item";
import { TextEntryForm } from "./text-entry-form";
import { MessageHistory } from "./message-history";
import styles from "./course.module.css";
import { usePersistence } from "@/features/learning/persistence-provider";

export function CourseComments({
  courseSlug,
  children,
  references,
}: {
  courseSlug: string;
  children: ReactNode;
  references?: ReactNode;
}) {
  const state = useCourseInteractions(courseSlug);
  const store = useInteractionStore();
  const { status } = usePersistence();
  return (
    <section
      id="comments"
      tabIndex={-1}
      className={styles.comments}
      aria-labelledby="comments-heading"
    >
      <h2 id="comments-heading">Comments</h2>
      <MessageHistory
        label="Course comments list"
        latestMessageId={state.comments.at(-1)?.id}
        variant="comments"
      >
        <ul className={styles.commentList}>
          {[...state.comments].reverse().map((message) => (
            <CommentItem
              key={message.id}
              comment={{
                ...message,
                name: "You",
                avatar: "/images/avatar-1.svg",
              }}
            />
          ))}
          {children}
        </ul>
      </MessageHistory>
      <TextEntryForm
        label="Write a comment"
        submitLabel="Submit Review"
        value={state.commentDraft}
        onChange={(body) =>
          store.dispatch(courseSlug, { type: "draft", kind: "comment", body })
        }
        onSubmit={() =>
          store.dispatch(courseSlug, {
            type: "post",
            kind: "comment",
            id: crypto.randomUUID(),
            date: new Date().toISOString(),
          })
        }
        confirmation={
          status === "saved"
            ? "Your review was saved on this device."
            : "Your review was kept for this visit. Saving is unavailable."
        }
      />
      {references}
    </section>
  );
}
