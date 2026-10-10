"use client";

import Link from "next/link";
import { useRef, useState, useSyncExternalStore } from "react";
import { Icon } from "@/components/icon";
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
          <p className={styles.eyebrow}>A little progress, every day</p>
          <h1 id="catalogue-title">Your next lesson starts here.</h1>
          <p className={styles.heroDescription}>
            Practise the foundations, build something useful, and learn from a
            fresh perspective.
          </p>
          <a className={styles.primaryLink} href="#courses">
            Find your next course <Icon name="arrow" />
          </a>
          <p className={styles.heroFootnote}>
            {courses.length} practice courses · Worksheets & knowledge checks
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
            <h2>{next.course.title}</h2>
            <p>
              {next.state.completedLessonIds.length} of{" "}
              {next.course.lessonCount} lessons completed
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
        aria-label="Your practice learning summary"
      >
        <span>
          <strong>{active.length}</strong> in progress
        </span>
        <span>
          <strong>{completed}</strong> {completed === 1 ? "course" : "courses"}{" "}
          completed
        </span>
        <span>
          <strong>{completedLessons}</strong> lessons completed
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
            <h2 id="collection-title">Explore your courses</h2>
          </div>
          <span>{courses.length} practice courses</span>
        </div>
        <div className={styles.toolbar}>
          <div className={styles.search}>
            <label htmlFor="course-search">Search courses</label>
            <input
              ref={search}
              id="course-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try JavaScript, design or an instructor"
            />
          </div>
          <div className={styles.selectField}>
            <label htmlFor="course-status">Learning status</label>
            <select
              id="course-status"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              <option value="all">All statuses</option>
              <option>Not started</option>
              <option>In progress</option>
              <option>Completed</option>
            </select>
          </div>
          <div className={styles.selectField}>
            <label htmlFor="course-sort">Sort by</label>
            <select
              id="course-sort"
              value={sort}
              onChange={(event) => setSort(event.target.value)}
            >
              <option value="featured">Featured order</option>
              <option value="title">Course name</option>
              <option value="progress">Most progress</option>
            </select>
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
          <p role="status" aria-label="Course results">
            {filtered.length} {filtered.length === 1 ? "course" : "courses"}
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
            <h3>No courses match yet</h3>
            <p>
              Try a different search or clear your filters to see all{" "}
              {courses.length} practice courses.
            </p>
            <button type="button" onClick={clearFilters}>
              Show all courses
            </button>
          </div>
        )}
      </section>
    </>
  );
}
