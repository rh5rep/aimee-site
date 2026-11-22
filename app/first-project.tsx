"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import styles from "./first-project.module.css";
import { services } from "./work/services";

const projects = services.flatMap(({ id, firstProject }) =>
  firstProject ? [{ id, ...firstProject }] : [],
);
const discoveryKey = "max-and-rami:discovered-service:";
const revealThreshold = 0.18;

export function FirstProject() {
  const section = useRef<HTMLElement>(null);
  const [introduced, setIntroduced] = useState<string[]>([]);

  useEffect(() => {
    const cards = section.current?.querySelectorAll<HTMLElement>("[data-service]");
    if (!cards || typeof IntersectionObserver === "undefined") return;

    const discovered = new Set<string>();
    let storage: Storage | undefined;
    try {
      storage = window.sessionStorage;
      for (const { id } of projects) {
        if (storage.getItem(discoveryKey + id) === "1") discovered.add(id);
      }
    } catch {
      storage = undefined;
    }

    const observer = new IntersectionObserver((entries) => {
      const newlyIntroduced: string[] = [];
      for (const entry of entries) {
        const id = (entry.target as HTMLElement).dataset.service;
        if (entry.intersectionRatio < revealThreshold || !id || discovered.has(id)) continue;

        observer.unobserve(entry.target);
        discovered.add(id);
        newlyIntroduced.push(id);
        try {
          storage?.setItem(discoveryKey + id, "1");
        } catch {
          storage = undefined;
        }
      }
      if (newlyIntroduced.length) {
        setIntroduced((previous) => [...previous, ...newlyIntroduced]);
      }
    }, { threshold: revealThreshold });

    for (const card of cards) {
      if (!discovered.has(card.dataset.service ?? "")) observer.observe(card);
    }
    return () => observer.disconnect();
  }, []);

  function jumpToService(event: MouseEvent<HTMLAnchorElement>) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const hash = event.currentTarget.hash;
    const card = document.getElementById(hash.slice(1));
    if (!card) return;

    event.preventDefault();
    if (window.location.hash !== hash) window.history.pushState(null, "", hash);
    card.focus({ preventScroll: true });
    card.scrollIntoView({ behavior: "instant", block: "start" });
  }

  return (
    <section className={`container ${styles.section}`} id="services" aria-labelledby="services-title" ref={section} tabIndex={-1}>
      <div className={styles.board}>
        <div className={styles.choices}>
          <h2 id="services-title"><span>What would you</span> bring <em>us?</em></h2>
        </div>
        <nav className={styles.tabs} aria-label="Jump to a service">
          {projects.map(({ id, bring, jumpLabel }) => (
            <a key={id} href={`#service-${id}`} onClick={jumpToService}>
              <span className={styles.tabFull}>{bring}</span>
              <span className={styles.tabShort}>{jumpLabel}</span>
            </a>
          ))}
        </nav>
        <div className={styles.answers}>
          <h2><span>What would <em>we</em></span> bring <em>you?</em></h2>
          <div className={styles.panels}>
            {projects.map(({ id, format, help, takeaway }) => (
              <article
                key={id}
                className={styles.panel}
                id={`service-${id}`}
                aria-labelledby={`service-title-${id}`}
                data-service={id}
                data-introduced={introduced.includes(id) ? "true" : undefined}
                tabIndex={-1}
              >
                <h3 id={`service-title-${id}`}>{format}</h3>
                <p>{help}</p>
                <div className={styles.takeaway}>
                  <p>You take away</p>
                  <p>{takeaway}</p>
                </div>
                <Link className="text-link" href={`/work#${id}`}>Explore this service</Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
