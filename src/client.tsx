import { StrictMode, startTransition } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";

import { getRouter } from "./router";

async function startApp() {
  const router = getRouter();

  // Load initial route state before first paint in pure SPA static hosting.
  await router.load();

  const container = document.getElementById("root");
  startTransition(() => {
    const app = (
      <StrictMode>
        <RouterProvider router={router} />
      </StrictMode>
    );

    // Support both static SPA entry (<div id="root"/>) and full-document SSR hydration.
    if (container) {
      createRoot(container).render(app);
    } else {
      hydrateRoot(document, app);
    }
  });
}

void startApp();
