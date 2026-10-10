"use client";

import Link from "next/link";
import { useRef, useState, useSyncExternalStore } from "react";
import { Icon } from "@/components/icon";
import { Select } from "@/components/select";
import { useLearningStore } from "@/features/learning/learning-provider";
import { getCourseStatus, getProgress } from "@/lib/course";
import type { CourseSummary } from "@/types/course";
import { CourseCard } from "./course-card";
import styles from "./catalogue.module.css";

export function CourseCatalogue({ courses }: { courses: CourseSummary[] }) {
  const store = useLearningStore();
  const learning = useSyncExternalStore(
    store.subscribe,
    store.snapshot,
    store.initialSnapshot,
  );
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("All topics");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("featured");
  const search = useRef<HTMLInputElement>(null);
  const topics = [
    "All topics",
    ...new Set(courses.map((course) => course.category)),
  ];
  const rows = courses.map((course) => ({
    course,
    state: learning[course.slug],
    progress: getProgress(
      learning[course.slug].completedLessonIds.length,
      course.lessonCount,
    ),
  }));
  const active = rows.filter((row) => row.progress > 0 && row.progress < 100);
  const completed = rows.filter((row) => row.progress === 100).length;
  const completedLessons = rows.reduce(
    (sum, row) => sum + row.state.completedLessonIds.length,
    0,
  );
  const next = active[0] ?? rows.find((row) => row.progress === 0) ?? rows[0];
  const needle = query.trim().toLocaleLowerCase();
  const filtered = rows.filter(
    ({ course, progress }) =>
      (topic === "All topics" || course.category === topic) &&
      (status === "all" || getCourseStatus(progress) === status) &&
      `${course.title} ${course.description} ${course.category} ${course.instructor}`
        .toLocaleLowerCase()
        .includes(needle),
  );
  if (sort === "title")
    filtered.sort((a, b) => a.course.title.localeCompare(b.course.title));
  if (sort === "progress")
    filtered.sort(
      (a, b) =>
        b.progress - a.progress || a.course.title.localeCompare(b.course.title),
    );
  const hasFilters =
    query !== "" ||
    topic !== "All topics" ||
    status !== "all" ||
    sort !== "featured";

  function clearFilters() {
    setQuery("");
    setTopic("All topics");
    setStatus("all");
    setSort("featured");
    search.current?.focus();
  }

  return (
    <>
      <section className={styles.hero} aria-labelledby="catalogue-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Published videos. Your own progress.</p>
          <h1 id="catalogue-title">Learn with Ali Shahin.</h1>
          <p className={styles.heroDescription}>
            Watch the original videos, keep useful notes, and put one idea into
            practice.
          </p>
          <a className={styles.primaryLink} href="#courses">
            Find your next course <Icon name="arrow" />
          </a>
          <p className={styles.heroFootnote}>
            {courses.length} published videos · Original YouTube titles &
            thumbnails
          </p>
        </div>
        {next ? (
          <div className={styles.resume}>
            <p className={styles.resumeLabel}>
              {next.progress === 100
                ? "Keep exploring"
                : next.progress > 0
                  ? "Pick up where you left off"
                  : "A good place to begin"}
            </p>
            <span className={styles.resumeIcon}>
              <Icon name="book" />
            </span>
            <h2 dir="auto">{next.course.title}</h2>
            <p>
              {next.state.completedLessonIds.length} of{" "}
              {next.course.lessonCount} learning steps completed
            </p>
            <div className={styles.resumeTrack} aria-hidden="true">
              <span style={{ width: `${next.progress}%` }} />
            </div>
            <Link
              className={styles.resumeLink}
              href={
                next.state.lastLessonId === next.course.initialLessonId
                  ? `/courses/${next.course.slug}`
                  : `/courses/${next.course.slug}?lesson=${next.state.lastLessonId}`
              }
            >
              {next.progress > 0 ? "Continue learning" : "Start learning"}{" "}
              <Icon name="arrow" />
            </Link>
          </div>
        ) : null}
      </section>
      <div
        className={styles.learningSummary}
        role="region"
        aria-label="Your learning summary"
      >
        <span>
          <strong>{active.length}</strong> in progress
        </span>
        <span>
          <strong>{completed}</strong>{" "}
          {completed === 1 ? "study plan" : "study plans"} completed
        </span>
        <span>
          <strong>{completedLessons}</strong> learning steps completed
        </span>
        <p>Progress saved on this device when available</p>
      </div>
      <section
        id="courses"
        tabIndex={-1}
        className={styles.collection}
        aria-labelledby="collection-title"
      >
        <div className={styles.collectionHeading}>
          <div>
            <p className={styles.eyebrow}>Learn by doing</p>
            <h2 id="collection-title">Explore the videos</h2>
          </div>
          <span>{courses.length} published videos</span>
        </div>
        <div className={styles.toolbar}>
          <div className={styles.search}>
            <label htmlFor="course-search">Search videos</label>
            <input
              ref={search}
              id="course-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search a video title or topic"
            />
          </div>
          <div className={styles.selectField}>
            <Select
              label="Learning status"
              value={status}
              onChange={setStatus}
              options={[
                { value: "all", label: "All statuses" },
                { value: "Not started", label: "Not started" },
                { value: "In progress", label: "In progress" },
                { value: "Completed", label: "Completed" },
              ]}
            />
          </div>
          <div className={styles.selectField}>
            <Select
              label="Sort by"
              value={sort}
              onChange={setSort}
              options={[
                { value: "featured", label: "Featured order" },
                { value: "title", label: "Course name" },
                { value: "progress", label: "Most progress" },
              ]}
            />
          </div>
        </div>
        <fieldset className={styles.topics}>
          <legend>Filter by topic</legend>
          {topics.map((name) => (
            <button
              key={name}
              type="button"
              aria-pressed={name === topic}
              onClick={() => setTopic(name)}
            >
              {name}
            </button>
          ))}
        </fieldset>
        <div className={styles.results}>
          <p role="status" aria-label="Video results">
            {filtered.length} {filtered.length === 1 ? "video" : "videos"}
            {hasFilters ? " found" : " to explore"}
          </p>
          {hasFilters ? (
            <button type="button" onClick={clearFilters}>
              Clear filters
            </button>
          ) : null}
        </div>
        {filtered.length ? (
          <div className={styles.grid}>
            {filtered.map(({ course }) => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <Icon name="book" />
            <h3>No videos match yet</h3>
            <p>
              Try a different search or clear your filters to see all{" "}
              {courses.length} videos.
            </p>
            <button type="button" onClick={clearFilters}>
              Show all videos
            </button>
          </div>
        )}
      </section>
    </>
  );
}
