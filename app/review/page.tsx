import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "../../components/site-shell";
import { DraftReviewer } from "./draft-reviewer";
import styles from "./review.module.css";

export const metadata: Metadata = {
  title: "Draft review | Max + Rami",
  description: "Try a draft review based on Max and Rami’s workshop method. See the passage, what to consider changing, and why.",
};

export default function ReviewPage() {
  return (
    <>
      <SiteHeader />
      <main className="container interior" id="main" tabIndex={-1}>
        <header className={styles.intro}>
          <h1>Give your draft <em>a second read</em></h1>
          <p className="lede">
            See which words a reviewer would flag, what they’d consider changing, and why.
            Based on Max’s writing workshop.
          </p>
        </header>
        <DraftReviewer />
      </main>
      <SiteFooter />
    </>
  );
}
