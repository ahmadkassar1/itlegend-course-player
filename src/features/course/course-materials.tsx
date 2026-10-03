import { Icon, type IconName } from "@/components/icon";
import type { Course } from "@/types/course";
import { getLessons } from "@/lib/course";
import styles from "./course.module.css";

export function CourseMaterials({ course }: { course: Course }) {
  const facts: { label: string; value: string; icon: IconName }[] = [
    { label: "Instructor", value: course.instructor, icon: "person" },
    {
      label: "Duration",
      value: `${course.durationWeeks} weeks`,
      icon: "clock",
    },
    {
      label: "Lessons",
      value: String(getLessons(course).length),
      icon: "book",
    },
    { label: "Enrolled", value: `${course.enrolled} students`, icon: "people" },
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
    </section>
  );
}
