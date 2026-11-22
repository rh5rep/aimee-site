import Link from "next/link";
import styles from "./first-project.module.css";
import { services } from "./work/services";

const projects = services.flatMap(({ id, firstProject }) =>
  firstProject ? [{ id, ...firstProject }] : [],
);

export function FirstProject() {
  return (
    <section className={`container ${styles.section}`} id="services" aria-labelledby="services-title" tabIndex={-1}>
      <nav className={styles.index} aria-label="Jump to a service">
        {projects.map(({ id, jumpLabel }) => (
          <a key={id} href={`#service-${id}`}>{jumpLabel}</a>
        ))}
      </nav>

      <div className={styles.board}>
        <h2 id="services-title" className={styles.questions} data-home-reveal="exchange">
          <span>
            <span className={styles.turn} data-home-reveal-trigger>What would you <em>bring us?</em></span>
          </span>{" "}
          <span>
            <span className={styles.turn} data-home-reveal-finish>What would we <em>bring you?</em></span>
          </span>
        </h2>

        {projects.map(({ id, bring, example, format, help, linkLabel }) => (
          <article
            key={id}
            className={styles.pair}
            id={`service-${id}`}
            aria-labelledby={`service-title-${id}`}
            tabIndex={-1}
            data-home-reveal="exchange"
          >
            <div className={styles.situation}>
              <div className={styles.turn}>
                <p className={styles.label}>You bring</p>
                <p className={styles.bring}>{bring}</p>
                <p className={styles.description}>
                  <span className={styles.revealPoint} data-home-reveal-trigger aria-hidden="true" />
                  {example}
                </p>
              </div>
            </div>
            <div className={styles.offer}>
              <div className={styles.turn} data-home-reveal-finish>
                <p className={styles.label}>We bring</p>
                <h3 id={`service-title-${id}`}>{format}</h3>
                <p className={styles.description}>{help}</p>
                <Link className="text-link" href={`/work#${id}`}>{linkLabel}</Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className={styles.return}>
        <a className="text-link" href="#services">Back to service choices</a>
      </div>
    </section>
  );
}
