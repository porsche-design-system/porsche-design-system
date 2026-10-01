# AGENTS.md — Examples Package

> This file provides context for AI coding assistants working in `packages/examples/`. See the root
> [`AGENTS.md`](../../AGENTS.md) for project-wide guidance and [`README.md`](README.md) for the authoring reference.

## Overview

Standalone examples for Porsche Design System usage, rendered from **typed function components** to plain HTML at build
time. They come in two categories:

| Category      | What it shows                                        | Layout         | Lives in          |
| ------------- | ---------------------------------------------------- | -------------- | ----------------- |
| **Templates** | A whole application page, chrome included.           | `TemplatePage` | `src/templates/…` |
| **Patterns**  | A single section of a page, e.g. a header variation. | `PatternPage`  | `src/patterns/…`  |

There is no template syntax. Conditions are ternaries, loops are `map()`, partials are components, and the layout takes
`children`. Rendering happens once at build time via `preact-render-to-string`; **no framework code reaches the
browser**.

The package is `private: true` and is not published.

## Build output

`npm run build` writes three git-ignored trees ([`lib/shared.ts`](lib/shared.ts)), in two steps:

```text
generated/examples.ts          # build:projects – scripts/build.ts: the package export, as source (lib/exports.ts)
dist/                          # build:projects – scripts/build.ts, then rollup.config.mjs
├── examples.js / .d.ts        # the package export, bundled – `import { examples } from '@porsche-design-system/examples'`
└── <category>/<page>/         # one standalone Vite project per page, what StackBlitz opens
    ├── package.json           # generated, dependency versions taken from this package
    ├── vite.config.ts         # generated: PDS partial injection with the component chunks of the category
    ├── index.html             # the rendered page, opening with the note on how to port it (exampleNote)
    └── main.js / style.css    # generated entry pair: the page's <Script>s, moved out of it, and the Tailwind entry
dist-site/                     # build:site – scripts/buildSite.ts, what the storefront copies to public/examples/
├── media/                     # public/examples/media/, once
└── <category>/<page>/
    └── index.html             # the project above, built, script and stylesheet inlined (lib/inline.ts)
```

**The package export.** `@porsche-design-system/examples` exports `examples` – every example by its path, with its meta
and the files of its project, which the storefront shows as code and opens in StackBlitz – and the paths the pages and
their media are served at (`examplesPath`, `mediaPath`). The types of an example – `ExampleMeta`, `ExampleProject`,
`Example` – are defined once, in [`lib/meta.ts`](lib/meta.ts), which the generated source re-exports; it adds
`ExamplePath`, the path of every example as a union. `build:projects` writes the source, typechecks the package with it
and bundles it with its declarations into `dist/` ([`rollup.config.mjs`](rollup.config.mjs), ESM only), so a consumer
compiles nothing of this package. The scripts and the knowledge skill import the source itself. The export holds every
example, so import it on the server only.

**The two steps run at different points of the root build.** `build:projects` needs the sources and the types of
`@porsche-design-system/components` only, and runs before `build:skills`, which reads its output (see _Knowledge
skill_). `build:site` builds the projects against `@porsche-design-system/components-js` and runs after the wrappers.
Nothing `scripts/build.ts` imports may therefore need a built wrapper at runtime – which is why `appTitle` lives in
`lib/projects.ts` rather than next to the partials.

Consequences, and they are the point of the design:

- **A page's HTML in `dist/` contains no PDS partials, no stylesheet link and no loader script.** All three are added by
  the generated `vite.config.ts` when the project is built, so opening `dist/**/index.html` directly shows unstyled
  markup.
- **A page is authored as one file and emitted as three: `index.html`, `main.js` and `style.css`.** The script
  **contains** the `<Script>` elements of the page's components, moved out of the markup by the build, and the
  stylesheet **is** the shared Tailwind entry, copied, so the markup, the utilities, the styles and the JavaScript of a
  pattern are read in one place. Nothing is shared across projects.
- **A built page is one self-contained file.** Besides the PDS CDN and a few absolute https URLs, it references only its
  media, and those only through `mediaPath` (`/examples/media/`), which is slug-free: one build is deployed under
  several storefront slugs, so [`packages/storefront/scripts/copyExamples.ts`](../storefront/scripts/copyExamples.ts)
  inserts the slug when it copies the pages in. [`scripts/verify.ts`](scripts/verify.ts) runs at the end of `build` and
  fails on any other local URL.

## Structure

