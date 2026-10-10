import type { VideoReference } from "@/types/reference";

export const creatorChannel = "https://www.youtube.com/@AliShahin";

// Original titles, thumbnails and creator checked with YouTube oEmbed on 10 October 2026.
// Descriptions are our summaries; published creator metadata stays unchanged.
export const videoReferences: VideoReference[] = [
  {
    id: "webology",
    title: "Webology علم الويب",
    videoTitle: "كل اللي لازم تعرفه عن الـ DNS قبل ما تعمل موقعك",
    thumbnail: "https://i.ytimg.com/vi/1fSAAzrxK6E/hqdefault.jpg",
    description:
      "Understand DNS, networks and what happens when a browser opens a website.",
    topic: "Web foundations",
    videoId: "1fSAAzrxK6E",
    playlistId: "PLv3VqjyehAoQfMw4RrfoP0fy8BBB--ABv",
  },
  {
    id: "computer-science",
    title: "مقدمة في علوم الحاسب",
    videoTitle: "مكونات الكمبيوتر | مقدمة  في علوم الحاسب",
    thumbnail: "https://i.ytimg.com/vi/2mySUIR9k20/hqdefault.jpg",
    description:
      "Explore how computers work before moving into programming and problem solving.",
    topic: "Computer science",
    videoId: "2mySUIR9k20",
    playlistId: "PLv3VqjyehAoRUEU3Gr1Fwzhdmz4wH0tNJ",
  },
  {
    id: "cpp-foundations",
    title: "تعلم أساسيات البرمجة بلغة ++C",
    videoTitle: "لغة c++ من مخترعها ؟ و كيف تطورت ؟",
    thumbnail: "https://i.ytimg.com/vi/Gd6RBwunPL4/hqdefault.jpg",
    description:
      "Build programming foundations through Ali Shahin’s Arabic C++ course.",
    topic: "Programming",
    videoId: "Gd6RBwunPL4",
    playlistId: "PLv3VqjyehAoR9GptbwLD2_OIYsx5br43b",
  },
  {
    id: "learning-skills",
    title: "الحل النهائي للنجاة في عصر ال AI",
    videoTitle: "الحل النهائي للنجاة في عصر ال AI",
    thumbnail: "https://i.ytimg.com/vi/q5rXYEuFzEQ/hqdefault.jpg",
    description:
      "Ali Shahin’s published discussion of learning in the age of AI.",
    topic: "Learning habits",
    videoId: "q5rXYEuFzEQ",
  },
];

export const catalogueReferences = videoReferences.filter(
  (reference) => reference.playlistId,
);

export function getCourseReferences(slug: string): VideoReference[] {
  return videoReferences
    .filter((reference) => reference.id !== slug)
    .slice(0, 2);
}
