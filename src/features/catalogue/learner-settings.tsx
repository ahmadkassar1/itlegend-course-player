"use client";

import { usePersistence } from "@/features/learning/persistence-provider";
import styles from "./catalogue.module.css";

export function LearnerSettings() {
  const { status, reset } = usePersistence();
  return (
    <div className={styles.learnerSettings}>
      <p>
        Demo courses with fictional learners and original practice resources.
      </p>
      <p role="status">
        {status === "loading"
          ? "Opening your learning history…"
          : status === "saved"
            ? "Progress and drafts are saved on this device."
            : "Saving is unavailable. Your work will last for this visit only."}
      </p>
      <button
        type="button"
        onClick={() => {
          if (
            window.confirm(
              "Reset all course progress, drafts, reviews and exam attempts to the demo starting point?",
            )
          )
            reset();
        }}
      >
        Reset demo learning data
      </button>
    </div>
  );
}
