import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Heart, ShieldCheck, Users } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Red Cross Club, University of Abuja" },
      {
        name: "description",
        content:
          "Learn about the Red Cross Club at the University of Abuja — our mission, values and history of humanitarian service.",
      },
      { property: "og:title", content: "About the Red Cross Club" },
      {
        property: "og:description",
        content:
          "Our mission, values and the students behind the Red Cross Club at University of Abuja.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          About us
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          A student movement built on service.
        </h1>
        <p className="mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
          The Red Cross Club, University of Abuja, is a chapter of the global
          Red Cross movement — a student-led community committed to first aid,
          blood donation, disaster response, public health awareness and
          community outreach across our campus and beyond.
        </p>
      </motion.div>

      <div className="mt-12 grid gap-5 sm:grid-cols-3">
        {[
          {
            icon: Heart,
            title: "Our mission",
            body: "Empower students to act as first responders and humanitarian leaders within and beyond the university.",
          },
          {
            icon: ShieldCheck,
            title: "Our values",
            body: "Humanity, impartiality, neutrality, independence, voluntary service, unity and universality.",
          },
          {
            icon: Users,
            title: "Our community",
            body: "Hundreds of active student volunteers across faculties, trained and ready to serve.",
          },
        ].map(({ icon: Icon, title, body }) => (
          <div
            key={title}
            className="rounded-2xl border border-border/60 bg-card p-6 shadow-[var(--shadow-card)]"
          >
            <Icon className="size-6 text-primary" />
            <h2 className="mt-4 text-lg font-semibold">{title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{body}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 rounded-3xl border border-border/60 bg-gradient-to-br from-primary/5 to-transparent p-8">
        <h2 className="text-2xl font-bold">Why join us?</h2>
        <p className="mt-3 text-muted-foreground">
          Members get certified first aid training, leadership opportunities,
          access to community outreach programmes, a network of mentors across
          the health sector, and the chance to make a tangible difference in
          people's lives — every single semester.
        </p>
      </div>
    </section>
  );
}