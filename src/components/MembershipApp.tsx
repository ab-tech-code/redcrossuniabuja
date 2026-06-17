import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  Check,
  Copy,
  Heart,
  Phone,
  ShieldCheck,
  Users,
  Activity,
  Clock,
  ArrowLeft,
  MessageCircle,
} from "lucide-react";
import { Toaster, toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { clubConfig } from "@/lib/club-config";
import { cn } from "@/lib/utils";

const schema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name").max(120),
  matricNumber: z.string().trim().min(3, "Enter your matric number").max(30),
  department: z.string().trim().min(2, "Enter your department").max(120),
  level: z.string().min(1, "Select your level"),
  faculty: z.string().trim().min(2, "Enter your faculty").max(120),
  gender: z.string().min(1, "Select your gender"),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number")
    .max(20)
    .regex(/^[0-9+\s-]+$/, "Phone number can only contain digits"),
  email: z.string().trim().email("Enter a valid email").max(160),
  motivation: z
    .string()
    .trim()
    .min(10, "Tell us why in at least 10 characters")
    .max(800),
  volunteerExperience: z.string().trim().max(500).default(""),
  skills: z.string().trim().max(500).default(""),
  availability: z.string().min(1, "Please select your availability"),
  consent: z.literal(true, { message: "You must give consent to continue" }),
});

type FormData = z.output<typeof schema>;
type FormInput = z.input<typeof schema>;

type Stage = "intro" | "form" | "payment" | "submit";

export function MembershipApp() {
  const [stage, setStage] = useState<Stage>("intro");
  const [data, setData] = useState<FormData | null>(null);

  return (
    <div className="relative text-foreground">
      <Toaster position="top-center" richColors />
      <BackgroundOrnaments />

      <main className="relative">
        <AnimatePresence mode="wait">
          {stage === "intro" && (
            <Intro key="intro" onStart={() => setStage("form")} />
          )}
          {stage === "form" && (
            <FormSection
              key="form"
              defaultValues={data ?? undefined}
              onSubmit={(values) => {
                setData(values);
                setStage("payment");
              }}
              onBack={() => setStage("intro")}
            />
          )}
          {stage === "payment" && data && (
            <PaymentSection
              key="payment"
              onConfirm={() => {
                setStage("submit");
              }}
              onBack={() => setStage("form")}
            />
          )}
          {stage === "submit" && data && (
            <SubmitSection
              key="submit"
              data={data}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

/* ---------------- Header / Footer ---------------- */

function CrossLogo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative grid size-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary-deep shadow-[0_8px_20px_-8px_var(--primary)]",
        className,
      )}
    >
      <div className="absolute inset-2 grid place-items-center">
        <div className="absolute h-1.5 w-5 rounded-sm bg-primary-foreground" />
        <div className="absolute h-5 w-1.5 rounded-sm bg-primary-foreground" />
      </div>
    </div>
  );
}

function BackgroundOrnaments() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute -top-40 -right-32 size-[480px] rounded-full bg-primary/15 blur-3xl" />
      <div className="absolute top-1/2 -left-40 size-[420px] rounded-full bg-primary-glow/10 blur-3xl" />
    </div>
  );
}

/* ---------------- Intro ---------------- */

