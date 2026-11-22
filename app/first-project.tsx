import Link from "next/link";
import styles from "./first-project.module.css";
import { services } from "./work/services";

const projects = services.flatMap(({ id, firstProject }) =>
  firstProject ? [{ id, ...firstProject }] : [],
);

export function FirstProject() {
  return (
    <section className={`container ${styles.section}`} id="services" aria-labelledby="services-title" tabIndex={-1}>
      <p className={styles.bridge}>
        You might be wondering <a href="#services-title" data-home-service-start aria-describedby="start-instructions">where to start</a>.
      </p>
      <span id="start-instructions" hidden>Opens the service questions. With motion enabled, it walks through all three services. Scroll or press Escape to stop.</span>
      <nav className={styles.index} aria-label="Jump to a service">
        {projects.map(({ id, jumpLabel }) => (
          <a key={id} href={`#service-${id}`}>{jumpLabel}</a>
        ))}
      </nav>

      <div>
        <h2 id="services-title" className={styles.questions} data-home-reveal="exchange" tabIndex={-1}>
          <span>
            <span className={styles.turn} data-home-reveal-trigger>What could you <em>bring?</em></span>
          </span>{" "}
          <span>
            <span className={styles.turn} data-home-reveal-finish>How could we <em>help?</em></span>
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
                <div className={styles.offerLinks}>
                  <Link className="text-link" href={`/work#${id}`}>{linkLabel}</Link>
                  {id === "workflow-design" && (
                    <Link className="text-link" href="/work#implementation">Implementation</Link>
                  )}
                </div>
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
