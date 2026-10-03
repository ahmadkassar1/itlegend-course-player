import Image from "next/image";
import { Icon } from "@/components/icon";
import type { Comment } from "@/types/course";
import styles from "./course.module.css";

const dateFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export function CommentsSection({ comments }: { comments: Comment[] }) {
  return (
    <section
      id="comments"
      tabIndex={-1}
      className={styles.comments}
      aria-labelledby="comments-heading"
    >
      <h2 id="comments-heading">Comments</h2>
      <ul className={styles.commentList}>
        {comments.map((comment) => (
          <li key={comment.id} className={styles.comment}>
            <Image src={comment.avatar} width={64} height={64} alt="" />
            <div>
              <h3>{comment.name}</h3>
              <time dateTime={comment.date}>
                {dateFormat.format(new Date(`${comment.date}T00:00:00Z`))}
              </time>
              <p>{comment.body}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className={styles.commentForm}>
        <label className={styles.srOnly} htmlFor="comment-body">
          Write a comment
        </label>
        <textarea
          id="comment-body"
          placeholder="Write a comment"
          disabled
          rows={5}
          title="Comments are read-only"
        />
        <button
          className={styles.submit}
          type="button"
          disabled
          title="Comments are read-only"
        >
          Submit Review <Icon name="arrow" />
        </button>
      </div>
    </section>
  );
}
