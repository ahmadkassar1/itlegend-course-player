import { Icon, type IconName } from "@/components/icon";
import type { Course } from "@/types/course";
import { getLessons } from "@/lib/course";
import styles from "./course.module.css";

export function CourseMaterials({ course }: { course: Course }) {
  const facts: { label: string; value: string; icon: IconName }[] = [
    { label: "Instructor", value: course.instructor, icon: "person" },
    {
      label: "Videos",
      value: String(
        getLessons(course).filter((lesson) => lesson.kind === "video").length,
      ),
      icon: "book",
    },
    { label: "Source", value: "YouTube", icon: "globe" },
    {
      label: "Exercises",
      value: "2 site exercises",
      icon: "document",
    },
    { label: "Language", value: course.language, icon: "globe" },
  ];
  return (
    <section className={styles.materials} aria-labelledby="materials-heading">
      <h2 id="materials-heading">Course Materials</h2>
      <dl className={styles.facts}>
        {facts.map((fact) => (
          <div className={styles.fact} key={fact.label}>
            <dt>
              <Icon name={fact.icon} />
              {fact.label}:
            </dt>
            <dd>{fact.value}</dd>
          </div>
        ))}
      </dl>
      <p className={styles.sourceNote}>
        <a href={course.sourceURL} target="_blank" rel="noopener noreferrer">
          Original video ↗
        </a>
        {course.playlistURL ? (
          <>
            {" "}
            ·{" "}
            <a
              href={course.playlistURL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Creator’s full collection ↗
            </a>
          </>
        ) : null}
      </p>
    </section>
  );
}
