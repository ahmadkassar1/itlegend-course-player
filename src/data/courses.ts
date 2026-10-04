import type { Course, CourseSection, Lesson } from "@/types/course";
import {
  getCourseContent,
  getCourseComments,
  getLessonMedia,
} from "./course-content";
const seoContent = getCourseContent("starting-seo");

const seoSections: CourseSection[] = [
  {
    id: "introduction",
    title: "Course Introduction",
    description:
      "Plan a useful service page and understand its web foundations.",
    lessons: [
      {
        id: "introduction",
        title: "Introduction",
        kind: "video",
        media: getLessonMedia("starting-seo", "introduction"),
        description: seoContent.lessons["introduction"].summary,
        minutes: 1,
      },
      {
        id: "course-overview",
        title: "Course Overview",
        kind: "video",
        media: getLessonMedia("starting-seo", "course-overview"),
        description: seoContent.lessons["course-overview"].summary,
        minutes: 1,
      },
      {
        id: "knowledge-check",
        title: "Course Overview — Knowledge Check",
        curriculumTitle: "Course Overview",
        kind: "exam",
        description:
          "Review the key ideas from the opening lessons with a short knowledge check.",
        minutes: 10,
        exam: seoContent.exam,
      },
      {
        id: "reference-files",
        title: "Course Exercise / Reference Files",
        kind: "pdf",
        resource: seoContent.worksheet,
        description:
          "A companion worksheet for organizing your notes and planning your first project.",
        minutes: 5,
      },
      {
        id: "editor-setup",
        title: "Code Editor Installation (Optional if you have one)",
        kind: "video",
        media: getLessonMedia("starting-seo", "editor-setup"),
        description: seoContent.lessons["editor-setup"].summary,
        minutes: 1,
      },
      {
        id: "embedding-php",
        title: "Embedding PHP in HTML",
        kind: "video",
        media: getLessonMedia("starting-seo", "embedding-php"),
        description: seoContent.lessons["embedding-php"].summary,
        minutes: 1,
      },
    ],
  },
  {
    id: "javascript",
    title: "JavaScript Language Basics",
    description: "Understand the building blocks of an interactive page.",
    lessons: [
      {
        id: "javascript-basics",
        title: "JavaScript Language Basics",
        kind: "video",
        media: getLessonMedia("starting-seo", "javascript-basics"),
        description: seoContent.lessons["javascript-basics"].summary,
        minutes: 1,
      },
    ],
  },
  {
    id: "components",
    title: "Components & Databinding",
    description: "Connect your ideas into a reusable interface.",
    lessons: [
      {
        id: "components-databinding",
        title: "Components & Databinding",
        kind: "video",
        media: getLessonMedia("starting-seo", "components-databinding"),
        description: seoContent.lessons["components-databinding"].summary,
        minutes: 1,
      },
    ],
  },
];

function makeSections(prefix: string, titles: string[]): CourseSection[] {
  const content = getCourseContent(prefix);
  const lessons: Lesson[] = titles.map((title, index) => {
    const id = `${prefix}-${index + 1}`;
    const base = { id, title, description: content.lessons[id].summary };
    if (index === titles.length - 2)
      return {
        ...base,
        title: "Practice Worksheet",
        kind: "pdf",
        resource: content.worksheet,
        minutes: 5,
      };
    if (index === titles.length - 1)
      return {
        ...base,
        title: "Final Knowledge Check",
        kind: "exam",
        exam: content.exam,
        minutes: 10,
      };
    return {
      ...base,
      kind: "video",
      media: getLessonMedia(prefix, id),
      minutes: 1,
    };
  });
  const split = Math.ceil(lessons.length / 2);
  return [
    {
      id: "foundations",
      title: "Getting Started",
      description: "Learn the essentials before moving on.",
      lessons: lessons.slice(0, split),
    },
    {
      id: "practice",
      title: "Putting It Into Practice",
      description: "Turn the fundamentals into something useful.",
      lessons: lessons.slice(split),
    },
  ];
}

type Sample = {
  slug: string;
  title: string;
  description: string;
  instructor: string;
  category: string;
  titles: string[];
  completed: number;
  weeks: number;
  enrolled: number;
};

