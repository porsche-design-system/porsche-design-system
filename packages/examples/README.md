# Examples

Standalone examples for Porsche Design System usage — whole page **templates** and single section **patterns**, both
**typed components rendered to static HTML at build time**. The output is plain HTML with relative paths — no hydration,
no framework runtime.

This package was chosen over two alternatives (an in-house `@include` engine and Nunjucks) that rendered the same pages;
[`COMPARISON.md`](COMPARISON.md) records how they compared and why this one won.

There is no template syntax here at all. Pages are TypeScript, so conditions are `if`/ternaries, loops are `map()`, and
partials are function components whose props the compiler checks.

## Commands

```bash
npm run start:examples       # dev server on http://localhost:3010
npm run build:examples       # writes ./dist
npm run test:unit:examples

# build one generated project and serve the result against the local CDN (`serve-cdn`)
npm run preview:examples/patterns    # http://localhost:3011
npm run preview:examples/templates   # http://localhost:3012

# or from within this package
npm start
npm run build                # renders the pages and writes both generated projects
npm run build:verify         # build + `vite build` of both projects into ./dist-tmp
npm run test:unit
```

`start:examples` serves the **source** tree; `preview:examples/patterns` and `preview:examples/templates` serve the
**built site** — they run the same `vite build` as `build:verify`, so what the browser gets is bundled JavaScript,
hashed assets and the injected partials, exactly as the examples repository ships them. The only difference is the CDN
origin: the emitted HTML in `dist-tmp/` is rewritten to `http://localhost:3001`, so the locally built components are
loaded instead of the production CDN. `dist/` is never touched and keeps the production URLs. This needs the Porsche
Design System built (`npm run build:core-dependencies && npm run build:components && npm run build:components-js`).

## Two categories, two generated projects

| Category      | What it shows                                        | Layout        | Lives in          | Becomes          |
| ------------- | ---------------------------------------------------- | ------------- | ----------------- | ---------------- |
| **Templates** | A whole application page, chrome included.           | `BasePage`    | `src/templates/…` | `dist/templates` |
| **Patterns**  | A single section of a page, e.g. a header variation. | `PatternPage` | `src/patterns/…`  | `dist/patterns`  |

Both categories are listed in [`src/_data.ts`](src/_data.ts) (`templateItems`, `patternItems`), so a new example is
linked from the overview page of its project by adding one entry.

