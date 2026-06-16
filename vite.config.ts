// Plain Vite + React + React Router SPA configuration.
// `npm run build` outputs a static site to `dist/` (including dist/index.html)
// which you can upload to ANY static host (Netlify, Vercel static,
// GitHub Pages, Hostinger, cPanel, etc.).
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  server: { host: true, port: 8080 },
  preview: { host: true, port: 8080 },
});