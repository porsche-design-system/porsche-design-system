# Migrating the examples repository into the monorepo

> Status as of 2026-09-23. Tracks the move of the example **content** into this package, the deploy job that publishes
> every example from this repository's CI, and the commit-back that keeps
> [`porsche-design-system/examples`](https://github.com/porsche-design-system/examples) current.
>
> Companion documents: [`AGENTS.md`](AGENTS.md) (how the package works, plus its own open items) and
> [`COMPARISON.md`](COMPARISON.md) (why the template layer is TSX).

## Where we stand

The **content** of the `patterns` and `templates` workspaces is fully ported, and the build emits the two standalone
Vite projects that replace them. All four test suites are in place. What is missing is everything _around_ those pages:
the deploy job, the storefront wiring that points at it, and the commit-back that keeps the examples repository current.

The examples repository is **kept** as the readable reference at the released version — see Track B. The seven framework
apps stay there, hand maintained. Its **deployment** moves here (A2): the monorepo's CI builds and deploys all nine, for
every event, to the storefront's bucket.

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
| **Deploy job**          | `deploy.yml` → gh-pages per slug                | –                               | ❌ missing   |
| **Storefront wiring**   | consumed via hardcoded GitHub URLs              | unchanged, still points outside | ❌ missing   |
| **Commit-back job**     | manual version bump per release                 | –                               | ❌ missing   |
| Framework apps (7)      | `frameworks/*`                                  | stay there, built by A2         | ↔ by design  |
| **Release docs**        | `docs/release.md` points at the external repo   | unchanged                       | ❌ stale     |

Track A ships what is already here, including the deploy job. Track B keeps the examples repository current. Track C is
what it still owns.

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

> Non-HTML assets in `public/` (the images and the hero video) are not covered — a meta tag only applies to HTML. That
> needs an `X-Robots-Tag` response header, which only the deploy target can set, so it belongs to A2.

### A2. Deploy every example from the monorepo's CI

`dist/patterns` and `dist/templates` are built by CI but published nowhere, so nothing can link to them yet — and the
examples repository is bumped by hand, so what it shows lags behind.

**Decided (2026-09-23): the monorepo's CI drives every deployment, for every event, to the storefront's S3 + CloudFront.
`gh-pages` is retired to redirect stubs.** Each monorepo event deploys the examples under the slug that event already
resolves, next to the storefront it belongs to.

This supersedes the earlier "released deploys stay on gh-pages, the monorepo previews only" split. That split existed to
avoid two publishers in one tree; a single publisher to one target removes the problem instead of working around it, and
it also drops the `rm -rf {slug}` + force-push pattern, which stores every deploy as binary blobs in git forever — fine
at the examples repository's release cadence, not at the monorepo's pull request cadence.

| Monorepo event             | Slug      | Where PDS comes from                           |
| -------------------------- | --------- | ---------------------------------------------- |
| stable / RC / beta / alpha | `v4.8.0`  | the published version — `npm install` from npm |
| nightly (push to `main`)   | `nightly` | tarballs of the local build                    |
| pull request               | `pr-1234` | tarballs of the local build                    |

The slugs are the ones [`contribution.yml`](../../.github/workflows/contribution.yml) already resolves, so the examples
land beside the storefront of the same event. Release candidates and betas need no special case: per
[`docs/release.md`](../../docs/release.md) they are published to npm (just not tagged), so they are an ordinary version.

#### Unreleased builds already work — the CDN is content-addressed

The obvious objection is that `main` and a pull request have no published version, so the framework apps have nothing to
install and the components have nothing to load. The second half is already solved:

1. Every file the CDN serves carries a content hash, the entry included:
   `porsche-design-system.v4.7.0.ddcf26e0ebc20b1e2cb0.js`, `porsche-design-system.accordion.b1b568d824087555d732.js`.
2. [`deploy.yml`](../../.github/workflows/deploy.yml) rclones `packages/assets/cdn/components/` to the CDN on **every
   push and same-repo pull request**, not only on releases, with `--ignore-existing`. Hashed names make a collision
   impossible, so an unreleased build's chunks simply coexist with the released ones.
3. The **partials** in the built wrapper embed that same hash — it is greppable in
   `components-wrapper/partials/{esm,cjs}` — and the generated `vite.config.ts` injects those partials at build time.

So an example built against the locally built wrapper requests exactly the chunks that run has just uploaded. Nothing
new is needed for the CDN; this is how the storefront previews already work.

#### The one real gap: getting the wrappers in without a release

The wrapper `dist/` folders **are** the npm packages (tarball root, `package.json` included — see
[`docs/public-api.md`](../../docs/public-api.md)), so they can be packed and installed directly:

```bash
npm pack packages/components-{js,angular,react,vue}/dist/*-wrapper   # → 4 tarballs, uploaded as an artifact
```

In the examples checkout, point the **root** `package.json` at them and install:

```json
"overrides": {
  "@porsche-design-system/components-js": "file:./.pds/components-js.tgz",
  "@porsche-design-system/components-angular": "file:./.pds/components-angular.tgz",
  "@porsche-design-system/components-react": "file:./.pds/components-react.tgz",
  "@porsche-design-system/components-vue": "file:./.pds/components-vue.tgz"
}
```

`overrides` is the right lever: it redirects all nine workspaces at once whatever each of them declares, so there is no
per-workspace juggling and the committed specifiers stay untouched. It has to be **merged** with the block already there
(babel, zod, postcss), not replace it. For a release this whole step is skipped — the version is rewritten and installed
from npm instead, which is what makes the release deploy a test of the artifact consumers will actually get.

#### What the job does

1. Check out the examples repository; replace `patterns/` and `templates/` with `dist/{patterns,templates}` built here,
   so a pull request previews the examples **as changed in that pull request**.
2. Point PDS at the tarballs (or rewrite to the released version) and `npm install`.
3. `npm run build --workspaces`, with each app's `*_PUBLIC_BASE_PATH` set from the slug.
4. Run the e2e suites.
5. Upload to the storefront bucket under the slug.

Only a release additionally commits the regenerated folders and the version bumps back to the examples repository, as a
pull request (Track B); `nightly` and `pr-*` deploy without writing anything there.

Other notes:

- `base` is already parameterised — `PATTERNS_PUBLIC_BASE_PATH` and `TEMPLATES_PUBLIC_BASE_PATH` in
  [`plugins/projects.ts`](plugins/projects.ts). No source change needed.
- The bucket also gives A1 the thing a meta tag could not: an `X-Robots-Tag: noindex` response header, covering the
  images and the hero video.
- `pr-*` already has a 90-day lifecycle rule and [`cleanup-preview.yml`](../../.github/workflows/cleanup-preview.yml)
  removing it when the pull request closes, so the preview examples inherit a retention policy rather than needing one.
- Deploying into the storefront's own slug keeps the examples same-origin with the storefront that links to them, which
  is what lets A3 drop the cross-origin constant.
- Publishing next to the storefront rather than inside it (AGENTS.md open item 4, copying into `storefront/public/`)
  keeps ~20 MB of images out of every storefront build. The two generated projects carry 9.9 MB of `public/` each.

### A3. Repoint the storefront

[`WebsiteViewer.tsx`](../storefront/src/components/common/WebsiteViewer.tsx) hardcodes:

```ts
const GITHUB_TREE_BASE = 'https://github.com/porsche-design-system/examples/tree';
const GITHUB_PAGES_BASE = 'https://porsche-design-system.github.io/examples';
```

Both constants go. `GITHUB_PAGES_BASE` disappears entirely: A2 puts the examples in the storefront's own bucket under
the storefront's own slug, so the viewer addresses them by a **same-origin relative path** instead of a second origin.
That also removes the cross-origin iframe and the risk of a storefront showing examples from a different build than its
own. `GITHUB_TREE_BASE` moves to this monorepo, and `sourceCodePath` with it — note the source now lives at
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

> **Already released storefronts keep requesting the old URLs** — `…github.io/examples/v4/patterns/header/1` — because
> both the origin and the numeric path are compiled into their bundles. Since A2 retires `gh-pages` as a live deploy
> target, those paths get a one-time write of static `index.html` redirect stubs pointing at the new location: ten for
> the numeric `viewPath`s above, plus the seven framework paths `/developing/{framework}/…` links to. After that the
> branch is frozen and never written again.

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

### B1. The commit-back job

A2 already builds, tests and deploys every event, including releases. What is left for this track is narrower than it
was: keeping the examples repository's **source** current, so it stays a readable reference at the released version
rather than drifting (it sits at `4.6.0` today).

On a release only — `nightly` and `pr-*` deploy without writing anything there:

1. **Replace `patterns/` and `templates/`** with `dist/{patterns,templates}` from this package. They are already
   drop-in: same workspace names (`@porsche-design-system/{patterns,templates}`), and
   [`generateProject.ts`](scripts/generateProject.ts) already pins their PDS version from this package's own
   `package.json` — the comment there says "so they never drift apart". Note that this makes the generated version
   whatever **this repository** currently declares, which is the released one only at release time; the job should set
   it from the release explicitly rather than trust the checkout.
2. **Rewrite the four PDS specifiers** in `frameworks/*/package.json` to the released version. Nothing else in those
   apps is touched.
3. **`npm install`** at the repository root, which resolves the single lockfile. This can only run _after_ step 2.
4. **Open a pull request**, so that repository's own CI runs on the result and the diff can be reviewed.

The build-and-verify step that used to be item 4 has moved into A2, where it runs for every event rather than only at
release time. That is a strict improvement on the "Integration test" of [`docs/release.md`](../../docs/release.md) —
open seven apps, bump the version by hand, build, preview, eyeball — which stops being a release chore and becomes a
pull request gate.

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

Left open on purpose, and weaker than it was. The argument for moving them used to be that only a workspace can be built
against an unpublished PDS. A2's tarball overrides do the same thing without moving anything:

|                                | Tests a release | Tests an RC | Tests an unpublished build |
| ------------------------------ | --------------- | ----------- | -------------------------- |
| Apps stay, A2 injects tarballs | ✅              | ✅          | ✅                         |
| Apps move into the monorepo    | ✅              | ✅          | ✅                         |

What remains for moving them is narrower: their dependencies would come under syncpack instead of drifting (they sit at
`4.6.0` today while this repository is at `4.7.0`), and a breaking change would surface in the editor rather than in a
CI job.

Against: the framework apps are **consumer** demos, and installing a real tarball from a separate repository is much
closer to what a consumer does than resolving a symlinked wrapper `dist/` — so A2 arguably has the better fidelity of
the two. Moving them would also cost seven workspace registrations, dependency reconciliation (including the external
`overrides` block for babel, zod and postcss), ORT and Dependabot coverage, and seven more builds in this repository's
CI.

If they ever do move, neither A2 nor B1 changes shape — `frameworks/*` is simply already present instead of being
checked out.

---

## Track C — settle what the external repository still owns

It is **not** retired (see Track B). It keeps its shell and the seven framework apps, and stays the readable reference
at the released version. What it stops owning is `patterns/` and `templates/`, which arrive from here, and its
**deployment**, which A2 moves to this repository's CI.

1. Mark `patterns/` and `templates/` as generated there — a header comment plus CODEOWNERS — so an edit made in that
   repository is not silently lost at the next release.
2. Retire `deploy.yml` there and write the `gh-pages` redirect stubs once (A3), so released storefront versions keep
   working after the branch is frozen. Its `build.yml` stays useful for validating changes made in that repository.
3. Update [`docs/release.md`](../../docs/release.md) — the "Integration test" step tells the releaser to open the
   external repo and bump versions by hand across seven apps. A2 makes that a gate on every event; the step becomes
   "review the pull request B1 opened".
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