```text
lib/                              # everything importable – by vite.config.ts, the scripts and the tests
├── jsx.ts                        # renderPage(), findPages(), page URL resolution + Vite plugin (dev server)
├── partials.ts                   # PDS partials (loader, fonts, icons, chunks) – dev server and generated projects
├── projects.ts                   # the categories, their component chunks and the path arithmetic
├── entries.ts                    # extractScripts() + the generated main.js + the dev stylesheet link
├── inline.ts                     # Vite plugin inlining the bundled script and stylesheet – dist-site/ only
├── meta.ts                       # the types of an example – ExampleMeta (the `meta` export of a page), Example, …
├── exports.ts                    # the package export: the source generated/examples.ts, bundled by rollup.config.mjs
├── generateProject.ts            # the generated vite.config.ts and package.json
└── shared.ts                     # output paths, file helpers and readVersions() – the dependency versions of this package
scripts/                          # the entry points `npm run …` starts with tsx – nothing imports them
├── build.ts                      # renders the pages and writes one project per page into dist/
├── buildSite.ts                  # builds every project into one self-contained page in dist-site/
├── verify.ts                     # asserts dist-site/ is what the storefront and StackBlitz need
└── previewSite.ts                # serves dist-site/ below /examples/ against the local CDN
skill/skill.ts                    # examplesSkill – the patterns and templates for the knowledge skill, read from dist/
vite.config.ts                    # dev server only (root: 'src', appType: 'mpa', port 3010) + Tailwind plugin
vitest.config.ts                  # separate config, because vite.config.ts sets `root: 'src'`
playwright.config.ts              # every Playwright suite as projects of one config – <suite>-{desktop-chrome,mobile-safari}
tests/unit/                       # vitest, no build and no browser
├── specs/build.spec.tsx          # the pipeline: routing, projects, StackBlitz, entries, inlining, renderPage()
├── specs/markup.spec.tsx         # the static composition: data, partials, layouts, pages
├── specs/skill.spec.ts           # the knowledge skill serializer – reads dist/, so it needs build:projects
└── helpers/index.ts              # the pages under test and the string helpers the specs share
tests/helpers/                    # shared by the Playwright suites – a helper two suites use lives here
├── previewServers.ts             # the web server every suite runs against
├── device.ts                     # getDevice() – the device the running project emulates
├── pages.ts                      # the pages, globbed from the source tree; getExampleUrl(), getSpecPath()
├── setup.ts                      # hermetic page setup: stubbed origins, upgraded components, pinned media
└── position.ts                   # waitForStablePosition() – for every suite that opens a popover
tests/e2e/                        # behaviour: one spec per page, below its category
tests/a11y/                       # axe-core: one spec per page, its initial and its interaction states
tests/vrt/                        # captures: one spec per page, plus the committed __screenshots__
src/
├── _layouts/
│   ├── TemplatePage.tsx          # document shell of a whole page – the page composes Header/Footer or p-canvas
│   └── PatternPage.tsx           # minimal shell for a single section (beforeMain / afterMain)
├── _partials/                    # Head, Header, Footer – checked props
│   ├── Script.tsx                # <script type="module"> with unescaped code – all behaviour goes through it
│   ├── HeroVideo.tsx             # autoplaying hero video with its pause control and the script operating both
│   ├── header/                   # Header (variants) + the blocks it composes: HeaderBar, Brand,
│   │                             # MainNav (with the drilldown script), MetaActions, NoticeBar, CategoryTabs
│   └── feedback/                 # FeedbackForm: the flow both feedback patterns ask, with its behaviour
├── _types/pds-jsx.d.ts           # JSX typings for the PDS web components (derived, type-only)
├── templates/
│   ├── landing-page/             # index.page.tsx
│   └── admin-panel/              # index.page.tsx – application shell on `p-canvas`
├── patterns/
│   ├── header/overlay/           # Header in its `overlay` variant
│   ├── header/stacked/           # Header in its `stacked` variant
│   ├── footer/                   # Footer below the content
│   ├── popover/                  # index.page.tsx each – the behaviour is per example
│   │   ├── local-market-switch/  # popover open on load, becoming a p-sheet below `s`
│   │   ├── priority-navigation/  # entries that no longer fit collapse into a popover
│   │   └── feature-tour/         # a sequence of coachmarks, one open at a time
│   └── feedback/                 # index.page.tsx each – the flow itself is a partial
│       ├── inline/               # the flow in the page, confirming in place
│       └── dialog/               # the same flow in a p-modal, reset once it has closed
└── style.css                     # Tailwind entry: @theme, global element defaults – copied next to every page
```

**Underscore rule:** files and folders starting with `_` are inputs only and are never emitted. **Page rule:** a page is
an `index.page.tsx` in a folder of its own, which becomes one project; its behaviour is a `<Script>` inside it, and the
build rejects any other file in the folder. Media belong into `public/examples/media/` and are referenced by that path,
written as it is: `src="/examples/media/718.webp"` – `mediaPath` in [`lib/projects.ts`](lib/projects.ts) is the
pipeline's copy, and `scripts/verify.ts` fails the build on any other root-absolute URL or a missing file.

## Links: examples never navigate

The examples demonstrate chrome, they are not a website:

- Header, footer and example bodies link to `"#"`, written as it is. In-page anchors (`#features`) are real, because the
  target is on the page. Biome's `a11y/useValidAnchor` rejects the literal and is therefore off for
  `packages/examples/src` – a unit test takes its place: every `href` and `action` of an example is `#` or points at an
  id on the same page, and every `<a>` has an `href`. It covers the `p-link*` elements as well, which the rule never
  saw.
- Consequently `Header`, `Footer` and the layouts take no `basePath`: an example never links out of itself. The examples
  are linked from outside – by the storefront's navigation, and in dev by the URL list the server prints when it starts
  (see _Tooling notes_). There is no overview page.

## Commands

```bash
npm run start:examples      # dev server on http://localhost:3010 – prints the URL of every page when it starts
npm run build:examples      # writes ./dist (one project per page) and ./dist-site (one HTML file per page), gitignored
npm run build:examples:projects  # ./dist only – what build:skills reads; needs no built wrapper
npm run build:examples:site      # ./dist-site from ./dist, verified – needs the built components-js
npm run test:unit:examples  # vitest
npm run test:e2e:examples   # playwright – drives the behaviour of every page of the built site
npm run test:a11y:examples  # playwright + axe-core – scans every page of the built site
npm run test:vrt:examples   # playwright – screenshots every page of the built site (:chrome / :safari for one device)

# serve the built site below /examples/ against the local CDN – run build:examples first
npm run preview:examples    # http://localhost:3011/examples/<category>/<page>/

# from within this package
npm run build:verify        # verifies ./dist-site: one self-contained page each, media only below /examples/media/
npm run typecheck           # source (from the root: typecheck:examples); typecheck:tests[:e2e|:a11y|:vrt] check the test scopes
npx playwright test --project='e2e-*'   # any suite directly – projects: <suite>-desktop-chrome, <suite>-mobile-safari
```

