# `porsche-design-system-docs` skill — plan (branch `issue/4450-skill`, PR #4555)

**This is the single planning doc for this feature and branch.** It supersedes the former
`…-skill-requirement.md`, `…-skill-audit.md`, `…-skill-followups.md` and
`…-skill-source-of-truth-plan.md` (deleted; originals in git history). Completed work is not
tracked here — see `git log issue/4450-skill`.

**Status (2026-07-10): only Phase R is agreed and ready to implement. Every other phase and every
backlog item is a draft — clarify with Henri before implementing.**

## What this feature is

Each published PDS wrapper package (`@porsche-design-system/components-{js,angular,react,vue}`)
ships a Claude Code skill named `porsche-design-system-docs`: a `skill/` directory of
LLM-optimized, **version-exact** markdown (`SKILL.md` entry point + `references/…`) that lives in
`node_modules` and is symlinked into `.claude/skills/` by the packaged `pds-skill` bin
(package-scoped, idempotent, win32 junctions). The skill auto-activates on frontend work via its
tuned frontmatter description and lets the agent answer, generate, review, and migrate PDS code
against the installed version — a docs/version mismatch is impossible by construction.

Producer side: the storefront generates all four trees — `packages/storefront` →
`npm run build:skill` (entry `scripts/build-skill.ts`, generators in `src/lib/skill/*`, MDX render
via `scripts/skill-mdx-loader.cjs` runtime). The trees are **committed** under
`packages/components-{js,angular,react,vue}/projects/*-wrapper/skill/` and copied into dist by
each wrapper's `build:subPackages:skill`. CI gates: `build:skill:check` (regenerate-and-diff),
`skillCompleteness.spec.ts`, link/raw-pointer gates, and a degraded-prose gate inside the
generator.

Verified solid by the content audit (no action needed): API tables programmatically complete vs
`component-meta` for all 58 components × 4 trees; `icons.md` exact (290/290); `stylesheets.md`
matches shipped CSS; `tokens.md` matches `tokensMeta` (154/154); migration guides faithful for
v3→v4; the `pds-skill` bin hardened and test-enforced byte-identical across wrappers; SKILL.md
size and description within skill-authoring limits.

## Where content comes from today (audit result)

Three sourcing mechanisms coexist, all sound — the open work is prose *ownership*:
1. **Meta objects** (`component-meta`, `tokensMeta`, `tailwindMeta`, `scssMeta`,
   `stylesheetsMeta`, …) feed both storefront pages and skill tables. No duplication.
2. **Storefront MDX render** (`renderMdxToMarkdown`) — component prose, partials, migration. No
   duplication.
3. **Package skill fragments** (`getXxxSkill()` + hand-authored `intro.md`/`how-to-use.md` in
   `packages/styles/projects/*/skill` and `packages/components/projects/stylesheets/skill`) —
   the desired end-state pattern, but its *prose* duplicates storefront pages.

