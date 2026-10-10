"use client";

import { usePersistence } from "@/features/learning/persistence-provider";
import styles from "./catalogue.module.css";

export function LearnerSettings() {
  const { status, reset } = usePersistence();
  return (
    <div className={styles.learnerSettings}>
      <p>
        Videos by Ali Shahin. Your notes and exercise results stay on this
        device.
      </p>
      <p role="status" aria-label="Learning storage status">
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
              "Clear your saved progress, notes, comments and exercise attempts for every video?",
            )
          )
            reset();
        }}
      >
        Clear my learning data
      </button>
    </div>
  );
}
