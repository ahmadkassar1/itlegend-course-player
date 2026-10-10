"use client";

import {
  useId,
  useRef,
  useState,
  type ReactNode,
  type MouseEventHandler,
} from "react";
import { Icon } from "@/components/icon";
import {
  MAX_MESSAGE_LENGTH,
  validMessage,
} from "@/features/learning/interaction-store";
import styles from "./course.module.css";

export function TextEntryForm({
  label,
  submitLabel,
  value,
  onChange,
  onSubmit,
  confirmation,
  afterSubmit,
}: {
  label: string;
  submitLabel: string;
  value: string;
  onChange: (body: string) => void;
  onSubmit: () => void;
  confirmation: string;
  afterSubmit?: (askAnother: MouseEventHandler<HTMLButtonElement>) => ReactNode;
}) {
  const id = useId();
  const textarea = useRef<HTMLTextAreaElement>(null);
  const [error, setError] = useState(false);
  const [posted, setPosted] = useState(false);
  const remaining = MAX_MESSAGE_LENGTH - value.length;
  const nearLimit = remaining <= 200;
  return (
    <form
      className={styles.commentForm}
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        if (!validMessage(value)) {
          setError(true);
          setPosted(false);
          textarea.current?.focus();
          return;
        }
        onSubmit();
        setError(false);
        setPosted(true);
      }}
    >
      <label className={styles.srOnly} htmlFor={id}>
        {label}
      </label>
      <textarea
        ref={textarea}
        id={id}
        value={value}
        placeholder={label}
        rows={5}
        maxLength={MAX_MESSAGE_LENGTH}
        dir="auto"
        aria-invalid={error || undefined}
        aria-describedby={`${id}-limit${error ? ` ${id}-error` : ""}`}
        onChange={(event) => {
          onChange(event.target.value);
          setError(false);
          setPosted(false);
        }}
      />
      <p
        id={`${id}-limit`}
        className={nearLimit ? styles.formHint : styles.srOnly}
      >
        {remaining === 0
          ? "Character limit reached. Edit your message to keep writing."
          : nearLimit
            ? `${remaining} ${remaining === 1 ? "character" : "characters"} left (2,000 maximum).`
            : "Maximum 2,000 characters."}
      </p>
      {error ? (
        <p id={`${id}-error`} role="alert" className={styles.formError}>
          Please write a message before submitting.
        </p>
      ) : null}
      <button className={styles.submit} type="submit">
        {submitLabel} <Icon name="arrow" />
      </button>
      {posted ? (
        <p className={styles.formStatus} role="status">
          {confirmation}
        </p>
      ) : null}
      {posted && afterSubmit
        ? afterSubmit((event) => {
            setPosted(false);
            event.currentTarget.form?.querySelector("textarea")?.focus();
          })
        : null}
    </form>
  );
}
