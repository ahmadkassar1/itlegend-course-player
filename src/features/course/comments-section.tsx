import type { Comment } from "@/types/course";
import { CommentItem } from "./comment-item";
import { CourseComments } from "./course-comments";
import { getCourseReferences } from "@/data/video-references";
import { ReferenceCollection } from "@/features/references/reference-collection";

// Seed rows remain server-rendered slots; only new comments and the form subscribe.
export function CommentsSection({
  courseSlug,
  comments,
}: {
  courseSlug: string;
  comments: Comment[];
}) {
  return (
    <CourseComments
      courseSlug={courseSlug}
      hasSampleComments={comments.some((comment) => comment.sample)}
      references={
        <ReferenceCollection
          compact
          references={getCourseReferences(courseSlug)}
        />
      }
    >
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </CourseComments>
  );
}
