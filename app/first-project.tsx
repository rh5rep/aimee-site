import Link from "next/link";
import styles from "./first-project.module.css";
import { services } from "./work/services";

export function FirstProject() {
  return (
    <section className={`container ${styles.section}`} id="services" aria-labelledby="services-title">
      <div className={styles.board}>
        <h2 className={styles.columns} id="services-title">
          <span>What you bring</span>
          <span className="sr-only"> and </span>
          <em>How we’d help</em>
        </h2>
        <dl className={styles.projects}>
          {services.map(({ id, firstProject }) => firstProject && (
            <div className={`${styles.columns} ${styles.project}`} key={id}>
              <dt>{firstProject.bring}</dt>
              <dd>
                <p className={styles.format}>{firstProject.format}</p>
                <p>{firstProject.help}</p>
              </dd>
            </div>
          ))}
        </dl>
        <Link className="text-link" href="/work">Explore our services</Link>
      </div>
    </section>
  );
}
