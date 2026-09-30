# Examples

Standalone examples for Porsche Design System usage — whole page **templates** and single section **patterns**, both
**typed components rendered to static HTML at build time**. The output is plain HTML — no hydration, no framework
runtime. The storefront frames every page and opens it in StackBlitz.

There is no template syntax here at all. Pages are TypeScript, so conditions are `if`/ternaries, loops are `map()`, and
partials are function components whose props the compiler checks.

## Commands

```bash
npm run start:examples       # dev server on http://localhost:3010
npm run build:examples       # writes ./dist (one project per page) and ./dist-site (one HTML file per page)
npm run test:unit:examples

# serve the built site below /examples/ against the local CDN (`serve-cdn`) – run build:examples first
npm run preview:examples     # http://localhost:3011/examples/<category>/<page>/

# or from within this package
npm start
npm run build                # renders the pages, builds them into ./dist-site and verifies the result
npm run build:verify         # only the verification of ./dist-site
npm run test:unit
```

`start:examples` serves the **source** tree; `preview:examples` serves the **built site** — the self-contained pages in
`dist-site/`, below `/examples/` like the storefront serves them, so what the browser gets is the inlined script and
stylesheet and the injected partials, exactly as the storefront ships them. The only difference is the CDN origin: every
HTML response is rewritten to `http://localhost:3001` while it is served, so the locally built components are loaded
instead of the production CDN. `dist-site/` is never touched and keeps the production URLs. This needs the Porsche
Design System built (`npm run build:core-dependencies && npm run build:components && npm run build:components-js`) and
the examples themselves (`npm run build:examples`) – `preview` serves, it does not build.

## Two categories, one project per page

| Category      | What it shows                                        | Layout                    | Lives in          |
| ------------- | ---------------------------------------------------- | ------------------------- | ----------------- |
| **Templates** | A whole application page, chrome included.           | `BasePage` / `CanvasPage` | `src/templates/…` |
| **Patterns**  | A single section of a page, e.g. a header variation. | `PatternPage`             | `src/patterns/…`  |

Both categories are listed in [`src/index.page.tsx`](src/index.page.tsx) (`templateItems`, `patternItems`), the overview
of the dev server, which is what links an example from there.

The build writes two trees:

```text
dist/patterns/header/overlay/     # scripts/build.ts: the Vite project of one page – what StackBlitz opens
├── package.json / vite.config.ts # generated; the config injects the Porsche Design System partials
├── index.html                    # the rendered page, without partials, stylesheet link or loader script
└── main.js / style.css           # generated entry: the scripts of the page, moved out of it, and the Tailwind entry

dist-site/                        # scripts/buildSite.ts: what the storefront serves from public/examples/
├── media/                        # public/examples/media/, copied once
└── patterns/header/overlay/
    ├── index.html                # the project above, built, with its script and stylesheet inline
    └── stackblitz.json           # the files of the project above, verbatim
```

Opening `dist/**/index.html` directly shows unstyled markup, because the partials are only added when the project is
built. The storefront copies `dist-site/` in its `prebuild` and puts its slug in front of the media paths.

## Links: only the overview navigates

The examples demonstrate chrome, they are not a website. Every link inside a header, a footer or an example body is a
placeholder `href="#"`, except for in-page anchors, which are real because the target is on the page. The only page with
working links is the overview of the dev server, `src/index.page.tsx`, which is never emitted and renders no header or
footer.

This is why `Header`, `Footer` and the layouts take no `basePath`: they have no URL to build. `ExampleList`, which the
overview is made of, is the only component that does.

## Structure

```text
src/
├── index.page.tsx            # overview of the source tree – dev only, never emitted; lists every example
├── _links.ts                 # placeholderHref – the link of the demo chrome that goes nowhere
├── _classes.ts               # classes(): joins class names, dropping the optional ones that are unset
├── _media.ts                 # media(): the one path images and videos are referenced by
├── _types/pds-jsx.d.ts       # JSX typings for the PDS web components
├── _layouts/
│   ├── BasePage.tsx          # full page shell: head, header, content, footer
│   ├── CanvasPage.tsx        # shell of a page whose chrome is `p-canvas`
│   ├── PatternPage.tsx       # minimal shell for a single section
│   └── OverviewPage.tsx      # shell of the dev overview
├── _partials/                # components, never emitted as pages
│   ├── Head.tsx
│   ├── Script.tsx            # `<script type="module">` with the behaviour of a page or a partial
│   ├── HeroVideo.tsx         # autoplaying hero video with its pause control and behaviour
│   ├── header/               # the header, split into the blocks its variants share
│   │   ├── Header.tsx        # composes the blocks: overlay and stacked variants
│   │   ├── HeaderBar.tsx     # the three-column row both variants are built from
│   │   ├── Brand.tsx         # crest and wordmark, one per viewport size
│   │   ├── MainNav.tsx       # menu button + recursive drilldown, from `navItems`, with its behaviour
│   │   ├── MetaActions.tsx   # icon affordances, from `metaActionItems`
│   │   ├── NoticeBar.tsx     # note above the bar (stacked only)
│   │   └── CategoryTabs.tsx  # category navigation below the bar (stacked only)
│   ├── feedback/FeedbackForm.tsx  # the flow both feedback patterns ask, with its behaviour
│   ├── footer/Footer.tsx
│   └── ExampleList.tsx
├── assets/
│   └── styles.css            # Tailwind entry: theme, global element defaults – copied next to every page
├── templates/
│   ├── admin-panel/index.page.tsx
│   └── landing-page/index.page.tsx
└── patterns/
    ├── feedback/{inline,dialog}/index.page.tsx
    ├── footer/index.page.tsx
    ├── header/{overlay,stacked}/index.page.tsx
    └── popover/{local-market-switch,priority-navigation,feature-tour}/index.page.tsx
```

