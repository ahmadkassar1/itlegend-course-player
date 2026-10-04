import Link from "next/link";
import { Icon } from "@/components/icon";
import { courses } from "@/data/courses";
import { CourseCard } from "@/features/catalogue/course-card";
import { summarizeCourse } from "@/lib/course";
import styles from "@/features/catalogue/catalogue.module.css";
import { LearnerSettings } from "@/features/catalogue/learner-settings";

export default function CataloguePage() {
  return (
    <div className={styles.page}>
      <header className={styles.navigation}>
        <Link href="/" className={styles.brand}>
          <Icon name="book" />
          Course Library
        </Link>
        <span className={styles.navLabel}>Learn at your own pace</span>
      </header>
      <main id="main-content" tabIndex={-1}>
        <section className={styles.hero} aria-labelledby="catalogue-title">
          <p className={styles.eyebrow}>A little progress, every day</p>
          <h1 id="catalogue-title">Your next lesson starts here.</h1>
          <p>
            Explore a new subject or pick up where you left off. A clear path,
            practical lessons, and room to grow.
          </p>
        </section>
        <section aria-labelledby="collection-title">
          <div className={styles.collectionHeading}>
            <h2 id="collection-title">Explore your courses</h2>
            <span>{courses.length} courses</span>
          </div>
          <div className={styles.grid}>
            {courses.map((course) => (
              <CourseCard key={course.slug} course={summarizeCourse(course)} />
            ))}
          </div>
        </section>
      </main>
      <footer className={styles.footer}>
        <LearnerSettings />
      </footer>
    </div>
  );
}
