import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { SiteFooter, SiteHeader } from "../../components/site-shell";
import { DraftReviewer, DraftReviewerEntry } from "./draft-reviewer";

export const metadata: Metadata = {
  title: "Draft review | Max + Rami",
  description: "Try a draft review based on Max and Rami’s workshop method. See the passage, what to consider changing, and why.",
};

export default function ReviewPage() {
  return (
    <>
      <SiteHeader />
      <main className="container interior" id="main" tabIndex={-1}>
        <header className="page-intro">
          <h1>Give your draft <em>a second read.</em></h1>
          <p className="lede">
            See which words a reviewer would flag, what they’d consider changing, and why.
            Based on Max’s writing workshop.
          </p>
        </header>
        <Suspense fallback={<DraftReviewer />}>
          <DraftReviewerEntry />
        </Suspense>
        <div className="contact-strip">
          <Link className="button" href="/contact?service=one-on-one">Talk with us about a draft</Link>
          <Link className="text-link" href="/demos#draft-review">Back to the writing example</Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
