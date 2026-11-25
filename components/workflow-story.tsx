"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { firstFriday, nextFriday, reportFollowUp, reportStatus } from "./report-example";
import { ReportWalkthrough } from "./report-walkthrough";
import script from "./friday-script.json";
import styles from "./workflow-story.module.css";

const { cues } = script;
const openingBlend = 500;
const replyDelay = cues.confirmed.startMs - cues.review.startMs;
const sendDelay = cues.sent.startMs - cues.review.startMs;
const sourceDelay = 500;
const refreshDelay = 1_500;
const scenes = [
  { id: "today", label: "Today", preview: 0, title: "Where Friday gets stuck", cue: cues.today },
  { id: "rule", label: "Ask", preview: 600, title: "The question we’d ask first", cue: cues.rule },
  { id: "draft", label: "Build", preview: 800, title: "A draft with one gap", cue: cues.draft },
  { id: "review", label: "Check", preview: 1_300, title: "One question before sending", cue: cues.review },
  { id: "reuse", label: "Reuse", preview: refreshDelay + 500, title: "Next Friday, run it again", cue: cues.reuse },
] as const;
const duration = script.durationMs;

function timestamp(milliseconds: number) {
  return `0:${String(Math.floor(milliseconds / 1000)).padStart(2, "0")}`;
}