**One Playwright config, every suite on the same two devices.** [`playwright.config.ts`](playwright.config.ts) is a
pilot for the monorepo, whose other packages keep one config per suite in `tests/<suite>/config/`. Every suite gets one
project per device:

| project                  | device         | engine   | viewport |
| ------------------------ | -------------- | -------- | -------- |
| `<suite>-desktop-chrome` | Desktop Chrome | chromium | 1280×720 |
| `<suite>-mobile-safari`  | iPhone 17 Pro  | webkit   | 402×681  |

Each runs on the defaults of its Playwright device descriptor – viewport, user agent, touch – except the pixel density,
which is forced to 1 like everywhere else in the monorepo. A spec reads its device with `getDevice()` from
[`tests/helpers/device.ts`](tests/helpers/device.ts), never from the project name; the page setups leave the viewport
alone, so a page is laid out on its device. Only a flow about resizing – the priority navigation – sets a width itself.

The settings are still those of the shared base configs in `@porsche-design-system/shared/testing`; only the options
Playwright allows per project – test directory and match, timeouts, snapshot path, screenshot comparison, output
directory – are taken per suite. The project names end in the engine because `prepare-vrt-snapshots` recognises output
folders by that suffix. The `test:*` scripts select their projects, so the suites stay separate steps in CI with
separate results. A bare `playwright test` runs all of them, VRT included, which only produces the committed pixels
inside Docker.

**Run the VRT in Docker** – `./docker.sh npm run test:vrt:examples` – like every other visual regression suite in this
monorepo. The committed baselines are the ones the container produces; a run on macOS renders different pixels.

## End-to-end tests

The suite lives in [`tests/e2e/`](tests/e2e) and drives the behaviour the build moves into each page's `main.js`.

- **Every page has a spec of its own**, below its category and named after it: `src/patterns/header/overlay` is tested
  by `specs/patterns/header-overlay.e2e.ts`. A spec reads on its own, so the scenarios several pages share are
  **repeated on purpose** rather than generated in a loop.
- **Each spec starts with the same check:** the page loads without a `console.error` or an uncaught exception and
  carries a title. It is the cheapest check there is for these demos, and it catches their most likely failure:
  behaviour is a plain script wired on ids, so a renamed element or a script that throws fails _silently_. The page
  still renders and the VRT still matches.
- **The behaviour of the partials is tested in every spec whose page renders it:** the navigation drilldown (`MainNav`)
  wherever the page renders `#nav-button`, the hero video (`HeroVideo`) wherever it renders `#pause-button`.
- **Both devices run every spec.** A flow is the same on desktop and mobile, but it runs in a second engine with touch
  and a mobile user agent – on mobile the profile menu of the local market switch opens as a sheet, for example.
- **The flows are what exactly one page does**, like the feedback flows, the local market switch, the feature tour, the
  priority navigation and the admin panel. The common thread is **controlled mode**: the page owns every open state,
  which is what lets a trigger mirror it onto `aria-expanded`, and what makes "close" something the page has to write
  back. Forgetting that half leaves a panel that opens and never closes — which renders and screenshots perfectly.
- **`coverage.e2e.ts` fails for a page without a spec of its own.** The specs are written by hand, so nothing else would
  notice a new example that is missing one — and it would then miss even the check that it loads without an error.

Three things about these components are easy to get wrong in a test, so they have helpers in
[`tests/e2e/helpers/`](tests/e2e/helpers):

| Looks like                     | Actually                                                                                                                                                                                  |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `aria-expanded` on the trigger | Set through the `aria` **prop**; the component renders it onto its control **inside the shadow root** and never reflects it onto the host. Use `getTriggerControl()`.                     |
| `open` as an attribute         | A **property** in controlled mode. Worse, a step the markup renders open keeps a stale `open=""` forever, so an attribute check reports it open for the rest of the tour. Use `isOpen()`. |
| A popover being "visible"      | Its host is a zero-height anchor and its panel lives in the shadow root. Assert on the content slotted into it, or on `isOpen()`. Only the drilldown renders a real `dialog`.             |

`waitForStablePosition()` exists for a fourth: a popover is positioned _after_ `open` flips, and clicking in between
lands on whatever is underneath — which for a coachmark is an outside click that dismisses the tour the test was about
to walk. There is no "finished opening" event on `p-popover`, so the settled box is the signal.

Note that the e2e setup deliberately does **not** reuse the VRT's `setupExamplePage()`: that one freezes videos,
releases focus and waits for a stable picture, and all three are wrong here — the video is under test, the focus a flow
moves is what is asserted, and behaviour is not a picture.

## Accessibility tests

The suite lives in [`tests/a11y/`](tests/a11y) and scans **every page** with axe-core, on both devices × the two colour
schemes – in its initial state and in every state the page reaches through interaction.

- **One spec per page**, laid out like the e2e specs: `specs/patterns/feedback-dialog.a11y.ts`. The initial scans are
  the same for every page and come from `testInitialStates()` in
  [`tests/a11y/helpers/scans.ts`](tests/a11y/helpers/scans.ts); the states the page opens – the drilldown, the feedback
  dialog with its form and its confirmation, the profile menu, the second tour step, the overflow popover, the settings
  sidebar and the search dialog – are written out in its spec and scanned in both schemes as well. A new state gets its
  scan next to the page it belongs to. The overflow popover of the priority navigation is scanned on mobile only: on
  desktop every entry fits into the bar. `coverage.a11y.ts` fails for a page without a spec.
