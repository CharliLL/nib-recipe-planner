"use client";

export default function AboutPage() {
  return (
    <article className="prose prose-slate max-w-none space-y-6 text-slate-800">
      <header className="space-y-2">
        <h2 className="text-2xl font-semibold text-slate-900">About this project</h2>
        <p className="text-sm text-slate-600">
          A Recipe Search &amp; Meal Planner built as a take-home tech challenge for the nib
          Software Developer interview.
        </p>
      </header>

      <section className="space-y-2">
        <h3 className="text-lg font-semibold text-slate-900">Tech stack</h3>
        <p className="text-sm leading-relaxed text-slate-700">
          Next.js (App Router) hosts the application. React Router runs inside the client shell to
          demonstrate client-side route management. TypeScript, Tailwind CSS, Axios, Redux Toolkit,
          and React Redux complete the runtime stack. Tests are written with Jest, React Testing
          Library, and Playwright. Docker and GitHub Actions provide a reproducible runtime and CI
          pipeline.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="text-lg font-semibold text-slate-900">Redux + localStorage</h3>
        <p className="text-sm leading-relaxed text-slate-700">
          Redux Toolkit is the runtime source of truth for recipe search results, the selected
          recipe, modal state, and the shopping list. localStorage is used only to persist the
          shopping list across page refreshes — it is not used as an API cache and stores no
          sensitive data. On app load the shopping list is hydrated from localStorage into Redux;
          subsequent changes are written back via a persistence effect.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="text-lg font-semibold text-slate-900">Testing strategy</h3>
        <p className="text-sm leading-relaxed text-slate-700">
          Pure business logic (ingredient extraction, shopping-list merging) is covered by Jest unit
          tests. Redux slices are tested in isolation. UI components such as SearchBar and
          RecipeCard are exercised through React Testing Library from the user&apos;s perspective.
          Playwright drives the full app end-to-end in a real browser.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="text-lg font-semibold text-slate-900">Docker &amp; CI</h3>
        <p className="text-sm leading-relaxed text-slate-700">
          A multi-stage Dockerfile produces a small Next.js standalone runtime image. GitHub Actions
          runs lint, format check, unit tests, build, and Playwright on every push and pull request.
        </p>
      </section>
    </article>
  );
}
