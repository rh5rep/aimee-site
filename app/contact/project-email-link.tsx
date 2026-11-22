"use client";

import { useSearchParams } from "next/navigation";
import { email, taskEmail } from "../../components/site-shell";
import { services } from "../work/services";
import styles from "./contact.module.css";

export function ProjectEmailLink() {
  const serviceId = useSearchParams().get("service");
  const service = services.find(({ id }) => id === serviceId);
  const href = taskEmail(service?.title);

  return (
    <>
      {service && <p className={styles.topic}>{service.title}</p>}
      <a className="button" href={href}>Write an email</a>
      <a className="text-link" href={service ? href : `mailto:${email}`}>{email}</a>
    </>
  );
}