`index.page.tsx` is the page marker: `templates/landing-page/index.page.tsx` becomes the project
`dist/templates/landing-page/`. A page folder holds that file only – its markup, classes and behaviour are all in it,
and the build rejects anything else. Every other `.ts`/`.tsx` file is a build-time input. Images and videos live in
`public/examples/media/` and are referenced through `media()` from [`src/_media.ts`](src/_media.ts).

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
| `navItems`      | Defaults to the `navItems` of `MainNav`; a page may replace or extend it. |
| `children`      | The page content, including its own `<main id="main">`.                   |

### Behaviour: `<Script>`

Behaviour is written in JSX too, as plain browser JavaScript in a [`<Script>`](src/_partials/Script.tsx) next to the
markup it wires up — at the end of the page for the behaviour of the example, inside the partial for behaviour a partial
brings along (`MainNav` opens its drilldown, `HeroVideo` pauses its video, `FeedbackForm` runs its flow):

```tsx
const Page = () => (
  <PatternPage title="…" description="…">
    <main id="main">
      <p-button id="some-trigger">Open</p-button>
    </main>
    <Script>{`
      // Behaviour of this example: what the trigger does.

      const trigger = document.getElementById('some-trigger');

      trigger.addEventListener('click', () => {
        // …
      });
    `}</Script>
  </PatternPage>
);
```

`<Script>` renders a `<script type="module">` whose content is not escaped, which a plain `<script>` in JSX would be.
The dev server serves it where it stands. The build moves every one of them, in document order, into a generated
`main.js`, which imports the page's `style.css` (`assets/styles.css`, copied), and links that entry at the end of the
body — so the markup, the Tailwind classes, the styles and the dummy JavaScript of an example are written in one file
and emitted as three. A few things follow from that:

- Start every script with a comment saying what it does: it is what an error of the build names the script by.
- The scripts of a page end up in one module scope, so two of them must not declare the same top level name — the build
  fails if they do. In dev each of them is a module of its own and would not tell.
- A script is a template literal, so a `${` or a backtick meant for the browser has to be escaped.
- A script only looks up ids its own file renders, which a unit test asserts. A page therefore does not reach into a
  partial: what differs is a prop (`<FeedbackForm restartable />`), and what a partial reacts to it finds through its
  own markup (`FeedbackForm` follows the modal around it via `closest('p-modal')`). In dev each script is a module of
  its own anyway, so a page could not call a function declared by the script of a partial.
- Imports are allowed (`import { componentsReady } from '@porsche-design-system/components-js';`); the build hoists them
  to the top of `main.js`.

### Application pages: `CanvasPage`

A template whose chrome is `p-canvas` renders [`CanvasPage`](src/_layouts/CanvasPage.tsx) instead, which takes `title`,
`description` and `children` — everything else is a slot of the component:

```tsx
import { CanvasPage } from '../../_layouts/CanvasPage.tsx';

const Page = () => (
  <CanvasPage title="Admin panel" description="…">
    <p-canvas id="admin-canvas">…</p-canvas>
  </CanvasPage>
);

export default Page;
```

> **Watch out — such a page renders no landmark of its own.** `p-canvas` provides the banner, the `main` landmark and
> the two `aside` landmarks in its shadow root, so a `<main id="main">` in the default slot would nest one landmark
> inside another. For the same reason the color scheme classes sit on `<html>`: the sidebars are rendered on top of the
> page, and a scheme set further down would not reach them. The Porsche Grid does not apply inside a canvas either — its
> content area narrows with the sidebars, so the admin panel asks the container (`@container`) instead.

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
each variant picks the subset it shows. Each list lives in the component rendering it, as its default.

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
import { PatternPage } from '../../_layouts/PatternPage.tsx';
import { Header } from '../../_partials/header/Header.tsx';