function Intro({ onStart }: { onStart: () => void }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto max-w-6xl px-6 py-16 sm:py-24"
    >
      <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary"
          >
            <Heart className="size-3.5" />
            Serve · Save · Stand With Humanity
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl"
          >
            Become a member of the{" "}
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Red Cross Club
            </span>
            , University of Abuja.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Join a community of students committed to first aid, blood
            donation, disaster response and community outreach. Train with
            us, lead with us, save lives with us.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Button
              size="lg"
              onClick={onStart}
              className="h-12 rounded-full bg-gradient-to-r from-primary to-primary-deep px-7 text-base font-semibold shadow-[0_18px_40px_-12px_var(--primary)] hover:opacity-95"
            >
              Begin Membership Form
              <ArrowRight className="size-4" />
            </Button>
            <a
              href={`https://wa.me/${clubConfig.whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-border bg-card px-6 text-sm font-medium text-foreground transition hover:bg-accent"
            >
              <MessageCircle className="size-4 text-[color:var(--whatsapp)]" />
              Talk to a coordinator
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="mt-10 grid max-w-lg grid-cols-3 gap-4"
          >
            {[
              { icon: Users, label: "500+ active members" },
              { icon: Activity, label: "Monthly trainings" },
              { icon: ShieldCheck, label: "Certified first aid" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="rounded-2xl border border-border/60 bg-card/70 p-3 text-xs text-muted-foreground"
              >
                <Icon className="mb-2 size-4 text-primary" />
                {label}
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative"
        >
          <div className="relative mx-auto aspect-square w-full max-w-md">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-[3rem] border border-primary/20"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent 0deg, var(--primary)/0.0 60deg, transparent 120deg, transparent 360deg)",
              }}
            />
            <div className="absolute inset-6 rounded-[2.5rem] bg-gradient-to-br from-primary via-primary-deep to-[oklch(0.30_0.15_25)] shadow-[0_30px_80px_-20px_var(--primary)]">
              <div className="absolute inset-0 grid place-items-center">
                <motion.div
                  animate={{ scale: [1, 1.06, 1] }}
                  transition={{ duration: 2.4, repeat: Infinity }}
                  className="relative grid size-40 place-items-center"
                >
                  <div className="absolute h-8 w-32 rounded-md bg-primary-foreground shadow-2xl" />
                  <div className="absolute h-32 w-8 rounded-md bg-primary-foreground shadow-2xl" />
                </motion.div>
              </div>
              <div className="absolute inset-x-0 bottom-6 text-center text-xs uppercase tracking-[0.3em] text-primary-foreground/70">
                Est. Service · Unity · Care
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

/* ---------------- Form ---------------- */

const LEVELS = ["100", "200", "300", "400", "500", "600"];
const GENDERS = ["Female", "Male", "Prefer not to say"];
const AVAILABILITY = ["Yes, always", "Yes, mostly", "Sometimes", "Not sure yet"];

function FormSection({
  defaultValues,
  onSubmit,
  onBack,
}: {
  defaultValues?: Partial<FormInput>;
  onSubmit: (data: FormData) => void;
  onBack: () => void;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormInput, unknown, FormData>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as FormInput,
    mode: "onTouched",
  });

  const consent = watch("consent");

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.45 }}
      className="relative mx-auto max-w-3xl px-6 py-14"
    >
      <div className="mb-8 flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> Back
        </button>
        <StepIndicator step={1} />
      </div>

      <h2 className="text-3xl font-bold sm:text-4xl">Membership Form</h2>
      <p className="mt-2 text-muted-foreground">
        Take a few minutes to tell us about you. All fields marked with{" "}
        <span className="text-primary">*</span> are required.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 rounded-3xl border border-border/60 bg-card/80 p-6 shadow-[var(--shadow-card)] backdrop-blur-sm sm:p-8"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Full Name" required error={errors.fullName?.message}>
            <Input placeholder="e.g. Abacha Musa" {...register("fullName")} />
          </Field>
          <Field label="Matric Number" required error={errors.matricNumber?.message}>
            <Input placeholder="e.g. 24/208CSC/007" {...register("matricNumber")} />
          </Field>
          <Field label="Department" required error={errors.department?.message}>
            <Input placeholder="e.g. Computer Science" {...register("department")} />
          </Field>
          <Field label="Faculty" required error={errors.faculty?.message}>
            <Input placeholder="e.g. Science" {...register("faculty")} />
          </Field>
          <Field label="Level" required error={errors.level?.message}>
            <Select onValueChange={(v) => setValue("level", v, { shouldValidate: true })}
              defaultValue={defaultValues?.level}>
              <SelectTrigger><SelectValue placeholder="Select level" /></SelectTrigger>
              <SelectContent>
                {LEVELS.map((l) => (
                  <SelectItem key={l} value={l}>{l} Level</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Gender" required error={errors.gender?.message}>
            <Select onValueChange={(v) => setValue("gender", v, { shouldValidate: true })}
              defaultValue={defaultValues?.gender}>
              <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
              <SelectContent>
                {GENDERS.map((g) => (
                  <SelectItem key={g} value={g}>{g}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field
            label="Phone Number"
            hint="Preferably your WhatsApp number"
            required
            error={errors.phone?.message}
          >
            <Input placeholder="e.g. 08012345678" {...register("phone")} />
          </Field>
          <Field label="Email Address" required error={errors.email?.message}>
            <Input type="email" placeholder="hafeez@gmail.com" {...register("email")} />
          </Field>
        </div>

        <div className="mt-6 space-y-5">
          <Field
            label="Why do you want to join the Red Cross Club?"
            required
            error={errors.motivation?.message}
          >
            <Textarea
              rows={4}
              placeholder="Share your motivation…"
              {...register("motivation")}
            />
          </Field>
          <Field
            label="Have you ever volunteered for a health-related organization or activity?"
            hint="If yes, kindly state the organization or activity. Leave blank if none."
            error={errors.volunteerExperience?.message}
          >
            <Textarea
              rows={3}
              placeholder="e.g. NYSC CDS health awareness, hospital outreach…"
              {...register("volunteerExperience")}
            />
          </Field>
          <Field
            label="Do you have any relevant skills?"
            hint="e.g. public speaking, graphic design, photography, writing, event planning, social media management."
            error={errors.skills?.message}
          >
            <Textarea
              rows={3}
              placeholder="List your skills…"
              {...register("skills")}
            />
          </Field>
          <Field
            label="Will you be available for meetings, trainings and community outreach activities?"
            required
            error={errors.availability?.message}
          >
            <Select onValueChange={(v) => setValue("availability", v, { shouldValidate: true })}
              defaultValue={defaultValues?.availability}>
              <SelectTrigger><SelectValue placeholder="Select your availability" /></SelectTrigger>
              <SelectContent>
                {AVAILABILITY.map((a) => (
                  <SelectItem key={a} value={a}>{a}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </div>

        <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/[0.04] p-5">
          <p className="mb-3 text-sm font-semibold text-foreground">Consent</p>
          <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-foreground">
            <Checkbox
              checked={!!consent}
              onCheckedChange={(v) =>
                setValue("consent", v === true ? true : (false as unknown as true), {
                  shouldValidate: true,
                })
              }
              className="mt-0.5"
            />
            <span>
              I consent to being added to the Red Cross Club communication
              platforms, receiving updates about club activities, and actively
              participating in them.
            </span>
          </label>
          {errors.consent && (
            <p className="mt-2 text-xs text-destructive">{errors.consent.message as string}</p>
          )}
        </div>

        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button type="button" variant="ghost" onClick={onBack}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-11 rounded-full bg-gradient-to-r from-primary to-primary-deep px-7 font-semibold shadow-[0_15px_30px_-12px_var(--primary)]"
          >
            Continue to Payment
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </form>
    </motion.section>
  );
}

function Field({
  label,
  hint,
  required,
  error,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium">
        {label} {required && <span className="text-primary">*</span>}
      </Label>
      {children}
      {hint && !error && <p className="text-xs text-muted-foreground">{hint}</p>}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

function StepIndicator({ step }: { step: 1 | 2 | 3 }) {
  const labels = ["Form", "Payment", "Submit"];
  return (
    <div className="flex items-center gap-2">
      {labels.map((l, i) => {
        const n = (i + 1) as 1 | 2 | 3;
        const active = n === step;
        const done = n < step;
        return (
          <div key={l} className="flex items-center gap-2">
            <div
              className={cn(
                "grid size-6 place-items-center rounded-full text-[11px] font-semibold",
                done && "bg-primary text-primary-foreground",
                active && "bg-foreground text-background",
                !active && !done && "bg-muted text-muted-foreground",
              )}
            >
              {done ? <Check className="size-3" /> : n}
            </div>
            <span
              className={cn(
                "text-xs",
                active ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {l}
            </span>
            {i < labels.length - 1 && <span className="text-muted-foreground">—</span>}
          </div>
        );
      })}
    </div>
  );
}

/* ---------------- Payment ---------------- */

function PaymentSection({
  onConfirm,
  onBack,
}: {
  onConfirm: () => void;
  onBack: () => void;
}) {
  const totalSeconds = clubConfig.paymentWindowMinutes * 60;
  const [remaining, setRemaining] = useState(totalSeconds);

  useEffect(() => {
    if (remaining <= 0) return;
    const id = setInterval(() => setRemaining((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, [remaining]);

  const expired = remaining === 0;
  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");
  const progress = (remaining / totalSeconds) * 100;

  const copy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied`);
    } catch {
      toast.error("Could not copy");
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.45 }}
      className="relative mx-auto max-w-3xl px-6 py-14"
    >
      <div className="mb-8 flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> Back to form
        </button>
        <StepIndicator step={2} />
      </div>

      <h2 className="text-3xl font-bold sm:text-4xl">Almost there — settle the membership fee</h2>
      <p className="mt-2 text-muted-foreground">
        Transfer the fee to the account below. You have{" "}
        <span className="font-semibold text-foreground">
          {clubConfig.paymentWindowMinutes} minutes
        </span>{" "}
        to complete the payment and confirm.
      </p>

      <div className="mt-8 overflow-hidden rounded-3xl border border-border/60 bg-card shadow-[var(--shadow-card)]">
        <div className="relative bg-gradient-to-br from-primary to-primary-deep p-6 text-primary-foreground sm:p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-primary-foreground/70">
                Amount Due
              </p>
              <p className="mt-1 font-display text-4xl font-bold sm:text-5xl">
                ₦{clubConfig.membershipFee.toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-3 py-1 text-xs backdrop-blur">
                <Clock className="size-3.5" />
                {expired ? "Time expired" : `${mm}:${ss}`}
              </div>
              <p className="mt-2 text-[11px] text-primary-foreground/70">
                Payment window
              </p>
            </div>
          </div>
          <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-primary-foreground/15">
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
              className="h-full rounded-full bg-primary-foreground"
            />
          </div>
        </div>

        <div className="grid divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <DetailRow
            label="Bank"
            value={clubConfig.bank.name}
            onCopy={() => copy(clubConfig.bank.name, "Bank name")}
          />
          <DetailRow
            label="Account Number"
            value={clubConfig.bank.accountNumber}
            mono
            onCopy={() => copy(clubConfig.bank.accountNumber, "Account number")}
          />
          <DetailRow
            label="Account Name"
            value={clubConfig.bank.accountName}
            onCopy={() => copy(clubConfig.bank.accountName, "Account name")}
          />
        </div>

        <div className="border-t border-border bg-muted/40 p-5 text-sm text-muted-foreground">
          <p>
            After transferring, click{" "}
            <span className="font-semibold text-foreground">"Payment Complete"</span>{" "}
            below. On the next step you'll send your details and a screenshot of
            your payment receipt to our coordinator on WhatsApp.
          </p>
          <p className="mt-3 rounded-lg border border-primary/20 bg-primary/5 p-3 text-foreground">
            <span className="font-semibold">Important:</span> the name you use
            in this form must match the name used to make the bank transfer.
            This is how we verify your payment.
          </p>
        </div>
      </div>

      {expired && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive"
        >
          The payment window has expired. You can still proceed — just keep your
          payment receipt handy when contacting us.
        </motion.div>
      )}

      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button variant="ghost" onClick={onBack}>Back</Button>
        <Button
          onClick={onConfirm}
          className="h-11 rounded-full bg-gradient-to-r from-primary to-primary-deep px-7 font-semibold shadow-[0_15px_30px_-12px_var(--primary)]"
        >
          <Check className="size-4" /> Payment Complete — Continue
        </Button>
      </div>
    </motion.section>
  );
}

