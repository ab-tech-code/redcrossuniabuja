// /services page — list of programmes the club offers.
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Activity,
  Droplet,
  GraduationCap,
  HeartPulse,
  Megaphone,
  Users,
} from "lucide-react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const SERVICES = [
  {
    icon: HeartPulse,
    title: "First Aid Training",
    body: "Hands-on certified first aid sessions for members and the wider student body.",
  },
  {
    icon: Droplet,
    title: "Blood Donation Drives",
    body: "Quarterly campus-wide blood drives in partnership with hospitals and the National Blood Service.",
  },
  {
    icon: Activity,
    title: "Disaster Response",
    body: "Trained volunteer response teams ready to support during emergencies on and off campus.",
  },
  {
    icon: Megaphone,
    title: "Health Awareness",
    body: "Outreach on hygiene, mental health, sexual health, malaria, HIV/AIDS and non-communicable diseases.",
  },
  {
    icon: Users,
    title: "Community Outreach",
    body: "Free medical outreaches and donations to orphanages, IDP camps and rural communities.",
  },
  {
    icon: GraduationCap,
    title: "Leadership & Mentorship",
    body: "Workshops, exec training and mentorship with professionals in the health and humanitarian sector.",
  },
];

export default function Services() {
  useDocumentTitle(
    "Services — Red Cross Club, University of Abuja",
    "First aid training, blood donation drives, disaster response, community outreach and more — services offered by the Red Cross Club at UniAbuja.",
  );

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          What we do
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          Our services & programmes.
        </h1>
        <p className="mt-5 max-w-2xl text-muted-foreground sm:text-lg">
          We exist to train students into capable first responders and to serve
          our community through consistent, organised humanitarian action.
        </p>
      </motion.div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map(({ icon: Icon, title, body }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="group rounded-2xl border border-border/60 bg-card p-6 shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:border-primary/40"
          >
            <div className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
              <Icon className="size-5" />
            </div>
            <h2 className="mt-5 text-lg font-semibold">{title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{body}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-14 flex flex-col items-start justify-between gap-4 rounded-3xl border border-border/60 bg-card p-8 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-bold">Ready to be part of it?</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Join the club and start serving with us this semester.
          </p>
        </div>
        <Link
          to="/"
          className="inline-flex h-11 items-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary-deep px-6 text-sm font-semibold text-primary-foreground shadow-[0_15px_30px_-12px_var(--primary)]"
        >
          Begin Membership
        </Link>
      </div>
    </section>
  );
}