export function WorkflowStory() {
  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [audioUnavailable, setAudioUnavailable] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const voiceover = useRef<HTMLAudioElement>(null);
  const elapsed = useRef(0);
  const scene = scenes.findLast((chapter) => position >= chapter.cue.startMs) ?? scenes[0];
  const sceneStart = scene.cue.startMs;
  const sceneElapsed = position - sceneStart;
  const checking = scene.id === "review";
  const replied = checking && sceneElapsed >= replyDelay;
  const reusing = scene.id === "reuse";
  const freshSources = reusing && sceneElapsed >= sourceDelay;
  const refreshed = reusing && sceneElapsed >= refreshDelay;
  const showingLastWeek = reusing && !refreshed;
  const reportSent = (checking && sceneElapsed >= sendDelay) || showingLastWeek;
  const ownerConfirmed = replied || showingLastWeek;
  const showReply = replied || (reusing && !freshSources);
  const captionTitle = replied ? (reportSent ? "Friday’s update is out" : "Maya takes the request") : scene.title;
  const caption = checking && reportSent ? cues.sent : replied ? cues.confirmed : scene.cue;
  const sourceWeek = freshSources ? nextFriday : firstFriday;
  const reportWeek = refreshed ? nextFriday : firstFriday;
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
    const track = voiceover.current;
    let frame: number;

    function tick(now: number) {
      const time = Math.max(0, Math.min(duration, now - started));
      showFrame(time);
      if (time < duration) frame = requestAnimationFrame(tick);
      else setPlaying(false);
    }

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      track?.pause();
    };
  }, [playing, showFrame]);

  function pausePlayback() {
    voiceover.current?.pause();
    setPlaying(false);
  }

  function seek(milliseconds: number) {
    pausePlayback();
    showFrame(milliseconds);
  }

  function disableVoiceover() {
    setSoundEnabled(false);
    setAudioUnavailable(true);
  }

  function playVoiceover() {
    const track = voiceover.current;
    if (!track) return;

    track.currentTime = elapsed.current / 1000;
    void track.play().then(() => {
      const time = elapsed.current / 1000;
      if (!track.paused && Math.abs(track.currentTime - time) > .2) track.currentTime = time;
    }).catch((error: unknown) => {
      if (!(error instanceof DOMException && error.name === "AbortError")) disableVoiceover();
    });
  }

  function togglePlayback() {
    if (playing) {
      pausePlayback();
      return;
    }
    if (ended) showFrame(0);
    if (soundEnabled) playVoiceover();
    setPlaying(true);
  }

  function toggleSound() {
    if (soundEnabled) voiceover.current?.pause();
    else if (playing) playVoiceover();
    setSoundEnabled(!soundEnabled);
  }

  return (
    <div className={styles.story} role="group" aria-label="The Friday Report exercise and film">
      <div
        ref={stage}
        className={styles.stage}
        id="friday-report"
        tabIndex={-1}
        role="group"
        aria-label="The Friday Report film"
        data-scene={scene.id}
        data-replied={replied}
        data-sent={checking && reportSent}
        style={{
          "--scene-start": `${sceneStart}ms`,
          "--opening-blend": `${openingBlend}ms`,
          "--reply-delay": `${replyDelay}ms`,
          "--send-delay": `${sendDelay}ms`,
          "--source-delay": `${sourceDelay}ms`,
          "--refresh-delay": `${refreshDelay}ms`,
        } as CSSProperties}
      >
        <Image
          className={styles.photo}
          src="/images/friday-workflow-stage.jpg"
          alt=""
          fill
          sizes="(max-width: 1080px) 90vw, 970px"
        />
        <div className={styles.art}>
          {position < cues.rule.startMs + openingBlend && (
            <div className={styles.opening} aria-hidden={scene.id !== "today"}>
              <p className={styles.stageLabel}>Friday, 4:45 p.m.</p>
              <p className={styles.stageHeadline}>One last <em>thing.</em></p>
              <div className={`${styles.note} ${styles.tracker}`}>
                <p>Friday tracker</p>
                <p>{reportStatus.excerpt}</p>
              </div>
              <div className={`${styles.note} ${styles.handoff}`}>
                <p>Friday handoff</p>
                <p>{reportFollowUp.excerpt}</p>
              </div>
            </div>
          )}

          {scene.id === "rule" && (
            <dl className={styles.conversation}>
              <div><dt>Max + Rami</dt><dd>“What do you do when a name is missing?”</dd></div>
              <div><dt>Team lead</dt><dd>“Flag it for me. I’ll ask who’s taking it.”</dd></div>
            </dl>
          )}

          {(scene.id === "draft" || checking || reusing) && (
            <div className={styles.workflowStage}>
              <div className={styles.workflowIntro} key={scene.id}>
                {reusing && <p className={styles.stageLabel}>Next Friday</p>}
                <p className={styles.workflowHeadline}>
                  {scene.id === "draft" && <>Pull the totals. <em>Flag the gap.</em></>}
                  {checking && !replied && <>Who’s taking <em>request #42?</em></>}
                  {checking && replied && (reportSent ? <>Update <em>sent.</em></> : <>Maya’s <em>got it.</em></>)}
                  {reusing && <>Fresh notes. <em>Same workflow.</em></>}
                </p>
              </div>
              <div className={styles.workflow}>
                <dl className={styles.inputs}>
                  <div className={styles.trackerInput}>
                    <dt>Tracker</dt>
                    <dd className={freshSources ? styles.freshSource : undefined}>{sourceWeek.closed} closed · {sourceWeek.open} open</dd>
                  </div>
                  <div className={showReply ? styles.handoffReply : undefined}>
                    <dt>{showReply ? "Maya" : "Handoff"}</dt>
                    <dd className={freshSources ? styles.freshSource : undefined}>
                      {showReply ? "“I’ll take it.”" : freshSources ? "Owners listed" : `#${firstFriday.request} open`}
                    </dd>
                  </div>
                </dl>
                <div className={styles.connector} aria-hidden="true"><span /></div>
                <div className={styles.sheet}>
                  <div className={styles.sheetHeader}>
                    <p className={styles.documentLabel}>{showingLastWeek ? "Last Friday’s update" : "Weekly update"}</p>
                    {reportSent && <span className={styles.sent}>Sent</span>}
                  </div>
                  {scene.id === "draft" ? (
                    <dl className={styles.draftLines}>
                      <div><dt>{reportWeek.closed} closed · {reportWeek.open} open</dt><dd>Tracker</dd></div>
                      <div className={styles.gap}><dt>Request #{firstFriday.request}</dt><dd>Owner missing</dd></div>
                    </dl>
                  ) : (
                    <dl className={styles.checks}>
                      <div className={reusing ? (refreshed ? styles.freshCount : undefined) : styles.matched}>
                        <dt>{reportWeek.closed} closed · {reportWeek.open} open</dt>
                        <dd>{refreshed ? "Check tracker" : <><span aria-hidden="true">✓</span> Matches tracker</>}</dd>
                      </div>
                      <div className={ownerConfirmed ? styles.confirmed : refreshed ? styles.open : styles.gap}>
                        <dt>{refreshed ? "Team review" : `Request #${firstFriday.request}`}</dt>
                        <dd>{refreshed ? "Before sending" : ownerConfirmed ? "Maya confirmed" : "Owner missing"}</dd>
                      </div>
                    </dl>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <audio ref={voiceover} src="/audio/friday-report-voiceover.mp3" preload="none" onError={disableVoiceover} />
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
        <button
          type="button"
          className={styles.sound}
          aria-pressed={soundEnabled}
          disabled={audioUnavailable}
          onClick={toggleSound}
        >
          Voiceover <span aria-hidden="true">{soundEnabled ? "On" : "Off"}</span>
        </button>
      </div>
      {audioUnavailable && <p className={styles.audioStatus} role="status">Voiceover is unavailable. You can still follow the captions.</p>}

      <div className={styles.filmDetails}>
        <div className={styles.caption} aria-live={playing ? "off" : "polite"} aria-atomic="true">
          <h2>{captionTitle}</h2>
          <p>{caption.text}</p>
        </div>
        <div className={styles.chapters} role="group" aria-label="Scenes">
          {scenes.map((chapter) => (
            <button
              key={chapter.id}
              type="button"
              aria-current={scene.id === chapter.id ? "step" : undefined}
              onClick={() => seek(chapter.cue.startMs + chapter.preview)}
            >
              {chapter.label}
            </button>
          ))}
        </div>
      </div>
      <ReportWalkthrough onSourceOpen={pausePlayback} />
    </div>
  );
}