function DetailRow({
  label,
  value,
  mono,
  onCopy,
}: {
  label: string;
  value: string;
  mono?: boolean;
  onCopy: () => void;
}) {
  return (
    <div className="flex items-start justify-between gap-3 p-5">
      <div>
        <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          {label}
        </p>
        <p
          className={cn(
            "mt-1 text-base font-semibold text-foreground",
            mono && "font-mono tracking-wide",
          )}
        >
          {value}
        </p>
      </div>
      <button
        onClick={onCopy}
        className="rounded-md p-1.5 text-muted-foreground transition hover:bg-accent hover:text-foreground"
        aria-label={`Copy ${label}`}
      >
        <Copy className="size-4" />
      </button>
    </div>
  );
}

/* ---------------- Submit / WhatsApp ---------------- */

function buildWhatsAppMessage(data: FormData) {
  const lines = [
    "*RED CROSS CLUB — UNIABUJA*",
    "_New Membership Submission_",
    "",
    `*1. Full Name:* ${data.fullName}`,
    `*2. Matric Number:* ${data.matricNumber}`,
    `*3. Department:* ${data.department}`,
    `*4. Level:* ${data.level}`,
    `*5. Faculty:* ${data.faculty}`,
    `*6. Gender:* ${data.gender}`,
    `*7. Phone (WhatsApp):* ${data.phone}`,
    `*8. Email:* ${data.email}`,
    "",
    `*9. Why I want to join:*`,
    data.motivation,
    "",
    `*10. Volunteer experience:*`,
    data.volunteerExperience?.trim() || "None",
    "",
    `*11. Relevant skills:*`,
    data.skills?.trim() || "None",
    "",
    `*12. Availability:* ${data.availability}`,
    "",
    `*Consent:* ✅ Given`,
    `*Payment:* ⏳ Confirmation Pending — ₦${clubConfig.membershipFee.toLocaleString()}`,
    `_(Name on payment must match the Full Name above.)_`,
    "",
    "_(Please attach your payment receipt to this chat.)_",
  ];
  return lines.join("\n");
}

