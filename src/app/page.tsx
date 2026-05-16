"use client";

import dynamic from "next/dynamic";

// React Router needs the browser. Disable SSR for the client app shell so
// BrowserRouter never tries to render on the server.
const AppRouter = dynamic(() => import("@/routes/AppRouter"), { ssr: false });

export default function Page() {
  return <AppRouter />;
}
