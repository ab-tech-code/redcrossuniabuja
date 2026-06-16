// Vite SPA entry point. Mounts the React app into <div id="root"> in index.html.
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* BrowserRouter enables client-side routing for /about, /services, /contact, etc. */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);