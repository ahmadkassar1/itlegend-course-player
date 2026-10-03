import type { Comment, Course, CourseSection, Lesson } from "@/types/course";

const comments: Comment[] = [
  {
    id: "review-1",
    name: "Alex Morgan",
    date: "2026-09-12",
    body: "The examples made the first steps much easier to understand. Looking forward to putting this into practice.",
    avatar: "/images/avatar-1.svg",
  },
  {
    id: "review-2",
    name: "Sam Taylor",
    date: "2026-09-15",
    body: "A clear introduction and a helpful place to start. I have been taking notes as I work through each lesson.",
    avatar: "/images/avatar-2.svg",
  },
  {
    id: "review-3",
    name: "Jamie Lee",
    date: "2026-09-19",
    body: "I like being able to come back to the curriculum and review the topics at my own pace.",
    avatar: "/images/avatar-3.svg",
  },
];

const seoSections: CourseSection[] = [
  {
    id: "introduction",
    title: "Course Introduction",
    description: "Build a strong foundation, one lesson at a time.",
    lessons: [
      {
        id: "introduction",
        title: "Introduction",
        kind: "video",
        description:
          "Meet your instructor and discover what you will learn throughout this course.",
        minutes: 8,
      },
      {
        id: "course-overview",
        title: "Course Overview",
        kind: "video",
        description:
          "Explore the course roadmap and prepare a learning plan that fits your schedule.",
        minutes: 12,
      },
      {
        id: "knowledge-check",
        title: "Course Overview — Knowledge Check",
        kind: "exam",
        description:
          "Review the key ideas from the opening lessons with a short knowledge check.",
        minutes: 10,
        questionCount: 5,
      },
      {
        id: "reference-files",
        title: "Course Exercise / Reference Files",
        kind: "pdf",
        description:
          "A companion worksheet for organizing your notes and planning your first project.",
        minutes: 5,
      },
      {
        id: "editor-setup",
        title: "Code Editor Installation (Optional if you have one)",
        kind: "video",
        description:
          "Prepare your workspace and learn how to use an editor for the course exercises.",
        minutes: 9,
      },
      {
        id: "embedding-php",
        title: "Embedding PHP in HTML",
        kind: "video",
        description: "See how a small dynamic example fits into an HTML page.",
        minutes: 14,
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
        description:
          "Learn to recognize variables, functions and the behavior they bring to a page.",
        minutes: 18,
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
        description:
          "Organize an interface into small components and connect them to data.",
        minutes: 16,
      },
    ],
  },
];

function makeSections(prefix: string, titles: string[]): CourseSection[] {
  const lessons: Lesson[] = titles.map((title, index) => ({
    id: `${prefix}-${index + 1}`,
    title,
    kind: "video",
    minutes: 8 + index * 2,
    description: `Explore ${title.toLowerCase()} with clear explanations and a practical example.`,
  }));
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
      "knowledge-check",
      "reference-files",
      "editor-setup",
    ],
    initialLessonId: "introduction",
    comments,
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
      comments,
    };
  }),
];

export function getCourse(slug: string): Course | undefined {
  return courses.find((course) => course.slug === slug);
}
