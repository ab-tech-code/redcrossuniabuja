# Red Cross Club — University of Abuja

A membership website for the **Red Cross Club, University of Abuja**.
Built with **Vite + React + React Router** as a plain static SPA — the
production build is just an `index.html` + `assets/` folder you can upload
to **any** static host (Netlify, Vercel, GitHub Pages, Hostinger, cPanel,
Cloudflare Pages, etc.).

---

## 1. Quick start (local development)

You need **Node.js 20+** installed. Then in this folder:

```bash
npm install        # install dependencies (one-time)
npm run dev        # start dev server at http://localhost:8080
```

> You can also use `bun install` / `bun run dev` if you prefer Bun.

## 2. Production build

```bash
npm run build
```

Creates a `dist/` folder:

```
dist/
  index.html
  assets/
    index-[hash].js
    index-[hash].css
```

Upload the **contents of `dist/`** to your hosting provider. That's it.

Preview the production build locally:

```bash
npm run preview
```

## 3. Hosting / SPA fallback (IMPORTANT)

This is a Single Page App, so the server must serve `index.html` for any
unknown URL — otherwise refreshing `/about` will return 404.

- **Netlify / Cloudflare Pages**: handled by `public/_redirects` (already included).
- **Vercel (static)** — add `vercel.json` at project root:
  ```json
  { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
  ```
- **Apache / cPanel / Hostinger** — add `.htaccess` inside the uploaded folder:
  ```
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
  ```
- **Nginx** — `try_files $uri /index.html;` in your `location /` block.
- **GitHub Pages** — copy `dist/index.html` to `dist/404.html` before uploading.

---

## 4. What you need to change (placeholders)

All editable values live in **`src/lib/club-config.ts`**. Open it and
replace each `PLACEHOLDER_...` value:

| Field | What to put |
|---|---|
| `whatsappNumber` | Coordinator WhatsApp number, international format **without `+`** (e.g. `2348012345678`). |
| `whatsappDisplay` | Same number formatted nicely (e.g. `+234 801 234 5678`). |
| `callNumber` | Phone number for "Call us". |
| `membershipFee` | Fee amount as a number (e.g. `2000`). |
| `bank.name` | Bank name (e.g. `Access Bank`). |
| `bank.accountName` | Account holder name. |
| `bank.accountNumber` | Account number. |

Other text-only placeholders (search the codebase for `PLACEHOLDER`):
- `src/pages/Contact.tsx` — email address and meeting venue.

---

## 5. How the site works (user flow)

1. Visitor opens **`/`** (Home), sees the hero, clicks **Begin Membership Form**.
2. Fills the **membership form**.
3. Sees the **Payment** screen with bank details to copy. They transfer
   the fee using **the exact name they entered on the form**.
4. Clicks **"I have paid"** → the site shows **"Payment Pending Confirmation"**
   (the club still needs to manually verify the transfer).
5. Clicks **"Submit on WhatsApp"** → opens WhatsApp with a pre-filled
   message containing all their details. They can attach the payment
   receipt before sending.
6. A coordinator confirms the payment and welcomes the new member.

Other pages:
- **`/about`** — mission, values, community.
- **`/services`** — programmes the club runs.
- **`/contact`** — WhatsApp / phone / email / location.

---

## 6. Project structure

```
index.html                  Vite entry — loads /src/main.tsx
vite.config.ts              Vite + React + Tailwind config
package.json
public/
  _redirects                SPA fallback for Netlify-style hosts
src/
  main.tsx                  React + BrowserRouter bootstrap
  App.tsx                   Shared header/footer + routes table
  styles.css                Tailwind v4 + design tokens (colors, fonts)
  hooks/
    useDocumentTitle.ts     Per-page <title> + meta description
  pages/
    Home.tsx                /          (membership flow)
    About.tsx               /about
    Services.tsx            /services
    Contact.tsx             /contact
    NotFound.tsx            404 catch-all
  components/
    MembershipApp.tsx       Intro → form → payment → submit flow
    SiteHeader.tsx          Top nav (desktop + mobile hamburger)
    SiteFooter.tsx          Bottom footer
    ui/                     Reusable UI primitives (buttons, inputs…)
  lib/
    club-config.ts          ← EDIT THIS for bank details + phone numbers
    utils.ts
```

---

## 7. Adding a new page

1. Create the component under `src/pages/`, e.g. `src/pages/Events.tsx`:
   ```tsx
   import { useDocumentTitle } from "@/hooks/useDocumentTitle";
   export default function Events() {
     useDocumentTitle("Events — Red Cross Club", "Upcoming club events.");
     return (
       <section className="mx-auto max-w-5xl px-6 py-16">
         <h1>Events</h1>
       </section>
     );
   }
   ```
2. Register the route in `src/App.tsx`:
   ```tsx
   <Route path="/events" element={<Events />} />
   ```
3. (Optional) Add a link in `src/components/SiteHeader.tsx` and `SiteFooter.tsx`.

---

## 8. Tech stack

- **React 19** + **Vite 8** + **TypeScript**
- **React Router DOM v6** — client-side routing
- **Tailwind CSS v4** — utility-first styling
- **react-hook-form** + **zod** — form + validation
- **framer-motion** — animations
- **lucide-react** — icons
- **sonner** — toast notifications

---

## 9. Available scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server with hot reload (http://localhost:8080). |
| `npm run build` | Production build to `dist/`. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | ESLint. |
| `npm run format` | Prettier. |

Happy serving 🩺❤️