- **It covers the layer the other suites cannot.** The unit tests assert the rendered markup – no unlabelled `<nav>`, at
  most one first level heading, `aria-current` on the active item – before a browser is involved. Axe checks what the
  browser _computes_: contrast, the accessible name a label resolves to through a shadow root, whether an `aria-*` value
  is valid on the role it ends up on – and the landmark rules, which only the composed page can answer since `p-canvas`
  renders its landmarks in its shadow root: one `main`, no duplicated banner or contentinfo, at least one first level
  heading. [`markup.spec.tsx`](tests/unit/specs/markup.spec.tsx) does not repeat those.
- **Nothing is scoped or disabled in the fixture.** The component suites of `packages/components-js` switch off the
  rules that expect a page-level `main` and an `h1`, because they render one component in isolation. An example _is_ a
  whole page, so those rules are exactly the ones worth running. A rule that genuinely does not apply is disabled **per
  page** with a reason – today only `page-has-heading-one`, for the footer pattern, which is a section and not a page.
- Like the VRT it runs against the **built** site, sharing the web servers in
  [`tests/helpers/previewServers.ts`](tests/helpers/previewServers.ts). WebKit is scanned as well as chromium: axe reads
  the styles and names the engine computes, and an iPhone only ever runs WebKit.

> **Why there are no aria snapshot tests.** They would pin the composed accessibility tree, but every invariant they
> would catch here is already pinned closer to its cause: the static composition by the unit tests, and each component's
> own subtree by the a11y tree suite in `packages/components-js/tests/a11y/specs/a11ytree/`. A page-level snapshot sits
> on top of both and is churned by every prose edit and every component-internal change — the examples repository's own
> snapshots had already collected `status`, `alert` and `text: ""` nodes that leaked out of component shadow roots. If
> one is ever added, scope it to a subtree that is genuinely composition, not to `body`.

## Visual regression tests

The suite lives in [`tests/vrt/`](tests/vrt) and screenshots **every page in its initial state and in the states it
reaches through interaction**.

- **One spec per page**, laid out like the e2e specs: `specs/templates/admin-panel.vrt.ts`. The initial captures are the
  same for every page and come from `testInitialStates()` in [`tests/vrt/helpers/index.ts`](tests/vrt/helpers/index.ts);
  the states the page opens are written out in its spec, in both projects and the light scheme. An overlay is captured
  at viewport size – the page behind it is the initial capture already – and an in-page state in full. Before a state is
  captured, `waitForStableState()` parks the pointer, so the hover style of the trigger that opened it is not part of
  the baseline. `coverage.vrt.ts` fails for a page without a spec.
- **Baselines are named so a page's captures sort together**, with `--` between the parts – the page id itself contains
  single dashes:

  | capture                    | name                                      | example                                                       |
  | -------------------------- | ----------------------------------------- | ------------------------------------------------------------- |
  | initial state              | `<page>--<device>-<engine>.png`           | `patterns-header-overlay--mobile-safari.png`                  |
  | variant of the initial one | `<page>--<device>-<variant>-<engine>.png` | `patterns-header-overlay--desktop-hcm-dark-chrome.png`        |
  | state reached by a test    | `<page>--<state>--<device>-<engine>.png`  | `patterns-header-overlay--drilldown-open--desktop-chrome.png` |

  The engine suffix is fixed per project in `playwright.config.ts`; `prepare-vrt-snapshots` relies on nothing but it.

- **It tests the built site, not the dev server.** It expects `build:examples` to have run, and the web server of
  [`tests/helpers/previewServers.ts`](tests/helpers/previewServers.ts) is `npm run preview` – `serve-cdn` plus
  `scripts/previewSite.ts`, which serves `dist-site/` – so a capture shows the inlined entry and the injected partials,
  exactly what the storefront ships.
- **Captured on both devices** of the config, `vrt-desktop-chrome` and `vrt-mobile-safari`. The config fixes the
  baseline suffix to the bare engine name, because `prepare-vrt-snapshots` derives the regression artifacts from exactly
  that suffix and project names have to be unique across the suites. Dark scheme, both High Contrast Mode schemes, 200%
  font size and `rtl` are captured on desktop only – font scaling and forced colors go through CDP. The overflow of the
  priority navigation only exists on mobile: on desktop every entry fits into the bar.
- **Pages are globbed to find the specs, not to generate them.** [`tests/helpers/pages.ts`](tests/helpers/pages.ts)
  resolves every `index.page.tsx` to its URL on the preview server; a spec looks its page up by id with
  `getExampleUrl()`, which fails if the page is gone, and the coverage spec fails if a page has no spec.
- **What `setupExamplePage()` pins down** ([`tests/helpers/setup.ts`](tests/helpers/setup.ts), shared with the a11y
  suite): components upgraded (`:defined` plus Stencil's `hydrated` class – the loader partial ships no
  `componentsReady()`), the design system fonts requested explicitly (`document.fonts.ready` alone settles nothing that
  has not started, and fallback metrics wrap a line differently), images complete, videos reset to their poster, the
  focus a pattern took on load released, and a one pixel viewport nudge so self-measuring components measure with the
  final layout.
- **Third-party images are stubbed.** The footer loads three payment logos from a Porsche CDN; the run answers every
  non-local request itself, so a baseline records the layout of the page rather than the availability of a network.
- `patterns-header-stacked` has no 200% font size capture: its category tabs flip between showing and hiding their
  scroll affordance while the suite runs in parallel, which changes the page height by 34px. Its other captures still
  cover it – see the comment in its spec.

## Conventions that are easy to get wrong