| Artifact | Source | Verdict |
|---|---|---|
| SKILL.md frontmatter, core rules, reference map `useWhen` | hardcoded `storefront/src/lib/skill/skillMd.ts` | skill-only ✅ (restructured by task R.1) |
| SKILL.md Getting started | hardcoded `GETTING_STARTED`, `skillMd.ts:109-219` | **duplicates** `developing/{react,angular,vue,vanilla-js}/getting-started/page.mdx` → R.1 removes, phase 3 restores single-sourced |
| SKILL.md Styling section | hardcoded `skillMd.ts:260-302` | **restates** scheme/tokens prose → tasks R.1, 2.1 |
| references/styles/*.md, stylesheets.md | package fragments (meta tables + `intro.md`/`how-to-use.md`), deep-imported by `stylesReference.ts:5-9` | package-owned ✅, **prose duplicates** storefront intro pages → task 2.2 |
| references/tokens.md | tables from `tokensMeta` ✅; intro hardcoded `tokensReference.ts:47-64` | intro **duplicates** `tokens/introduction/page.mdx` Setup → task 4.1 |
| references/partials.md | storefront MDX via `renderMdxToMarkdown` | single-sourced ✅ but content not skill-ready → removed by R.1, re-entry phase 6 |
| references/migration/*.md | storefront MDX, verbatim | single-sourced ✅ |
| references/components/**, icons.md | storefront `components.meta` MDX + `component-meta` + `shared/examples` | single-sourced ✅ |

Housekeeping debt: five orphaned `scripts/build-skill.ts` → gitignored `skill/generated/` nothing
consumes; six copies of the markdown `cell`/`table`/`code` helpers; three parallel lists
(`STYLING_SOLUTIONS` in `skillMd.ts`, `STYLE_REFERENCES` in `stylesReference.ts`,
`ROUTE_REFERENCES` in `links.ts`).

## Decisions

- **(A)** Package fragments — not storefront MDX — are the canonical side for styling/stylesheets
  prose; the storefront becomes a consumer.
- **(B)** Getting-started becomes a structured snippet module + serializer, not markdown: tutorial
  and agent brief legitimately differ in prose but must never differ in facts/code.
- **(C)** The storefront-embedding halves (tasks 2.2, 3.3) may be deferred; until then the
  duplication is confined to one fragment-vs-page boundary instead of scattered hardcoded strings.
- **(D)** The four generated trees stay **committed** (not gitignored + snapshot-tested):
  generation needs the storefront runtime but the trees ship in the wrapper dists, which build
  *before* the storefront — a gitignored tree would force release-time generation against the
  dependency direction; the committed tree already *is* the snapshot (`build:skill:check` =
  regenerate-and-diff), reviewed exactly where it ships; and generation is not hermetic (dev
  builds embed localhost URLs — see backlog "parked partials items"), so generate → review →
  commit is the safety mechanism, not overhead. "Gitignore + snapshot test" is not implementable
  for the MDX-rendered bulk anyway: the render requires the `skill-mdx-loader.cjs` runtime,
  unavailable under vitest, so a snapshot could only be a committed baseline diffed by a CI
  script — which is exactly what the committed tree + `build:skill:check` already is; the pure
  fragments, by contrast, *are* vitest-snapshot-tested in their packages (task 0.1). Churn is
  mitigated by task 0.4.
- **(E)** SKILL.md is restructured into one section per domain with the global reference map and
  the Core rules section dissolved into those sections; Getting started and partials leave
  SKILL.md entirely until phases 3/6 restore them properly (task R.1, the agreed first step).

---

## Phase R — SKILL.md restructure (AGREED — implement now)

- [ ] **R.1 Restructure SKILL.md into topical sections; drop Getting started and partials;
  dissolve the reference map and core rules.**
  Target structure (all four trees, `buildSkillMd` in `storefront/src/lib/skill/skillMd.ts`):
  1. Frontmatter (unchanged — `name` + activation description; activation behavior must not
     change).
  2. `# Porsche Design System (<framework>)` headline + intro (extended): besides today's
     version-exact line, the intro must state that the skill ships *inside the installed package,
     alongside the actual implementation* — the agent can always read the real source next to the
     skill root (typings, `../meta` component-meta, `../scss`, `../tokens`,
     `../tailwindcss/index.css`, the shipped CSS) when it needs information the skill does not
     (yet) cover or wants to verify a detail. Absorbs three former core rules: "all content is
     version-exact for the installed package", "reference paths are relative to the skill root",
     and (as a one-liner) "prefer PDS components/tokens for new UI, don't rewrite non-PDS UI
     unasked or hijack other-library work".
  3. `## Components` — first section. Roster prose + table as today, but the intro text before
     the table must additionally state where the examples are located
     (`references/components/<tag>/examples/` with per-framework files, indexed by each
     reference's "Examples" table). Absorbs the component-scoped core rules: `component-meta` is
     authoritative over examples/prose (raw data at `../meta`), and the accessibility-test-matrix
     rule (a `## Tests` section appears only to flag an exception).
  4. `## Stylesheets` — new own section: short "use when" prose (today's reference-map row for
     `references/stylesheets.md`, expanded a sentence) + link to the reference, **plus the theming
     note**: light/dark is solely the `.scheme-*` classes / CSS `color-scheme` cascading to both
     PDS components and custom markup; there is **no** `theme` prop (existed in earlier majors,
     removed — stale-prior warning, verify against installed types).
  5. `## Tokens` — new own section, same shape, linking `references/tokens.md`.
  6. `## Upgrades & migration` — the migration reference-map rows need a topical home too (every
     shipped reference must stay discoverable from SKILL.md); short section after Tokens linking
     the five guides with the existing `useWhen` text.
  7. `## Styling` — one section for all four styling solutions, last section (table as today;
     prose shrink happens later in task 2.1). Carries the styling-side theming note: the
     solutions build on the same tokens and the same `color-scheme` theming, so one `.scheme-*`
     class drives both PDS components and custom UI (brief — the full mechanics live in
     `references/stylesheets.md`).
  Removed: the `## Getting started` section and the `GETTING_STARTED` constant
  (`skillMd.ts:109-219`) — the setup half duplicates the storefront developing pages and returns
  single-sourced via phase 3; the global `## Reference map` table (`renderReferenceMap`) — each
  row's `useWhen` moves into its topical section; the `## Core rules` section
  (`skillMd.ts:321-335`) — **dissolved, not deleted**: theming → Stylesheets + Styling,
  component-meta authority + a11y matrix → Components, version-exactness + path convention +
  prefer-PDS → intro. **Partials are removed entirely** — no section, no
  `references/partials.md` — the content is not skill-ready yet (see backlog "parked partials
  items": dev-URL loader-script outputs, vanilla-js-flavored integration examples); unwire
  `loadPartialsGeneration`/`PARTIAL_DIRECTORIES` from `scripts/build-skill.ts` and delete
  `partialsReference.ts` + its spec (git history preserves them for the phase-6 re-entry).
  Decision inside this task: the "Writing components" syntax bullets (tag→PascalCase mapping,
  camelCase props, event syntax, `v-model:value` caveat, slots) are *not* duplicated anywhere —
  they are skill-only anti-hallucination content carrying several audit correctness fixes.
  Recommended: keep them, moved into the `## Components` intro as a short "Framework syntax"
  note, so react/vue tag→component mapping isn't lost until phase 3; only the
  install/init/stylesheet/FOUC setup content is dropped.
  Acceptance: all four SKILL.md files follow the order above; no content lost except the
  deliberately removed setup snippets and partials — every former core rule is traceable to its
  new section; every remaining reference file is linked from exactly one section; no
  `references/partials.md` in any tree and no dangling links to it (link gate green); `skillMd`
  unit tests updated; trees regenerated in a dedicated commit; `build:skill:check` green.

---

## Phases 0–6 (DRAFT — clarify with Henri before implementing)

### Phase 0 — groundwork (mechanical, output-neutral)

- [ ] **0.1 Delete the orphaned per-package `skill/generated` build steps; close the serializer
  spec gap.**
  All five fragment packages ship a `scripts/build-skill.ts` writing gitignored `skill/generated/*`
  (md + scss partials + tailwind index.css) that nothing consumes — the storefront calls the
  `getXxxSkill()` serializers directly. The verification already exists in the right form: 4 of 5
  packages snapshot-test the serializer in their own unit suite
  (`components/projects/stylesheets/tests/unit/specs/skill.spec.ts` and the
  scss/emotion/vanilla-extract siblings — `expect(getXxxSkill()).toMatchSnapshot()`, pure
  function, no build needed). The snapshot is the better in-package artifact: PR-reviewable,
  deliberately updated via `-u`, never diverges from what ships (the build step's
  prettier-formatted output does).
  Fix: remove `scripts/build-skill.ts` and the `build:skill` script entry (and its slot in the
  `build` chain where wired) in `packages/styles/projects/{tailwindcss,scss,vanilla-extract,emotion}`
  and `packages/components/projects/stylesheets`; drop the `skill/generated` gitignore lines;
  **add the missing `tailwindcss` `skill.spec.ts` snapshot test** (only fragment without one).
  Acceptance: `grep -r "skill/generated"` finds nothing; all five fragments have a serializer
  snapshot spec; package builds + unit tests green; `build:skill:check` diff-clean.

- [ ] **0.2 Hoist the markdown helpers to `packages/shared`.**
  Six copies of `cell`/`table`/`code`: `storefront/src/lib/skill/markdown.ts` + the five fragment
  `skill/skill.ts` files. Unify on the storefront's stricter semantics (`escapeCell` collapses all
  whitespace + trims; the styles `cell` only collapses newlines).
  Fix: export from `packages/shared` (already a dependency of all three packages); import
  everywhere; delete local copies. Must resolve under the storefront `tsx` runtime (deep source
  imports) — mirror how `stylesReference.ts` imports fragment source today.
  Acceptance: one implementation; regenerate-and-diff gate proves output-neutral (or shows only
  intended whitespace normalization in the four styles references).

- [ ] **0.3 Move `resolveFrameworkPlaceholder` to `packages/shared`.**
  Fragments outside the storefront need the `{js|angular|react|vue}` placeholder convention (the
  package `how-to-use.md` files already use it; resolution currently lives only in
  `storefront/src/lib/skill/links.ts` via `SkillTree.write`). Later tasks (2.2, 3.1, 3.3) need it
  from both fragment packages and storefront pages.
  Fix: move the resolver (and the placeholder-syntax doc comment) to `packages/shared`; re-export
  or import in `links.ts`.
  Acceptance: storefront trees regenerate byte-identical; resolver importable from a styles
  project and from a storefront page component.

- [ ] **0.4 Tame committed-tree churn in PRs (decision D mitigation).**
  The four committed trees change on every content/meta edit — by design (they are the published,
  reviewed artifact and the de-facto snapshot), but they must not drown PR diffs.
  Fix: mark `packages/components-*/projects/*-wrapper/skill/**` as `linguist-generated` in
  `.gitattributes` (GitHub collapses the files and excludes them from diff stats; still
  expandable for content review); keep isolating regeneration output in dedicated
  `regenerate skill trees` commits so the source change and its rendered effect are separately
  reviewable.
  Acceptance: a PR touching skill content shows the trees collapsed by default; regeneration
  commits contain only `skill/**` changes.

### Phase 1 — fragment contract + aggregator

- [ ] **1.1 Extend the fragment contract with self-registration.**
  Each fragment currently exports only `getXxxSkill(): string`; the SKILL.md prose describing it
  lives in storefront constants.
  Fix: each of the five fragments additionally exports a registration object
  `{ path, useWhen, solutionName?, solutionUseWhen? }` (reference path relative to `references/`,
  the section "use this when" text, and — for the four styling solutions — the styling-table
  row). Keep the strings exactly as shipped so trees stay byte-identical.
  Location: `packages/styles/projects/*/skill/skill.ts`,
  `packages/components/projects/stylesheets/skill/skill.ts`; registration type in
  `packages/shared`.
  Acceptance: registrations exported and typed; no generator changes yet; builds green.

- [ ] **1.2 Render SKILL.md's topical sections and the styles pipeline from the registrations.**
  Kill the parallel lists: after R.1 there is no global reference map — the `## Stylesheets`
  section and the `## Styling` table (plus any remaining row constants in `skillMd.ts`) and
  `STYLE_REFERENCES` (`stylesReference.ts:37-43`) must all derive from the task-1.1
  registrations; fold the route↔reference mapping (`ROUTE_REFERENCES`, `links.ts`) into the same
  registration so in-tree link rewriting can't silently degrade to live-docs URLs.
  Watch-out: `skillMd.ts` must stay importable without the heavy serializers (unit tests import
  it) — keep registrations in a light module or make serializer references lazy.
  Acceptance: adding a styling solution = one new fragment + one registry line; regenerated trees
  byte-identical (relative to post-R.1 trees).

