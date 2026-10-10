import Link from "next/link";
import { Icon } from "@/components/icon";
import { courses } from "@/data/courses";
import { CourseCatalogue } from "@/features/catalogue/course-catalogue";
import { summarizeCourse } from "@/lib/course";
import styles from "@/features/catalogue/catalogue.module.css";
import { LearnerSettings } from "@/features/catalogue/learner-settings";
import { catalogueReferences, creatorChannel } from "@/data/video-references";
import { ReferenceCollection } from "@/features/references/reference-collection";

export default function CataloguePage() {
  return (
    <div className={styles.page}>
      <header className={styles.navigation}>
        <Link href="/" className={styles.brand}>
          <Icon name="book" />
          Course Library
        </Link>
        <nav className={styles.navLinks} aria-label="Library sections">
          <a href="#courses">Practice courses</a>
          <a href="#references">Video references</a>
        </nav>
      </header>
      <main id="main-content" tabIndex={-1}>
        <CourseCatalogue courses={courses.map(summarizeCourse)} />
        <section
          id="references"
          tabIndex={-1}
          className={styles.referenceSection}
          aria-labelledby="references-title"
        >
          <div className={styles.collectionHeading}>
            <div>
              <p className={styles.eyebrow}>Another perspective</p>
              <h2 id="references-title">Learn with Ali Shahin</h2>
            </div>
            <a href={creatorChannel} target="_blank" rel="noopener noreferrer">
              Visit the channel ↗
            </a>
          </div>
          <p className={styles.sectionDescription}>
            Real collections from Ali Shahin’s YouTube channel. Preview an
            opening video here or explore the full collection on YouTube. These
            references are separate from our practice courses.
          </p>
          <ReferenceCollection references={catalogueReferences} />
        </section>
      </main>
      <footer className={styles.footer}>
        <LearnerSettings />
      </footer>
    </div>
  );
}