- **Write an optional class as a template literal** — ``class={`p-static-xs ${scheme}`}`` with `scheme = ''` as the
  default. `renderPage()` trims and collapses every `class` attribute (`normalizeClassAttributes()` in
  [`lib/jsx.ts`](lib/jsx.ts)), because Prettier leaves attribute values alone, so an unset class leaves no stray space
  in the markup.
- **Use plain HTML attribute names** — `class`, `for`, `charset`, `novalidate`. Preact accepts and types them, and the
  generated markup has to stay copy-pasteable HTML. `className`/`htmlFor` are a test failure, not a style preference.
- **JSX collapses whitespace between elements.** Elements on separate lines produce no whitespace text node, so
  `renderPage()` formats with `htmlWhitespaceSensitivity: 'ignore'` to keep the output readable. Consequence: inline
  whitespace in `dist/` is decided by the formatter, not by the source. If a pattern ever needs a _meaningful_ space,
  use `&nbsp;` (`{'\u00a0'}`), not a line break.
- **Blank lines are not preserved.** A renderer cannot carry source blank lines into the output, so `dist/` is denser
  than hand-authored markup would be. Structure and attributes are unaffected.
- **Tailwind scans comments too.** The scanner reads whole files, so prose such as "`{% block content %}`" or "relative
  to the page" leaks `.block` and `.relative` into the compiled stylesheet. The same applies to string literals: the
  header variants are named `overlay`/`stacked` precisely because a display keyword would end up as an unused utility.
  Automatic source detection is on, rooted at the Vite project (`src/` here, the page folder of a generated project
  there), so everything below it is scanned and nothing above it is. Check the compiled CSS after larger comment edits.
- **No component takes a `basePath`.** Nothing links out of an example, and asset URLs are not built from one either — a
  page's `style.css` and `main.js` sit next to it and carry no path out of the page folder at all.
- **The shared stylesheet must stay free of relative paths.** It is copied next to every page, at every depth, so a
  `@source "../…"` or an `@import "./…"` would resolve differently in each copy. A unit test asserts it.
- **Data lives in the component that renders it, as its default.** `MainNav` owns `navItems`, `MetaActions` owns
  `metaActionItems`, `NoticeBar` its note and `CategoryTabs` its categories. A page passes nothing unless it differs –
  and since the defaults are exported, not injected, a page can extend them (`[...navItems, extra]`) instead of only
  replacing them. There is no shared data module.
- **A pattern is not a page inside a page.** Patterns use `PatternPage`, which ships no header or footer, because that
  chrome is what the pattern demonstrates. Pass the section as `beforeMain` (headers) or `afterMain` (footers) so its
  landmark sits where it does on a real page.
- **A page built on `p-canvas` adds no landmark of its own.** The component renders the banner, the `main` landmark and
  the two `aside` landmarks in its shadow root, so a `<main id="main">` in the default slot would nest one landmark
  inside another. The page therefore renders the component straight into
  [`TemplatePage`](src/_layouts/TemplatePage.tsx), which writes nothing but the document around it, the color scheme
  classes sit on `<html>` through its `class` prop (the sidebars are rendered on top of the page and a scheme set
  further down would not reach them), and it is axe, on the composed page, that checks for exactly one `main`.
- **The Porsche Grid spans the viewport, the content area of a canvas does not.** Its width changes with the sidebars,
  so `grid-template` and the `col-*` classes of the other examples do not apply there – the admin panel asks the
  container instead (`@container` plus its own columns), which is what the storefront recommends for the default and
  footer slots.
- **Pages are rendered server-side only.** They are not in the client module graph, so the dev server does a full reload
  on any `.ts`/`.tsx` change rather than an HMR patch.
- **PDS components are typed as attributes, not props.** `<p-button>` and friends are typed by
  [`src/_types/pds-jsx.d.ts`](src/_types/pds-jsx.d.ts), which derives the tag names and their props from the Stencil
  types of `@porsche-design-system/components` (a **type-only** import, erased at compile time). Because the output is
  static HTML with nothing setting JS properties afterwards, the attribute names are kebab-cased — write `hide-label`,
  not `hideLabel` — and values are restricted to what survives serialization. String and number unions keep their
  autocompletion (`variant="primary"`); structural values such as `BreakpointCustomizable` objects or the `aria` record
  have to be written as JSON strings (`compact="{ base: false, m: true }"`).
- **No event handler props on PDS components.** There is no client-side framework: the page is rendered to a string, so
  a handler prop such as `onClick` is silently dropped from the output. The typing does **not** catch it – the generic
  DOM attributes of Preact, handlers included, stay allowed on `p-*` elements – so this is a review rule. Behaviour goes
  into a `<Script>` hooked on ids.
- **Behaviour is a `<Script>`, written where its markup is.** [`Script`](src/_partials/Script.tsx) renders a
  `<script type="module">` with the code unescaped – a plain `<script>{code}</script>` would reach the browser as
  `&amp;&amp;`, because Preact escapes the text of every element. The behaviour of an example goes to the end of its
  page; behaviour a partial needs wherever it is rendered goes into the partial (`MainNav` wires up its drilldown,
  `HeroVideo` its pause control, `FeedbackForm` its flow), so a page gets it by rendering the partial – there is no
  detection rule to keep in sync, and two pages sharing a partial do not duplicate its behaviour. Start every script
  with a comment saying what it does: the build names a script by its first line.
- **A page does not reach into the script of a partial.** In dev every `<Script>` is a module of its own, so a page
  cannot call a function a partial's script declares – it would work once built, where they share a scope, and fail in
  dev. What differs between the pages rendering a partial is a prop instead, and what the partial has to react to it
  finds through a relation of its own markup: `FeedbackForm` offers to start over when it is `restartable`, and follows
  the modal it is rendered in through `form.closest('p-modal')` – so the dialog page only opens and closes its modal.
