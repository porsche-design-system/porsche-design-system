# Porsche Design System wrapper skills — plan (branch `issue/4450-skill`, PR #4555)

**This is the single planning doc for this feature and branch.** It supersedes the former `…-skill-requirement.md`,
`…-skill-audit.md`, `…-skill-followups.md` and `…-skill-source-of-truth-plan.md` (deleted; originals in git history).
Completed work is not tracked here — see `git log issue/4450-skill`.

**Status (2026-07-10): Phases R (SKILL.md restructure into topical sections, commit `92a18a5e2f`) and N (per-package
skill name + configurable `pds-skill` destination) are DONE and no longer tracked here — see `git log`. The
`PackageSkill` fragment contract (decision F, hybrid pointer rule) is agreed with Henri; phase 0 is DONE, and phase 1 is
ready next. Every phase after 1 and every backlog item is a draft — clarify with Henri before implementing.**

## What this feature is

Each published PDS wrapper package (`@porsche-design-system/components-{js,angular,react,vue}`) ships a Claude Code
skill named after that package (`porsche-design-system-components-{js,angular,react,vue}`): a `skill/` directory of
LLM-optimized, **version-exact** markdown (`SKILL.md` entry point + `references/…`) that lives in `node_modules` and is
symlinked into `.claude/skills/` by the packaged `pds-skill` bin (package-scoped, idempotent, win32 junctions). The
skill auto-activates on frontend work via its tuned frontmatter description and lets the agent answer, generate, and
review PDS code against the installed version — a docs/version mismatch is impossible by construction.

Producer side: the storefront generates all four trees — `packages/storefront` → `npm run build:skill` (entry
`scripts/build-skill.ts`, generators in `src/lib/skill/*`, MDX render via `scripts/skill-mdx-loader.cjs` runtime). The
trees are **committed** under `packages/components-{js,angular,react,vue}/projects/*-wrapper/skill/` and copied into
dist by each wrapper's `build:subPackages:skill`. CI gates: `build:skill:check` (regenerate-and-diff),
`skillCompleteness.spec.ts`, link/raw-pointer gates, and a degraded-prose gate inside the generator.

Verified solid by the content audit (no action needed): API tables programmatically complete vs `component-meta` for all
58 components × 4 trees; `icons.md` exact (290/290); `stylesheets.md` matches shipped CSS; `tokens.md` matches
`tokensMeta` (154/154); the migration guides were verified faithful for v3→v4 before their R.1 removal (relevant for
FU.10); the `pds-skill` bin hardened and test-enforced byte-identical across wrappers; SKILL.md size and description
within skill-authoring limits.

## Where content comes from today (audit result)

Three sourcing mechanisms coexist, all sound — the open work is prose _ownership_:

1. **Meta objects** (`component-meta`, `tokensMeta`, `tailwindMeta`, `scssMeta`, `stylesheetsMeta`, …) feed both
   storefront pages and skill tables. No duplication.
2. **Storefront MDX render** (`renderMdxToMarkdown`) — component prose, partials, migration. No duplication.
3. **Package skill fragments** (`getXxxSkill()` + hand-authored `intro.md`/`how-to-use.md` in
   `packages/styles/projects/*/skill` and `packages/components/projects/stylesheets/skill`) — the desired end-state
   pattern, but its _prose_ duplicates storefront pages.

| Artifact                                                  | Source                                                                                                  | Verdict                                                                                                                                                                                    |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| SKILL.md frontmatter, core rules, reference map `useWhen` | hardcoded `storefront/src/lib/skill/skillMd.ts`                                                         | skill-only ✅ (restructured by task R.1)                                                                                                                                                   |
| SKILL.md Getting started                                  | hardcoded `GETTING_STARTED`, `skillMd.ts:109-219`                                                       | **duplicates** `developing/{react,angular,vue,vanilla-js}/getting-started/page.mdx` → R.1 removed; possible restore from wrapper fragments is FU.7/FU.8 (undecided), storefront dedup FU.4 |
| SKILL.md Styling section                                  | hardcoded `skillMd.ts:260-302`                                                                          | **restates** scheme/tokens prose → tasks R.1, 2.1                                                                                                                                          |
| references/styles/\*.md, stylesheets.md                   | package fragments (meta tables + `intro.md`/`how-to-use.md`), deep-imported by `stylesReference.ts:5-9` | package-owned ✅, **prose duplicates** storefront intro pages → FU.3 (deferred)                                                                                                            |
| references/tokens.md                                      | tables from `tokensMeta` ✅; intro hardcoded `tokensReference.ts:47-64`                                 | intro **duplicates** `tokens/introduction/page.mdx` Setup → task 3.1 (fragment), FU.5 (storefront dedup)                                                                                   |
| references/partials.md                                    | storefront MDX via `renderMdxToMarkdown`                                                                | **removed by R.1** (content not skill-ready; also fails decision G — page MDX, not package/meta) → re-entry FU.9 (undecided)                                                               |
| references/migration/\*.md                                | storefront MDX, verbatim                                                                                | **removed by R.1** (fails decision G — page MDX, not package/meta) → re-entry FU.10 (undecided)                                                                                            |
| references/components/\*\*, icons.md                      | storefront `components.meta` MDX + `component-meta` + `shared/examples`                                 | single-sourced ✅                                                                                                                                                                          |

