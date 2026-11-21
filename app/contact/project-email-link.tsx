"use client";

import { useSearchParams } from "next/navigation";
import { taskEmail } from "../../components/site-shell";
import { services } from "../work/services";

export function ProjectEmailLink() {
  const serviceId = useSearchParams().get("service");
  const service = services.find(({ id }) => id === serviceId);

  return <a className="button" href={taskEmail(service?.title)}>Write an email</a>;
}
