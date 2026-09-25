# Serving the examples from the storefront

> Status as of 2026-09-24. **Supersedes** A2, A3, Track B and Track C of [`MIGRATION.md`](MIGRATION.md) for patterns and
> templates. A1 and A4 (noindex, a11y and e2e suites) stay done and stay valid.
>
> Companion documents: [`AGENTS.md`](AGENTS.md) (how the package works) and [`COMPARISON.md`](COMPARISON.md) (why the
> template layer is TSX).

## The decision

**Nothing of `patterns/` or `templates/` is merged into the
[examples repository](https://github.com/porsche-design-system/examples), and nothing of them is deployed through its
`gh-pages` branch any more.** Instead:

1. Every pattern and template page is **built once, in this repository**, from its generated project in `dist/`.
2. The build emits **one self-contained HTML file per page**: its CSS and its JavaScript are inlined.
3. Those files are copied into the storefront's `public/` folder, so they ship **inside the storefront deployment**, and
   `WebsiteViewer` frames them same-origin.
4. The generated project of a page, what `dist/` holds today, is no longer shown as a GitHub tree. It is opened with
   **"Open in StackBlitz"** in the viewer instead, so it can be read, built in a WebContainer and edited in one place.

Hosting inside the storefront gives us versioning, nightly, version branch previews, pull request previews and their
cleanup without writing any of it, because the storefront already has all of them:

| Monorepo event              | Storefront slug       | Examples served at                     | Removed by                               |
| --------------------------- | --------------------- | -------------------------------------- | ---------------------------------------- |
| pull request                | `pr-1234`             | `/pr-1234/examples/…`                  | `cleanup-preview.yml` + 90-day lifecycle |
| push to `main`              | `nightly`             | `/nightly/examples/…`                  | overwritten by the next push             |
| push to version branch `v5` | `v5-preview`          | `/v5-preview/examples/…`               | overwritten by the next push             |
| stable release `4.8.0`      | `v4.8.0` **and** `v4` | `/v4.8.0/examples/…`, `/v4/examples/…` | never (pinned), next release (alias)     |
| RC / beta / alpha           | `v5.0.0-rc.0` only    | `/v5.0.0-rc.0/examples/…`              | never                                    |

The "major alias footgun" of MIGRATION.md A2 (an RC overwriting `v4`, or a release publishing only the pinned slug) does
not exist in this design. The examples follow whatever `release.yml` already decides for the storefront.

### What this drops from MIGRATION.md

- The deploy job to the storefront bucket (A2), the tarball `overrides`, and the checkout of the examples repository.
- The commit-back pull request to the examples repository (B1), the "generated, do not edit" marker and CODEOWNERS there
  (B1/C1).
- The `gh-pages` redirect stubs (A3/C2). **The existing `patterns/` and `templates/` output on `gh-pages` is kept**, so
  already released storefronts, which request `…github.io/examples/v4/patterns/header/1`, keep working the way they do
  today. That needs one change in the examples repository's deploy, see "Settled decisions".

### What stays as it is

- The seven framework apps in the examples repository, their `gh-pages` deployment and the `WebsiteViewer` usage on
  `/developing/{framework}/…`. Those pages keep "Source Code" (GitHub tree) and the `github.io` iframe.
- The TSX source tree, the dev server, the unit tests and the three Playwright suites (which are retargeted, see step
  6).

---

## Target pipeline

```text
src/**/*.page.tsx
  │  scripts/build.ts                       (exists, output restructured – step 1)
  ▼
dist/<category>/<page>/                     one standalone Vite project per page = the StackBlitz project
  ├── package.json  vite.config.ts
  ├── index.html    main.js    style.css
  │
  │  scripts/buildSite.ts                   (new – step 3), runs each project's own vite.config.ts
  ▼
dist-site/
  ├── media/                                public/examples/media/ copied once (step 2)
  ├── patterns/header/overlay/
  │   ├── index.html                        CSS + JS inline, only PDS CDN and media stay external
  │   └── stackblitz.json                   the files of dist/patterns/header/overlay, verbatim
  └── templates/…
  │
  │  storefront prebuild: build:copyExamples (new – step 4), inserts the slug into the media paths
  ▼
packages/storefront/public/examples/        git-ignored, media at public/examples/media/
  │  next build (output: 'export')
  ▼
packages/storefront/dist/examples/…         deployed under the storefront slug
```

**Invariant: `dist-site/` must not depend on the storefront slug.** `release.yml` restores the `build-production`
artifact and rebuilds the storefront with a _different_ `NEXT_PUBLIC_BASE_PATH` (`v4.8.0`, then the `v4` alias). So
every URL inside `dist-site/` is either slug-free (`/examples/media/…`) or points at `cdn.ui.porsche.com`. The slug is
added by `build:copyExamples`, which runs inside each of those storefront builds (step 2).

---

## Step 1 — one generated project per page

**Decided (2026-09-24), see "Settled decisions".** Today `dist/` holds two projects, one per category, with all pages as
rollup inputs and a shared `public/`. StackBlitz receives exactly one page. If the StackBlitz project were derived from
the category project at open time, it would be a third artifact that no build and no test ever runs.

With one project per page, the **same** generated project is built twice: by CI for the iframe, and by the WebContainer
for StackBlitz. What the viewer shows is what StackBlitz builds.

```text
dist/patterns/header/overlay/
├── package.json        # generated, name e.g. "@porsche-design-system/example-patterns-header-overlay"
├── vite.config.ts      # generated, root '.', a single index.html – no rollupOptions.input list
├── index.html
├── main.js
└── style.css
```

Changes:

- [`scripts/build.ts`](scripts/build.ts): write each page into its own project, no `public/` copy (see step 2).
- [`scripts/generateProject.ts`](scripts/generateProject.ts): `getViteConfig()` for a single page, `root` is the project
  itself, `base`/`baseEnvVariable` go (step 2 makes all URLs relative). Component preloads per page rather than per
  category is a nice-to-have (AGENTS.md open item 5), not required.
- [`plugins/projects.ts`](plugins/projects.ts): `packageName` (the examples repository workspace names),
  `baseEnvVariable` and `previewPort` lose their purpose.
- [`scripts/buildGeneratedProject.ts`](scripts/buildGeneratedProject.ts), [`scripts/verify.ts`](scripts/verify.ts),
  [`scripts/previewProject.ts`](scripts/previewProject.ts): iterate pages instead of categories.
- Tailwind's automatic source detection is rooted at the project, so a page's CSS then contains only its own utilities
  (today it carries those of its whole category, ~1 kB).
- The **category overview pages** are dropped (see "Settled decisions"): `src/{patterns,templates}/index.page.tsx` are
  deleted, and nothing is emitted for `dist/<category>/` itself.

## Step 2 — media

Three constraints meet here:

- The pages reference 14 media files **root-absolute** (`src="/718.webp"`, `poster="/mood-porsche-gts.webp"`), which
  breaks under `/<slug>/examples/…`.
- The StackBlitz SDK only accepts text files (`ProjectFiles` is `Record<string, string>`), so binaries cannot be sent.
- `public/` is 9.9 MB (8.1 MB of it the hero video) and is copied into **both** category projects today.

**Decided (2026-09-25):** the media are served from the storefront, at `packages/storefront/public/examples/media/`, and
every page references them by an **absolute path that includes the storefront slug**: `/v4.8.0/examples/media/718.webp`,
`/pr-1234/examples/media/718.webp`. The same path works in the iframe, in "View Fullscreen" and, with the origin in
front, in StackBlitz.

**Why `public/examples/media/`:** `public/assets/` belongs to the storefront itself. Everything of the examples lives
under one folder, `public/examples/`, which is one git-ignore line, one `rm -rf` in the copy step and one prefix to
reason about. `media` sits next to the categories (`public/examples/{patterns,templates,media}/`) and cannot clash with
a page, because pages only live below a category; `plugins/projects.ts` rejects a category named `media`. "media" rather
than "assets", because the name `assets` is already taken three times over: `public/assets/` of the storefront, Vite's
`assets/` output folder and `packages/assets`.

Resulting URLs:

| Where                          | URL of `718.webp`                                            |
| ------------------------------ | ------------------------------------------------------------ |
| released storefront            | `/v4.8.0/examples/media/718.webp`                            |
| `v4` alias                     | `/v4/examples/media/718.webp`                                |
| pull request preview           | `/pr-1234/examples/media/718.webp`                           |
| local storefront (no basePath) | `/examples/media/718.webp`                                   |
| StackBlitz                     | `https://<storefront origin>/v4.8.0/examples/media/718.webp` |

**The slug is inserted by the storefront copy step, not by this package's build.** `release.yml` restores one
`build-production` artifact and runs `build:storefront` again per slug (`v4.8.0`, then `v4`), so a slug baked into
`dist-site/` would be the wrong one on every release. `build:copyExamples` runs in the `prebuild` of exactly that
storefront build and knows its slug through `getBasePath()`, the same value Next.js uses for its own `basePath`. The
slug invariant (see "Target pipeline") therefore holds unchanged.

**The origin is added only for StackBlitz, at click time.** A root-absolute path is enough for the iframe and for "View
Fullscreen", which are same-origin. The WebContainer is not, so the StackBlitz payload needs the full URL. That origin
is not known at build time (local, preview and production go through one build), but the storefront knows it at runtime:
`window.location.origin`. `<img>` and `<video>` need no CORS.

**No deployment is bound to `designsystem.porsche.com`.** Neither `dist-site/` nor the deployed storefront contains the
origin, so a deployment moved to another subdomain opens StackBlitz with the media URLs of that subdomain. Only
StackBlitz projects that already exist keep the old origin, i.e. ones a user forked or saved. The redirect from the old
subdomain covers those, and a move needs that redirect anyway for bookmarks, external links and search results. What a
deployment **is** bound to is its slug, and it already is today: `basePath` and `<base href>` are compiled into every
storefront build, which is why `release.yml` rebuilds once per slug. The storefront itself no longer hard-codes the
origin either (2026-09-25): the version switch in
[`VersionSelect.tsx`](../storefront/src/components/common/VersionSelect.tsx) navigates to
`${window.location.origin}/v<version>`, and the "earlier release" banner in
[`Canvas.tsx`](../storefront/src/components/layout/Canvas.tsx) links to the root-absolute `/`. Deployments made before
that change still link to `https://designsystem.porsche.com`, which the redirect covers as well.

Plan:

1. Move the 14 files from `packages/examples/public/` to `packages/examples/public/examples/media/`. The dev server of
   this package keeps `publicDir: '../public'`, so it serves them at `/examples/media/…` without any code.
2. Author every reference through one helper, e.g. `media('718.webp')`, backed by a constant
   `mediaPath = '/examples/media/'` in `plugins/projects.ts`. The generated `dist/` sources and `dist-site/` carry
   `/examples/media/718.webp`: storefront-root-relative, slug-free.
3. `buildSite.ts` copies `public/examples/media/` **once** to `dist-site/media/`.
4. `copyExamples.ts` (step 4) prefixes `/examples/media/` with `/<slug>` in every `index.html` and `stackblitz.json`
   when the storefront has a basePath; locally it leaves the path as is.
5. `openExampleInStackblitz()` (step 5) prefixes that path with `window.location.origin`.
6. `build:verify` asserts that `/examples/media/` appears only in `src`, `srcset` and `poster` attributes and that no
   other root-absolute URL survives, so a hard-coded `/foo.webp` fails the build instead of shipping a broken image.

Consequences, accepted:

- **+~10 MB in every storefront build and every slug**, including every pull request preview, which the 90-day lifecycle
  and `cleanup-preview.yml` remove again.
- **A StackBlitz project points at the slug it was opened from.** A fork a user saves from `/pr-1234/` loses its media
  once that preview is cleaned up, and one saved from `/v4/` gets the next release's media. Opened from a pinned slug
  (`/v4.8.0/`), it keeps working for good.

## Step 3 — build the site: one HTML file per page

New `scripts/buildSite.ts`, run by this package's `build` after `scripts/build.ts`:

1. For every page project, call Vite's `build()` with that project's own `vite.config.ts` as `configFile`, and add
   **only here** an inline plugin plus `build.modulePreload.polyfill: false`. The plugin is never written into `dist/`,
   so the StackBlitz project stays a plain, idiomatic Vite project.
2. The inline plugin (`plugins/inline.ts`, ~50 lines): in an `enforce: 'post'` `generateBundle` hook, replace the single
   `<script type="module" src>` with an inline module script and the single `<link rel="stylesheet">` with a `<style>`,
   and drop the emitted chunks. Anything else in the bundle fails the build. See "Spike: own inline plugin vs.
   `vite-plugin-singlefile`" below (decided: own plugin).
3. Write `stackblitz.json` next to the page: `{ title, description, files }`, with `files` read **verbatim** from
   `dist/<category>/<page>/`. A few kB per page.
4. Assert the result (moves into `build:verify`, step 6).

Notes:

- Inline module scripts are deferred exactly like external ones, so `main.js` still finds its elements by id.
- The loader partial is already inline and is not touched, so its CSP hash stays valid. The framed document has no CSP
  of its own (the meta tag is disabled in the generated config), and the storefront's CSP does not apply to it.
- **Deliberately external:** PDS component chunks, fonts and icons from `cdn.ui.porsche.com`, and the media. The CDN is
  content-addressed and [`deploy.yml`](../../.github/workflows/deploy.yml) uploads `packages/assets/cdn/components/` on
  every push and same-repo pull request, so a pull request preview frames **that pull request's** components.
- `dist-site/` keeps production CDN URLs. The local rewrite to `http://localhost:3001` happens in the storefront copy
  step (step 4), under the same condition as `layout.tsx`.

### Spike: own inline plugin vs. `vite-plugin-singlefile` (2026-09-24)

Setup: `header/overlay` and `feedback/dialog` rebuilt as single-page projects in the shape step 1 describes (their
`index.html`, `main.js` and `style.css` from `dist/patterns`, the generated `vite.config.ts` reduced to one page with
`publicDir: false`), built with Vite 8.3.0 through the JS API with the generated config as `configFile`. Four variants:
no plugin, a ~50-line own plugin, `vite-plugin-singlefile@2.3.3` with defaults, and the same with its recommended config
switched off. Every output was then loaded in Chromium, WebKit and Firefox against `serve-cdn`. The spike code is not
committed.

**Happy path: equivalent.** Both plugins produce a single `index.html` with no local `<script src>` or `<link>` left.
The PDS loader script is byte-identical to `getLoaderScript()` in both, so its CSP hash still holds. In all three
engines, all `p-*` elements get defined, Tailwind applies, and the inline module still runs deferred (the menu button
opens the drilldown). Build time is the same (~20–70 ms per page). Without a plugin, the page breaks because its entry
is requested from `/assets/…`, which is exactly the base-path problem inlining removes.

**Where they differ:**

|                                             | Own plugin                                              | `vite-plugin-singlefile` (defaults)                                         |
| ------------------------------------------- | ------------------------------------------------------- | --------------------------------------------------------------------------- |
| Size, `header/overlay`                      | 36.27 kB (8.79 kB gzip)                                 | 36.98 kB (9.12 kB gzip)                                                     |
| Vite's modulepreload polyfill               | off (`modulePreload.polyfill: false`)                   | shipped inline, dead code on a page without preloads (~0.7 kB)              |
| Leftover attributes                         | `<script type="module">`, `<style>`                     | `<script … crossorigin>`, `<style rel="stylesheet" crossorigin>`            |
| An asset imported from JS/CSS (0.6 MB webp) | **build fails**, naming the file                        | silently base64-inlined (`assetsInlineLimit: () => true`)                   |
| A dynamic `import()`                        | **build fails**, naming the extra chunk                 | silently merged (`codeSplitting: false`), plus Vite's preload helper        |
| `</script>` / `<!--` inside the code        | escaped                                                 | escaped                                                                     |
| Config it changes                           | `modulePreload`, `cssCodeSplit`, `assetsInlineLimit: 0` | also `base: './'`, `assetsDir: ''`, `chunkSizeWarningLimit`                 |
| Dependency                                  | none                                                    | new devDependency (MIT, one maintainer), peer `rollup ^4.59` even on Vite 8 |

Switching off the recommended config (`useRecommendedBuildConfig: false`, `removeViteModuleLoader: true`) closes the
size and polyfill gap, but not the attributes and not the silent handling. By then we are configuring around most of
what the library does.

**Decision (2026-09-25): own plugin.** One page means one script and one stylesheet, which is what step 1 already
guarantees. `vite-plugin-singlefile` is built for the general case, merging chunks and base64-inlining assets, and here
that general case is exactly the thing that should not happen. An example that grows a dynamic import or imports a 4 MB
video would be inlined without a sound. The own plugin turns it into a build error. It costs about 50 lines plus unit
tests, and keeps a dependency out of syncpack, ORT and Dependabot. Neither plugin reaches the StackBlitz project,
because both are only added by `buildSite.ts`.

For the real implementation, match the script and link tags by `src`/`href` regardless of attribute order. The spike
matched Vite's exact tag format, which is correct today but brittle. The plugin already errors when it does not find
exactly one of each, so a format change in Vite fails loudly either way.

## Step 4 — wire into the storefront build

- `packages/storefront/package.json`: add `build:copyExamples` to `prebuild` (a small `scripts/copyExamples.ts`):
  `rm -rf public/examples`, copy `../examples/dist-site`, prefix `/examples/media/` with `/<getBasePath()>` in every
  `index.html` and `stackblitz.json` (step 2), and apply `rewriteCdnUrlsForDev()` when `isDevEnvironment`
  ([`src/utils/isDev.ts`](../storefront/src/utils/isDev.ts)) is true. Fail loudly if `dist-site/` is missing, rather
  than exporting a storefront with empty iframes.
- `packages/storefront/.gitignore`: `public/examples/`.
- Root `package.json`, `build` and `build-prod`: add `npm run build:examples` after `build:components-js` (the generated
  configs import `@porsche-design-system/components-js/partials`) and before `build:storefront`.
- [`build.yml`](../../.github/workflows/build.yml), both jobs: `npm run build:examples` before `build:storefront`, and
  **`./packages/examples/dist-site/` in both artifact lists** — the release jobs in
  [`release.yml`](../../.github/workflows/release.yml) restore `build-production` and run `build:storefront` again,
  whose `prebuild` needs it.
- The `Examples` job in [`test.yml`](../../.github/workflows/test.yml) can then restore `dist-site/` instead of
  rebuilding it through the `pretest:*` scripts.

## Step 5 — `WebsiteViewer`

[`WebsiteViewer.tsx`](../storefront/src/components/common/WebsiteViewer.tsx) gets a second mode, as a discriminated
union, so the framework pages stay untouched:

```tsx
type WebsiteViewerProps =
  | { example: `${'patterns' | 'templates'}/${string}`; title: string } // new
  | { sourceCodePath: string; viewPath: string; title: string }; //       /developing/* – unchanged
```

For `example`:

- **iframe `src`** and **"View Fullscreen"**: `examples/${example}/`, resolved through the `<base href>` that
  `layout.tsx` already sets from `getBasePath()`. Use a plain `<a target="_blank">` for the fullscreen link, not
  `next/link`, because a file in `public/` is not a route.
- **"Source Code" is replaced by "Open in StackBlitz"**: a `PButtonPure` with `icon-source="stackBlitzIcon"` and
  `aria={{ 'aria-description': 'Opens in new tab' }}`, like
  [`OpenBugTemplateInStackBlitz.tsx`](../storefront/src/components/common/OpenBugTemplateInStackBlitz.tsx).
- **Fetch `stackblitz.json` on mount, not on click.** `sdk.openProject()` opens a new tab and needs transient user
  activation; an `await fetch()` between the click and the call risks the popup blocker, notably in Safari. The button
  stays disabled until the payload is there.
- Add `openExampleInStackblitz({ title, description, files })` to
  [`projects/stackblitz`](../storefront/projects/stackblitz), so `@stackblitz/sdk` stays in one place:
  `template: 'node'`, `openFile: 'index.html'`, the slugged media paths prefixed with `window.location.origin` (step 2).
- CSP: `frame-src 'self'` already allows the iframe. `https://porsche-design-system.github.io` stays for the framework
  apps.

Then update the 6 mdx files under `packages/storefront/src/app/(main)/{patterns,templates}/` (10 viewers) with the path
mapping from [MIGRATION.md A3](MIGRATION.md#a3-repoint-the-storefront): `patterns/header/1` → `patterns/header/overlay`,
and so on. The two header variants are still ⚠️ **to be verified** there, and the headings ("Variant 1" → "Overlay") can
be renamed in the same go.

## Step 6 — tests and verification

This package:

- **VRT, e2e, a11y** retarget from the two `preview:*:app` servers (category builds in `dist-tmp/` on 3011/3012) to one
  static server that serves `dist-site/` at `/examples/`, like a storefront without basePath, with the CDN rewrite, i.e.
  to exactly the bytes the storefront serves. The 69 VRT baselines left after dropping the overview pages are expected
  to match unchanged (inlining changes no pixel); run it in Docker, and treat any diff as a finding rather than
  re-recording.
- **`build:verify`** asserts, per page: exactly one HTML file; no `<script src>` and no stylesheet `<link>` except
  `cdn.ui.porsche.com`; no root-absolute URL left; the `stackblitz.json` file set equals `dist/<category>/<page>/`.
  Building each project with its own config is the site build itself, so "StackBlitz can build it" is covered.
- **Unit tests** for the inline plugin, the `media()` helper and the payload shape.

Storefront:

- e2e: on a pattern page the iframe is same-origin, loads, its `p-*` elements get defined and its media answer `200`.
- unit: `copyExamples.ts` inserts the slug for a basePath and leaves the path alone without one.
- e2e: "Open in StackBlitz" — intercept the form submission or `window.open` and assert the payload, rather than driving
  stackblitz.com. The existing [`stackBlitz.e2e.ts`](../storefront/tests/e2e/specs/stackBlitz.e2e.ts) is skipped
  precisely because that is not reliable in CI.

## Step 7 — docs and cleanup

- [`AGENTS.md`](AGENTS.md): rewrite "`dist/` is source, not a website" (it now is the StackBlitz source **and** the
  input of `dist-site/`), the structure section, the commands and the open items (item 4 is resolved, item 6 becomes
  moot).
- [`MIGRATION.md`](MIGRATION.md): reduce to what is still true, or archive it.
- [`docs/release.md`](../../docs/release.md): the "Integration test" step no longer applies to patterns and templates;
  it still applies to the seven framework apps.
- Changelog: none. The storefront and this package are not a published subpath — see
  [`docs/public-api.md`](../../docs/public-api.md) and [`docs/changelog.md`](../../docs/changelog.md).

## Suggested slicing

| PR  | Scope                                                                                                         | Visible effect   |
| --- | ------------------------------------------------------------------------------------------------------------- | ---------------- |
| 1   | Steps 1–3 and the examples part of 6: per-page `dist/`, media, `dist-site/`                                   | none             |
| 2   | Step 4: storefront copy, root build chain, CI artifacts                                                       | files deployed   |
| 3   | Step 5 and the storefront part of 6: `WebsiteViewer`, StackBlitz, mdx paths                                   | storefront wired |
| 4   | Step 7                                                                                                        | docs             |
| 5   | Examples repository, after the next stable release: remove `patterns/`, `templates/`, keep them on `gh-pages` | cleanup          |

PR 2 already proves the hosting end to end: its own pull request preview serves `/pr-<n>/examples/…`.

**Progress (2026-09-25): slice 1 is implemented.** `npm run build` now runs `scripts/build.ts` (one project per page),
`scripts/buildSite.ts` (one HTML file per page plus `stackblitz.json`, media once) and `scripts/verify.ts`, so a page
that references a local file, a missing or unused medium, or ships a payload that differs from its project fails the
build. `npm run preview:examples` serves `dist-site/` below `/examples/` on port 3011, and the Playwright suites run
against it. The 69 VRT baselines left after dropping the overview pages match unchanged in Docker. Two details the plan
did not anticipate: a page without behaviour (the footer) builds to no script chunk at all, which the inline plugin
accepts; and the conceptual sections of `README.md` and `AGENTS.md` still describe the old layout (only their commands
are updated), which is step 7.

**Progress (2026-09-25): slice 2 is implemented.** `build:copyExamples` runs last in the storefront's `prebuild`
(`scripts/copyExamples.ts`, pure rewrites in `scripts/rewriteExamples.ts` with a unit test), `build:examples` runs
before `build:storefront` in the root `build`/`build-prod` and in both jobs of `build.yml`, and `dist-site/` is part of
both artifacts. Verified with `NEXT_PUBLIC_BASE_PATH=pr-4652`: the export contains `dist/examples/` with
`/pr-4652/examples/media/…` in the pages and the payloads. One deviation from step 4: the development check cannot use
`isDevEnvironment`, because `prebuild` runs before Next.js sets `NODE_ENV`, which that helper would read as "not
production". The copy step reads `NEXT_PUBLIC_PDS_ENV=development` instead, which the test builds already set and
`npm run dev` now sets for its `prebuild`.

**Progress (2026-09-25): slice 3 is implemented.** `WebsiteViewer` takes `example="patterns/header/overlay"` next to the
unchanged framework mode, frames `/<slug>/examples/…`, and replaces "Source Code" with "Open in StackBlitz"
(`openExampleInStackblitz()` in `projects/stackblitz`, payload fetched on mount, media prefixed with the origin at click
time). The 6 mdx pages use the new paths; the header headings are now "Overlay" and "Stacked" (confirmed by the page
titles, "Header 1" and "Header 2"). New e2e spec `websiteViewer.e2e.ts` asserts the frames, their components and media,
and the StackBlitz form payload against a stubbed stackblitz.com; a manual run against the real StackBlitz built and
rendered the landing page in a WebContainer. Knock-on changes: the sitemap fixture swaps the 20 GitHub URLs for the 10
`/examples/…` ones (and drops `https://designsystem.porsche.com/`, gone since the banner links to `/`), the dead-link
checker treats `/examples/…` as static files and keeps them out of its 600 cap, and the storefront a11y suite skips
them, because `packages/examples` scans them with axe itself. Found on the way, not caused by this: the table of
contents links of `/patterns/header/` and `/patterns/feedback/` fail axe `target-size` locally, with the old headings as
well.

---

## Settled decisions

- **One generated project per page, not per category (2026-09-24).** The project StackBlitz receives is the project CI
  builds for the iframe, so there is no derived third artifact that nothing tests. The alternative (keep the category
  projects and emit per-page StackBlitz file sets on the side) is not pursued. See step 1.

- **Media are served from the storefront, at `public/examples/media/`, by a slugged absolute path (2026-09-25).**
  `/<slug>/examples/media/718.webp` in the iframe and fullscreen, with `window.location.origin` in front in StackBlitz.
  The slug is inserted by the storefront copy step, not by this package's build, so one `dist-site/` serves every
  release rebuild. The CDN alternative (content-hashed upload, no 10 MB per slug) is not pursued. See step 2.

- **Own inline plugin, not `vite-plugin-singlefile` (2026-09-25).** Decided after the spike in step 3: equivalent on the
  happy path, but the own plugin fails the build on an imported asset or an extra chunk where the library inlines them
  silently, ships no dead polyfill, and adds no dependency. Implemented as `plugins/inline.ts`, added only by
  `buildSite.ts`, matching the tags by `src`/`href` regardless of attribute order.

- **StackBlitz installs the released `components-js` from npm (2026-09-24, accepted as is).** On a pull request, nightly
  or version branch preview, the iframe frames the local build while StackBlitz resolves the version pinned in the
  generated `package.json` from npm, so the two can differ until the next release. This is the same limitation the
  playground's StackBlitz integration has today. No hint on unreleased slugs, and no attempt to feed unpublished
  tarballs into the WebContainer.
- **`patterns/` and `templates/` are removed from the examples repository (2026-09-24)** — as soon as a stable release
  with the new `WebsiteViewer` is out and the `v4` storefront alias serves it, i.e. once no moving slug frames
  `github.io` for them any more. Until then they stay, because the current `v4` storefront still frames
  `…github.io/examples/v4/{patterns,templates}/…`. The removal, as a pull request against the examples repository's `v4`
  branch (and `main`; `v3` is not touched):
  1. Delete `patterns/` and `templates/`, their two workspaces in the root `package.json` and their scripts, their build
     jobs and artifacts in `build.yml`, and their test jobs.
  2. **Change the `Clean` step of its `deploy.yml`.** It runs `rm -rf ./<slug>` before every deploy, so the first
     framework deploy after the removal would wipe `v4/patterns/` and `v4/templates/` from `gh-pages`. Pinned
     storefronts (`/v4.7.0/`, …) frame those paths forever, so the step has to delete only the seven framework folders
     and leave the two in place, frozen at their last state. The two `Download artifact` steps go.
  3. Side effect, not yet explicitly accepted: the "Source Code" link of those pinned storefronts points at
     `…/examples/tree/v4/patterns/src/…`, which then 404s. The source stays in that repository's history.
- **The category overview pages are dropped (2026-09-24).** `src/patterns/index.page.tsx` and
  `src/templates/index.page.tsx` are noise: the storefront's own navigation replaces them, and no example links back to
  them. Consequences:
  - Their 14 VRT baselines (`{patterns,templates}-index-*`) are deleted, and the a11y and e2e suites cover the 10
    example pages only. They glob `*.page.tsx`, so this follows from deleting the files, but the counts in `AGENTS.md`
    and `MIGRATION.md` A4 (12 pages, 54 a11y checks, 30 e2e checks, 83 baselines) change.
  - `src/index.page.tsx` stays as the **dev server's** entry point. It is never emitted and is the only page left that
    navigates, so `OverviewPage` and `ExampleList` remain, with a single user.
  - The unit tests asserting the overview pages (no `href="#"`, the category overview emitted at the project root) are
    reduced to the dev overview, and "Links: only the overview navigates" in `AGENTS.md` is updated.

## Open decisions

None at the moment.

## Risks

- **Storefront size:** ~10 MB per build and per slug (accepted, step 2).
- **Popup blocker** on "Open in StackBlitz" if the payload is fetched on click (step 5 fetches on mount).
- **WebContainer browser support** is StackBlitz's; the viewer itself does not depend on it.
- **Local storefront dev** needs `npm run build:examples` once before `npm run start:storefront`; `copyExamples` must
  say so instead of silently copying nothing.
