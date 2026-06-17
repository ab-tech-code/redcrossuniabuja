// /contact page — WhatsApp, phone, email, location. Numbers come from src/lib/club-config.ts.
import { motion } from "framer-motion";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { clubConfig } from "@/lib/club-config";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export default function Contact() {
  useDocumentTitle(
    "Contact — Red Cross Club, University of Abuja",
    "Get in touch with the Red Cross Club, University of Abuja — WhatsApp, phone and location.",
  );

  const waLink = `https://wa.me/${clubConfig.whatsappNumber}`;

  return (
    <section className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Get in touch
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          We'd love to hear from you.
        </h1>
        <p className="mt-5 max-w-2xl text-muted-foreground sm:text-lg">
          Questions about membership, partnerships or our next outreach? Reach
          us through any of the channels below.
        </p>
      </motion.div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        <a
          href={waLink}
          target="_blank"
          rel="noreferrer"
          className="group rounded-2xl border border-border/60 bg-card p-6 shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:border-[color:var(--whatsapp)]/50"
        >
          <div className="grid size-11 place-items-center rounded-xl bg-[color:var(--whatsapp)]/10 text-[color:var(--whatsapp)]">
            <MessageCircle className="size-5" />
          </div>
          <h2 className="mt-5 text-lg font-semibold">WhatsApp</h2>
          <p className="mt-1 text-sm text-muted-foreground">Fastest way to reach a coordinator.</p>
          <p className="mt-3 font-medium text-foreground">{clubConfig.whatsappDisplay}</p>
        </a>

        <a
          href={`tel:${clubConfig.whatsappNumber}`}
          className="group rounded-2xl border border-border/60 bg-card p-6 shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:border-primary/40"
        >
          <div className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
            <Phone className="size-5" />
          </div>
          <h2 className="mt-5 text-lg font-semibold">Call us</h2>
          <p className="mt-1 text-sm text-muted-foreground">For urgent enquiries.</p>
          <p className="mt-3 font-medium text-foreground">{clubConfig.callNumber}</p>
        </a>

        <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-[var(--shadow-card)]">
          <div className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
            <Mail className="size-5" />
          </div>
          <h2 className="mt-5 text-lg font-semibold">Email</h2>
          <p className="mt-1 text-sm text-muted-foreground">Drop us a message any time.</p>
          <p className="mt-3 font-medium text-foreground">
            redcrossuniabuja@gmail.com
          </p>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-[var(--shadow-card)]">
          <div className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
            <MapPin className="size-5" />
          </div>
          <h2 className="mt-5 text-lg font-semibold">Find us</h2>
          <p className="mt-1 text-sm text-muted-foreground">Meetings every other week.</p>
          <p className="mt-3 font-medium text-foreground">
            COVOCATION GROUND,<br />University of Abuja, Main Campus.
          </p>
        </div>
      </div>
    </section>
  );
}