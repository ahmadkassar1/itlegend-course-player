import type { Comment } from "@/types/course";
import { CommentItem } from "./comment-item";
import { CourseComments } from "./course-comments";

// Seed rows remain server-rendered slots; only new comments and the form subscribe.
export function CommentsSection({
  courseSlug,
  comments,
}: {
  courseSlug: string;
  comments: Comment[];
}) {
  return (
    <CourseComments courseSlug={courseSlug}>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </CourseComments>
  );
}