- **Every page opens with `exampleNote`.** [`renderPage()`](lib/jsx.ts) writes it between the doctype and `<html>`, in
  dev and build alike: a comment saying the example is written with web platform technologies but relies on Tailwind CSS
  and with it on a bundler – the wording of the setup popover of the storefront's `WebsiteViewer` – and is built on
  `@porsche-design-system/components-js` in the version the generated projects pin (`pdsVersion`, read like those by
  `readVersions()` of [`lib/shared.ts`](lib/shared.ts), which a unit test holds them to), and what to change to use it
  in a framework – the framework package and its `/tailwindcss` entry, the provider instead of the loader script,
  properties instead of attributes, state and event handlers instead of the page script. It carries no warning, because
  the markup and its classes are meant to be taken over as they are; only the behaviour is dummy code, which the
  `DO NOT USE IN PRODUCTION` banner of `main.js` says. Three things constrain the wording: Tailwind scans the
  `index.html` of every generated project, so a unit test compiles every token of the note and fails on one that yields
  a utility; the dev markup must not reference the entry, so the note names neither `main.js` nor `style.css`; and it
  has to stay a valid comment, without `--`. [`scripts/verify.ts`](scripts/verify.ts) fails if Vite's build of a project
  dropped it.
- **Scripts are moved, styles are copied.** The dev server serves the scripts where they stand – Vite turns every inline
  module script into a module it transforms, bare imports included. `scripts/build.ts` calls `extractScripts()` of
  [`lib/entries.ts`](lib/entries.ts) instead: it removes every `<script type="module">` from the rendered page, in
  document order, and links the generated `main.js` at the end of the body. That entry imports the page's `style.css`,
  then carries the `DO NOT USE IN PRODUCTION` banner once and the scripts one after the other, with their imports
  hoisted to the top. The `style.css` is `src/style.css` copied verbatim – it needs no assembling, which is why there is
  no `getStyleEntry()`. So a consumer sees the markup, the Tailwind classes, the styles and the dummy JavaScript of a
  pattern without following imports, while the source of each is a single component.
- **The scripts of a page share one module scope once built.** In dev each `<Script>` is a module of its own; in
  `main.js` they are one, so `getScriptEntry()` fails the build when two of them declare the same top level name.
  Rename, or wrap the script in a block. In practice this is what stops a page from re-implementing shared behaviour: a
  page rendering the header cannot declare `navButton` again, because `MainNav` already did. Unit tests run the build's
  own extraction over every page, so a clash fails `test:unit` rather than only `build`.
- **A script is a template literal.** A backtick or a `${` meant for the browser has to be escaped – prefer quotes in
  comments over backticks. The code is not type-checked or linted either; the e2e suite is what exercises it.
  `renderPage()` formats with `embeddedLanguageFormatting: 'off'`, so the code is extracted exactly as written; a unit
  test compares the two. `formatScriptEntry()` then runs Prettier over the generated `main.js` – the only place the code
  is formatted, and parsed, so a syntax error fails the build.
- **Scripts address elements by id, written as literals.** The script sits in the same component as the markup it wires
  up, so the two are read – and renamed – together; there is no registry. Every id is rendered **once** per page –
  `getElementById()` would only ever find the first one – which a unit test asserts for every page, because axe-core no
  longer reports duplicate ids (`duplicate-id` is deprecated and outside the WCAG tags the a11y suite runs). A script
  whose element is missing throws on load, which the `loads without reporting an error` check of every e2e spec catches.
  **A script only looks up ids its own file renders** – `HeroVideo` renders the video and its pause control together, so
  no page has to repeat an id a partial depends on. A unit test asserts it for every `.tsx` file, from the
  `getElementById()` and `querySelector('#…')` calls against the `id="…"` attributes of the same file.
- **A variant is a prop, not a copy.** `Header` renders both header patterns from one set of blocks
  (`_partials/header/`), driven by the `navItems` of `MainNav` and the `metaActionItems` of `MetaActions`. If two
  variants need the same block, extract the block; do not paste the markup a second time, or one variant silently drifts
  from the other.
- **The navigation is rendered recursively.** A `NavItem` with `children` becomes a `p-drilldown-item` (plus a leading
  entry pointing at its own page, since a level is not a link), one without becomes a `p-drilldown-link`. Both are valid
  children of `p-drilldown` and of `p-drilldown-item`, which is what makes one component cover every depth.
- **`p-tabs-bar` accepts only `a` and `button` children.** Anything else – a divider, a wrapper – makes it throw at
  runtime, which static markup does not reveal at build time.
- **A color scheme class is never put on the `<header>`.** `scheme-*` cascades, and the drilldown lives inside the
  header while being a dialog on top of the _page_ – a scheme on the `<header>` opens a dark overlay on a light page.
  `Header` hands the scheme to its blocks instead, and each applies it to the elements that really sit on the dark hero;
  `MainNav` puts it on the menu button and not on `p-drilldown`. The same holds for any overlay a partial owns.
- **The PDS partials are injected by the dev server and by the generated projects**, never by `scripts/build.ts`. The
  dev server uses [`lib/partials.ts`](lib/partials.ts); each generated `vite.config.ts` carries its own copy, written by
  [`lib/generateProject.ts`](lib/generateProject.ts), with the component chunks of that category. Without the loader
  script the `p-*` elements never upgrade and `:not(:defined)` keeps them invisible.

## Scope discipline (important)

