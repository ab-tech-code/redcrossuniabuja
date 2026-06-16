# Convert to plain Vite + React + React Router SPA

Goal: `npm run build` produces `dist/index.html` + `dist/assets/...` that you can drag-and-drop to any static host (Netlify, Vercel static, GitHub Pages, cPanel, Hostinger, etc).

## What changes

### 1. Remove TanStack Start
- Uninstall: `@tanstack/react-start`, `@tanstack/react-router`, `@tanstack/router-plugin`, `@tanstack/react-router-devtools`, related start packages.
- Install: `react-router-dom@6`.

### 2. Replace bootstrap files
- **Add** `index.html` at project root (Vite SPA entry, loads `/src/main.tsx`).
- **Add** `src/main.tsx` — `ReactDOM.createRoot(...).render(<RouterProvider router={router} />)`.
- **Add** `src/App.tsx` — wraps `<BrowserRouter>` + `<Routes>` with all pages and shared `<SiteHeader/> <Outlet/> <SiteFooter/>` layout.
- **Delete** `src/router.tsx`, `src/start.ts`, `src/server.ts`, `src/routeTree.gen.ts`, entire `src/routes/` folder, `src/lib/api/`, `src/lib/config.server.ts`, `src/lib/error-page.ts`, `src/lib/error-capture.ts`, `src/lib/lovable-error-reporting.ts` (or trim to what's still needed).

### 3. Move page bodies to plain components
- `src/pages/Home.tsx` ← from `src/routes/index.tsx`
- `src/pages/About.tsx` ← from `src/routes/about.tsx`
- `src/pages/Services.tsx` ← from `src/routes/services.tsx`
- `src/pages/Contact.tsx` ← from `src/routes/contact.tsx`
- `src/pages/NotFound.tsx` (new, 404 fallback)
- Strip out all `createFileRoute(...)` / `head()` wrappers — keep just the JSX.

### 4. Update navigation in shared chrome
- `SiteHeader.tsx`: replace `@tanstack/react-router` `<Link to>` with `react-router-dom` `<NavLink to>` / `<Link to>`.
- `SiteFooter.tsx`: same swap if it links anywhere.
- `MembershipApp.tsx`: no router changes needed (it's a form).

### 5. Rewrite `vite.config.ts`
- Drop `@tanstack/router-plugin` and TanStack Start plugin.
- Keep React plugin + Tailwind v4 Vite plugin + `@` alias.
- Standard SPA config — outputs to `dist/`.

### 6. Update `package.json` scripts
- `dev`: `vite`
- `build`: `vite build`
- `preview`: `vite preview`
- Remove start-specific scripts.

### 7. SEO per page
- Add small `useDocumentTitle(title, description)` hook so each page sets its own `<title>` and meta description on mount (replaces TanStack `head()`).

### 8. Update `README.md`
- Note new stack (Vite + React + React Router).
- `npm install` → `npm run dev` → `npm run build` produces `dist/` with `index.html` ready to upload anywhere.
- For SPA hosts: add `_redirects` (Netlify) or `vercel.json` rewrite so deep links like `/about` don't 404 on refresh — include both snippets in README.
- Keep all placeholder-customization instructions (WhatsApp number, account number, etc.) — same as before.

## File map after refactor

```
index.html                  ← NEW, Vite entry
vite.config.ts              ← simplified
package.json                ← scripts + deps updated
src/
  main.tsx                  ← NEW
  App.tsx                   ← NEW, routes table
  hooks/useDocumentTitle.ts ← NEW
  pages/
    Home.tsx
    About.tsx
    Services.tsx
    Contact.tsx
    NotFound.tsx
  components/
    MembershipApp.tsx       ← minor: no router imports needed
    SiteHeader.tsx          ← updated imports
    SiteFooter.tsx          ← updated imports
    ui/*                    ← unchanged
  lib/
    club-config.ts          ← unchanged
    utils.ts                ← unchanged
  styles.css                ← unchanged (Tailwind v4)
public/
  _redirects                ← NEW (Netlify SPA fallback)
README.md                   ← updated
```

## Result

After `npm install && npm run build` you get a clean `dist/` folder:
```
dist/
  index.html
  assets/
    index-[hash].js
    index-[hash].css
```
Upload `dist/` to any static host. Done.

## Caveats

- This removes any SSR — fine for this site (it's a form + info pages).
- Lovable Cloud / server functions: not used by this project, so nothing lost.
- The Lovable in-editor preview will still work — Vite dev server runs the same way.

Approve and I'll execute all of this in one pass.
