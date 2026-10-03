import Link from "next/link";
import { Icon } from "@/components/icon";
import styles from "./course.module.css";

export function CourseHeader({ title }: { title: string }) {
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
        <h1>{title}</h1>
      </div>
    </header>
  );
}
