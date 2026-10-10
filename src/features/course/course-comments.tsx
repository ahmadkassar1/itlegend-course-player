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
  hasSampleComments = false,
}: {
  courseSlug: string;
  children: ReactNode;
  references?: ReactNode;
  hasSampleComments?: boolean;
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
      {hasSampleComments ? (
        <p className={styles.videoNote}>
          Sample discussion for this video. Names and comments are fictional;
          your own posts stay on this device and are not posted to YouTube.
        </p>
      ) : state.comments.length === 0 ? (
        <p className={styles.videoNote}>
          No comments yet. Your comments are saved locally and are not posted to
          YouTube.
        </p>
      ) : null}
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
                avatar: "/images/learner.svg",
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
