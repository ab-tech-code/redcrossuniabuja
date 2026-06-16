// Shared site header with desktop nav + mobile hamburger menu.
// Rendered once in src/App.tsx and shows on every page.
import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-30 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <CrossLogo />
          <div className="min-w-0 leading-tight">
            <p className="truncate text-sm font-semibold text-foreground">Red Cross Club</p>
            <p className="truncate text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              University of Abuja
            </p>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition",
                  isActive
                    ? "bg-accent text-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
          <span className="ml-3 hidden items-center gap-2 rounded-full border border-border/60 bg-card/60 px-3 py-1.5 text-xs text-muted-foreground lg:inline-flex">
            <Sparkles className="size-3.5 text-primary" />
            2025/2026 Membership Drive
          </span>
        </nav>

        {/* Mobile hamburger button */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="grid size-10 shrink-0 place-items-center rounded-full border border-border bg-card text-foreground transition hover:bg-accent md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile dropdown — collapses when a link is tapped */}
      <div
        className={cn(
          "overflow-hidden border-t border-border/50 bg-background/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 md:hidden",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="mx-auto flex max-w-6xl flex-col px-4 py-3">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                cn(
                  "rounded-lg px-3 py-3 text-base font-medium transition",
                  isActive
                    ? "bg-accent text-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

function CrossLogo() {
  return (
    <div className="relative grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary-deep shadow-[0_8px_20px_-8px_var(--primary)]">
      <div className="absolute inset-2 grid place-items-center">
        <div className="absolute h-1.5 w-5 rounded-sm bg-primary-foreground" />
        <div className="absolute h-5 w-1.5 rounded-sm bg-primary-foreground" />
      </div>
    </div>
  );
}