Housekeeping debt: five orphaned `scripts/build-skill.ts` → gitignored `skill/generated/` nothing consumes; six copies
of the markdown `cell`/`table`/`code` helpers; three parallel lists (`STYLING_SOLUTIONS` in `skillMd.ts`,
`STYLE_REFERENCES` in `stylesReference.ts`, `ROUTE_REFERENCES` in `links.ts`).

## Decisions

- **(A)** Package fragments — not storefront MDX — are the canonical side for styling/stylesheets prose; the storefront
  becomes a consumer (the consumer half is deferred — Follow-ups FU.3–FU.6).
- **(B)** **(NOT DECIDED — unrefined proposal, parked in Follow-ups FU.7/FU.8.)** Getting-started becomes a structured
  snippet module + serializer, not markdown: tutorial and agent brief legitimately differ in prose but must never differ
  in facts/code.
- **(C)** **Storefront embedding is deferred (decided 2026-07-10): the phased work touches only the skill.** The
  storefront pages keep their hand-written prose for now and become fragment consumers later — Follow-ups FU.3–FU.6.
  Until then the duplication is confined to one fragment-vs-page boundary instead of scattered hardcoded strings.
- **(D)** The four generated trees stay **committed** (not gitignored + snapshot-tested): generation needs the
  storefront runtime but the trees ship in the wrapper dists, which build _before_ the storefront — a gitignored tree
  would force release-time generation against the dependency direction; the committed tree already _is_ the snapshot
  (`build:skill:check` = regenerate-and-diff), reviewed exactly where it ships; and generation is not hermetic (dev
  builds embed localhost URLs — see backlog "parked partials items"), so generate → review → commit is the safety
  mechanism, not overhead. "Gitignore + snapshot test" is not implementable for the MDX-rendered bulk anyway: the render
  requires the `skill-mdx-loader.cjs` runtime, unavailable under vitest, so a snapshot could only be a committed
  baseline diffed by a CI script — which is exactly what the committed tree + `build:skill:check` already is; the pure
  fragments, by contrast, _are_ vitest-snapshot-tested in their packages (task 0.1). Churn is mitigated by task 0.2.
- **(E)** SKILL.md is restructured into one section per domain with the global reference map and the Core rules section
  dissolved into those sections; Getting started and partials leave SKILL.md entirely until FU.7/FU.8 (getting started)
  and FU.9 (partials) — both undecided — restore them properly (done — R.1, commit `92a18a5e2f`).
- **(F)** **The `PackageSkill` contract (agreed 2026-07-10).** Every self-contained package skill (the four styling
  solutions, stylesheets, later tokens) exports a single object from its `skill/skill.ts` — type in `packages/shared`:
  ```ts
  type SkillFile = { path: string; content: string }; // path relative to the skill's own root
  type PackageSkill = {
    name: string; // kebab-case id, e.g. 'tailwindcss' — the package never knows its
    // final location; the aggregator derives it from mount + name + SkillFile.path
    title: string; // display name for tables/headings, e.g. 'Tailwind CSS'
    description: string; // "use this when …" prose (replaces the former useWhen), rendered
    // wherever the main SKILL.md lists this skill
    intro?: string; // prose the main SKILL.md embeds in this skill's topical section
    getFiles: () => SkillFile[]; // the content — one file or a directory; FIRST file is the
    // entry the main skill links; lazy, so importing the object is cheap
  };
  ```
  Ground rules:
  - `intro` is optional: stylesheets and tokens provide it (they own a SKILL.md section); the four styling solutions
    omit it (table row from `title`/`description` only; the `## Styling` framing paragraphs stay aggregator-owned).
  - `SkillFile.path` is always honored, never discarded. A single-file skill must return exactly
    `{ path: '<name>.md', content }` and mounts at `references/<mount>/<name>.md`. A multi-file skill mounts every file
    at `references/<mount>/<name>/<path>`, with `getFiles()[0]` as the linked entry. The aggregator rejects an empty
    array, duplicate or unsafe paths (absolute paths or `..` traversal), and a first file that is not markdown. These
    rules preserve today's single-file paths while making future directory-shaped skills deterministic.
  - Content is framework-agnostic — `getFiles` takes no framework parameter; each package snapshot-tests exactly one
    output. Framework variance inside content uses the existing `{js|angular|react|vue}` placeholder, resolved by the
    aggregator at write time (`links.ts`). Framework-structural text the bare placeholder cannot express — today only
    the scss/tailwind "Full stylesheet" raw pointers — stays aggregator-appended glue (**hybrid rule**, decided
    2026-07-10: a keyed placeholder DSL for two strings is not worth the machinery). The packages' references are
    self-contained with exactly that one asterisk.
  - The shape deliberately mirrors Claude-skill frontmatter (`name`/`description`) but stays a TS export, not a
    SKILL.md-shaped directory: the content is serialized from meta objects at build time, so emitting frontmatter and
    parsing it back would add nothing.
  - Tokens (phase 3) adopts the contract; getting-started (FU.7/FU.8, undecided) deliberately would NOT — it is
    per-framework structured snippets embedded _into_ SKILL.md, not a linked reference, and forcing it into
    `PackageSkill` would bend the semantics.