`dist/` is **not** a built site: each category becomes the source of a standalone Vite project — `package.json`,
`vite.config.ts`, `public/` and a `src/` holding the pages — which replaces the hand written workspace of the
[examples repository](https://github.com/porsche-design-system/examples). The pages therefore ship **without** the
Porsche Design System partials, without a stylesheet link and without the loader script: the generated `vite.config.ts`
adds all three when the project is built, and every page loads one generated `main.js` that imports its `style.css`. Use
`npm run build:verify` to build both projects and see the result.

## Links: only the overview navigates

The examples demonstrate chrome, they are not a website. Every link inside a header, a footer or an example body is a
placeholder `href="#"`, except for in-page anchors, which are real because the target is on the page. The pages with
working links are the overview pages: one per generated project, plus `src/index.page.tsx` for the source tree, which is
the only page linking across categories and is never emitted. None of them renders a header or footer, because repeating
the demo chrome there would demonstrate nothing and would need URLs kept in sync for no benefit.

This is why `Header` and `Footer` take no `basePath`: they have no URL to build.

## Structure

```text
src/
├── index.page.tsx            # overview of the source tree – dev only, never emitted
├── _data.ts                  # templateItems, patternItems (URLs inside their project), chrome nav
├── _classes.ts               # classes(): joins class names, dropping the optional ones that are unset
├── _layouts/
│   ├── BasePage.tsx          # full page shell: head, header, content, footer
│   ├── PatternPage.tsx       # minimal shell for a single section
│   └── OverviewPage.tsx      # shell of the overview pages
├── _partials/                # components, never emitted as pages
│   ├── Head.tsx
│   ├── SkipLink.tsx
│   ├── header/               # the header, split into the blocks its variants share
│   │   ├── Header.tsx        # composes the blocks: overlay and stacked variants
│   │   ├── HeaderBar.tsx     # the three-column row both variants are built from
│   │   ├── Brand.tsx         # crest and wordmark, one per viewport size
│   │   ├── MainNav.tsx       # menu button + recursive drilldown, from `navItems`
│   │   ├── MetaActions.tsx   # icon affordances, from `metaActionItems`
│   │   ├── NoticeBar.tsx     # note above the bar (stacked only)
│   │   └── CategoryTabs.tsx  # category navigation below the bar (stacked only)
│   ├── footer/Footer.tsx
│   └── ExampleList.tsx
├── assets/                   # copied into both generated projects
│   ├── styles.css            # Tailwind entry: theme, global element defaults
│   ├── header.js             # behaviour of the header drilldown
│   └── video.js              # behaviour of the hero video and its pause control
├── templates/
│   ├── index.page.tsx        # overview of the templates project
│   └── landing-page/
│       └── index.page.tsx
└── patterns/
    ├── index.page.tsx        # overview of the patterns project
    ├── footer/index.page.tsx
    └── header/
        ├── overlay/index.page.tsx
        └── stacked/index.page.tsx
```

`*.page.tsx` is the page marker: `templates/landing-page/index.page.tsx` becomes
`dist/templates/src/landing-page/index.html`, together with the `style.css` and `main.js` generated next to it. Every
other `.ts`/`.tsx` file is a build-time input, a `main.js` next to a page is inlined into that page's entry, and all
other files are copied verbatim.

## Authoring a template

A page default-exports a component that renders the layout:

```tsx
import { BasePage } from '../../_layouts/BasePage.tsx';

const Page = () => (
  <BasePage title="Landing page" description="…" currentPage="home" showSearch>
    <main id="main" class="flex flex-col gap-12">
      <h1>…</h1>
    </main>
  </BasePage>
);

export default Page;
```

| Prop            | Purpose                                                                   |
| --------------- | ------------------------------------------------------------------------- |
| `title`         | Feeds `<title>`, suffixed with the site name.                             |
| `description`   | Meta description.                                                         |
| `currentPage`   | Matched against `item.id` to set `aria-current="page"`.                   |
| `showSearch`    | Optional; renders the header search affordance.                           |
| `headerVariant` | Optional; `"overlay"` (default) or `"stacked"` – see the header patterns. |
| `navItems`      | Defaults to `_data.ts`; a page may replace or extend it.                  |
| `children`      | The page content, including its own `<main id="main">`.                   |

The layout renders one script tag, `main.js`. That file is generated next to the page and imports the page's
`style.css`, the shared behaviour the markup asks for — `assets/header.js` for the drilldown, `assets/video.js` for a
pause control — and the `main.js` authored next to the page, if there is one.

### The header and its variants

`Header` is the one place the demo chrome is defined; the variants are arrangements of the same blocks, not two copies
of the markup:

| Variant             | Where it sits                      | Extra rows                               |
| ------------------- | ---------------------------------- | ---------------------------------------- |
| `overlay` (default) | on top of the content, over a hero | –                                        |
| `stacked`           | above the content                  | `NoticeBar` on top, `CategoryTabs` below |

Both render `HeaderBar` with the same `MainNav`, `Brand` and `MetaActions`, so a change reaches both variants. The
navigation comes from `navItems` and is rendered recursively: an item with `children` becomes a drilldown level (plus a
leading entry pointing at its own page), one without stays a link. The icon affordances come from `metaActionItems`;
each variant picks the subset it shows. Both lists live in `_data.ts`.

> **Watch out — the color scheme is not set on the `<header>`.** The `overlay` variant lies on a dark hero, so its
> contents need `scheme-dark`, but the drilldown lives inside the header and is a dialog on top of the _page_. A scheme
> class on the `<header>` cascades into it and opens a dark overlay on a light page. `Header` therefore hands the scheme
> to the blocks, and each block applies it to the elements that really sit on the hero — `MainNav` puts it on the menu
> button and deliberately not on `p-drilldown`.

## Authoring a pattern

A pattern renders one section in the place it occupies on a real page, so `PatternPage` deliberately ships no chrome —
the chrome is what is being demonstrated. It also does not wrap the content: the page brings its own `<main id="main">`,
so a header pattern can put a full-bleed hero below the header instead of a padded shell:

```tsx
import { navItems } from '../../_data.ts';
import { PatternPage } from '../../_layouts/PatternPage.tsx';
import { Header } from '../../_partials/header/Header.tsx';

const Page = () => (
  <PatternPage
    basePath="../../"
    title="Header 1"
    description="…"
    beforeMain={<Header currentPage="home" navItems={navItems} showSearch />}
  >
    <main id="main">…</main>
  </PatternPage>
);

export default Page;
```

| Prop          | Purpose                                                                                            |
| ------------- | -------------------------------------------------------------------------------------------------- |
| `basePath`    | Path back to the root of the generated project – `"../../"` for `patterns/header/overlay`, and the |
|               | target of the back link.                                                                           |
| `title`       | Feeds `<title>`.                                                                                   |
| `description` | Meta description.                                                                                  |
| `beforeMain`  | The pattern, when it belongs above the content (a header).                                         |
| `afterMain`   | The pattern, when it belongs below the content (a footer).                                         |
| `children`    | The page content, including its own `<main id="main">`.                                            |

The layout itself only adds the skip link, the link back to the overview and the page's `main.js` — everything a pattern
page needs beyond the pattern.

Rules:

- Write **plain HTML attribute names**: `class`, `for`, `charset`, `novalidate`. Preact supports them, so the generated
  markup stays copy-pasteable — do not use `className` or `htmlFor`.
- Values are HTML-escaped by default. Raw markup would need `dangerouslySetInnerHTML`, which these demos do not use.
- A typo in a prop is a **compile error**, not a render-time surprise. Run `npx tsc --noEmit` or rely on the editor.
- `_data.ts` is imported explicitly rather than injected into an ambient scope, so a page can extend the shared
  navigation (`[...navItems, extra]`) instead of only replacing it.
- Links inside an example are `#`. Do not wire them up — the overview pages are the only place where a broken URL would
  actually be noticed, and they are covered by tests.
- Files and folders starting with `_` are inputs only. Keep pages declarative — see
  [`AGENTS.md`](AGENTS.md#scope-discipline-important).
- A variation of a partial is a **prop**, not a second copy of the markup. If two variants share a block, that block is
  its own component — see `_partials/header/`.
- Variant names must not read like Tailwind utilities (`overlay`, not the display keyword it replaces): the scanner
  reads whole files, so such a name leaks an unused utility into the stylesheet.

## Styling

Tailwind CSS v4, configured CSS-first in [`src/assets/styles.css`](src/assets/styles.css). That entry is copied into
both generated projects and imported by the `style.css` of every page, so the project's own Vite build compiles, hashes
and links it — in dev, `@tailwindcss/vite` compiles the same file directly. Automatic source detection is off
(`source(none)`); `@source "../**/*.{tsx,html}"` points the scanner at the components in the source tree and at the
rendered pages in a generated project.

> **Watch out:** Tailwind's scanner reads the whole file, comments included. A doc comment mentioning
> `{% block content %}` makes Tailwind emit an unused `.block` utility. Prefer prose that does not read like a class
> name, and check the compiled CSS after larger comment edits.

## How it works

[`plugins/jsx.ts`](plugins/jsx.ts) exports `renderPage()` — `preact-render-to-string` for the markup, a
`<!doctype html>` prefix, then Prettier to format the result — plus a thin Vite plugin. The dev server renders pages on
request through Vite's SSR module runner; [`scripts/build.ts`](scripts/build.ts) imports the same page modules and
writes the same HTML. One implementation, so dev and build can't drift apart.

That HTML is deliberately bare: no partials, no stylesheet link, no loader script. The build adds the two entries of a
page ([`plugins/entries.ts`](plugins/entries.ts)) and writes the project around it
([`scripts/generateProject.ts`](scripts/generateProject.ts)), whose `vite.config.ts` injects the Porsche Design System
partials — without the loader the `p-*` elements never upgrade, and `:not(:defined)` in the stylesheet keeps them
invisible. The dev server has neither the entries nor a project, so it injects the partials from
[`plugins/partials.ts`](plugins/partials.ts) and rewrites the entry tag to the shared files of the source tree. Those
two rewrites, plus the CDN origin, are the only differences between dev and the emitted pages.

Preact never reaches the browser: it is a build-time renderer and a source of JSX types, nothing else. The output is
plain HTML with relative paths, no hydration, no framework runtime.

## Accessibility baseline

Every example ships a skip link, `main` and section landmarks, labelled `nav` elements, `aria-current` on the active nav
item, visible `:focus-visible` outlines and a `forced-colors: active` block; templates additionally carry the `header`
and `footer` landmarks, and a pattern carries the landmark of the section it demonstrates. The overview pages have no
chrome to skip, so each is a `main` landmark with labelled navigations. Keep that baseline when adding examples — these
demos are documentation, so they have to be correct by example.
