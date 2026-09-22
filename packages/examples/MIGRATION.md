# Migrating the examples repository into the monorepo

> Status as of 2026-09-18. Tracks the replacement of
> [`porsche-design-system/examples`](https://github.com/porsche-design-system/examples) by this package.
>
> Companion documents: [`AGENTS.md`](AGENTS.md) (how the package works, plus its own open items) and
> [`COMPARISON.md`](COMPARISON.md) (why the template layer is TSX).

## Where we stand

The **content** of the `patterns` and `templates` workspaces is fully ported, and the build emits the two standalone
Vite projects that are meant to replace them. What is missing is everything _around_ those pages: the seven framework
starter apps, a deployment, the storefront wiring that points at them, and two of the four test suites.

| Area                    | External repo                                   | Here                            | State        |
| ----------------------- | ----------------------------------------------- | ------------------------------- | ------------ |
| Patterns (8 pages)      | `patterns/src/{feedback,footer,header,popover}` | `src/patterns/…`                | ✅ ported    |
| Templates (2 pages)     | `templates/src/{admin-panel,landing-page}`      | `src/templates/…`               | ✅ ported    |
| Generated Vite projects | hand written workspaces                         | `dist/{patterns,templates}`     | ✅ generated |
| Unit tests              | –                                               | `tests/unit/`                   | ✅ added     |
| VRT                     | `patterns/tests/vrt/` (header only)             | `tests/vrt/` (all pages)        | ✅ exceeded  |
| CI test job             | `test.yml`                                      | `Examples` job in `test.yml`    | ✅ added     |
| **A11y tests**          | `patterns/tests/a11y/` (axe + aria snapshots)   | –                               | ❌ missing   |
| **E2E tests**           | `patterns/tests/e2e/`                           | –                               | ❌ missing   |
| **`robots.txt`**        | `{patterns,templates}/public/robots.txt`        | –                               | ❌ missing   |
| **Deployment**          | `deploy.yml` → gh-pages per slug                | –                               | ❌ missing   |
| **Storefront wiring**   | consumed via hardcoded GitHub URLs              | unchanged, still points outside | ❌ missing   |
| **Framework apps (7)**  | `frameworks/*`                                  | –                               | ❌ missing   |
| **Release docs**        | `docs/release.md` points at the external repo   | unchanged                       | ❌ stale     |

Track A and C below are small. **Track B is the long pole and is the only reason the external repository still has to
exist.**

---

## Track A — ship what is already here

Unblocks patterns and templates independently of the framework apps. Each step is landable on its own.

### A1. `robots.txt` per generated project

The external projects shipped `User-agent: *` / `Disallow: /` so the demos never got indexed. `public/` here has no
`robots.txt`, so the generated projects would be indexable the moment they are deployed.

- Add it to `public/`, or emit it from [`scripts/generateProject.ts`](scripts/generateProject.ts) alongside
  `package.json` and `vite.config.ts`.
- Emitting is the better fit: it is deployment policy, not an asset of the examples, and it keeps `public/` purely
  content. It also survives the per-category `public/` split (AGENTS.md open item 6).

### A2. Deploy the two generated projects

`dist/patterns` and `dist/templates` are built by CI but published nowhere, so nothing can link to them yet.

- `base` is already parameterised — `PATTERNS_PUBLIC_BASE_PATH` and `TEMPLATES_PUBLIC_BASE_PATH` in
  [`plugins/projects.ts`](plugins/projects.ts) — and matches what the external `build.yml` set. No source change needed.
- **Decision required:** gh-pages (what the external repo did, keeps URLs stable) vs. the storefront's S3 + CloudFront
  path already wired in [`deploy.yml`](../../.github/workflows/deploy.yml). The latter aligns the demos with the
  storefront's own slug scheme (`pr-1234`, `nightly`, `v4`) and OIDC roles; the former avoids inventing a new bucket
  layout and keeps the existing public URLs working.
- Whichever is chosen, the job needs: build → `vite build` both projects (`build:verify` already does this into
  `dist-tmp/`) → upload per slug.

### A3. Repoint the storefront

[`WebsiteViewer.tsx`](../storefront/src/components/common/WebsiteViewer.tsx) hardcodes:

```ts
const GITHUB_TREE_BASE = 'https://github.com/porsche-design-system/examples/tree';
const GITHUB_PAGES_BASE = 'https://porsche-design-system.github.io/examples';
```

Both must follow A2. The `sourceCodePath` also has to point into this monorepo instead — note the source now lives at
`packages/examples/src/…` and is TSX, while `viewPath` addresses the **built** project, so the two no longer share a
prefix the way they did.

Paths additionally moved from a numeric scheme to semantic names:

| Storefront `viewPath` (today) | New page                               | Confirmed by                              |
| ----------------------------- | -------------------------------------- | ----------------------------------------- |
| `patterns/header/1`           | `patterns/header/overlay`              | ⚠️ **verify** — mdx says only "Variant 1" |
| `patterns/header/2`           | `patterns/header/stacked`              | ⚠️ **verify**                             |
| `patterns/footer/1`           | `patterns/footer`                      | only variant                              |
| `patterns/feedback/1`         | `patterns/feedback/inline`             | mdx heading "Inline"                      |
| `patterns/feedback/2`         | `patterns/feedback/dialog`             | mdx heading "Dialog"                      |
| `patterns/popover/1`          | `patterns/popover/local-market-switch` | mdx heading                               |
| `patterns/popover/2`          | `patterns/popover/priority-navigation` | mdx heading                               |
| `patterns/popover/3`          | `patterns/popover/feature-tour`        | mdx heading                               |
| `templates/admin-panel/1`     | `templates/admin-panel`                | only variant                              |
| `templates/landing-page/1`    | `templates/landing-page`               | only variant                              |

Touches 6 mdx files under `packages/storefront/src/app/(main)/{patterns,templates}/`. Consider renaming the storefront
headings too ("Variant 1" → "Overlay" / "Stacked"), so the docs match the names the examples now use.

> **Old URLs will 404** for anyone who bookmarked them, and the numeric paths are baked into released storefront
> versions. If gh-pages is kept (A2), leave redirects behind; if not, accept the break and note it.

### A4. Port the a11y and e2e suites

The external `patterns/tests/` carried two suites this package does not have:

- **a11y** — `@axe-core/playwright` plus `aria.yml` snapshots, for `feedback-1` and `header-1` only.
- **e2e** — behavioural specs, for `feedback-1` and `header-1` only.

Both were partial. Since the VRT spec here already globs `*.page.tsx`, prefer porting them **globbed** rather than per
page, so new examples are covered automatically — the accessibility baseline in `AGENTS.md` is written as a property of
every page, and a11y coverage of 2 of 10 pages does not enforce it. The e2e suite is the one place the controlled-mode
behaviour (`main.js`) is actually exercised.

Needs `@axe-core/playwright` added to this package and new `test:a11y:examples` / `test:e2e:examples` scripts wired into
the root `package.json` and the `Examples` CI job.

---

## Track B — port the seven framework apps

**The long pole.** `frameworks/{angular,astro,next-js,react,react-router,vanilla-js,vue}` — each a full starter app with
its own `package.json`, build, Playwright e2e config, and a `README.md`. All seven are linked from the storefront
(`/developing/{framework}/demo` and `/developing/{framework}/form`), and `docs/release.md` uses them as the manual
integration test for release candidates.

They are **not** the same as the existing wrapper test apps in `packages/components-{react,angular,vue}/projects/` —
those exist to test the wrappers; these are consumer-facing demos of a form and a colour-scheme switch. `astro`,
`vanilla-js` and `react-router` have no monorepo counterpart at all.

**Decision required before any work starts:** one workspace per framework under `packages/examples/frameworks/*`
(faithful port, seven new entries in the root `workspaces` array), or fold them into the existing wrapper projects (less
duplication, but mixes test apps with published demos and does not cover astro / vanilla-js).

Per app, the port needs: workspace registration, dependency reconciliation against the monorepo's syncpack policy, a
build wired into `build.yml` with its `*_PUBLIC_BASE_PATH`, an e2e job, a deploy artifact, and ORT / Dependabot
coverage. The external repo's `overrides` block (babel, zod, postcss) also has to be reconciled with the monorepo's.

The monorepo should consume its **local** PDS build here, which is the main advantage over the external repo: the
release-candidate integration test in `docs/release.md` becomes automatic instead of a manual version bump in a separate
repository.

---

## Track C — retire the external repository

Only possible once A and B are done.

1. Archive `porsche-design-system/examples`, or reduce it to a README pointing here.
2. Leave gh-pages redirects if the deploy target changed in A2.
3. Update [`docs/release.md`](../../docs/release.md) — the "Integration test" step still tells the releaser to open the
   external repo and bump versions by hand. With the apps in-repo against the local build, that step largely disappears.
4. Fold the external repo's remaining infrastructure that has no monorepo equivalent (`.ort.yml` entries,
   `dependabot.yml`, CODEOWNERS) into the monorepo's.
5. Close the AGENTS.md open items that this migration subsumes — notably item 4 (storefront hookup), which A2/A3
   resolve.

---

## Not part of this migration

[`AGENTS.md`](AGENTS.md#status-and-open-items) carries seven open items of its own. These are independent of the
migration and should not block it:

- Dropping the Prettier formatting pass (1).
- Renaming `_layouts`/`_partials` to `components/` (2).
- A side-by-side comparison mode for `PatternPage` (3).
- Deriving preloaded chunks from the rendered markup (5).
- Splitting `public/` per category (6).
- The flaky `patterns/header/stacked` category-tabs capture at 200% font size (7) — a real pattern bug worth fixing, but
  not a migration blocker.

Item 4 (storefront hookup) **is** part of this migration; see A2 and A3.