const Page = () => (
  <PatternPage title="Header 1" description="…" beforeMain={<Header currentPage="home" showSearch />}>
    <main id="main">…</main>
  </PatternPage>
);

export default Page;
```

| Prop          | Purpose                                                    |
| ------------- | ---------------------------------------------------------- |
| `title`       | Feeds `<title>`.                                           |
| `description` | Meta description.                                          |
| `beforeMain`  | The pattern, when it belongs above the content (a header). |
| `afterMain`   | The pattern, when it belongs below the content (a footer). |
| `children`    | The page content, including its own `<main id="main">`.    |

The layout adds nothing around the pattern and the content — the build links the page's `main.js`.

Rules:

- Write **plain HTML attribute names**: `class`, `for`, `charset`, `novalidate`. Preact supports them, so the generated
  markup stays copy-pasteable — do not use `className` or `htmlFor`.
- Values are HTML-escaped by default. Raw markup would need `dangerouslySetInnerHTML`, which only `<Script>` uses.
- A typo in a prop is a **compile error**, not a render-time surprise. Run `npm run typecheck` or rely on the editor.
- Data lives in the component that renders it, as its default (`navItems` in `MainNav`, `metaActionItems` in
  `MetaActions`, …). A page passes nothing unless it differs, and since the defaults are exported rather than injected,
  a page can extend them (`[...navItems, extra]`) instead of only replacing them.
- Links inside an example are `#`. Do not wire them up — the dev overview is the only place where a broken URL would
  actually be noticed, and it is covered by tests.
- Files and folders starting with `_` are inputs only. Keep pages declarative — see
  [`AGENTS.md`](AGENTS.md#scope-discipline-important).
- A variation of a partial is a **prop**, not a second copy of the markup. If two variants share a block, that block is
  its own component — see `_partials/header/`.
- Variant names must not read like Tailwind utilities (`overlay`, not the display keyword it replaces): the scanner
  reads whole files, so such a name leaks an unused utility into the stylesheet.

## Styling

Tailwind CSS v4, configured CSS-first in [`src/assets/styles.css`](src/assets/styles.css). That entry is **copied** next
to every page as its `style.css`, which the page's generated `main.js` pulls in, so the project's own Vite build
compiles, hashes and links it — in dev, `@tailwindcss/vite` compiles the source file directly, which is the only place
it exists as a file. It deliberately contains nothing but the three imports and the `:not(:defined)` rule: no `@source`,
no `source(none)` and no relative path of any kind, because the same bytes have to work at every depth. Tailwind's
automatic source detection is rooted at the Vite project, so it scans the pages and nothing above them.

> **Watch out:** Tailwind's scanner reads the whole file, comments included. A doc comment mentioning
> `{% block content %}` makes Tailwind emit an unused `.block` utility. Prefer prose that does not read like a class
> name, and check the compiled CSS after larger comment edits.

## How it works

[`plugins/jsx.ts`](plugins/jsx.ts) exports `renderPage()` — `preact-render-to-string` for the markup, a
`<!doctype html>` prefix, then Prettier to format the result — plus a thin Vite plugin. The dev server renders pages on
request through Vite's SSR module runner; [`scripts/build.ts`](scripts/build.ts) imports the same page modules and
writes the same HTML. One implementation, so dev and build can't drift apart.

That HTML is deliberately bare: no partials, no stylesheet link, no loader script. The build moves its scripts into the
page's `main.js`, links that entry, copies the `style.css` next to it ([`plugins/entries.ts`](plugins/entries.ts)) and
writes the project around it ([`scripts/generateProject.ts`](scripts/generateProject.ts)), whose `vite.config.ts`
injects the Porsche Design System partials — without the loader the `p-*` elements never upgrade, and `:not(:defined)`
in the stylesheet keeps them invisible. The dev server has neither the entries nor a project: it keeps the scripts
inline, which Vite serves as modules itself, links the shared stylesheet of the source tree and injects the partials
from [`plugins/partials.ts`](plugins/partials.ts). Those, plus the CDN origin, are the only differences between dev and
the emitted pages.

The partials are injected in a `transformIndexHtml()` hook, after Vite's own, so the inline loader script keeps the
bytes the partial emitted and its CSP hash stays valid.

Preact never reaches the browser: it is a build-time renderer and a source of JSX types, nothing else. The output is
plain HTML, no hydration, no framework runtime.

## Accessibility baseline

Every example ships `main` and section landmarks, labelled `nav` elements, `aria-current` on the active nav item,
visible `:focus-visible` outlines and a `forced-colors: active` block; templates additionally carry the `header` and
`footer` landmarks, and a pattern carries the landmark of the section it demonstrates. A page built on `p-canvas` gets
those landmarks from the component and adds none itself. The dev overview is a `main` landmark with labelled
navigations. Keep that baseline when adding examples — these demos are documentation, so they have to be correct by
example.