const samples: Sample[] = [
  {
    slug: "web-design-foundations",
    title: "Web Design Foundations",
    description:
      "Shape thoughtful layouts with typography, color and a clear visual hierarchy.",
    instructor: "Ana Patel",
    category: "Design",
    titles: [
      "Welcome to Web Design",
      "Visual Hierarchy",
      "Typography That Works",
      "Color and Contrast",
      "Spacing and Layout",
      "Your First Design",
    ],
    completed: 0,
    weeks: 2,
    enrolled: 84,
  },
  {
    slug: "javascript-essentials",
    title: "JavaScript Essentials",
    description:
      "Build confidence with the language behind interactive websites.",
    instructor: "Marcus Chen",
    category: "Development",
    titles: [
      "Getting to Know JavaScript",
      "Values and Variables",
      "Working with Functions",
      "Arrays and Objects",
      "Making Decisions",
      "The Document Object Model",
      "Handling Events",
      "A Small Interactive Project",
    ],
    completed: 3,
    weeks: 3,
    enrolled: 126,
  },
  {
    slug: "responsive-css",
    title: "Responsive CSS: From Mobile to Desktop",
    description:
      "Create flexible interfaces that feel comfortable on every screen.",
    instructor: "Sofia Reyes",
    category: "Development",
    titles: [
      "A Flexible Foundation",
      "Sizing and Spacing",
      "Flexbox",
      "CSS Grid",
      "Content-led Breakpoints",
      "Responsive Images",
      "Testing Different Screens",
    ],
    completed: 0,
    weeks: 2,
    enrolled: 92,
  },
  {
    slug: "react-components",
    title: "Building with React Components",
    description:
      "Connect reusable components, thoughtful state and real user interactions.",
    instructor: "Daniel Kim",
    category: "Development",
    titles: [
      "Thinking in Components",
      "Props and Composition",
      "Rendering Lists",
      "Interactive State",
      "Forms",
      "Sharing State",
      "Effects and Events",
      "Accessible Components",
      "Putting It Together",
      "Review and Next Steps",
    ],
    completed: 7,
    weeks: 4,
    enrolled: 148,
  },
  {
    slug: "accessible-interfaces",
    title: "Accessible Interfaces",
    description:
      "Make your work easier to use with semantics, keyboard support and readable content.",
    instructor: "Maya Johnson",
    category: "Accessibility",
    titles: [
      "Designing for People",
      "Semantic HTML",
      "Keyboard Navigation",
      "Labels and Instructions",
      "Color and Contrast",
      "An Accessibility Review",
    ],
    completed: 6,
    weeks: 2,
    enrolled: 73,
  },
];

export const courses: Course[] = [
  {
    slug: "starting-seo",
    title: "Starting SEO as your Home Based Business",
    desktopTitle: "Starting SEO as your Home",
    description:
      "Take the first steps toward your home-based business with a clear, guided learning path.",
    instructor: "Edward Norton",
    category: "Business",
    durationWeeks: 3,
    enrolled: 65,
    language: "English",
    thumbnail: "/images/business.svg",
    poster: "/images/lesson-poster.svg",
    sections: seoSections,
    initialCompletedLessonIds: [
      "introduction",
      "course-overview",
      "editor-setup",
      "javascript-basics",
      "components-databinding",
    ],
    initialLessonId: "introduction",
    comments: getCourseComments("starting-seo"),
    peers: seoContent.peers,
  },
  ...samples.map((sample): Course => {
    const sections = makeSections(sample.slug, sample.titles);
    const ids = sections.flatMap((section) =>
      section.lessons.map((lesson) => lesson.id),
    );
    return {
      slug: sample.slug,
      title: sample.title,
      description: sample.description,
      instructor: sample.instructor,
      category: sample.category,
      durationWeeks: sample.weeks,
      enrolled: sample.enrolled,
      language: "English",
      thumbnail: `/images/${sample.slug}.svg`,
      poster: "/images/lesson-poster.svg",
      sections,
      initialCompletedLessonIds: ids.slice(0, sample.completed),
      initialLessonId: ids[Math.min(sample.completed, ids.length - 1)],
      comments: getCourseComments(sample.slug),
      peers: getCourseContent(sample.slug).peers,
    };
  }),
];

export function getCourse(slug: string): Course | undefined {
  return courses.find((course) => course.slug === slug);
}
