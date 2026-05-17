"use client";

import dynamic from "next/dynamic";

const AppRouter = dynamic(() => import("@/routes/AppRouter"), { ssr: false });

export default function AboutPage() {
  return <AppRouter />;
}