# Red Cross Club — University of Abuja

A professional, frontend-only membership website for the **Red Cross Club,
University of Abuja**. Visitors browse Home / About / Services / Contact,
fill a multi-step membership form, see bank payment details with a 15-minute
countdown, then submit their filled form together with a screenshot of their
payment receipt to a coordinator on **WhatsApp** for confirmation.

No backend, no database — everything runs in the browser.

---

## Tech stack (and a note about "React + Vite")

Under the hood this project is **React 19 + Vite 7**, built on top of
**TanStack Start** (which is the framework Lovable provisions for every new
project). TanStack Start gives us:

* file-based routing (works exactly like React Router DOM, but type-safe)
* automatic code-splitting
* SSR-ready production builds

Styling uses **Tailwind CSS v4**, which compiles to plain CSS at build time —
so the deployed site only ships traditional CSS, no runtime framework.

If you want to keep extending the site, just add a new file in `src/routes/`
— it becomes a new page automatically.

---

## Pages

| Route        | File                          | Purpose                                              |
| ------------ | ----------------------------- | ---------------------------------------------------- |
| `/`          | `src/routes/index.tsx`        | Home + membership form / payment / WhatsApp submit   |
| `/about`     | `src/routes/about.tsx`        | About the club — mission, values, community          |
| `/services`  | `src/routes/services.tsx`     | Programmes & services we offer                       |
| `/contact`   | `src/routes/contact.tsx`      | Contact channels (WhatsApp, phone, email, location)  |

Navigation between pages uses the shared **`SiteHeader`** component
(`src/components/SiteHeader.tsx`), which includes a desktop nav and a
hamburger **mobile menu** that collapses cleanly on phones and tablets.

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

Anywhere you see `PLACEHOLDER_…` in the project, replace it with your real
value. Other placeholders to look out for:

* `src/routes/contact.tsx` — email address and meeting venue

---

## How the flow works

1. **Landing page (`/`)** — branded intro with a CTA to begin the membership form.
2. **Membership form** — 12 required/optional questions plus a consent checkbox.
   Inputs are validated client-side with Zod.
3. **Payment screen** — your bank name, account number and account name with
   copy-to-clipboard buttons and a live 15-minute countdown timer. The user
   is reminded that **the name on the form must match the name used for the
   bank transfer** so you can verify payment.
4. **Submit screen** — after the user clicks *"Payment Complete — Continue"*,
   the site shows a **"Payment confirmation pending"** message (since you
   haven't actually verified the payment yet). It formats all their answers
   into a single WhatsApp message and opens `wa.me/<your-number>` with the
   message pre-filled. The user attaches their payment receipt screenshot
   and hits send.
5. **No-WhatsApp fallback** — the same number is shown so the user can call
   or SMS a coordinator with the payment confirmation.

Nothing is stored anywhere — every submission goes directly to your WhatsApp.

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
│   ├── SiteHeader.tsx          ← Shared responsive header + mobile menu
│   ├── SiteFooter.tsx          ← Shared footer (links + contact)
│   ├── MembershipApp.tsx       ← Home-page flow: intro → form → payment → submit
│   └── ui/                     ← Reusable UI primitives (Button, Input, etc.)
├── routes/
│   ├── __root.tsx              ← Root layout (wraps every page w/ header+footer)
│   ├── index.tsx               ← Home (renders MembershipApp)
│   ├── about.tsx               ← /about
│   ├── services.tsx            ← /services
│   └── contact.tsx             ← /contact
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