# Migrating the examples repository into the monorepo

> Status as of 2026-09-22. Tracks the move of the example **content** into this package, and the release job that
> updates [`porsche-design-system/examples`](https://github.com/porsche-design-system/examples) from here.
>
> Companion documents: [`AGENTS.md`](AGENTS.md) (how the package works, plus its own open items) and
> [`COMPARISON.md`](COMPARISON.md) (why the template layer is TSX).

## Where we stand

The **content** of the `patterns` and `templates` workspaces is fully ported, and the build emits the two standalone
Vite projects that replace them. All four test suites are in place. What is missing is everything _around_ those pages:
a deployment, the storefront wiring that points at it, and the release job that pushes the result to the examples
repository.

The examples repository is **kept**, as a publication target — see Track B. The seven framework apps stay there, hand
maintained; only their PDS version is rewritten at release time.

| Area                    | External repo                                   | Here                            | State        |
| ----------------------- | ----------------------------------------------- | ------------------------------- | ------------ |
| Patterns (8 pages)      | `patterns/src/{feedback,footer,header,popover}` | `src/patterns/…`                | ✅ ported    |
| Templates (2 pages)     | `templates/src/{admin-panel,landing-page}`      | `src/templates/…`               | ✅ ported    |
| Generated Vite projects | hand written workspaces                         | `dist/{patterns,templates}`     | ✅ generated |
| Unit tests              | –                                               | `tests/unit/`                   | ✅ added     |
| VRT                     | `patterns/tests/vrt/` (header only)             | `tests/vrt/` (all pages)        | ✅ exceeded  |
| CI test job             | `test.yml`                                      | `Examples` job in `test.yml`    | ✅ added     |
| **A11y tests**          | `patterns/tests/a11y/` (axe + aria snapshots)   | `tests/a11y/`, all 12 pages     | ✅ done      |
| **E2E tests**           | `patterns/tests/e2e/`                           | `tests/e2e/`, all 12 pages      | ✅ done      |
| **`robots.txt`**        | `{patterns,templates}/public/robots.txt`        | `noindex` meta tag instead      | ✅ done      |
| **Preview deploy**      | `deploy.yml` → gh-pages per slug                | –                               | ❌ missing   |
| Released deploy         | `deploy.yml` → gh-pages per slug                | stays there, all 9 artifacts    | ↔ by design  |
| **Storefront wiring**   | consumed via hardcoded GitHub URLs              | unchanged, still points outside | ❌ missing   |
| **Release job**         | manual version bump per release                 | –                               | ❌ missing   |
| Framework apps (7)      | `frameworks/*`                                  | stay there, version rewritten   | ↔ by design  |
| **Release docs**        | `docs/release.md` points at the external repo   | unchanged                       | ❌ stale     |

Track A ships what is already here. Track B is the release job. Track C is what the external repository still owns.

---

## Track A — ship what is already here

Unblocks patterns and templates independently of the framework apps. Each step is landable on its own.

### A1. Keep the generated projects out of search results — done

The external projects shipped `User-agent: *` / `Disallow: /` in `{patterns,templates}/public/robots.txt`, with the
intent that the demos never got indexed.

**That file never did anything, and was deliberately not ported.** A `robots.txt` is only ever read at the **origin
root**, and the projects are served from a path. Verified against the live deployment:

| URL                                          | Response                      |
| -------------------------------------------- | ----------------------------- |
| `porsche-design-system.github.io/robots.txt` | GitHub Pages "Site not found" |
| `…github.io/examples/v4/patterns/robots.txt` | `200`, `Disallow: /`          |

The origin root has no `robots.txt` at all, so everything has been crawlable the whole time; the shipped file sits where
no crawler looks. Emitting it from [`scripts/generateProject.ts`](scripts/generateProject.ts) would have faithfully
reproduced a no-op.

`<meta name="robots" content="noindex" />` in [`src/_partials/Head.tsx`](src/_partials/Head.tsx) does the job instead.
It is honoured wherever a page is served, so it is independent of the A2 decision below, and one line covers every page:
all four layouts (`BasePage`, `CanvasPage`, `OverviewPage`, `PatternPage`) render their `<head>` through that partial. A
unit test asserts it on the partial and on every rendered page, so a layout growing its own `<head>` cannot silently
ship an indexable page.

> Non-HTML assets in `public/` (the dummy `porsche-models.pdf`) are not covered — a meta tag only applies to HTML. That
> needs an `X-Robots-Tag` response header, which only the deploy target can set, so it belongs to A2.

### A2. Preview the two generated projects

`dist/patterns` and `dist/templates` are built by CI but published nowhere, so nothing can link to them yet.

**Decided (2026-09-22): the released deployment stays in the examples repository's CI. The monorepo deploys previews
only.** The earlier framing — gh-pages there versus S3 + CloudFront here, pick one — was wrong, because the two are not
alternatives for the same artifact.

Why the release deploy cannot move here, from reading that repository's
[`deploy.yml`](https://github.com/porsche-design-system/examples/blob/main/.github/workflows/deploy.yml): it checks out
`gh-pages`, runs `rm -rf ./{slug}`, downloads **all nine** artifacts (`patterns`, `templates` and the seven frameworks)
into `{slug}/{name}/`, and force-pushes.

1. **Deployment follows the build.** Seven of those nine are built there and stay there (Track B), so the deploy has to
   run where they are.
2. **That tree admits exactly one publisher.** A second job writing `{slug}/patterns/` would be deleted by the next
   `rm -rf` and force-push — silently, not with a conflict.
3. **The URLs are already released.** `GITHUB_PAGES_BASE` is a hardcoded constant compiled into the storefront bundle,
   so `…/examples/v4/…` has to keep being served for every storefront version already out there.

What the monorepo CI should own instead is the **unreleased** case: a per-slug preview (`pr-1234`, `nightly`) so a
change here can be reviewed before it reaches a release. In its own namespace — never in the examples `gh-pages` tree,
for reason 2.

- `base` is already parameterised — `PATTERNS_PUBLIC_BASE_PATH` and `TEMPLATES_PUBLIC_BASE_PATH` in
  [`plugins/projects.ts`](plugins/projects.ts) — and matches what the external `build.yml` set. No source change needed.
- The job needs: build → `vite build` both projects (`build:verify` already does this into `dist-tmp/`) → publish per
  slug.
- It also owns the one thing A1 could not: an `X-Robots-Tag: noindex` response header, so the non-HTML assets in
  `public/` are covered too.

**Still open — which preview mechanism:**

| Mechanism                                                  | For                                                                                                                  | Against                                                                                                                 |
| ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Ride along in `storefront/public/` (AGENTS.md open item 4) | No new infrastructure, bucket layout or OIDC role; same-origin, and version-matched with the storefront consuming it | Adds ~68 MB per storefront deploy — `public/` is 34 MB and is copied into **both** projects, against a 24 MB storefront |
| Separate per-slug upload to the storefront bucket          | Keeps the storefront deploy lean                                                                                     | Needs its own prefix, wiring and lifecycle                                                                              |

The 68 MB is not fixed: AGENTS.md open item 6 (split `public/` per category) roughly halves it, and the cost is
CloudFront storage and deploy time, not anything a visitor downloads.

### A3. Repoint the storefront

[`WebsiteViewer.tsx`](../storefront/src/components/common/WebsiteViewer.tsx) hardcodes:

```ts
const GITHUB_TREE_BASE = 'https://github.com/porsche-design-system/examples/tree';
const GITHUB_PAGES_BASE = 'https://porsche-design-system.github.io/examples';
```

`GITHUB_PAGES_BASE` **stays** — A2 settled that the released examples keep being served from `gh-pages` at those URLs.
What changes is that it can no longer be a single constant: a preview storefront has to address the preview deploy of
its own slug instead, so the base becomes environment-dependent. `GITHUB_TREE_BASE` moves to this monorepo, and
`sourceCodePath` with it — note the source now lives at `packages/examples/src/…` and is TSX, while `viewPath` addresses
the **built** project, so the two no longer share a prefix the way they did.

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
> versions, which keep requesting `…/examples/v4/patterns/header/1`. Since A2 keeps `gh-pages`, the fix is available:
> leave the numeric paths behind as redirects to the semantic ones. Cheap, and it keeps released storefronts working.

### A4. Port the a11y and e2e suites — done

The external `patterns/tests/` carried two suites this package did not have:

- **a11y** — `@axe-core/playwright` plus `aria.yml` snapshots, for `feedback-1` and `header-1` only.
- **e2e** — behavioural specs, for `feedback-1` and `header-1` only.

**a11y is done.** [`tests/a11y/`](tests/a11y) scans all 12 pages (globbed from `*.page.tsx`, so a new example is covered
without touching the spec) at two viewports × both colour schemes, plus the drilldown and the feedback confirmation — 54
checks against the built projects. Wired into `test:a11y:examples` and the `Examples` CI job. See
[`AGENTS.md`](AGENTS.md#accessibility-tests).

**The aria snapshots were deliberately not ported.** Every invariant they would catch here is already pinned closer to
its cause: the static composition (one `main`, no unlabelled `<nav>`, at most one `h1`, `aria-current`) by the 241 unit
tests, and each component's own subtree by `packages/components-js/tests/a11y/specs/a11ytree/`. A page-level snapshot
sits on top of both and is churned by every prose edit and every component-internal change — the external repo's own two
snapshots had already collected `status`, `alert` and `text: ""` nodes that leaked out of component shadow roots, and
they covered 2 of 10 pages. Axe is the layer that was genuinely missing, because it checks what the browser _computes_:
contrast, names resolved through shadow roots, ARIA validity after upgrade.

**e2e is done too.** [`tests/e2e/`](tests/e2e) has 30 checks in two specs: `examples.e2e.ts` globs every page for a
title and a clean console, and drives the shared behaviour (drilldown, hero video) keyed off the ids a page renders —
the same rule `plugins/entries.ts` uses to inline a snippet, so the two cannot drift. `flows.e2e.ts` drives what one
page does: both feedback flows, the local market switch, the feature tour, the priority navigation and the admin panel.
Wired into `test:e2e:examples` and the `Examples` CI job.

Porting it surfaced three component facts worth knowing before writing more: `aria-expanded` is set through the `aria`
prop and lands **inside the shadow root**, `open` is a property that is never reflected (and a stale `open=""` on an
initially-open step outlives it), and a popover host is a zero-height anchor whose panel is in the shadow root. All
three are documented with helpers in [`AGENTS.md`](AGENTS.md#end-to-end-tests).

> **Prerequisite discovered while doing this:** the Playwright suites could not run at all, because the loader builds
> its CDN URL by concatenation and the test helper aborted that request. Fixed in
> [`tests/vrt/helpers/index.ts`](tests/vrt/helpers/index.ts). The VRT baselines have since been verified against that
> fix — a full Docker run matches all 83 of them — so the suite can be trusted; see
> [`AGENTS.md`](AGENTS.md#status-and-open-items).

---

## Track B — release the examples repository from here

**Decided (2026-09-22): the external repository is kept as a publication target, not retired, and it is updated by a
release job rather than by hand.** The monorepo is where the examples are developed and tested; the examples repository
is where they are shown, at a released PDS version.

That reframes what used to be this track. The old plan was to port
`frameworks/{angular,astro,next-js,react,react-router,vanilla-js,vue}` into the monorepo, and it was "the long pole"
blocking everything. It no longer blocks: **the seven apps stay where they are, hand maintained in the examples
repository.** What the release job does to them is rewrite their PDS version.

### B1. The release job

Triggered by a release, parameterised by the published version:

1. **Replace `patterns/` and `templates/`** with `dist/{patterns,templates}` from this package. They are already
   drop-in: same workspace names (`@porsche-design-system/{patterns,templates}`), and
   [`generateProject.ts`](scripts/generateProject.ts) already pins their PDS version from this package's own
   `package.json` — the comment there says "so they never drift apart". Note that this makes the generated version
   whatever **this repository** currently declares, which is the released one only at release time; the job should set
   it from the release explicitly rather than trust the checkout.
2. **Rewrite the four PDS specifiers** in `frameworks/*/package.json` to the released version. Nothing else in those
   apps is touched.
3. **`npm install`** at the repository root, which resolves the single lockfile. This can only run _after_ step 2.
4. **Build and run the e2e suites** of the assembled tree.
5. **Open a pull request**, so the examples repository's own CI runs on the result and the diff can be reviewed before
   it is public. Auto-merge on green if this should be hands-off.

Step 4 is the point of the exercise, not an afterthought: it is the "Integration test" of
[`docs/release.md`](../../docs/release.md) — open seven apps, bump the version by hand, build, preview, eyeball — turned
into a gate.

Two things the emitted folders need once they are output: a "generated, do not edit" marker and CODEOWNERS on
`patterns/` and `templates/`, because an edit made there would otherwise be silently lost at the next release.

### B2. Notes on the shape of this

- **`dist/` is source, not a built site.** `dist/patterns` is a Vite project (`package.json`, `vite.config.ts`, `src/`);
  the examples repository still runs its own build. Replacing the folder therefore changes nothing about how that
  repository builds or deploys.
- **The lockfile is produced, never generated.** A lockfile is the output of resolution against the registry, not
  authored content — the one place here that already bundles framework projects,
  `packages/storefront/projects/stackblitz/scripts/generateStackblitzBundle.ts`, explicitly skips `package-lock.json`
  for that reason. Producing it with one `npm install` per release is right; templating it is not.
- **Nothing else in the repository shell is generated.** `biome.json`, `docker.sh`, `docker-compose.yml`, `.ort.yml`,
  `.github/`, `.syncpackrc.json` and `docs/` stay hand maintained there. Generating them would mean owning a templated
  second copy of infrastructure decisions this monorepo has already made. The root `package.json` is the one open
  question: it names all nine workspaces across ~30 scripts, so adding or removing an example means editing it.

### B3. Deferred: should the seven apps move into the monorepo after all?

Left open on purpose, and no longer blocking. The trade is narrower than it first looked, because `docs/release.md`
already publishes release candidates to npm:

|                                      | Tests an RC | Tests an unpublished local build |
| ------------------------------------ | ----------- | -------------------------------- |
| Apps stay, release job bumps version | ✅          | ❌                               |
| Apps move into the monorepo          | ✅          | ✅                               |

Moving them in would mean each app resolves `@porsche-design-system/components-react` to
`packages/components-react/dist/react-wrapper` through the workspace symlink, so breaking changes surface during
development instead of at release. It would also bring their dependencies under syncpack — they sit at `4.6.0` today
while this repository is at `4.7.0`.

Against that: the framework apps are **consumer** demos, and consuming a published package from a separate repository is
what a consumer actually does; resolving a symlinked wrapper `dist/` is not. Moving them in costs some of that fidelity,
plus seven workspace registrations, dependency reconciliation (including the external `overrides` block for babel, zod
and postcss), ORT and Dependabot coverage, and seven more builds in this repository's CI.

If they ever do move, B1 does not change shape — `frameworks/*` simply joins step 1 instead of step 2.

---

## Track C — settle what the external repository still owns

It is **not** retired (see Track B). It keeps its shell, its CI, its deployment and the seven framework apps; what it
stops owning is `patterns/` and `templates/`, which arrive from here.

1. Mark `patterns/` and `templates/` as generated there — a header comment plus CODEOWNERS — so an edit made in that
   repository is not silently lost at the next release.
2. Leave the numeric `viewPath`s behind as redirects to the semantic ones (A3), so released storefront versions keep
   working.
3. Update [`docs/release.md`](../../docs/release.md) — the "Integration test" step tells the releaser to open the
   external repo and bump versions by hand across seven apps. B1 replaces it with the release job; the step becomes
   "review the pull request it opened".
4. Reconcile the two repositories' infrastructure where it has drifted (`.ort.yml` entries, `dependabot.yml`,
   CODEOWNERS), rather than folding one into the other.
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
