import Image from "next/image";
import type { Comment } from "@/types/course";
import styles from "./course.module.css";

const dateFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export function CommentItem({ comment }: { comment: Comment }) {
  return (
    <li className={styles.comment}>
      <Image src={comment.avatar} width={80} height={80} alt="" />
      <div>
        <h3>
          {comment.name}
          {comment.sample ? (
            <small className={styles.sampleBadge}>Sample</small>
          ) : null}
        </h3>
        <time dateTime={comment.date}>
          {dateFormat.format(new Date(comment.date))}
        </time>
        <p dir="auto">{comment.body}</p>
      </div>
    </li>
  );
}
