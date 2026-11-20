"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useState } from "react";
import { reportStatus } from "./report-example";
import styles from "./workflow-story.module.css";

const scenes = [
  {
    id: "notes",
    title: "It’s Friday. The update is due.",
    caption: "The numbers are in a tracker. The follow-up is buried in a handoff note.",
  },
  {
    id: "draft",
    title: "Give the team a draft to work from.",
    caption: "The workflow pulls the notes into one update and keeps the sources attached.",
  },
  {
    id: "review",
    title: "Leave the judgment with the team.",
    caption: "A teammate checks the count and confirms who’s taking request 42 before sending.",
  },
] as const;

export function WorkflowStory() {
  const [index, setIndex] = useState(0);
  const titleId = useId();
  const scene = scenes[index];
  const last = index === scenes.length - 1;

  return (
    <div
      className={styles.story}
      id="friday-report"
      role="group"
      aria-roledescription="carousel"
      aria-label="The Friday report"
    >
      <div role="group" aria-roledescription="slide" aria-labelledby={titleId}>
        <div className={styles.stage} data-scene={scene.id}>
          <Image
            className={styles.photo}
            src="/images/worktable.jpg"
            alt=""
            fill
            priority
            sizes="(max-width: 720px) 92vw, (max-width: 1250px) 46vw, 610px"
          />
          <div className={styles.art} key={scene.id}>
            {scene.id === "notes" && (
              <div className={styles.note}>
                <p>Friday handoff</p>
                <p>#42 is still open. Who’s taking it?</p>
              </div>
            )}
            {scene.id === "draft" && (
              <div className={styles.sheet}>
                <p className={styles.documentLabel}>Draft · Weekly update</p>
                <p className={styles.documentLine}>{reportStatus.line}</p>
                <p className={styles.sourceLabel}>{reportStatus.source}</p>
              </div>
            )}
            {scene.id === "review" && (
              <div className={`${styles.sheet} ${styles.review}`}>
                <p className={styles.documentLabel}>Before sending</p>
                <dl className={styles.checks}>
                  <div>
                    <dt>Weekly totals</dt>
                    <dd><span aria-hidden="true">✓</span> Matched the tracker</dd>
                  </div>
                  <div>
                    <dt>Request 42</dt>
                    <dd><span aria-hidden="true">○</span> Needs an owner</dd>
                  </div>
                </dl>
              </div>
            )}
          </div>
        </div>

        <div className={styles.caption}>
          <p className={styles.eyebrow}>The Friday report <span>·</span> Illustrated example</p>
          <div aria-live="polite" aria-atomic="true">
            <h2 id={titleId}>{scene.title}</h2>
            <p>{scene.caption}</p>
          </div>
        </div>
      </div>
      <div className={styles.controls}>
        <Link href="#workflow-example" className={styles.tryLink}>Try it yourself</Link>
        <div className={styles.navigation}>
          <button
            type="button"
            className={styles.previous}
            aria-label="Previous scene"
            aria-disabled={index === 0}
            onClick={() => setIndex((current) => Math.max(0, current - 1))}
          >
            <span aria-hidden="true">←</span>
          </button>
          <span className={styles.position}>{index + 1} / {scenes.length}</span>
          <button
            type="button"
            className={styles.next}
            aria-label={last ? "Replay walkthrough" : "Next scene"}
            onClick={() => setIndex((current) => (current + 1) % scenes.length)}
          >
            {last ? "Replay" : "Next"} <span aria-hidden="true">{last ? "↻" : "→"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
