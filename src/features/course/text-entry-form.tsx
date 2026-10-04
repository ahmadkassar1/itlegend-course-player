"use client";

import { useId, useRef, useState } from "react";
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
}: {
  label: string;
  submitLabel: string;
  value: string;
  onChange: (body: string) => void;
  onSubmit: () => void;
  confirmation: string;
}) {
  const id = useId();
  const textarea = useRef<HTMLTextAreaElement>(null);
  const [error, setError] = useState(false);
  const [posted, setPosted] = useState(false);
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
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(event) => {
          onChange(event.target.value);
          setError(false);
          setPosted(false);
        }}
      />
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
    </form>
  );
}
