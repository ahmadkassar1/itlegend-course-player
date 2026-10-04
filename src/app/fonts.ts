import localFont from "next/font/local";

export const bodyFont = localFont({
  src: [
    { path: "./fonts/poppins-regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/poppins-medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/poppins-semibold.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-body",
  display: "swap",
  preload: false,
});

export const headingFont = localFont({
  src: "./fonts/spartan-variable.woff2",
  weight: "400 700",
  style: "normal",
  variable: "--font-heading",
  display: "swap",
});
