import Link from "next/link";
import { Icon } from "@/components/icon";
import { courses } from "@/data/courses";
import { CourseCatalogue } from "@/features/catalogue/course-catalogue";
import { summarizeCourse } from "@/lib/course";
import styles from "@/features/catalogue/catalogue.module.css";
import { LearnerSettings } from "@/features/catalogue/learner-settings";
import { creatorChannel } from "@/data/video-references";

export default function CataloguePage() {
  return (
    <div className={styles.page}>
      <header className={styles.navigation}>
        <Link href="/" className={styles.brand}>
          <Icon name="book" />
          Video Library
        </Link>
        <nav className={styles.navLinks} aria-label="Library sections">
          <a href="#courses">Explore videos</a>
          <a href={creatorChannel} target="_blank" rel="noopener noreferrer">
            Ali Shahin on YouTube ↗
          </a>
        </nav>
      </header>
      <main id="main-content" tabIndex={-1}>
        <CourseCatalogue courses={courses.map(summarizeCourse)} />
      </main>
      <footer className={styles.footer}>
        <LearnerSettings />
      </footer>
    </div>
  );
}
