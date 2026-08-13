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

# or from within this package
npm start
npm run build                # renders pages, then compiles Tailwind (build:css)
npm run test:unit
npm run preview              # build + serve ./dist on http://localhost:3011
```

## Two categories

| Category      | What it shows                                        | Layout        | Lives in          |
| ------------- | ---------------------------------------------------- | ------------- | ----------------- |
| **Templates** | A whole application page, chrome included.           | `BasePage`    | `src/templates/…` |
| **Patterns**  | A single section of a page, e.g. a header variation. | `PatternPage` | `src/patterns/…`  |

Both categories are listed in [`src/_data.ts`](src/_data.ts) (`templateItems`, `patternItems`), so a new example is
linked from the overview page by adding one entry.

## Links: only the overview navigates

The examples demonstrate chrome, they are not a website. Every link inside a header, a footer or an example body is a
placeholder `href="#"`, except for in-page anchors, which are real because the target is on the page. The one page with
working links is `src/index.page.tsx`, which lists the examples — and it renders no header or footer at all, because
repeating the demo chrome there would demonstrate nothing and would need URLs kept in sync for no benefit.

This is why `Header` and `Footer` take no `basePath`: they have no URL to build.

## Structure

```text
src/
├── index.page.tsx            # overview page: the link list, no chrome
├── _data.ts                  # templateItems, patternItems (real URLs), chrome nav (placeholders)
├── _classes.ts               # classes(): joins class names, dropping the optional ones that are unset
├── _layouts/
│   ├── BasePage.tsx          # full page shell: head, header, main, footer
│   └── PatternPage.tsx       # minimal shell for a single section
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
│   ├── Footer.tsx
│   └── ExampleList.tsx
├── assets/
│   ├── styles.css            # Tailwind entry: theme, global element defaults
│   └── header.js             # behaviour of the header drilldown, shared by every page showing it
├── templates/
│   ├── landing-page/
│   │   └── index.page.tsx
│   └── contact-page/
│       ├── index.page.tsx
│       └── main.js
└── patterns/
    ├── header-1/
    │   ├── index.page.tsx
    │   └── main.js
    └── header-2/
        └── index.page.tsx
```

`*.page.tsx` is the page marker: `templates/landing-page/index.page.tsx` becomes
`dist/templates/landing-page/index.html`. Every other `.ts`/`.tsx` file is a build-time input and is never emitted; all
non-TypeScript files are copied verbatim.

## Authoring a template

A page default-exports a component that renders the layout:

```tsx
import { BasePage } from '../../_layouts/BasePage.tsx';

const Page = () => (
  <BasePage
    basePath="../../"
    title="Landing page"
    description="…"
    currentPage="home"
    showSearch
    mainClass="flex flex-col gap-12"
  >
    <h1>…</h1>
  </BasePage>
);

export default Page;
```

| Prop             | Purpose                                                                      |
| ---------------- | ---------------------------------------------------------------------------- |
| `basePath`       | `"./"` at the root, `"../../"` in an example folder. Only builds asset URLs. |
| `title`          | Feeds `<title>`, suffixed with the site name.                                |
| `description`    | Meta description.                                                            |
| `currentPage`    | Matched against `item.id` to set `aria-current="page"`.                      |
| `showSearch`     | Optional; renders the header search affordance.                              |
| `headerVariant`  | Optional; `"overlay"` (default) or `"stacked"` – see the header patterns.    |
| `mainClass`      | Optional; classes on the page's `<main>`.                                    |
| `pageScript`     | Optional; one URL or a list, each rendered as `<script src="…" defer>`.      |
| `navItems`       | Defaults to `_data.ts`; a page may replace or extend it.                     |
| `footerNavItems` | Same, for the footer navigation.                                             |

`BasePage` also loads `assets/header.js` on its own — every header variant is a drilldown behind a menu button, so the
layout brings the behaviour that header needs and a page cannot forget it.

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
    pageScript={['../../assets/header.js', 'main.js']}
  >
    <main id="main">…</main>
  </PatternPage>
);

export default Page;
```

