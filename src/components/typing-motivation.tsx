"use client";

import { useEffect, useState } from "react";
import { useMediaQuery } from "@/lib/use-media-query";
import { Icon } from "@/components/icon";
import styles from "./typing-motivation.module.css";

const ROTATION_MS = 4_500;
const CHARACTER_MS = 30;

export function TypingMotivation({
  messages,
}: {
  messages: readonly string[];
}) {
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [paused, setPaused] = useState(false);
  const [position, setPosition] = useState({ index: 0, characters: 0 });
  const message = messages[position.index % messages.length] ?? "";
  const characters = Array.from(message);
  const staticText = paused || reducedMotion;

  useEffect(() => {
    if (staticText || messages.length === 0) return;
    let count = 0;
    const length = Array.from(
      messages[position.index % messages.length],
    ).length;
    const typing = window.setInterval(() => {
      count += 1;
      setPosition((current) => ({ ...current, characters: count }));
      if (count >= length) window.clearInterval(typing);
    }, CHARACTER_MS);
    const rotation = window.setTimeout(() => {
      setPosition((current) => ({
        index: (current.index + 1) % messages.length,
        characters: 0,
      }));
    }, ROTATION_MS);
    return () => {
      window.clearInterval(typing);
      window.clearTimeout(rotation);
    };
  }, [messages, position.index, staticText]);

  return (
    <section className={styles.panel} aria-label="Study encouragement">
      <p className={styles.message} lang="ar" dir="rtl">
        <span className={styles.srOnly}>{message}</span>
        <span aria-hidden="true" data-motivation-text>
          {staticText
            ? message
            : characters.slice(0, position.characters).join("")}
          {!staticText ? <span className={styles.cursor} /> : null}
        </span>
      </p>
      {!reducedMotion ? (
        <button
          className={styles.control}
          type="button"
          aria-label={paused ? "Play messages" : "Pause messages"}
          onClick={() => setPaused((current) => !current)}
        >
          <Icon name={paused ? "play" : "pause"} />
        </button>
      ) : null}
    </section>
  );
}
