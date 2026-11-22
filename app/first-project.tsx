"use client";

import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";
import styles from "./first-project.module.css";
import { services } from "./work/services";

const projects = services.flatMap(({ id, firstProject }) =>
  firstProject ? [{ id, ...firstProject }] : [],
);

export function FirstProject() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function handleTabKey(event: KeyboardEvent<HTMLButtonElement>) {
    let next: number;

    switch (event.key) {
      case "ArrowUp": next = (activeIndex - 1 + projects.length) % projects.length; break;
      case "ArrowDown": next = (activeIndex + 1) % projects.length; break;
      case "Home": next = 0; break;
      case "End": next = projects.length - 1; break;
      default: return;
    }

    event.preventDefault();
    setActiveIndex(next);
    tabs.current[next]?.focus();
  }

  return (
    <section className={`container ${styles.section}`} id="services" aria-labelledby="services-title" tabIndex={-1}>
      <div className={styles.board}>
        <div className={styles.choices}>
          <h2 id="services-title"><span>What would you</span> bring <em>us?</em></h2>
          <div className={styles.tabs} role="tablist" aria-orientation="vertical" aria-labelledby="services-title">
            {projects.map(({ id, bring }, index) => (
              <button
                key={id}
                ref={(button) => { tabs.current[index] = button; }}
                type="button"
                role="tab"
                id={`project-tab-${id}`}
                aria-controls={`project-panel-${id}`}
                aria-selected={activeIndex === index}
                tabIndex={activeIndex === index ? 0 : -1}
                onClick={() => setActiveIndex(index)}
                onKeyDown={handleTabKey}
              >
                <span>{bring}</span>
              </button>
            ))}
          </div>
        </div>
        <div className={styles.answers}>
          <h2><span>What would <em>we</em></span> bring <em>you?</em></h2>
          {projects.map(({ id, format, help, takeaway }, index) => (
            <div
              key={id}
              className={styles.panel}
              role="tabpanel"
              id={`project-panel-${id}`}
              aria-labelledby={`project-tab-${id}`}
              tabIndex={0}
              hidden={activeIndex !== index}
            >
              <div className={styles.response}>
                <h3>{format}</h3>
                <p>{help}</p>
                <div className={styles.takeaway}>
                  <p>You take away</p>
                  <p>{takeaway}</p>
                </div>
                <Link className="text-link" href={`/work#${id}`}>Explore this service</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