| Prop          | Purpose                                                                       |
| ------------- | ----------------------------------------------------------------------------- |
| `basePath`    | `"../../"` for `patterns/<name>/index.page.tsx`. Also the back link's target. |
| `title`       | Feeds `<title>`.                                                              |
| `description` | Meta description.                                                             |
| `beforeMain`  | The pattern, when it belongs above the content (a header).                    |
| `afterMain`   | The pattern, when it belongs below the content (a footer).                    |
| `pageScript`  | Optional; one URL or a list, each rendered as `<script src="…" defer>`.       |
| `children`    | The page content, including its own `<main id="main">`.                       |

The layout itself only adds the skip link and the link back to the overview — everything a pattern page needs beyond the
pattern. A pattern owns its header, so unlike `BasePage` it also lists the header's script itself.

Rules:

- Write **plain HTML attribute names**: `class`, `for`, `charset`, `novalidate`. Preact supports them, so the generated
  markup stays copy-pasteable — do not use `className` or `htmlFor`.
- Values are HTML-escaped by default. Raw markup would need `dangerouslySetInnerHTML`, which these demos do not use.
- A typo in a prop is a **compile error**, not a render-time surprise. Run `npx tsc --noEmit` or rely on the editor.
- `_data.ts` is imported explicitly rather than injected into an ambient scope, so a page can extend the shared
  navigation (`[...navItems, extra]`) instead of only replacing it.
- Links inside an example are `#`. Do not wire them up — the overview page is the only place where a broken URL would
  actually be noticed, and it is covered by tests.
- Files and folders starting with `_` are inputs only. Keep pages declarative — see
  [`AGENTS.md`](AGENTS.md#scope-discipline-important).
- A variation of a partial is a **prop**, not a second copy of the markup. If two variants share a block, that block is
  its own component — see `_partials/header/`.
- Variant names must not read like Tailwind utilities (`overlay`, not the display keyword it replaces): the scanner
  reads whole files, so such a name leaks an unused utility into the stylesheet.

## Styling

Tailwind CSS v4, configured CSS-first in [`src/assets/styles.css`](src/assets/styles.css), compiled by
`@tailwindcss/vite` in dev and by the Tailwind CLI into `dist/assets/styles.css` in the build. Automatic source
detection is off (`source(none)`); `@source "../**/*.tsx"` points the scanner at the components.

> **Watch out:** Tailwind's scanner reads the whole file, comments included. A doc comment mentioning
> `{% block content %}` makes Tailwind emit an unused `.block` utility. Prefer prose that does not read like a class
> name, and check `dist/assets/styles.css` after larger comment edits.

## How it works

[`plugins/jsx.ts`](plugins/jsx.ts) exports `renderPage()` — `preact-render-to-string` for the markup, a
`<!doctype html>` prefix, then Prettier to format the result — plus a thin Vite plugin. The dev server renders pages on
request through Vite's SSR module runner; [`scripts/build.ts`](scripts/build.ts) imports the same page modules and
writes the same HTML. One implementation, so dev and build can't drift apart.

The Porsche Design System partials (loader script, font, icon and component chunk links) are injected by
[`plugins/partials.ts`](plugins/partials.ts), shared by both paths — without the loader the `p-*` elements never
upgrade, and `:not(:defined)` in the stylesheet keeps them invisible. Only the CDN origin differs: the dev server
rewrites it to the local `serve-cdn`, the build keeps the production URLs.

Preact never reaches the browser: it is a build-time renderer and a source of JSX types, nothing else. The output is
plain HTML with relative paths, no hydration, no framework runtime.

## Accessibility baseline

Every example ships a skip link, `main` and section landmarks, labelled `nav` elements, `aria-current` on the active nav
item, visible `:focus-visible` outlines and a `forced-colors: active` block; templates additionally carry the `header`
and `footer` landmarks, and a pattern carries the landmark of the section it demonstrates. The overview page has no
chrome to skip, so it is a `main` landmark with two labelled navigations. Keep that baseline when adding examples —
these demos are documentation, so they have to be correct by example.
