"use client";

import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-16 text-center">
      <h2 className="text-3xl font-semibold text-slate-900">Page not found</h2>
      <p className="max-w-md text-sm text-slate-600">
        The page you were looking for doesn&apos;t exist in this app.
      </p>
      <Link
        to="/"
        className="rounded-md bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark"
      >
        Back to search
      </Link>
    </section>
  );
}
