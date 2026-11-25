import Link from "next/link";
import styles from "./first-project.module.css";
import { services } from "./work/services";

const projects = services.flatMap(({ id, firstProject }) =>
  firstProject ? [{ id, ...firstProject }] : [],
);

export function FirstProject() {
  return (
    <section className={`container ${styles.section}`} id="services" aria-labelledby="services-title" tabIndex={-1}>
      <header className={styles.header}>
        <h2 id="services-title" className={styles.heading} tabIndex={-1}>Start with a task.</h2>
        <nav className={styles.index} aria-label="Jump to a service">
          {projects.map(({ id, jumpLabel }) => (
            <a key={id} href={`#service-${id}`}>{jumpLabel}</a>
          ))}
        </nav>
      </header>

      {projects.map(({ id, bring, example, format, help, linkLabel }) => (
        <article
          key={id}
          className={styles.pair}
          id={`service-${id}`}
          aria-labelledby={`service-title-${id}`}
          tabIndex={-1}
        >
          <div className={styles.offerHeading}>
            <p className={styles.label}>We bring</p>
            <h3 id={`service-title-${id}`}>{format}</h3>
          </div>
          <div className={styles.situation}>
            <p className={styles.label}>You bring</p>
            <p className={styles.bring}>{bring}</p>
            <p className={styles.example}>{example}</p>
          </div>
          <div className={styles.offerDetails}>
            <p className={styles.description}>{help}</p>
            <Link className={`text-link ${styles.offerLink}`} href={`/work#${id}`}>{linkLabel}</Link>
          </div>
        </article>
      ))}

      <div className={styles.followUp}>
        <div className={styles.contact}>
          <Link className="button" href="/contact">Tell us about a task</Link>
          <p>A few lines about what you’re working on are enough.</p>
        </div>
        <a className="text-link" href="#services">Back to service choices</a>
      </div>
    </section>
  );
}
