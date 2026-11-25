import Link from "next/link";
import { services } from "./work/services";
import styles from "./first-project.module.css";

export function FirstProject() {
  return (
    <section className={`container ${styles.section}`} id="services" aria-labelledby="services-title" tabIndex={-1}>
      <h2 id="services-title" className={styles.heading} tabIndex={-1} data-home-reveal="exchange">
        <span data-home-reveal-trigger data-home-reveal-finish>Ways we can help</span>
      </h2>
      <span id="start-instructions" hidden>Shows the three exchanges. Scroll or press Escape to stop the walkthrough.</span>
      {services.map(({ id, homeTask, homeReply }) => homeTask && (
        <article className={styles.pair} key={id} id={`service-${id}`} aria-labelledby={`service-title-${id}`} data-home-reveal="exchange">
          <div>
            <div className={styles.turn} data-home-reveal-trigger>
              <p className={styles.label}>You bring</p>
              <h3 id={`service-title-${id}`}>{homeTask}</h3>
            </div>
          </div>
          <div>
            <div className={styles.turn} data-home-reveal-finish>
              <p className={styles.label}>We help</p>
              <p>{homeReply}</p>
            </div>
          </div>
        </article>
      ))}
      <Link className={`text-link ${styles.details}`} href="/work">Explore our services</Link>
    </section>
  );
}
