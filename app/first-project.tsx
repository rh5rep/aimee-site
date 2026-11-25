import Link from "next/link";
import { services } from "./work/services";
import styles from "./first-project.module.css";

export function FirstProject() {
  return (
    <section className={`container ${styles.section}`} id="services" aria-labelledby="services-title" tabIndex={-1}>
      <h2 id="services-title" className={styles.heading} tabIndex={-1}>Ways we can help</h2>
      {services.map(({ id, homeTask, homeReply }) => homeTask && (
        <article className={styles.pair} key={id} id={`service-${id}`} aria-labelledby={`service-title-${id}`} data-exchange>
          <h3 id={`service-title-${id}`}>{homeTask}</h3>
          <p>{homeReply}</p>
        </article>
      ))}
      <Link className={`text-link ${styles.details}`} href="/work">Explore our services</Link>
    </section>
  );
}
