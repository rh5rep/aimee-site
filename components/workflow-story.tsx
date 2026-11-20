"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { reportFollowUp, reportStatus } from "./report-example";
import styles from "./workflow-story.module.css";

const duration = 14_000;
const scenes = [
  {
    id: "notes",
    label: "Notes",
    start: 0,
    preview: 0,
    title: "It’s Friday. The update is due.",
    caption: "The numbers are in a tracker. The follow-up is buried in a handoff note.",
  },
  {
    id: "draft",
    label: "Draft",
    start: 4_200,
    preview: 6_000,
    title: "Give the team a draft to work from.",
    caption: "The workflow turns the notes into an update and keeps the source attached.",
  },
  {
    id: "review",
    label: "Review",
    start: 9_100,
    preview: 11_500,
    title: "Leave the judgment with the team.",
    caption: "A teammate can check the count. Someone still needs to take request 42.",
  },
] as const;

function timestamp(milliseconds: number) {
  return `0:${String(Math.floor(milliseconds / 1000)).padStart(2, "0")}`;
}

export function WorkflowStory() {
  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const stage = useRef<HTMLDivElement>(null);
  const elapsed = useRef(0);
  const scene = scenes[2].start <= position ? scenes[2] : scenes[1].start <= position ? scenes[1] : scenes[0];
  const ended = position === duration;
  const playLabel = playing ? "Pause" : ended ? "Replay" : "Play";

  const showFrame = useCallback((milliseconds: number) => {
    elapsed.current = milliseconds;
    stage.current?.style.setProperty("--film-position", `${milliseconds}ms`);
    setPosition(Math.floor(milliseconds / 100) * 100);
  }, []);

  useEffect(() => {
    if (!playing) return;

    const started = performance.now() - elapsed.current;
    let frame: number;

    function tick(now: number) {
      const time = Math.max(0, Math.min(duration, now - started));
      showFrame(time);
      if (time < duration) frame = requestAnimationFrame(tick);
      else setPlaying(false);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing, showFrame]);

  function seek(milliseconds: number) {
    setPlaying(false);
    showFrame(milliseconds);
  }

  function togglePlayback() {
    if (ended) showFrame(0);
    setPlaying(!playing);
  }

  return (
    <div className={styles.story} id="friday-report" role="group" aria-label="The Friday report">
      <div
        ref={stage}
        className={styles.stage}
        data-scene={scene.id}
        style={{ "--film-duration": `${duration}ms` } as CSSProperties}
      >
        <Image
          className={styles.photo}
          src="/images/worktable.jpg"
          alt=""
          fill
          preload
          sizes="(max-width: 720px) 92vw, (max-width: 1250px) 46vw, 610px"
        />
        <div className={styles.art}>
          <div className={`${styles.note} ${styles.tracker}`} aria-hidden={scene.id !== "notes"}>
            <p>Friday tracker</p>
            <p>{reportStatus.excerpt}</p>
          </div>
          <div className={`${styles.note} ${styles.handoff}`} aria-hidden={scene.id !== "notes"}>
            <p>Friday handoff</p>
            <p>#42 is still open. Who’s taking it?</p>
          </div>

          <div className={styles.sheet} aria-hidden={scene.id === "notes"}>
            <div className={styles.draft} aria-hidden={scene.id !== "draft"}>
              <p className={styles.documentLabel}>Draft · Weekly update</p>
              <p className={styles.documentLine}>{reportStatus.line}</p>
              <p className={styles.sourceLabel}>{reportStatus.source}</p>
              <p className={styles.followUp}>{reportFollowUp.line}</p>
            </div>
            <div className={styles.review} aria-hidden={scene.id !== "review"}>
              <p className={styles.documentLabel}>Before sending</p>
              <dl className={styles.checks}>
                <div>
                  <dt>Weekly totals</dt>
                  <dd className={styles.matched}><span aria-hidden="true">✓</span> Matched the tracker</dd>
                </div>
                <div>
                  <dt>Request 42</dt>
                  <dd className={styles.open}><span aria-hidden="true">○</span> Needs an owner</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.transport} role="group" aria-label="Playback">
        <button type="button" className={styles.play} onClick={togglePlayback}>
          <span aria-hidden="true" className={styles.playIcon}>
            {playing ? "Ⅱ" : ended ? "↻" : "▶"}
          </span>
          {playLabel}
        </button>
        <input
          className={styles.timeline}
          type="range"
          aria-label="Playback position"
          aria-valuetext={`${timestamp(position)} of ${timestamp(duration)}`}
          value={position}
          min={0}
          max={duration}
          step={100}
          onChange={(event) => seek(event.currentTarget.valueAsNumber)}
        />
        <span className={styles.time} aria-hidden="true">{timestamp(position)} / {timestamp(duration)}</span>
      </div>

      <div className={styles.caption}>
        <p className={styles.eyebrow}>The Friday report <span>·</span> Illustrated example</p>
        <div aria-live={playing ? "off" : "polite"} aria-atomic="true">
          <h2>{scene.title}</h2>
          <p>{scene.caption}</p>
        </div>
      </div>

      <div className={styles.controls}>
        <div className={styles.chapters} role="group" aria-label="Scenes">
          {scenes.map((chapter) => (
            <button
              key={chapter.id}
              type="button"
              aria-current={scene.id === chapter.id ? "step" : undefined}
              onClick={() => seek(chapter.preview)}
            >
              {chapter.label}
            </button>
          ))}
        </div>
        <Link href="#workflow-example" className={styles.tryLink} onClick={() => setPlaying(false)}>
          Try it yourself
        </Link>
      </div>
    </div>
  );
}