- [ ] **1.3 Reshape `build-skill.ts` around an explicit fragment registry.**
  One registry enumerating the content sources — package fragments (styles ×4, stylesheets, later
  tokens + getting-started), storefront-MDX renderers (components, migration; partials on
  re-entry), meta renderers (icons) — each contributing files + section rows through one
  interface, instead of the hand-ordered `writeX` calls in `generateTree`
  (`scripts/build-skill.ts:151-202`).
  Acceptance: `generateTree` iterates the registry; per-source degraded-prose reporting and the
  roster path unchanged; trees byte-identical; "add a domain" = "register a fragment" documented
  in the file header.

### Phase 2 — styling / stylesheets / theming prose (decision A)

- [ ] **2.1 Shrink the SKILL.md `## Styling` section to registration data + one paragraph.**
  `renderStylingSection` (`skillMd.ts:275-302`; after R.1 the last section) restates
  scheme/`light-dark()`/tokens mechanics that `references/stylesheets.md` owns — redundant twice
  over, since R.1 gives stylesheets its own SKILL.md section pointing there.
  Fix: keep the table (from task-1.1 registrations), one framing paragraph (independent of
  components, same tokens/theming, pick one per project), the Tailwind-utilities-in-examples
  note, and a pointer to `references/stylesheets.md`; delete the restated mechanics.
  Acceptance: styling section no longer explains `.scheme-*`/`light-dark()`; agent still finds
  mechanics via the pointer; SKILL.md word count drops.

