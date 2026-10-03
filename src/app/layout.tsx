import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Course Library", template: "%s | Course Library" },
  description:
    "Explore six guided courses and continue learning at your own pace.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
