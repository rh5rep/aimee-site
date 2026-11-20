import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";
import palette from "../brand/website-palette.json";
import "./globals.css";

const brandColors = Object.fromEntries(
  Object.entries(palette.colors).map(([name, value]) => [
    `--${name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`,
    value,
  ]),
) as CSSProperties;

export const metadata: Metadata = {
  title: "Max + Rami | AI training and implementation",
  description:
    "Max and Rami help small and midsize tech companies make everyday work easier through hands-on AI workshops and workflows their teams can run.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" style={brandColors}>
      <body>{children}</body>
    </html>
  );
}