- [ ] **2.2 Storefront intro pages embed the canonical fragment prose.**
  `styles/projects/*/skill/{intro,how-to-use}.md` and
  `components/projects/stylesheets/skill/{intro,how-to-use}.md` near-duplicate
  `(main)/{tailwindcss,scss,vanilla-extract,emotion}/introduction/page.mdx` and
  `(main)/stylesheets/introduction/page.mdx` (+ `stylesheets/color-scheme/introduction`).
  Fix: render the fragment markdown inside those storefront pages (markdown-render component or
  convert fragments to importable MDX — fragments must stay free of storefront-only components);
  resolve `{js|angular|react|vue}` via the storefront framework switcher (task 0.3 resolver);
  delete the now-duplicated hand-written MDX prose, keeping page-only framing (steps, vite
  workarounds, `StylesheetViewer`, notifications).
  Acceptance: the shared facts (import order, required files, `.scheme-*` list, Tailwind-v4
  requirement) exist in exactly one file per domain; storefront pages render them; skill trees
  unchanged; storefront e2e/a11y green.

- [ ] **2.3 Single canonical scheme/theming explanation.**
  Copies today: `stylesheets/color-scheme/introduction/page.mdx`, the stylesheets fragment prose,
  the SKILL.md theming notes.
  Fix: the stylesheets fragment (canonical after 2.2) keeps the full mechanics; the SKILL.md
  theming notes (after R.1: in `## Stylesheets` and `## Styling`) keep only the skill-specific
  anti-hallucination content (no `theme` prop — not on `THEME_INIT_TARGET[framework]` and not on
  components; stale-prior warning) plus the pointer.
  Acceptance: `.scheme-*` mechanics explained in one place; the no-`theme`-prop inoculation
  survives; activation/tuning behavior unchanged.

