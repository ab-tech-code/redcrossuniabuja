# Red Cross Club — University of Abuja

A professional, frontend-only membership website for the **Red Cross Club, University of Abuja**.
Members fill a multi-step form, are shown bank payment details with a 15-minute countdown,
then submit their completed form (plus proof of payment) to a coordinator on **WhatsApp**.

No backend, no database — everything runs in the browser.

---

## What you MUST edit before going live

All of your real-world details live in a single file:

**`src/lib/club-config.ts`**

| Field                  | What it is                                                                 |
| ---------------------- | -------------------------------------------------------------------------- |
| `whatsappNumber`       | Coordinator's WhatsApp number in **international digits only** (no `+`, no spaces). Example for Nigeria: `2348012345678`. This is what powers the WhatsApp deep link. |
| `whatsappDisplay`      | A human-readable version shown on the page (e.g. `+234 801 234 5678`).     |
| `membershipFee`        | The membership fee in Naira (just the number, no commas).                  |
| `bank.name`            | The bank where you receive payments (e.g. `Access Bank`).                  |
| `bank.accountName`     | The account holder name.                                                   |
| `bank.accountNumber`   | The 10-digit account number.                                               |
| `paymentWindowMinutes` | How long the countdown gives the user to pay (default `15`).               |
| `callNumber`           | Optional alternative phone number for calls/SMS.                           |

Anywhere you see `PLACEHOLDER_…` in that file, replace it with your real value.

---

## How the flow works

1. **Landing page** — branded intro with a CTA to begin the membership form.
2. **Membership form** — collects all 12 questions (full name, matric number, department, level, faculty, gender, phone, email, motivation, volunteer experience, skills, availability) and a required consent checkbox. Inputs are validated client-side with Zod.
3. **Payment screen** — shows your bank name, account number and account name with copy-to-clipboard buttons and a live 15-minute countdown timer.
4. **Submit screen** — when the user clicks *"I've Paid — Continue"*, all their answers are formatted into a single WhatsApp message and a **green WhatsApp button** opens `wa.me/<your-number>` with the message pre-filled. The user just attaches their payment receipt and hits send.
5. **No WhatsApp fallback** — the same number is shown so the user can call/SMS a coordinator with their payment confirmation.

Nothing is stored anywhere — the entire submission goes directly to your WhatsApp.

---

## Running locally

### Prerequisites

You need **one** of these JavaScript runtimes installed on your machine:

- [Bun](https://bun.sh) (recommended — this project ships a `bun.lock`)
- or [Node.js 20+](https://nodejs.org) with npm/pnpm/yarn

### Install dependencies

```bash
# with bun (recommended)
bun install

# or with npm
npm install
```

All required packages are already listed in `package.json`. The key ones are:

- `@tanstack/react-start`, `@tanstack/react-router` — app framework + routing
- `react`, `react-dom` — UI
- `tailwindcss` v4, `@tailwindcss/vite` — styling
- `framer-motion` — animations
- `react-hook-form`, `zod`, `@hookform/resolvers` — form + validation
- `lucide-react` — icons
- `sonner` — toast notifications
- shadcn-style UI primitives (already inside `src/components/ui/`)

You don't need to install them one by one — `bun install` / `npm install` handles everything.

### Start the dev server

```bash
bun run dev
# or
npm run dev
```

Open the URL printed in your terminal (usually <http://localhost:5173> or <http://localhost:8080>).

### Build for production

```bash
bun run build
# or
npm run build
```

The output goes into the standard build folder and can be deployed to any static host (Vercel, Netlify, Cloudflare Pages, GitHub Pages, etc.). Since the app is frontend-only, no server configuration is required.

---

## Project structure (the important bits)

```
src/
├── lib/
│   └── club-config.ts          ← EDIT THIS with your real WhatsApp + bank details
├── components/
│   ├── MembershipApp.tsx       ← All the screens (intro, form, payment, submit)
│   └── ui/                     ← Reusable UI primitives (Button, Input, etc.)
├── routes/
│   ├── __root.tsx              ← Root layout, fonts, meta tags
│   └── index.tsx               ← Home page (renders MembershipApp)
└── styles.css                  ← Design tokens (colors, fonts)
```

---

## Customizing further

- **Brand colors** — edit the `--primary`, `--primary-glow`, `--primary-deep` tokens in `src/styles.css`.
- **Form questions** — add/remove fields in `src/components/MembershipApp.tsx` (look for the `schema` and the `FormSection` component). Remember to also update `buildWhatsAppMessage` so the new fields appear in the WhatsApp message.
- **Membership fee amount** — change `membershipFee` in `src/lib/club-config.ts`.
- **Payment window** — change `paymentWindowMinutes` in the same file.
- **Page title / description / SEO** — edit the `head()` block in `src/routes/index.tsx` and `src/routes/__root.tsx`.

---

## Security note

Because the app is frontend-only:

- All form data stays in the user's browser until they hit the WhatsApp button.
- The bank details are visible in the page source — that's fine because they're meant to be public.
- **Never** put any secret key, API token, or admin password into `src/lib/club-config.ts` — anything in this file ships to the browser.

---

Built with ❤ for the Red Cross Club, University of Abuja.