function SubmitSection({
  data,
}: {
  data: FormData;
}) {
  const message = useMemo(
    () => buildWhatsAppMessage(data),
    [data],
  );
  const waUrl = `https://wa.me/${clubConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;

  const copyMsg = async () => {
    try {
      await navigator.clipboard.writeText(message);
      toast.success("Message copied — paste it on WhatsApp");
    } catch {
      toast.error("Could not copy");
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.45 }}
      className="relative mx-auto max-w-3xl px-6 py-14"
    >
      <div className="mb-8 flex items-center justify-between">
        <div />
        <StepIndicator step={3} />
      </div>

      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 180, damping: 14 }}
        className="mx-auto grid size-16 place-items-center rounded-full bg-primary/10 text-primary"
      >
        <Clock className="size-8" />
      </motion.div>

      <h2 className="mt-6 text-center text-3xl font-bold sm:text-4xl">
        Payment confirmation pending.
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
        We haven't verified your payment yet — that's the next step. Please
        submit your filled form together with a screenshot of your payment
        receipt to our coordinator on WhatsApp so we can confirm and finalize
        your membership.
      </p>
      <p className="mx-auto mt-3 max-w-xl rounded-xl border border-primary/20 bg-primary/5 p-3 text-center text-sm text-foreground">
        <span className="font-semibold">Reminder:</span> the name you used in
        this form must match the name used for the bank transfer. Attach your
        payment receipt before sending.
      </p>

      <div className="mt-8 rounded-3xl border border-border/60 bg-card p-6 shadow-[var(--shadow-card)] sm:p-8">
        <div className="rounded-2xl border border-border/60 bg-muted/40 p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Preview of your submission
          </p>
          <pre className="mt-3 max-h-72 overflow-auto whitespace-pre-wrap text-xs text-foreground/90">
            {message}
          </pre>
        </div>

        <a
          href={waUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full bg-[color:var(--whatsapp)] px-7 py-4 text-base font-semibold text-white shadow-[0_18px_40px_-12px_var(--whatsapp)] transition hover:opacity-95"
        >
          <WhatsAppIcon className="size-5" />
          Submit on WhatsApp
        </a>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-sm">
          <button
            onClick={copyMsg}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-foreground transition hover:bg-accent"
          >
            <Copy className="size-4" /> Copy message
          </button>
        </div>

        <div className="mt-8 rounded-2xl border border-border/60 bg-background p-5">
          <p className="text-sm font-semibold text-foreground">
            Don't have WhatsApp?
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            No problem. You can chat or call us on the same number with your
            payment confirmation:
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <a
              href={`tel:${clubConfig.whatsappNumber}`}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition hover:bg-accent"
            >
              <Phone className="size-4 text-primary" />
              {clubConfig.whatsappDisplay}
            </a>
            <span className="text-xs text-muted-foreground">
              (Also reachable via SMS or call)
            </span>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
    </svg>
  );
}