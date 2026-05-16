# nib-recipe-planner

A Recipe Search and Meal Planner web app built with **Next.js**, **React**, **React Router**,
**TypeScript**, **Redux Toolkit**, and **Tailwind CSS**. Recipe data comes from
[TheMealDB](https://www.themealdb.com/) public API; the shopping list is persisted in the
browser's `localStorage`.

---

## Tech stack

- Next.js (App Router)
- React 18
- React Router DOM (client-side routes inside the app shell)
- TypeScript
- Tailwind CSS
- Axios
- Redux Toolkit + React Redux
- localStorage (shopping list persistence)
- Jest + React Testing Library (unit + component tests)
- Playwright (end-to-end)
- Docker (multi-stage)
- GitHub Actions (CI)

---

## Features

- Search recipes by keyword (Enter or button) — calls TheMealDB `search.php`.
- Responsive recipe grid (1 col mobile, 2 col tablet, 3–4 col desktop).
- Recipe detail modal with image, category, area, ingredients + measures, instructions,
  YouTube link, and source link.
- Add ingredients from any recipe to a shopping list.
- Shopping list deduplicates ingredients case-insensitively and merges measures as strings
  (no unsafe unit conversion). Sorted alphabetically.
- Shopping list persists in `localStorage` and rehydrates into Redux on load.
- "Surprise me" — fetches a random recipe (`random.php`) from any page and opens it in the
  same modal.
- Loading, error, and empty states throughout.
- Client-side routing for `/`, `/shopping-list`, `/about`, `*` (Not Found).

---

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

### Scripts

| Script                 | What it does                |
| ---------------------- | --------------------------- |
| `npm run dev`          | Start the dev server        |
| `npm run build`        | Production build            |
| `npm start`            | Run the production server   |
| `npm run lint`         | ESLint                      |
| `npm run format`       | Prettier (write)            |
| `npm run format:check` | Prettier (check only)       |
| `npm test`             | Jest unit + component tests |
| `npm run test:watch`   | Jest in watch mode          |
| `npm run test:e2e`     | Playwright end-to-end tests |

---

## Testing

```bash
npm test              # Jest (unit + component + slice tests)
npm run test:e2e      # Playwright (real browser, real TheMealDB API)
```

Layers:

- **Unit** — pure logic (`ingredientMapper`, `mergeShoppingList`) and Redux slices.
- **Component** — `RecipeCard`, `SearchBar` from the user's perspective.
- **App router** — verifies route rendering and shopping-list hydration end-to-end through
  React Router + Redux.
- **E2E** — Playwright covers search, add-to-shopping-list with refresh persistence, and
  client-side navigation.

---

## Build

```bash
npm run build
npm start
```

---

## Docker

The Dockerfile is a multi-stage build that uses Next.js's `output: "standalone"` for a small
runtime image.

```bash
docker build -t nib-recipe-planner .
docker run -p 3000:3000 nib-recipe-planner
```

---

## GitHub Actions

`.github/workflows/ci.yml` runs on push to `main`/`feature/**` and on PR to `main`:

1. **build-and-test** — `npm ci`, lint, format check, Jest, `next build`.
2. **e2e** — installs Playwright Chromium and runs the end-to-end suite. The HTML report is
   uploaded as an artifact on every run.

---

## Project structure

```
src/
  app/                # Next.js App Router entry (layout, page, globals.css)
  components/         # UI (layout/, recipe/, shopping-list/, ui/)
  features/           # Domain logic (services, types, utils)
    recipes/
    shopping-list/
  routes/             # React Router route components + AppRouter
  store/              # Redux Toolkit store, typed hooks, slices, provider
  lib/                # Constants
  __tests__/          # Jest unit + component tests
e2e/                  # Playwright specs
.github/workflows/    # CI
```

The big idea:

- **components/** are dumb-ish UI building blocks.
- **features/** is where domain logic and the API service live — components import from here.
- **routes/** are React Router route components (search, shopping list, about, 404).
- **store/** is Redux Toolkit slices and the typed `useAppSelector` / `useAppDispatch` hooks.
- **lib/constants.ts** holds the API base URL and the localStorage key.

---

## Design decisions

### Why React Router inside a Next.js project?

Next.js App Router is the framework-level router for this project — `src/app/layout.tsx`
and `src/app/page.tsx` are the entry points. **React Router runs inside the client
application shell** (`AppRouter.tsx`) to demonstrate familiarity with `BrowserRouter`,
`Routes`, `Route`, `Link`, and `NavLink`. In a real production Next.js app, the App Router
alone would normally be enough; React Router here is intentional, scoped to the client app
shell, and documented.

`src/app/page.tsx` dynamically imports `AppRouter` with `ssr: false`, because
`BrowserRouter` depends on the browser History API.

### Why Redux Toolkit?

The app has several pieces of shared state that span routes and components: search results
and search term, the selected recipe, the recipe modal's open/closed state, random-recipe
loading/error, success messages, and the shopping list. Centralising those in Redux
Toolkit keeps the data flow predictable. With React Router introducing route-based UI
separation, Redux is the simplest way to share state across pages without prop-drilling.

The shopping list is hydrated from `localStorage` into Redux on mount; a `useEffect`
watching `shoppingList.items` persists any subsequent changes back. Critically:

- Reducers stay pure — **no `localStorage` access inside reducers**.
- The persistence effect waits for `hydrated === true` before writing, so it can't
  overwrite a real list with an empty one on the first render.

### Why Axios?

Centralised HTTP setup with a `baseURL` and a single timeout. The service layer
(`mealApi.ts`) returns clean data — components and slices never see Axios response shapes.

### localStorage

- Used **only** to persist the shopping list across refreshes.
- **Not** used as an API cache.
- **Do not** put tokens, passwords, personal info, health data, or payment data in
  `localStorage` — it is not secure storage. This app stores only ingredient names and
  measures.

### Ingredient measures

TheMealDB measures are free text ("1 cup", "500g", "a pinch"). The app combines measure
strings with " + " rather than attempting unsafe unit conversion.

### Accessibility

Real `<button>` elements, labeled inputs, `role="dialog"` + `aria-modal` on the modal,
keyboard-activatable recipe cards, visible focus styles, and `rel="noopener noreferrer"`
on every external link.

---

## Known limitations

- React Router is included for demonstration; in a real Next.js production app the App
  Router alone would normally handle routing.
- No unit conversion — measures remain free-text strings.
- The shopping list is browser-specific and not synced across devices.
- No backend, no auth, no database.
- Recipe data depends on TheMealDB's availability.

## Future improvements

- Drop React Router in a real Next.js production deployment and use App Router only.
- Smarter ingredient parsing / unit conversion.
- Filters by category / area; pagination for large result sets.
- Better accessibility audit (focus trap inside modal, etc.).
- Vercel deployment + production CI deploy step.
- Backend persistence once user accounts exist.
