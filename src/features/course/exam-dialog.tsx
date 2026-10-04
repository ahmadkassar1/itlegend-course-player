"use client";

import { useRef, useState } from "react";
import {
  useCourseInteractions,
  useInteractionStore,
} from "@/features/learning/interaction-provider";
import { useLearningStore } from "@/features/learning/learning-provider";
import type { Lesson } from "@/types/course";
import styles from "./dialogs.module.css";

export function ExamDialog({
  courseSlug,
  lesson,
}: {
  courseSlug: string;
  lesson: Extract<Lesson, { kind: "exam" }>;
}) {
  const store = useInteractionStore();
  const learning = useLearningStore();
  const state = useCourseInteractions(courseSlug);
  const attempt = state.attempts[lesson.exam.id];
  const { questions } = lesson.exam;
  const question = questions[attempt.index];
  const answered = questions.filter((item) => attempt.answers[item.id]).length;
  const [error, setError] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  function navigate(index: number) {
    store.dispatch(courseSlug, {
      type: "navigate",
      examId: lesson.exam.id,
      index,
    });
    setError(false);
    heading.current?.focus({ preventScroll: true });
  }
  return (
    <div className={styles.examSurface}>
      <div className={styles.exam}>
        <header className={styles.examHeader}>
          <span className={styles.untimed}>Practice • no time limit</span>
          <p>
            {answered} of {questions.length} answered
          </p>
          <nav aria-label="Exam questions" className={styles.questionNumbers}>
            {questions.map((item, index) => (
              <button
                key={item.id}
                type="button"
                aria-label={`Question ${index + 1}${attempt.answers[item.id] ? ", answered" : ""}`}
                aria-current={index === attempt.index ? "step" : undefined}
                className={attempt.answers[item.id] ? styles.answered : ""}
                onClick={() => navigate(index)}
              >
                {index + 1}
              </button>
            ))}
          </nav>
        </header>
        <div className={styles.examCard}>
          {attempt.submitted ? (
            <p role="status" className={styles.result}>
              Result: {attempt.correct} of {questions.length} correct (
              {Math.round(((attempt.correct ?? 0) / questions.length) * 100)}%).
              Review your answers below.
            </p>
          ) : null}
          <h3 ref={heading} tabIndex={-1}>
            Question {attempt.index + 1} of {questions.length}
          </h3>
          <fieldset className={styles.options} disabled={attempt.submitted}>
            <legend>{question.prompt}</legend>
            {question.options.map((option) => (
              <label
                key={option.id}
                className={
                  attempt.answers[question.id] === option.id
                    ? styles.selectedOption
                    : ""
                }
              >
                <input
                  type="radio"
                  name={question.id}
                  value={option.id}
                  checked={attempt.answers[question.id] === option.id}
                  onChange={() => {
                    store.dispatch(courseSlug, {
                      type: "answer",
                      examId: lesson.exam.id,
                      questionId: question.id,
                      optionId: option.id,
                    });
                    setError(false);
                  }}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </fieldset>
          {attempt.submitted ? (
            <p className={styles.explanation}>
              <strong>
                Answer:{" "}
                {
                  question.options.find(
                    (option) => option.id === question.correctOptionId,
                  )?.label
                }
                .
              </strong>{" "}
              {question.explanation}
            </p>
          ) : null}
          <div className={styles.examNavigation}>
            <button
              type="button"
              disabled={attempt.index === 0}
              onClick={() => navigate(attempt.index - 1)}
            >
              Previous
            </button>
            {attempt.index < questions.length - 1 ? (
              <button type="button" onClick={() => navigate(attempt.index + 1)}>
                Next question
              </button>
            ) : null}
          </div>
          {!attempt.submitted ? (
            <button
              type="button"
              className={styles.primary}
              onClick={() => {
                if (answered !== questions.length) {
                  setError(true);
                  return;
                }
                store.dispatch(courseSlug, {
                  type: "submit-exam",
                  examId: lesson.exam.id,
                });
                if (store.get(courseSlug).attempts[lesson.exam.id].submitted)
                  learning.dispatch(courseSlug, {
                    type: "complete",
                    lessonId: lesson.id,
                  });
              }}
            >
              Submit answers
            </button>
          ) : null}
          {error ? (
            <p role="alert" className={styles.error}>
              Answer all {questions.length} questions before submitting. Your
              answers are saved when you close this window.
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
