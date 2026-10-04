import Link from "next/link";
import { Icon } from "@/components/icon";
import styles from "./course.module.css";

export function CourseHeader({
  title,
  desktopTitle,
}: {
  title: string;
  desktopTitle?: string;
}) {
  const prefix =
    desktopTitle && title.startsWith(desktopTitle) ? desktopTitle : title;
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <nav aria-label="Breadcrumb">
          <ol className={styles.breadcrumb}>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Icon name="chevron" />
              <Link href="/">Courses</Link>
            </li>
            <li>
              <Icon name="chevron" />
              <span aria-current="page">Course Details</span>
            </li>
          </ol>
        </nav>
        <h1>
          {prefix}
          {prefix !== title ? (
            <span className={styles.desktopTitleContinuation}>
              {title.slice(prefix.length)}
            </span>
          ) : null}
        </h1>
      </div>
    </header>
  );
}
