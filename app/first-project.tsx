import Link from "next/link";
import { services } from "./work/services";
import styles from "./first-project.module.css";

export function FirstProject() {
  return (
    <section className={`container ${styles.section}`} id="services" aria-labelledby="services-title" tabIndex={-1}>
      <h2 id="services-title" className={styles.heading} tabIndex={-1}>Ways we can help</h2>

      {services.map(({ id, title, homeTask }) => homeTask && (
        <article
          key={id}
          className={styles.pair}
          id={`service-${id}`}
          aria-labelledby={`service-title-${id}`}
          tabIndex={-1}
        >
          <h3 id={`service-title-${id}`}>{homeTask}</h3>
          <div className={styles.links}>
            <Link className="text-link" href={`/work#${id}`}>{title}</Link>
            {id === "workflow-design" && (
              <Link className="text-link" href="/work#implementation">Scoped implementation</Link>
            )}
          </div>
        </article>
      ))}

      <div className={styles.contact}>
        <p>A few lines about the task are enough to start.</p>
        <Link className="button" href="/contact">Tell us about a task</Link>
      </div>
    </section>
  );
}