### Phase 3 — getting started single source (decision B)

- [ ] **3.1 Add per-wrapper getting-started fragments.**
  Create a source fragment in each wrapper project (e.g.
  `packages/components-js/projects/components-wrapper/skill-src/gettingStarted.ts` and the
  angular/react/vue siblings — dir name must not collide with the *generated* `skill/`):
  structured snippets `{ installCommand, initSnippet, stylesheetSnippet, foucGuard,
  writingComponentRules }` + `getGettingStartedSkill(): string` serializer reproducing the
  content removed in R.1 (recover the reviewed/corrected `GETTING_STARTED` strings from git
  history — the MDX pages are the *consumers*, not the source, per decision B).
  Watch-out: keep fragments dependency-light (plain TS, shared helpers only) — they're imported
  by the storefront generator via deep source import (established pattern,
  `stylesReference.ts:1-4`) and later by storefront pages.
  Acceptance: four fragments export the R.1-removed content; unit-testable without the MDX
  runtime.

- [ ] **3.2 Skill reintroduces Getting started from the fragments.**
  Fix: `buildSkillMd` renders a `## Getting started` section (position: between the headline and
  `## Components`) from the framework's fragment (via the task-1.3 registry). R.1 already deleted
  the hardcoded `GETTING_STARTED`, so this is purely additive.
  Add a lightweight spec asserting the hand-written API claims against wrapper types (e.g. the
  provider prop set from the react wrapper ↔ `initSnippet`) — the fragments make these claims
  gateable for the first time.
  Acceptance: the reintroduced section matches the R.1-removed content (modulo the "Writing
  components" bullets if they stayed in `## Components`); `skillMd.ts` contains no setup
  snippets.

- [ ] **3.3 Storefront getting-started pages import the same snippets.**
  `developing/{react,angular,vue,vanilla-js}/getting-started/page.mdx` inline the same
  install/provider/stylesheet/FOUC code as hand-written fenced blocks.
  Fix: import the task-3.1 snippet constants into the MDX and render them (the diff-fence
  presentation can wrap the shared strings); tutorial prose, step structure, and
  vite/lightningcss workarounds stay page-owned.
  Acceptance: changing a snippet in one fragment changes both the storefront page and (after
  regeneration) the skill; no setup code block exists twice; storefront e2e green.

### Phase 4 — tokens

- [ ] **4.1 Tokens fragment for the intro prose.**
  `tokensReference.ts:47-64` hardcodes intro/usage prose duplicating `tokens/introduction/page.mdx`
  Setup.
  Fix: add `packages/tokens/projects/tokens-meta/skill/` (styles pattern: `intro.md` +
  `how-to-use.md` + serializer over `tokensMeta`, registration per task 1.1); `tokensReference.ts`
  shrinks to aggregation glue or dissolves into the registry; the storefront tokens introduction
  Setup section imports the shared snippet (as in 2.2/3.3).
  Acceptance: tokens import instruction exists once; `tokens.md` content unchanged; trees
  regenerate clean.

### Phase 5 — gates

- [ ] **5.1 Fragment-completeness assertion.**
  Every registered fragment must land in every tree and in its SKILL.md section; also gate the
  generator's source lists against the filesystem (`MIGRATION_GUIDES` vs
  `src/app/(main)/news/migration-guide/*` — a new guide must not silently miss the skill; partials
  again when phase 6 reinstates them).
  Fix: extend `skillCompleteness.spec.ts` (or the `assert-skill-in-sync.ts` gate, which has the
  full runtime) to iterate the task-1.3 registry.
  Acceptance: deleting a fragment registration or its output file fails CI.

