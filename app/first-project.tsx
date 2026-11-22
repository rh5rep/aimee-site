import Link from "next/link";
import styles from "./first-project.module.css";
import { services } from "./work/services";

const projects = services.flatMap(({ id, firstProject }) =>
  firstProject ? [{ id, ...firstProject }] : [],
);

export function FirstProject() {
  return (
    <section className={`container ${styles.section}`} id="services" aria-labelledby="services-title" tabIndex={-1}>
      <h2 id="services-title" className={styles.questions}>
        <span>What would you <em>bring us?</em></span>{" "}
        <span>What would we <em>bring you?</em></span>
      </h2>

      <nav className={styles.index} aria-label="Jump to a service">
        <span>Jump to</span>
        {projects.map(({ id, jumpLabel }) => (
          <a key={id} href={`#service-${id}`}>{jumpLabel}</a>
        ))}
      </nav>

      {projects.map(({ id, bring, example, format, help, takeaway, linkLabel }) => (
        <article
          key={id}
          className={styles.pair}
          id={`service-${id}`}
          aria-labelledby={`service-title-${id}`}
          tabIndex={-1}
        >
          <div className={styles.situation}>
            <p className={styles.bring}>{bring}</p>
            <p>{example}</p>
          </div>
          <div className={styles.offer}>
            <h3 id={`service-title-${id}`}>{format}</h3>
            <p>{help}</p>
            <p className={styles.takeaway}><strong>You leave with</strong> {takeaway}</p>
            <Link className="text-link" href={`/work#${id}`}>{linkLabel}</Link>
          </div>
        </article>
      ))}

      <div className={styles.return}>
        <a className="text-link" href="#services">Back to service choices</a>
      </div>
    </section>
  );
}
