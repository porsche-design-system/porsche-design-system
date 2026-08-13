# Patterns (JSX)

Standalone demo pages for Porsche Design System patterns: **typed components rendered to static HTML at build time**.
The output is plain HTML with relative paths — no hydration, no framework runtime.

This package was chosen over two alternatives (an in-house `@include` engine and Nunjucks) that rendered the same pages;
[`COMPARISON.md`](COMPARISON.md) records how they compared and why this one won.

There is no template syntax here at all. Pages are TypeScript, so conditions are `if`/ternaries, loops are `map()`, and
partials are function components whose props the compiler checks.

## Commands

```bash
npm run start:patterns-jsx   # dev server on http://localhost:3010
npm run build:patterns-jsx   # writes ./dist
npm run test:unit:patterns-jsx

# or from within this package
npm start
npm run build                # renders pages, then compiles Tailwind (build:css)
npm run test:unit
npm run preview              # build + serve ./dist on http://localhost:3011
```

## Structure

```text
src/
├── index.page.tsx        # overview page
├── _data.ts              # shared data (navigation, …) as typed exports
├── _layouts/
│   └── BasePage.tsx      # page shell: head, header, main, footer
├── _partials/            # components, never emitted as pages
│   ├── Head.tsx
│   ├── Header.tsx
│   └── Footer.tsx
├── assets/
│   └── patterns.css      # Tailwind entry: theme, global element defaults
├── landing-page/
│   └── index.page.tsx
└── contact-page/
    ├── index.page.tsx
    └── main.js
```

`*.page.tsx` is the page marker: `landing-page/index.page.tsx` becomes `dist/landing-page/index.html`. Every other
`.ts`/`.tsx` file is a build-time input and is never emitted; all non-TypeScript files are copied verbatim.

## Authoring

A page default-exports a component that renders the layout:

```tsx
import { BasePage } from '../_layouts/BasePage.tsx';

const Page = () => (
  <BasePage
    basePath="../"
    title="Landing page"
    description="…"
    currentPage="landing"
    showSearch
    mainClass="flex flex-col gap-12"
  >
    <h1>…</h1>
  </BasePage>
);

export default Page;
```

| Prop             | Purpose                                                                       |
| ---------------- | ----------------------------------------------------------------------------- |
| `basePath`       | `"./"` at the root, `"../"` one level down. Never hardcode URLs in a partial. |
| `title`          | Feeds `<title>`, suffixed with the site name.                                 |
| `description`    | Meta description.                                                             |
| `currentPage`    | Matched against `item.id` to set `aria-current="page"`.                       |
| `showSearch`     | Optional; renders the header search form.                                     |
| `mainClass`      | Optional; classes on the page's `<main>`.                                     |
| `pageScript`     | Optional; renders `<script src="…" defer>` before `</body>`.                  |
| `navItems`       | Defaults to `_data.ts`; a page may replace or extend it.                      |
| `footerNavItems` | Same, for the footer navigation.                                              |

Rules:

- Write **plain HTML attribute names**: `class`, `for`, `charset`, `novalidate`. Preact supports them, so the generated
  markup stays copy-pasteable — do not use `className` or `htmlFor`.
- Values are HTML-escaped by default. Raw markup would need `dangerouslySetInnerHTML`, which these demos do not use.
- A typo in a prop is a **compile error**, not a render-time surprise. Run `npx tsc --noEmit` or rely on the editor.
- `_data.ts` is imported explicitly rather than injected into an ambient scope, so a page can extend the shared
  navigation (`[...navItems, extra]`) instead of only replacing it.
- Files and folders starting with `_` are inputs only. Keep pages declarative — see
  [`AGENTS.md`](AGENTS.md#scope-discipline-important).

## Styling

Tailwind CSS v4, configured CSS-first in [`src/assets/patterns.css`](src/assets/patterns.css), compiled by
`@tailwindcss/vite` in dev and by the Tailwind CLI into `dist/assets/patterns.css` in the build. Automatic source
detection is off (`source(none)`); `@source "../**/*.tsx"` points the scanner at the components.

> **Watch out:** Tailwind's scanner reads the whole file, comments included. A doc comment mentioning
> `{% block content %}` makes Tailwind emit an unused `.block` utility. Prefer prose that does not read like a class
> name, and check `dist/assets/patterns.css` after larger comment edits.

## How it works

[`plugins/jsx.ts`](plugins/jsx.ts) exports `renderPage()` — `preact-render-to-string` for the markup, a
`<!doctype html>` prefix, then Prettier to format the result — plus a thin Vite plugin. The dev server renders pages on
request through Vite's SSR module runner; [`scripts/build.ts`](scripts/build.ts) imports the same page modules and
writes the same HTML. One implementation, so dev and build can't drift apart.

Preact never reaches the browser: it is a build-time renderer and a source of JSX types, nothing else. The output is
plain HTML with relative paths, no hydration, no framework runtime.

## Accessibility baseline

Every page ships a skip link, `header`/`main`/`footer` landmarks, labelled `nav` elements, `aria-current` on the active
nav item, visible `:focus-visible` outlines and a `forced-colors: active` block. Keep that baseline when adding patterns
— these demos are documentation, so they have to be correct by example.
