"use client";

import type { ReactNode } from "react";
import styles from "./message-history.module.css";

export function MessageHistory({
  label,
  latestMessageId,
  variant,
  children,
}: {
  label: string;
  latestMessageId?: string;
  variant: "comments" | "questions";
  children: ReactNode;
}) {
  return (
    <div
      // A fresh viewport also stops an in-flight native keyboard scroll.
      // Draft edits keep this key, and submission focus stays on the form.
      key={latestMessageId}
      className={`${styles.history} ${styles[variant]}`}
      role="region"
      aria-label={label}
      tabIndex={0}
    >
      {children}
    </div>
  );
}