- [ ] **5.2 Storefront render coverage for embedded fragments.**
  The pages changed in 2.2/3.3/4.1 render package-owned prose; a broken import or placeholder
  regression must not ship silently.
  Fix: storefront render/e2e assertion that each embedding page contains a sentinel string from
  its fragment (one per page suffices).
  Acceptance: emptying a fragment file fails the storefront test suite, not just skill CI.

### Phase 6 — partials re-entry (deferred by R.1)

- [ ] **6.1 Reinstate `references/partials.md` + its SKILL.md section once the content is
  production-correct.**
  Blocked on the parked partials items (backlog below): loader-script example outputs must embed
  the CDN URL, not `localhost:3001`, and the integration examples should be framework-flavored
  per tree rather than frozen to vanilla-js.
  Fix: restore `partialsReference.ts` + spec and the `build-skill.ts` wiring from git history
  (removed in R.1); source stays the storefront partials MDX (single-sourced, unchanged
  ownership); add a `## Partials` section with the former `useWhen` row; register it in the
  task-1.3 registry and the 5.1 completeness gate.
  Acceptance: partials reference back in all four trees with CDN URLs and per-framework
  integration snippets; gates extended; the parked partials backlog items closable for real.

---

## Open backlog (merged from the former audit/followups — unprioritized, clarify first)

