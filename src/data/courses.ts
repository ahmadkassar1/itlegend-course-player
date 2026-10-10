import type { Course } from "@/types/course";
import { videoReferences } from "./video-references";
import { studyPractice } from "./study-practice";
import worksheet from "./worksheet.json";
import { getDemoCommunity } from "./demo-community";

// Published videos, not a fabricated creator syllabus.
export const courses: Course[] = videoReferences.map((video) => ({
  slug: video.id,
  title: video.videoTitle,
  description: video.description,
  instructor: "Ali Shahin",
  category: video.topic,
  language: "Arabic",
  thumbnail: video.thumbnail,
  poster: video.thumbnail,
  sourceURL: `https://www.youtube.com/watch?v=${video.videoId}`,
  playlistURL: video.playlistId
    ? `https://www.youtube.com/playlist?list=${video.playlistId}`
    : undefined,
  initialCompletedLessonIds: [],
  initialLessonId: video.videoId,
  ...getDemoCommunity(video.id),
  sections: [
    {
      id: "published-video",
      title: "Ali Shahin · YouTube",
      description: "Published video with its original title and native player.",
      lessons: [
        {
          id: video.videoId,
          title: video.videoTitle,
          description: video.description,
          kind: "video",
          minutes: 0,
          media: {
            youtubeId: video.videoId,
            src: `https://www.youtube.com/watch?v=${video.videoId}`,
            poster: video.thumbnail,
          },
        },
      ],
    },
    {
      id: "independent-practice",
      title: "Your study practice",
      description:
        "Exercises created for this site, separate from the creator’s published material.",
      lessons: [
        {
          id: "study-worksheet",
          title: "Study worksheet · Site exercise",
          description:
            "An original note-taking worksheet created for this site, not a creator download.",
          kind: "pdf",
          minutes: 0,
          resource: worksheet,
        },
        {
          id: "study-check",
          title: "Study skills check · Site exercise",
          description:
            "An original five-question study-habits exercise, not an Ali Shahin exam or certification.",
          kind: "exam",
          minutes: 10,
          exam: { ...studyPractice, id: `${video.id}-study-check` },
        },
      ],
    },
  ],
}));

export function getCourse(slug: string): Course | undefined {
  return courses.find((course) => course.slug === slug);
}
