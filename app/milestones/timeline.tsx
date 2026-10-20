"use client";

import { useState } from "react";
import { milestones } from "./data";
import styles from "./milestones.module.css";

function displayDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric", timeZone: "UTC",
  });
}

const lastReached = milestones.findIndex((milestone) => !milestone.reachedOn);
const confirmedSteps = lastReached === -1 ? milestones.length : lastReached;
const provisionalEnd = milestones[0].reportedOn && !milestones[0].reachedOn ? 1 : 0;

export function MilestoneTimeline() {
  const [selected, setSelected] = useState(2);
  const milestone = selected > 0 ? milestones[selected - 1] : null;
  const selectedStatus = milestone?.reachedOn
    ? "Reached"
    : milestone?.status === "reported"
      ? "Provisionally reached"
      : milestone?.status === "next"
        ? "Current focus"
        : "Further ahead";

  return (
    <section className={styles.timeline} aria-label="AImee milestone timeline">
      <div className={styles.timelineHeader}>
        <div>
          <p className={styles.eyebrow}>MILESTONE TRAIL</p>
          <h2>See how far we&apos;ve come.</h2>
        </div>
        <p>Slide to explore. The solid line fills only when a milestone has a confirmed completion date; the first marker is provisional.</p>
      </div>

      <div className={styles.trackArea}>
        <div className={styles.track} aria-hidden="true">
          <div className={styles.solidFill} style={{ width: `${confirmedSteps / 3 * 100}%` }} />
          <div className={styles.provisionalFill} style={{ left: `${confirmedSteps / 3 * 100}%`, width: `${Math.max(0, provisionalEnd - confirmedSteps) / 3 * 100}%` }} />
          {[0, 1, 2, 3].map((point) => <span key={point} className={`${styles.trackPoint} ${point === selected ? styles.trackPointSelected : ""} ${point > 0 && point <= confirmedSteps ? styles.trackPointReached : ""} ${point === provisionalEnd && point > confirmedSteps ? styles.trackPointProvisional : ""}`} style={{ left: `${point / 3 * 100}%` }} />)}
        </div>
        <input
          className={styles.slider}
          type="range"
          min="0"
          max="3"
          step="1"
          value={selected}
          onChange={(event) => setSelected(Number(event.target.value))}
          aria-label="Explore AImee milestones"
          aria-valuetext={selected === 0 ? "Starting point" : `Milestone ${selected}: ${milestones[selected - 1].shortTitle}`}
        />
        <div className={styles.trackLabels} aria-hidden="true">
          <span>START</span>
          {milestones.map((item) => <span key={item.number}>{item.number}<small>{item.shortTitle}</small></span>)}
        </div>
      </div>

      <div className={styles.detail} aria-live="polite">
        {milestone ? (
          <>
            <div className={styles.detailLead}>
              <span className={styles.detailNumber}>{milestone.number}<small> / 03</small></span>
              <span className={styles.status}>{selectedStatus}</span>
            </div>
            <div className={styles.detailMain}>
              <div><h3>{milestone.title}</h3><p>{milestone.measure}</p></div>
              <div className={styles.dateBox}>
                <span>{milestone.reachedOn ? "DATE REACHED" : milestone.reportedOn ? "REPORTED" : "DATE REACHED"}</span>
                <strong>{milestone.reachedOn ? displayDate(milestone.reachedOn) : milestone.reportedOn ? displayDate(milestone.reportedOn) : "To come"}</strong>
                {milestone.reportedOn && !milestone.reachedOn && <small>Completion date to confirm</small>}
              </div>
            </div>
            <p className={styles.detailNote}>{milestone.note}</p>
          </>
        ) : (
          <>
            <div className={styles.detailLead}><span className={styles.detailNumber}>00<small> / 03</small></span><span className={styles.status}>Starting point</span></div>
            <div className={styles.detailMain}><div><h3>Start with the work.</h3><p>Useful AI starts with a real task and the people who know it.</p></div><div className={styles.dateBox}><span>THE IDEA</span><strong>One task at a time</strong></div></div>
            <p className={styles.detailNote}>The path is still being shaped by conversations and practical work.</p>
          </>
        )}
      </div>

      <div className={styles.legend}>
        <span><i className={styles.legendProvisional} /> Reported, date to confirm</span>
        <span><i className={styles.legendReached} /> Confirmed and dated</span>
        <span><i className={styles.legendFuture} /> Ahead</span>
      </div>
    </section>
  );
}