TSX has no expressiveness ceiling — a page _could_ fetch data, keep state or pull in a component library. A template
engine refuses that by construction; TSX does not, so it has to be a review rule here. This is the main cost of the
approach, and it is paid on every review:

- Pages and partials are **pure, synchronous, presentational** functions. No hooks, no state, no effects, no async.
- No client-side hydration. If an example needs behaviour, write it as plain JavaScript in a `<Script>` of the page and
  hook it on ids; the build moves it into the generated entry.
- No dependency on the PDS React wrapper. If the demos should use real PDS components, use the **web components** via
  the CDN partials, so the output stays framework-free.

## Tooling notes

- Pages, layout and partials are ordinary TSX, so they lint **and** format with Biome. The one carve-out in
  [`biome.json`](../../biome.json) is `a11y/useValidAnchor` for `packages/examples/src/**/*.tsx`, because the
  placeholder links are the demonstration – see _Links: examples never navigate_ for the test replacing it.
- `npm run typecheck` checks pages, partials, `lib/`, scripts and `vite.config.ts`; `build` runs it first. The root
  `typecheck` – the one CI runs – does not include the examples; `typecheck:all` and `typecheck:examples` do. Each test
  scope has its own `typecheck:tests[:scope]`, run first by its test script.
- The JSX transform is configured **once**, in [`tsconfig.json`](tsconfig.json) (`jsx: "react-jsx"`,
  `jsxImportSource: "preact"`). Vite and Vitest pick it up from there; do not duplicate it in the configs.
- Vitest needs its own config because `vite.config.ts` sets `root: 'src'`, which would make Vitest look for tests there.
- Prettier is used as a **library** in the build to format rendered markup, not as a repo formatter for this package.
- **The dev server rewrites the CDN URL.** The partials always emit absolute production URLs
  (`https://cdn.ui.porsche.com/porsche-design-system/…`), regardless of how the monorepo was built. `npm start` starts
  `serve-cdn` alongside Vite, so [`vite.config.ts`](vite.config.ts) rewrites those URLs to `http://localhost:3001` —
  without it the browser loads the components from the production CDN and blocks the loader script with a CORS error.
  The same rewrite exists in the react/angular/vue/storefront dev servers. It is **dev only**; the generated projects
  keep the production URLs.
- **The dev server keeps the scripts inline and links the stylesheet.** `main.js` and `style.css` only exist in the
  generated projects, so the rendered page never references them: the build links the entry, and in dev
  `linkStylesForDev()` links `/style.css` instead, in the middleware of [`lib/jsx.ts`](lib/jsx.ts). Vite's own HTML hook
  turns every `<script type="module">` into a proxy module (`index.html?html-proxy&index=0.js`), which is what resolves
  the bare imports of a script. Together with the CDN rewrite, the stylesheet link and the scripts' position are the
  only differences between dev and the emitted HTML. The partials are injected in a `transformIndexHtml()` hook, after
  Vite's own – see [`vite.config.ts`](vite.config.ts).
- **The dev server lists the pages instead of rendering an overview.** `jsxPages()` wraps Vite's `server.printUrls()`
  and prints the URL of every page below Vite's own, grouped by category – found by `findPages()` in
  [`lib/jsx.ts`](lib/jsx.ts), the same search the Playwright suites use. Nothing is served at `/`, which is why the
  server opens no browser. A page added while the server runs is served right away, but listed after a restart.
- **`preview` serves the built site, it does not build it.** `npm run preview` expects `dist-site/` to exist and starts
  `serve-cdn` next to [`scripts/previewSite.ts`](scripts/previewSite.ts), which serves `dist-site/` below `/examples/`
  on port 3011 and rewrites the CDN origin of every HTML response to `http://localhost:3001`, in memory. It is the same
  command the Playwright suites start as their web server. `dist-site/` itself keeps the production URLs. The loader
  builds one CDN URL by concatenation at runtime, which no rewrite of the markup reaches; the Playwright suites catch it
  in their route handler ([`tests/helpers/setup.ts`](tests/helpers/setup.ts)).
- **The emitted files carry decided modes, not inherited ones.** `fs.cpSync()` copies the mode of every source file, and
  a bind mount does not always report a sane one: in the Playwright container copied media came out write-only, so the
  preview answered its own images with a permission error and a VRT baseline recorded a page without them. The scripts
  therefore set `755`/`644` on everything they emit (`copyDir()` in [`lib/shared.ts`](lib/shared.ts)).

- **`start` and `preview` mean what they mean elsewhere in the monorepo.** `npm start` is the dev server on the source,
  `preview` serves build output – the same split as `start` vs. `start-app` in the wrapper packages and as `preview` in
  `packages/styles`. A change that makes `preview` serve sources again should rename it.

## Knowledge skill

The patterns and templates ship in the `pds-knowledge-*` skill of every wrapper. [`skill/skill.ts`](skill/skill.ts)
exports `examplesSkill`, a `PackageSkill` like the ones of the style packages, registered in
[`packages/storefront/projects/skills/src/knowledge/packageSkills.ts`](../storefront/projects/skills/src/knowledge/packageSkills.ts):

- `intro` is rendered into the section of `SKILL.md`, with the note on converting the examples to its framework.
- `getContent()` renders `references/examples.md` – the catalog of every page with its meta, and what all examples
  share: the conventions of their references and the stylesheet.
- `getReferences()` renders one file per page, `references/examples/<category>/<page>.md`: the meta, the components it
  is built from, the markup of `index.html` without its `<head>` and the note, and `main.js` without the stylesheet
  import. `package.json` and `vite.config.ts` are left out – the skill covers the setup per framework.

