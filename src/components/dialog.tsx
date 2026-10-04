"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import styles from "./dialog.module.css";

export function Dialog({
  title,
  fullScreen = false,
  compact = false,
  children,
  onClose,
}: {
  title: string;
  fullScreen?: boolean;
  compact?: boolean;
  children: ReactNode;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const trigger =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const scrollY = window.scrollY;
    const { style } = document.body;
    const previous = {
      position: style.position,
      top: style.top,
      width: style.width,
      overflow: style.overflow,
      paddingRight: style.paddingRight,
    };
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    style.position = "fixed";
    style.top = `-${scrollY}px`;
    style.width = "100%";
    style.overflow = "hidden";
    style.paddingRight = `${scrollbar}px`;
    dialog.showModal();
    dialog.querySelector<HTMLElement>("[data-dialog-heading]")?.focus();
    return () => {
      dialog.close();
      Object.assign(style, previous);
      if (trigger?.isConnected) trigger.focus({ preventScroll: true });
      window.scrollTo({ top: scrollY, behavior: "instant" });
    };
  }, []);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      className={`${styles.dialog} ${fullScreen ? styles.fullScreen : ""} ${compact ? styles.compact : ""}`}
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const dialog = event.currentTarget;
        const targets = [
          ...dialog.querySelectorAll<HTMLElement>(
            "a[href], button, input, textarea, select, summary, [tabindex]",
          ),
        ].filter(
          (element) =>
            element.tabIndex >= 0 &&
            !element.matches(":disabled") &&
            element.getClientRects().length > 0,
        );
        const first = targets[0];
        const last = targets.at(-1);
        const active = document.activeElement;
        if (
          event.shiftKey &&
          (active === first || !targets.includes(active as HTMLElement))
        ) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && active === last) {
          event.preventDefault();
          first?.focus();
        }
      }}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
    >
      <header className={styles.header}>
        <h2 id={titleId} tabIndex={-1} data-dialog-heading>
          {title}
        </h2>
        <button
          className={styles.close}
          type="button"
          aria-label={`Close ${title}`}
          onClick={onClose}
        >
          <span aria-hidden="true">×</span>
        </button>
      </header>
      <div className={styles.content}>{children}</div>
    </dialog>
  );
}
