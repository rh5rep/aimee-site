import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";
import palette from "../brand/palette.json";
import "./globals.css";

const brandColors = Object.fromEntries(
  Object.entries(palette.colors).map(([name, value]) => [
    `--${name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`,
    value,
  ]),
) as CSSProperties;

export const metadata: Metadata = {
  title: "AImee | Practical AI for real work",
  description:
    "AImee helps small teams and professionals explore practical AI through real work, clear methods, and human review.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" style={brandColors}>
      <body>{children}</body>
    </html>
  );
}
