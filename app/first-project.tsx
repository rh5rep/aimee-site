"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./first-project.module.css";
import { services } from "./work/services";

const projects = services.flatMap(({ id, title, firstProject }) =>
  firstProject ? [{ id, title, ...firstProject }] : [],
);

export function FirstProject() {
  const [project, setProject] = useState(projects[0]);

  return (
    <section className={`container ${styles.section}`} id="services" aria-labelledby="services-title" tabIndex={-1}>
      <div className={styles.board}>
        <div data-home-reveal="text">
          <h2 id="services-title">What would you <em>bring us?</em></h2>
          <div className={styles.choices} role="group" aria-label="Pick a starting point">
            {projects.map((option) => (
              <button
                key={option.id}
                type="button"
                aria-pressed={option.id === project.id}
                aria-controls="first-project-note"
                onClick={() => setProject(option)}
              >
                <span>{option.choice}</span>
                <span className={styles.arrow} aria-hidden="true">→</span>
              </button>
            ))}
          </div>
        </div>
        <div className={styles.note} id="first-project-note" aria-live="polite" aria-atomic="true" data-home-reveal="panel">
          <div key={project.id} className={styles.noteContent}>
            <p className={styles.type}>Example · {project.title}</p>
            <h3>{project.headline}</h3>
            <dl>
              <div><dt>You bring</dt><dd>{project.bring}</dd></div>
              <div><dt>We try</dt><dd>{project.try}</dd></div>
              <div><dt>Your team gets</dt><dd>{project.takeaway}</dd></div>
            </dl>
          </div>
          <div className={styles.projectActions}>
            <Link className="button" href={{ pathname: "/contact", query: { service: project.id } }}>
              Talk to us about this task
            </Link>
            <Link className="text-link" href={`/work#${project.id}`}>See service details</Link>
          </div>
        </div>
      </div>
      <div className={styles.links}>
        <Link className="text-link" href="/work#examples">Examples from our work</Link>
        <Link className="text-link" href="/work#one-on-one">Looking for one-on-one help?</Link>
      </div>
    </section>
  );
}