`SKILL.md` is in context whenever the other files are read, so none of them repeats it, and the references repeat
nothing the index says – a test of the skills project holds that.

`examplesSkill` imports the source of the package export, `generated/examples.ts` – the files StackBlitz opens – so the
skill shows what the storefront shows. The content is framework-agnostic. Components link to their storefront route
(`/components/button`), sub-components by the component documenting them, and the generator resolves the route to the
component reference. A change to a page changes the staged skill trees, so update the content snapshots of the skills
project with it (`npm run test:unit:skills`).

## Adding a template (a whole page)

1. Create `src/templates/<name>/index.page.tsx` – markup, classes and, in a `<Script>`, behaviour.
2. Export its `meta` – a `title` naming the example on its own and a plain-text `description` of what it shows and when
   to use it – typed as `ExampleMeta` from [`lib/meta.ts`](lib/meta.ts). The storefront, StackBlitz and the knowledge
   skill present the example by it; the build fails without it.
3. Default-export a component that renders `<TemplatePage meta={meta}>`, which writes the meta into the `<head>`. The
   layout writes nothing but the document: the page composes its chrome itself, like a pattern does –
   `<Header currentPage="…" />` (optionally `showSearch`, `variant`, `navItems`, and for `stacked` also `notice` and
   `categoryItems`) and `<Footer />`, or a `p-canvas` for an application page, which then puts its color scheme on
   `<html>` through `class`.
4. Put the markup in `children`, including the page's own `<main id="main">` – except inside `p-canvas`, where the
   component provides that landmark. Links go to `#`, unless they point at an id on the same page.
5. Style with Tailwind utilities; touch `src/style.css` only for genuinely global defaults or theme values.
6. Wire it up as described in _Wiring up a new page_. The dev server lists it on its next start – pages are found by
   file name, not registered.
7. Run `npm run build` and confirm the page still builds and the CSS contains no stray utilities.

## Adding a pattern (a single section)

1. Create `src/patterns/<name>/index.page.tsx`.
2. Export its `meta`, as for a template.
3. Default-export a component that renders `<PatternPage meta={meta}>` with the section itself as `beforeMain` (headers)
   or `afterMain` (footers). The page brings its own `<main id="main">` as `children`; the layout adds nothing around
   it, and the build links the page's `main.js`.
4. Reuse the existing partial and add a prop for the variation instead of copying markup — `Header` takes
   `variant="overlay" | "stacked"`, which is exactly what the two header patterns differ in.
5. Wire it up as described in _Wiring up a new page_. The dev server lists it on its next start – pages are found by
   file name, not registered.
6. If the pattern needs behaviour of its own, write it in a `<Script>` at the end of the page; the build moves it into
   the generated entry, which brings the stylesheet import and the banner. Behaviour a partial needs wherever it is
   rendered goes into a `<Script>` of that partial. Hook it on ids and query them with `getElementById()`.
7. Run `npm run build`, then the unit and a11y tests; together they assert the accessibility baseline for every page,
   patterns included.

## Wiring up a new page

Pages are found by file name – by the build, the dev server and the Playwright suites. A few lists are still kept by
hand, and nothing fails when one of the first two is forgotten:

1. **Component chunks.** Add every `p-*` element the page renders that is not listed yet to `patternComponents` or
   `templateComponents` in [`lib/projects.ts`](lib/projects.ts) – the chunks its generated project preloads. A missing
   entry costs a round trip, not correctness.
2. **Unit tests.** Add the page to `templatePages` or `patternPages` in
   [`tests/unit/helpers/index.ts`](tests/unit/helpers/index.ts). Every per-page unit test – links, ids, headings, `nav`
   labels, script extraction – iterates that list, so a page missing from it is not unit-tested at all.
3. **Playwright specs.** Write `tests/{e2e,a11y,vrt}/specs/<category>/<page>.<suite>.ts` (the page folder with `/` as
   `-`: `patterns/header-overlay.e2e.ts`), each starting from the checks the other specs of its suite share. The
   `coverage.*` specs fail until all three exist. Generate the VRT baselines in Docker –
   `./docker.sh npm run test:vrt:examples` writes the missing ones.
4. **Storefront.** Add a `page.mdx` rendering `<ExampleViewer example="<category>/<page>" />` – it shows the description
   and frames the page under its title, all imported from the package export – and an entry in
   [`packages/storefront/src/sitemap.tsx`](../storefront/src/sitemap.tsx).
5. **Knowledge skill.** Nothing to register – the page is picked up from the package export. Update the content
   snapshots of the skills project (see _Knowledge skill_).

## Accessibility baseline

Every example ships a `main` landmark, labelled `nav` elements, `aria-current="page"` on the active nav item only and
visible `:focus-visible` outlines on every interactive element no PDS component styles (the Tailwind
`focus-visible:outline outline-focus` utilities). High Contrast Mode is left to the PDS components – there is no
`forced-colors` block of our own – and captured in both schemes by the VRT. Templates additionally carry the `header`
and `footer` landmarks; a pattern carries the landmark of the section it demonstrates. A page built on `p-canvas` gets
all of them from the component and therefore renders none itself. These demos are documentation, so they have to be
correct by example — keep the baseline when adding examples. The unit tests and the a11y suite assert it for every page.

**A heading belongs to the content, not to the pattern.** Templates and the header patterns have exactly one first level
heading, because the content below the header is part of what they show. The footer pattern has none: its `main` is
empty and carries no spacing, so the footer is seen on its own instead of below a placeholder heading. The shared test
therefore asserts _at most_ one first level heading per example, and the per-pattern suites pin down which of the two a
page is — do not "fix" a missing heading by adding one back to a pattern that deliberately shows nothing above its
section.
