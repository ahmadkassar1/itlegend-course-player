import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" tabIndex={-1} className="empty-page">
      <h1>Course not found</h1>
      <p>
        This course is unavailable. You can return to the library and choose
        another course.
      </p>
      <Link href="/">Return to Course Library →</Link>
    </main>
  );
}
