import type { VideoReference } from "@/types/reference";

export const creatorChannel = "https://www.youtube.com/@AliShahin";

// Titles, ownership and IDs checked on the channel on 10 October 2026.
// These are references, not the source of our fictional practice syllabi.
export const videoReferences: VideoReference[] = [
  {
    id: "webology",
    title: "Webology علم الويب",
    videoTitle:
      "Everything you need to know about DNS before you create your website",
    description:
      "Understand DNS, networks and what happens when a browser opens a website.",
    topic: "Web foundations",
    videoId: "1fSAAzrxK6E",
    playlistId: "PLv3VqjyehAoQfMw4RrfoP0fy8BBB--ABv",
  },
  {
    id: "computer-science",
    title: "مقدمة في علوم الحاسب",
    videoTitle: "مكونات الكمبيوتر | مقدمة في علوم الحاسب",
    description:
      "Explore how computers work before moving into programming and problem solving.",
    topic: "Computer science",
    videoId: "2mySUIR9k20",
    playlistId: "PLv3VqjyehAoRUEU3Gr1Fwzhdmz4wH0tNJ",
  },
  {
    id: "cpp-foundations",
    title: "تعلم أساسيات البرمجة بلغة ++C",
    videoTitle:
      "Who invented the C++ programming language? And how did it develop?",
    description:
      "Build programming foundations through Ali Shahin’s Arabic C++ course.",
    topic: "Programming",
    videoId: "Gd6RBwunPL4",
    playlistId: "PLv3VqjyehAoR9GptbwLD2_OIYsx5br43b",
  },
  {
    id: "learning-skills",
    title: "Learning skills",
    videoTitle: "Learning skills",
    description:
      "Take a step back and think about how you learn and practise new skills.",
    topic: "Learning habits",
    videoId: "q5rXYEuFzEQ",
  },
];

export const catalogueReferences = videoReferences.filter(
  (reference) => reference.playlistId,
);

export function getCourseReferences(slug: string): VideoReference[] {
  const foundation = ["javascript-essentials", "react-components"].includes(
    slug,
  )
    ? "computer-science"
    : "webology";
  return videoReferences.filter(
    (reference) =>
      reference.id === foundation || reference.id === "learning-skills",
  );
}