### Parked partials items (phase-6 blockers)
- **[P1, parked]** `getLoaderScript` example outputs embed `http://localhost:3001/...`. Not a
  source edit: the committed partials bundle
  (`components-js/projects/partials/src/lib/partials.tsx`) embeds `deployUrl` from
  `components-wrapper/environment.ts`, which is `localhost:3001` only under
  `PORSCHE_DESIGN_SYSTEM_DEV=1`; needs regeneration from a production components build
  (release pipeline / CI), not a code change.
- **[P3, parked]** Framework-flavored partials integration examples (react/angular/vue trees
  shipped vanilla-js `index.html` sed scripts); plus cosmetics (double `# Partials`/`## Partials`
  heading, language-less fences, stale `v4.3.0` hashes in example outputs).

### Missing topics — skill cannot answer these today
(R.1's "read the actual source alongside the skill" intro is the interim fallback; when authored,
these belong in the fragment structure or per-framework storefront MDX render, not hardcoded
generator strings.)
- **[P1]** `references/testing.md` per framework: `jsdom-polyfill`, `componentsReady()`,
  `skipCheckForPorscheDesignSystemProviderDuringTests()`,
  `skipPorscheDesignSystemCDNRequestsDuringTests()`, `getByRoleShadowed`/`getByTextShadowed`,
  required mocks (Dialog API for p-modal/p-flyout, ElementInternals for p-textarea,
  `Element.prototype.animate` for p-tabs). Sources: `developing/{react,angular,next-js}/testing`,
  shipped `./testing` + `./jsdom-polyfill` exports. Also revisit the description's "unrelated
  tests" opt-out so tests *of* PDS components still activate.
- **[P1]** React SSR / Next.js: `@porsche-design-system/components-react/ssr` never mentioned;
  FOUC guard for SSR is `:not(:defined):not([data-ssr])`. Sources: `developing/next-js/*`,
  `must-know/initialization/*`, `remix`, `react-router`.
- **[P1]** `componentsReady()` in all trees (testing + "component markup is inert" questions).
  Source: `developing/components-ready`.
- **[P2]** Deployment: CSP whitelist (`cdn.ui.porsche.com` / `.cn`), `/cn` stylesheet +
  `cdn: 'cn'`, "npm package is only the loader, assets come from the CDN" model. Sources:
  `must-know/security/content-security-policy`, `must-know/performance/cdn`.
- **[P2]** Prefixing / micro-frontends: provider `prefix`, `load({ prefix })`, multiple prefixes
  per page; undocumented Angular NgModule-bootstrap variant, Vue `createPorscheDesignSystem` /
  `usePorscheDesignSystemPlugin`. Source: `developing/*/advanced`.
- **[P2]** AG Grid theme pointer (`pdsTheme`/`pdsThemeCompact` from `.../ag-grid`), reference row
  or note in `p-table.md`. Source: `ag-grid/theme`.
- **[P2]** CJK typography: `fontPorscheNextJa/Ko/ZhHans/ZhHant` missing from `tokensMeta`; SCSS
  `cjk-font-family` mixin undocumented.
- **[P3]** Browser-support one-liner (prevents hallucinated matrices). Source:
  `must-know/browser-compatibility`.
- **[P3]** Optional `references/patterns.md`: notification decision tree, forms-guidelines
  checklist.
- **[P3]** `cn` stylesheet variant mention in `stylesheets.md`.