- **(G)** **Only package/meta-sourced content ships (articulated 2026-07-10, enacted in R.1).** Every skill reference
  must be generated from a package-owned fragment or a meta object (`component-meta`, `tokensMeta`, `tailwindMeta`, the
  icon-name union, the co-located `components.meta` docs prose). Free-standing storefront _page_ MDX is not a skill
  source: R.1 removed not just getting-started and partials but **also the five migration guides** (commit `92a18a5e2f`;
  `skillGenerator.spec.ts:126-128` asserts their absence). Consequences: re-entry of any removed domain requires
  converting its content to package/meta sourcing first (FU.9/FU.10); a getting-started return would be package-owned
  per decision B (undecided — FU.7/FU.8). The activation description, feature summary, and storefront skill page no
  longer promise partials or migration guidance while those domains are absent; if migration re-enters, FU.10 restores
  that scope alongside the package-sourced guides.

---

## Phases 0–4 (DRAFT — clarify with Henri before implementing)

### Phase 0 — groundwork (mechanical, output-neutral)

- [x] **0.1 Delete the orphaned per-package `skill/generated` build steps; close the serializer spec gap.** All five
      fragment packages ship a `scripts/build-skill.ts` writing gitignored `skill/generated/*` (md + scss partials +
      tailwind index.css) that nothing consumes — the storefront calls the `getXxxSkill()` serializers directly. The
      verification already exists in the right form: 4 of 5 packages snapshot-test the serializer in their own unit
      suite (`components/projects/stylesheets/tests/unit/specs/skill.spec.ts` and the scss/emotion/vanilla-extract
      siblings — `expect(getXxxSkill()).toMatchSnapshot()`, pure function, no build needed). The snapshot is the better
      in-package artifact: PR-reviewable, deliberately updated via `-u`, never diverges from what ships (the build
      step's prettier-formatted output does). Fix: remove `scripts/build-skill.ts` and the `build:skill` script entry
      (and its slot in the `build` chain where wired) in
      `packages/styles/projects/{tailwindcss,scss,vanilla-extract,emotion}` and
      `packages/components/projects/stylesheets`; remove the ignored local `skill/generated` artifacts (the repository
      has no skill-specific ignore line — the shared `generated/` rule remains for unrelated generated sources); update
      the obsolete generated-output guidance in `packages/styles/AGENTS.md` and
      `packages/components/projects/stylesheets/AGENTS.md`; **add the missing `tailwindcss` `skill.spec.ts` snapshot
      test** (only fragment without one). Acceptance:
      `git grep "skill/generated" -- packages/styles packages/components/projects/stylesheets` finds nothing; all five
      fragments have a serializer snapshot spec; package builds + unit tests green; `build:skill:check` introduces no
      0.1-related diff (the known aggregate token/snapshot drift remains deliberately deferred until the end of the
      plan).

- [x] **0.2 Tame committed-tree churn in PRs (decision D mitigation).** The four committed trees change on every
      content/meta edit — by design (they are the published, reviewed artifact and the de-facto snapshot), but they must
      not drown PR diffs. Fix: mark `packages/components-*/projects/*-wrapper/skill/**` as `linguist-generated` in
      `.gitattributes` (GitHub collapses the files and excludes them from diff stats; still expandable for content
      review); keep isolating regeneration output in dedicated `regenerate skill trees` commits so the source change and
      its rendered effect are separately reviewable. Acceptance: a PR touching skill content shows the trees collapsed
      by default; regeneration commits contain only `skill/**` changes.

### Phase 1 — fragment contract + aggregator

- [ ] **1.1 Make each fragment export a `PackageSkill` (decision F).** Each fragment currently exports only
      `getXxxSkill(): string`; the SKILL.md prose describing it (`useWhen`, section text, styling-table rows) lives in
      storefront constants, and the reference path is dictated by the storefront's `STYLE_REFERENCES` list. Fix: each of
      the five fragments exports one `PackageSkill` object (type from `packages/shared`):
  - `name`/`title`: `tailwindcss`/`Tailwind CSS`, `scss`/`SCSS`, `vanilla-extract`/`vanilla-extract`,
    `emotion`/`Emotion`, `stylesheets`/`Stylesheets`.
  - `description`: today's `useWhen` strings verbatim (styling solutions: the `STYLING_SOLUTIONS` rows in
    `skillMd.ts:220-225`; stylesheets: the "use when" prose inside `renderStylesheetsSection`, `skillMd.ts:201-208`).
  - `intro`: stylesheets only — the what-it-is/when-to-open prose from `renderStylesheetsSection` minus the theming
    inoculation note, which is skill-only anti-hallucination content and stays aggregator-owned (see "Explicitly
    exclusive content").
  - `getFiles`: wraps the existing serializer output as the single entry file. The scss/tailwindcss "Full stylesheet"
    pointer section (`fullStylesheetSection` + `rawScssReference`/`rawTailwindcssReference`, appended by
    `stylesReference.ts:46-56`) stays aggregator-appended per decision F's hybrid rule — no fragment change there. Keep
    all strings exactly as shipped so trees stay byte-identical. Existing `getXxxSkill()` exports may remain as internal
    helpers; the snapshot specs (task 0.1) snapshot the `PackageSkill` (fields + rendered files) instead. Location:
    `packages/styles/projects/*/skill/skill.ts`, `packages/components/projects/stylesheets/skill/skill.ts`; type in
    `packages/shared`. Acceptance: five `PackageSkill` exports, typed, snapshot-tested; no generator changes yet; builds
    green.

- [ ] **1.2 Parameterize `buildSkillMd` with plain rows derived from the `PackageSkill` objects.** Kill the parallel
      lists: after R.1 there is no global reference map — the `## Stylesheets` section prose and the `## Styling` table
      (`STYLING_SOLUTIONS`, `skillMd.ts:220-225`) and `STYLE_REFERENCES` (`stylesReference.ts:37-43`) must all derive
      from the task-1.1 `PackageSkill` exports; fold the route↔reference mapping (`ROUTE_REFERENCES`, `links.ts`) into
      the same registry so in-tree link rewriting can't silently degrade to live-docs URLs. Shape: `buildSkillMd` does
      NOT import the fragments — it receives plain data rows (`{ title, description, intro?, resolvedPath }`) from the
      task-1.3 registry, the same way it receives the roster today. That resolves the light-import concern by
      construction (unit tests pass fixture rows; no `tailwindMeta` in the import graph) — no meta/content module split
      needed in the packages. `rawScssReference`/`rawTailwindcssReference` move out of `skillMd.ts` with the
      pointer-appending glue into the task-1.3 registry (hybrid rule); `rawMetaReference` stays (used by the
      `## Components` section). Acceptance: adding a styling solution = one new fragment + one registry line;
      `skillMd.ts` contains no styling/stylesheets prose or paths beyond the aggregator-owned theming note and
      `## Styling` framing paragraphs; regenerated trees byte-identical (relative to post-N trees).

- [ ] **1.3 Reshape `build-skill.ts` around an explicit fragment registry that mounts `PackageSkill`s.** One registry
      enumerating the content sources — package skills (styles ×4, stylesheets, later tokens; partials/migration on
      re-entry), storefront-MDX renderers (components), meta renderers (icons) — each contributing files + SKILL.md rows
      through one interface, instead of the hand-ordered `writeX` calls in `generateTree`
      (`scripts/build-skill.ts:151-202`). Path derivation lives ONLY here: mounting a `PackageSkill` at a mount point
      validates and honors every `SkillFile.path` per decision F. A single-file skill must expose `<name>.md` and writes
      it to `references/<mount>/<name>.md` (styling solutions: mount `styles`; stylesheets: mount root →
      `references/stylesheets.md`, exactly today's layout); a multi-file skill writes to
      `references/<mount>/<name>/<path>` with `getFiles()[0]` as the linked entry. The registry resolves placeholders
      and doc links at write time (the existing `links.ts` machinery), appends the hybrid "Full stylesheet" pointers for
      scss/tailwindcss, and hands `buildSkillMd` its rows (task 1.2). `stylesReference.ts` dissolves into the registry.
      Acceptance: `generateTree` iterates the registry; invalid file arrays/paths fail with a source-specific error;
      per-source degraded-prose reporting and the roster path unchanged; trees byte-identical; "add a domain" =
      "register a fragment" documented in the file header; no fragment exports or hardcodes a `references/…` path.

### Phase 2 — styling / stylesheets / theming prose (decision A)

- [ ] **2.1 Shrink the SKILL.md `## Styling` section to registration data + one paragraph.** `renderStylingSection`
      (`skillMd.ts:275-302`; after R.1 the last section) restates scheme/`light-dark()`/tokens mechanics that
      `references/stylesheets.md` owns — redundant twice over, since R.1 gives stylesheets its own SKILL.md section
      pointing there. Fix: keep the table (title/description from the task-1.1 `PackageSkill`s), one framing paragraph
      (independent of components, same tokens/theming, pick one per project), the Tailwind-utilities-in-examples note,
      and a pointer to `references/stylesheets.md`; delete the restated mechanics. Acceptance: styling section no longer
      explains `.scheme-*`/`light-dark()`; agent still finds mechanics via the pointer; SKILL.md word count drops.

- [ ] **2.2 Single canonical scheme/theming explanation within the skill.** Copies today:
      `stylesheets/color-scheme/introduction/page.mdx` (storefront — untouched for now, dedup in FU.3), the stylesheets
      fragment prose, the SKILL.md theming notes. Fix: the stylesheets fragment (canonical per decision A) keeps the
      full mechanics; the SKILL.md theming notes (after R.1: in `## Stylesheets` and `## Styling`) keep only the
      skill-specific anti-hallucination content (no `theme` prop — not on `THEME_INIT_TARGET[framework]` and not on
      components; stale-prior warning) plus the pointer. Acceptance: `.scheme-*` mechanics explained in exactly one
      place within the skill tree; the no-`theme`-prop inoculation survives; activation/tuning behavior unchanged.

### Phase 3 — tokens

- [ ] **3.1 Tokens fragment for the intro prose.** `tokensReference.ts:47-64` hardcodes intro/usage prose duplicating
      `tokens/introduction/page.mdx` Setup. Fix: add `packages/tokens/projects/tokens-meta/skill/` (styles pattern:
      `intro.md` + `how-to-use.md` + serializer over `tokensMeta`), exporting a `PackageSkill` per decision F
      (`name: 'tokens'`, `intro` owns the `## Tokens` SKILL.md section prose, `description` the former `useWhen`);
      `tokensReference.ts` dissolves into the task-1.3 registry. The storefront tokens introduction page is untouched
      (dedup: FU.5). Acceptance: the skill's tokens intro is fragment-owned; `tokens.md` content unchanged; trees
      regenerate clean.

### Phase 4 — gates

- [ ] **4.1 Fragment-completeness assertion.** Every registered fragment must land in every tree and in its SKILL.md
      section (components are already gated this way by `skillCompleteness.spec.ts`; the package skills and tokens are
      not — today only the link gate would notice a missing styles/stylesheets/tokens reference). Fix: extend
      `skillCompleteness.spec.ts` (or the `assert-skill-in-sync.ts` gate, which has the full runtime) to iterate the
      task-1.3 registry. If FU.9/FU.10 reinstate partials/migration, their source lists get the same filesystem gate (a
      new guide must not silently miss the skill). Acceptance: deleting a fragment registration or its output file fails
      CI.

---

## Follow-ups (deliberately deferred — not part of the phased work)

- [ ] **FU.1 Hoist the markdown helpers to `packages/shared`.** Six copies of `cell`/`table`/`code`:
      `storefront/src/lib/skill/markdown.ts` + the five fragment `skill/skill.ts` files. Unify on the storefront's
      stricter semantics (`escapeCell` collapses all whitespace + trims; the styles `cell` only collapses newlines).
      Fix: export from `packages/shared` (already a dependency of all three packages); import everywhere; delete local
      copies. Must resolve under the storefront `tsx` runtime (deep source imports) — mirror how `stylesReference.ts`
      imports fragment source today. Acceptance: one implementation; regenerate-and-diff gate proves output-neutral (or
      shows only intended whitespace normalization in the four styles references).

- [ ] **FU.2 Move `resolveFrameworkPlaceholder` to `packages/shared`.** Contract hygiene, not an enabler: the
      `{js|angular|react|vue}` convention is authored in package markdown but interpreted only in
      `storefront/src/lib/skill/links.ts`. Nothing scheduled needs it elsewhere — storefront pages (FU.3/FU.4) import
      `links.ts` directly, and packages only author placeholders, never resolve them. Do it if a package ever needs to
      resolve (e.g. to snapshot per-framework output), placing the resolver next to the `PackageSkill` type.

### Storefront becomes a fragment consumer (decisions A/C — no storefront rendering changes until these)

The phased work above never touches a storefront page. These tasks flip the pages from hand-written prose to fragment
consumers and close the remaining fragment-vs-page duplication; do them only after the skill-side phases have landed.

- [ ] **FU.3 Storefront intro pages embed the canonical fragment prose.**
      `styles/projects/*/skill/{intro,how-to-use}.md` and `components/projects/stylesheets/skill/{intro,how-to-use}.md`
      near-duplicate `(main)/{tailwindcss,scss,vanilla-extract,emotion}/introduction/page.mdx` and
      `(main)/stylesheets/introduction/page.mdx` (+ `stylesheets/color-scheme/introduction`). Fix: render the fragment
      markdown inside those storefront pages (markdown-render component or convert fragments to importable MDX —
      fragments must stay free of storefront-only components); resolve `{js|angular|react|vue}` via the storefront
      framework switcher (`resolveFrameworkPlaceholder` in `links.ts` — storefront-local, pages import it directly);
      delete the now-duplicated hand-written MDX prose, keeping page-only framing (steps, vite workarounds,
      `StylesheetViewer`, notifications). Acceptance: the shared facts (import order, required files, `.scheme-*` list,
      Tailwind-v4 requirement) exist in exactly one file per domain; storefront pages render them; skill trees
      unchanged; storefront e2e/a11y green.

- [ ] **FU.4 Storefront getting-started pages import the getting-started snippets (depends on FU.7).**
      `developing/{react,angular,vue,vanilla-js}/getting-started/page.mdx` inline the same
      install/provider/stylesheet/FOUC code as hand-written fenced blocks. Fix: import the FU.7 snippet constants into
      the MDX and render them (the diff-fence presentation can wrap the shared strings); tutorial prose, step structure,
      and vite/lightningcss workarounds stay page-owned. Acceptance: changing a snippet in one fragment changes both the
      storefront page and (after regeneration) the skill; no setup code block exists twice; storefront e2e green.

- [ ] **FU.5 Storefront tokens introduction imports the tokens fragment snippet.** The Setup section of
      `tokens/introduction/page.mdx` duplicates the intro the task-3.1 tokens fragment owns; embed the shared snippet
      (FU.3 pattern). Acceptance: the tokens import instruction exists once across skill and storefront.

- [ ] **FU.6 Storefront render coverage for embedded fragments.** The pages changed in FU.3–FU.5 render package-owned
      prose; a broken import or placeholder regression must not ship silently. Fix: storefront render/e2e assertion that
      each embedding page contains a sentinel string from its fragment (one per page suffices). Acceptance: emptying a
      fragment file fails the storefront test suite, not just skill CI.

### Getting started single source (decision B — NOT DECIDED, NOT REFINED)

**Neither the approach nor the goal is agreed yet** — decision B (structured snippet fragments per wrapper) is a
proposal, and whether `## Getting started` returns to SKILL.md at all is open. Parked here as drafted; refine with Henri
before touching anything below.

- [ ] **FU.7 Add per-wrapper getting-started fragments.** Create a source fragment in each wrapper project (e.g.
      `packages/components-js/projects/components-wrapper/skill-src/gettingStarted.ts` and the angular/react/vue
      siblings — dir name must not collide with the _generated_ `skill/`): structured snippets
      `{ installCommand, initSnippet, stylesheetSnippet, foucGuard, writingComponentRules }` +
      `getGettingStartedSkill(): string` serializer reproducing the content removed in R.1 (recover the
      reviewed/corrected `GETTING_STARTED` strings from git history — the MDX pages are the _consumers_, not the source,
      per decision B). Watch-out: keep fragments dependency-light (plain TS, shared helpers only) — they're imported by
      the storefront generator via deep source import (established pattern, `stylesReference.ts:1-4`) and later by
      storefront pages (FU.4). Per decision F these fragments do NOT adopt the `PackageSkill` contract: getting-started
      is per-framework structured snippets embedded _into_ SKILL.md, not a linked reference. Acceptance: four fragments
      export the R.1-removed content; unit-testable without the MDX runtime.

- [ ] **FU.8 Skill reintroduces Getting started from the fragments.** Fix: `buildSkillMd` renders a `## Getting started`
      section (position: between the headline and `## Components`) from the framework's fragment (via the task-1.3
      registry). R.1 already deleted the hardcoded `GETTING_STARTED`, so this is purely additive. Add a lightweight spec
      asserting the hand-written API claims against wrapper types (e.g. the provider prop set from the react wrapper ↔
      `initSnippet`) — the fragments make these claims gateable for the first time. Acceptance: the reintroduced section
      matches the R.1-removed content (modulo the "Writing components" bullets if they stayed in `## Components`);
      `skillMd.ts` contains no setup snippets.

### Re-entry of removed domains (partials, migration — decision G, NOT DECIDED)

Both domains left the skill in R.1 because their only source was storefront _page_ MDX. Re-entry requires converting
each to package/meta sourcing first — restoring the old MDX-render wiring from git history would reintroduce exactly
what decision G removed. **Whether either re-enters at all is an open decision with Henri.** The activation description
and public feature summary no longer promise either domain while they are absent.

- [ ] **FU.9 Partials re-entry as a package-owned skill.** Natural fit for decision F: the partials implementation IS a
      package (`components-js/projects/partials`) — author a `skill/` fragment there exporting a `PackageSkill` (name
      `partials`, intro for a restored `## Partials` SKILL.md section), mounted by the task-1.3 registry like the styles
      fragments; the storefront partials pages stay untouched (consumption later, FU.3 pattern). Still blocked on the
      parked partials content items (backlog below): loader-script example outputs must embed the CDN URL, not
      `localhost:3001`, and the integration examples should be framework-flavored per tree (an aggregator concern,
      consistent with the hybrid rule). Acceptance: partials reference in all four trees, sourced from the partials
      package, with CDN URLs and per-framework integration snippets; registered in the task-4.1 completeness gate.

- [ ] **FU.10 Migration re-entry — decide, then source.** Options: (a) stays out — keep the already-trimmed activation
      description and feature summary free of migration claims; (b) re-enters — give the five guides a
      decision-G-conformant home (e.g. a fragment in the components-js wrapper, since upgrade steps are version-coupled
      to the package), then restore migration scope in the activation description and public feature summary. The
      storefront migration-guide pages stay untouched (consumption later, FU.3 pattern). The audit found the guides
      faithful, so (b) is a sourcing move, not a rewrite. Acceptance: either the promise remains absent everywhere
      (description, feature summary, storefront skill docs page) or the guides ship package-sourced with a
      `## Upgrades & migration` section and the task-4.1 filesystem gate.

## Open backlog (merged from the former audit/followups — unprioritized, clarify first)

### Parked partials items (FU.9 blockers)

- **[P1, parked]** `getLoaderScript` example outputs embed `http://localhost:3001/...`. Not a source edit: the committed
  partials bundle (`components-js/projects/partials/src/lib/partials.tsx`) embeds `deployUrl` from
  `components-wrapper/environment.ts`, which is `localhost:3001` only under `PORSCHE_DESIGN_SYSTEM_DEV=1`; needs
  regeneration from a production components build (release pipeline / CI), not a code change.
- **[P3, parked]** Framework-flavored partials integration examples (react/angular/vue trees shipped vanilla-js
  `index.html` sed scripts); plus cosmetics (double `# Partials`/`## Partials` heading, language-less fences, stale
  `v4.3.0` hashes in example outputs).

### Missing topics — skill cannot answer these today

(R.1's "read the actual source alongside the skill" intro is the interim fallback; when authored, these belong in the
fragment structure or per-framework storefront MDX render, not hardcoded generator strings.)

- **[P1]** `references/testing.md` per framework: `jsdom-polyfill`, `componentsReady()`,
  `skipCheckForPorscheDesignSystemProviderDuringTests()`, `skipPorscheDesignSystemCDNRequestsDuringTests()`,
  `getByRoleShadowed`/`getByTextShadowed`, required mocks (Dialog API for p-modal/p-flyout, ElementInternals for
  p-textarea, `Element.prototype.animate` for p-tabs). Sources: `developing/{react,angular,next-js}/testing`, shipped
  `./testing` + `./jsdom-polyfill` exports. Also revisit the description's "unrelated tests" opt-out so tests _of_ PDS
  components still activate.
- **[P1]** React SSR / Next.js: `@porsche-design-system/components-react/ssr` never mentioned; FOUC guard for SSR is
  `:not(:defined):not([data-ssr])`. Sources: `developing/next-js/*`, `must-know/initialization/*`, `remix`,
  `react-router`.
- **[P1]** `componentsReady()` in all trees (testing + "component markup is inert" questions). Source:
  `developing/components-ready`.
- **[P2]** Deployment: CSP whitelist (`cdn.ui.porsche.com` / `.cn`), `/cn` stylesheet + `cdn: 'cn'`, "npm package is
  only the loader, assets come from the CDN" model. Sources: `must-know/security/content-security-policy`,
  `must-know/performance/cdn`.
- **[P2]** Prefixing / micro-frontends: provider `prefix`, `load({ prefix })`, multiple prefixes per page; undocumented
  Angular NgModule-bootstrap variant, Vue `createPorscheDesignSystem` / `usePorscheDesignSystemPlugin`. Source:
  `developing/*/advanced`.
- **[P2]** AG Grid theme pointer (`pdsTheme`/`pdsThemeCompact` from `.../ag-grid`), reference row or note in
  `p-table.md`. Source: `ag-grid/theme`.
- **[P2]** CJK typography: `fontPorscheNextJa/Ko/ZhHans/ZhHant` missing from `tokensMeta`; SCSS `cjk-font-family` mixin
  undocumented.
- **[P3]** Browser-support one-liner (prevents hallucinated matrices). Source: `must-know/browser-compatibility`.
- **[P3]** Optional `references/patterns.md`: notification decision tree, forms-guidelines checklist.
- **[P3]** `cn` stylesheet variant mention in `stylesheets.md`.

### Content polish

- ~~**[P2]** `p-popover.md` mangled intro body~~ — **fixed** (audit 2026-07-10: intro reads clean in the committed
  trees; `DEGRADED_ALLOWLIST` is empty).
- ~~**[P3]** `vanilla-extract.md` "Emotion Blur Examples" link-text typo~~ — **fixed** (audit 2026-07-10: string gone
  from the trees).
- **[P3]** Tabulate `--color-black`/`--color-white`/`--default-outline-width` + `scheme-normal`/`scheme-only-*`
  utilities in `tailwindcss.md` (audit 2026-07-10: still absent — belongs in `tailwindMeta`/the tailwindcss fragment,
  per decision G).

### Generator / gates

- **[P2, shrunk]** Tighten `skillCompleteness.spec.ts`: the spec now derives coverage from
  `isChunked && !requiredParent` and asserts every sub-component appears as a `### <tag>` heading in at least one parent
  reference — the original concern is largely addressed. Remaining nits: `isInternal` is still not consulted, and "at
  least one parent" is weaker than "the right parent".
- **[P2]** `EMBEDDED_COMPONENT_STUBS` in `renderMdxToMarkdown.tsx` is effectively inert (pages import doc components
  directly, so the `components`-prop substitution never applies). Make the stubbing real or delete the list.
- **[P2]** Generator determinism unpinned: ordering assumptions (`Object.entries` in `componentExamples.ts`,
  `tokensReference.ts`) enforced only on the committing dev's machine. A double-generation comparison needs the
  MDX/alias runtime → CI script step, not a unit test.
- **[P2]** Styles/tokens/migration render coverage is indirect (link gate only); a degraded-but-nonempty render passes
  everything except human review.
- **[P3]** `renderMdxToMarkdown` residual fragilities: regex-based `<code>`-wrapper strip, inline backtick wrapping
  without embedded-backtick handling, `demoteHeadings` treating `~~~`/4+-backtick fences as prose. Harden
  opportunistically.
- **[P3]** Storefront skill page vs bin behavior: `(main)/developing/claude-code-skill/page.mdx` still claims
  macOS/Linux only (`:58-59`) and instructs `mklink /D` (`:97-100`), but the bin handles win32 via junctions — confirmed
  still present after the N.3/N.4 page edits. Reconcile; add `pds-skill` install lines to wrapper READMEs/CHANGELOG.
- **[P3]** Harden the out-of-tree pointers (`../meta`, `../tokens`, `../scss`, `../tailwindcss/index.css`) — R.1's intro
  restates the convention; optionally make them file-relative.

### Process

- **[P1]** Re-trigger the red storefront a11y/e2e CI jobs on PR #4555 (believed infra flake; full e2e passed locally).
  If still red, pull the `regression-storefront-{e2e,a11y}-*` artifacts (needs authenticated `gh`).

---

## Explicitly exclusive content (no task, by design)

- **Skill-only:** activation description; the always-apply rules wording (distributed into topical sections by R.1);
  section `useWhen` prose; "Full stylesheet" pointers; `ROSTER_SUMMARY_OVERRIDES`; examples "Default" row; status-banner
  / controlled-properties / sub-components connective wording (renderer code over meta, not content).
- **Storefront-only:** tutorial framing (steps, diff fences, vite/lightningcss workarounds), quick-start scaffolding,
  configurators, designer/patterns content.
- **Not moving:** component prose stays storefront `components.meta` MDX — already single-sourced, needed by the live
  site, and the render requires the storefront runtime. "Aggregation of package skills" applies to foundations, not to
  everything.

## Sequencing

- **Phases 0–1 next (agreed 2026-07-10 via decision F).** Mechanically safe, byte-identical trees. Phases 2–3 still need
  clarification: they change tree content intentionally — never a storefront page (decision C) — and should be
  coordinated with the missing-topics P1 backlog (new references belong in the target fragment structure, not new
  hardcoded strings).
- Every tree-touching task uses `build:skill:check` as its no-unintended-change proof: 0.x/1.x must be byte-identical,
  2.x/3.x change trees intentionally and isolate the content diff per commit.
