import { Link } from "@tanstack/react-router";
import { clubConfig } from "@/lib/club-config";

/**
 * Shared site footer. Rendered once in src/routes/__root.tsx.
 */
export function SiteFooter() {
  return (
    <footer className="relative z-10 mt-16 border-t border-border/50 bg-background/60">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 sm:grid-cols-3">
        <div>
          <p className="text-sm font-semibold text-foreground">Red Cross Club</p>
          <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            University of Abuja
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Humanity · Impartiality · Neutrality
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-foreground">
            Explore
          </p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-foreground">Home</Link></li>
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
            <li><Link to="/services" className="hover:text-foreground">Services</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-foreground">
            Contact
          </p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>WhatsApp: {clubConfig.whatsappDisplay}</li>
            <li>Call: {clubConfig.callNumber}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/50 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Red Cross Club — University of Abuja.
      </div>
    </footer>
  );
}