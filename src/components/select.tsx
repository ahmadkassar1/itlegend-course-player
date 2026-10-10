"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { Icon } from "./icon";
import styles from "./select.module.css";

type Option = { value: string; label: string };

export function Select({
  label,
  accessibleLabel = label,
  value,
  options,
  onChange,
  inline = false,
}: {
  label: string;
  accessibleLabel?: string;
  value: string;
  options: readonly Option[];
  onChange: (value: string) => void;
  inline?: boolean;
}) {
  const id = useId();
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const search = useRef({ text: "", time: 0 });
  const selected = Math.max(
    0,
    options.findIndex((option) => option.value === value),
  );
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(selected);
  const [placement, setPlacement] = useState({ above: false, height: 240 });

  function show() {
    const bounds = trigger.current!.getBoundingClientRect();
    const below = window.innerHeight - bounds.bottom - 12;
    const above = bounds.top - 12;
    const upwards = below < 180 && above > below;
    setPlacement({
      above: upwards,
      height: Math.max(44, Math.min(240, upwards ? above : below)),
    });
    setActive(selected);
    search.current.text = "";
    setOpen(true);
  }

  function choose(index: number) {
    onChange(options[index].value);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    function outside(event: PointerEvent) {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    }
    function resize() {
      setOpen(false);
    }
    document.addEventListener("pointerdown", outside);
    window.addEventListener("resize", resize);
    return () => {
      document.removeEventListener("pointerdown", outside);
      window.removeEventListener("resize", resize);
    };
  }, [open]);

  useEffect(() => {
    if (open)
      root.current
        ?.querySelector(`#${CSS.escape(id)}-option-${active}`)
        ?.scrollIntoView({ block: "nearest" });
  }, [open, active, id]);

  function keyboard(event: KeyboardEvent<HTMLButtonElement>) {
    const { key } = event;
    if (key === "Escape" && open) {
      event.preventDefault();
      event.stopPropagation();
      setOpen(false);
    } else if (key === "Tab") {
      if (open) choose(active);
    } else if (key === "Enter" || key === " ") {
      event.preventDefault();
      if (open) choose(active);
      else show();
    } else if (["ArrowDown", "ArrowUp", "Home", "End"].includes(key)) {
      event.preventDefault();
      if (!open) show();
      else
        setActive(
          key === "Home"
            ? 0
            : key === "End"
              ? options.length - 1
              : Math.max(
                  0,
                  Math.min(
                    options.length - 1,
                    active + (key === "ArrowDown" ? 1 : -1),
                  ),
                ),
        );
    } else if (
      key.length === 1 &&
      !event.ctrlKey &&
      !event.metaKey &&
      !event.altKey
    ) {
      event.preventDefault();
      const now = Date.now();
      const text =
        (now - search.current.time < 700 ? search.current.text : "") +
        key.toLocaleLowerCase();
      search.current = { text, time: now };
      const index = options.findIndex((option) =>
        option.label.toLocaleLowerCase().startsWith(text),
      );
      if (index >= 0) {
        if (open) setActive(index);
        else onChange(options[index].value);
      }
    }
  }

  return (
    <div
      ref={root}
      className={`${styles.field} ${inline ? styles.inline : ""}`}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null))
          setOpen(false);
      }}
    >
      <label htmlFor={id}>{label}</label>
      <div className={styles.control}>
        <button
          ref={trigger}
          id={id}
          type="button"
          role="combobox"
          aria-label={accessibleLabel}
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-controls={open ? `${id}-list` : undefined}
          aria-activedescendant={open ? `${id}-option-${active}` : undefined}
          className={styles.trigger}
          onKeyDown={keyboard}
          onClick={() => (open ? setOpen(false) : show())}
        >
          <span>{options[selected]?.label}</span>
          <span className={styles.chevron} aria-hidden="true">
            <Icon name="chevron" />
          </span>
        </button>
        {open ? (
          <ul
            id={`${id}-list`}
            role="listbox"
            aria-label={accessibleLabel}
            className={styles.menu}
            style={{
              maxHeight: placement.height,
              ...(placement.above
                ? { bottom: "calc(100% + 6px)" }
                : { top: "calc(100% + 6px)" }),
            }}
          >
            {options.map((option, index) => (
              <li
                key={option.value}
                id={`${id}-option-${index}`}
                role="option"
                aria-selected={value === option.value}
                className={index === active ? styles.active : ""}
                onPointerMove={() => setActive(index)}
                onPointerDown={(event) => event.preventDefault()}
                onClick={() => choose(index)}
              >
                <span>{option.label}</span>
                <span aria-hidden="true">
                  {value === option.value ? <Icon name="check" /> : null}
                </span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