### Content polish
- **[P2]** `p-popover.md` mangled intro body (all trees): source MDX
  (`components/popover/configurator/introduction.mdx`) breaks a sentence around an inline
  `<PPopover>` that renders to ~nothing. Options: per-component prose override
  (`ROSTER_SUMMARY_OVERRIDES` pattern) or fix the source MDX (also changes the live page).
- **[P3]** `vanilla-extract.md:95` link text says "Emotion Blur Examples" (storefront source
  typo); tabulate `--color-black`/`--color-white`/`--default-outline-width` +
  `scheme-normal`/`scheme-only-*` utilities in `tailwindcss.md`.

### Generator / gates
- **[P2]** Tighten `skillCompleteness.spec.ts`: (a) consult `isInternal` (`p-toast-item`'s
  exclusion is coincidental); (b) assert sub-component prop names appear under the right parent's
  heading, not just anywhere.
- **[P2]** `EMBEDDED_COMPONENT_STUBS` in `renderMdxToMarkdown.tsx` is effectively inert (pages
  import doc components directly, so the `components`-prop substitution never applies). Make the
  stubbing real or delete the list.
- **[P2]** Generator determinism unpinned: ordering assumptions (`Object.entries` in
  `componentExamples.ts`, `tokensReference.ts`) enforced only on the committing dev's machine. A
  double-generation comparison needs the MDX/alias runtime → CI script step, not a unit test.
- **[P2]** Styles/tokens/migration render coverage is indirect (link gate only); a
  degraded-but-nonempty render passes everything except human review.
- **[P3]** `renderMdxToMarkdown` residual fragilities: regex-based `<code>`-wrapper strip, inline
  backtick wrapping without embedded-backtick handling, `demoteHeadings` treating `~~~`/4+-backtick
  fences as prose. Harden opportunistically.
- **[P3]** Storefront skill page vs bin behavior: `developing/claude-code-skill/page.mdx:53-83`
  claims macOS/Linux only and instructs `mklink /D`, but the bin handles win32 via junctions.
  Reconcile; add `pds-skill` install lines to wrapper READMEs/CHANGELOG.
- **[P3]** Harden the out-of-tree pointers (`../meta`, `../tokens`, `../scss`,
  `../tailwindcss/index.css`) — R.1's intro restates the convention; optionally make them
  file-relative.

### Process
- **[P1]** Re-trigger the red storefront a11y/e2e CI jobs on PR #4555 (believed infra flake; full
  e2e passed locally). If still red, pull the `regression-storefront-{e2e,a11y}-*` artifacts
  (needs authenticated `gh`).

---

## Explicitly exclusive content (no task, by design)

- **Skill-only:** activation description; the always-apply rules wording (distributed into
  topical sections by R.1); section `useWhen` prose; "Full stylesheet" pointers;
  `ROSTER_SUMMARY_OVERRIDES`; examples "Default" row; status-banner / controlled-properties /
  sub-components connective wording (renderer code over meta, not content).
- **Storefront-only:** tutorial framing (steps, diff fences, vite/lightningcss workarounds),
  quick-start scaffolding, configurators, designer/patterns content.
- **Not moving:** component prose stays storefront `components.meta` MDX — already single-sourced,
  needed by the live site, and the render requires the storefront runtime. "Aggregation of
  package skills" applies to foundations, not to everything.

## Sequencing

- **Phase R first (agreed).** One deliberate content diff across all four trees; regeneration in
  a dedicated commit.
- Everything after Phase R needs clarification with Henri before implementation — phases 0–1 are
  mechanically safe but unconfirmed; phases 2–3 touch generated trees *and* storefront pages and
  should be coordinated with the missing-topics P1 backlog (new references belong in the target
  fragment structure, not new hardcoded strings).
- Every tree-touching task uses `build:skill:check` as its no-unintended-change proof: 0.x/1.x
  must be byte-identical, R.1/2.x/3.x change trees intentionally and isolate the content diff per
  commit.
