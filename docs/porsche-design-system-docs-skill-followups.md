# Skill (`porsche-design-system-docs`) — outstanding follow-ups

Handoff backlog for PR #4555 (branch `issue/4450-skill`). Items still open are listed under each theme
below; items already fixed are listed at the bottom (both the original branch fixes and the follow-up
pass) so they are not re-investigated. A follow-up pass has cleared all of §4 and the P1s of §1–§2;
what remains is mostly P2/P3 content polish, generator refactors, and test-gate hardening.

Grouped by theme, each item tagged **[P1]** (blocks a good release / user-facing / correctness),
**[P2]** (quality, maintainability, meaningful gaps), **[P3]** (polish). File paths are relative to
the repo root; line numbers are approximate (the branch has been edited since the review).

---

## 1. CI / release wiring

- **[P1] Storefront A11y / E2E CI checks red on the PR but not branch-caused.** Full e2e passed
  locally (617 tests); the newly-added `/developing/claude-code-skill/` page passes a11y in both
  schemes. Most likely infra/flake in the June-26 run. Action: re-trigger those jobs; if still red,
  pull the `regression-storefront-{e2e,a11y}-*` artifacts (needs authenticated `gh`). _(Not
  branch-caused / infra — no code change; left open pending a re-trigger.)_

_The `build:skill` wiring, regenerate-and-diff drift gate, React `npx` command, and requirement-doc
criterion 6 are done — see "Fixed in the follow-up pass" below._

---

## 2. Skill content quality (impact on an agent using the skill)

_Sub-component documentation and the getting-started / framework tag-name mapping are done — see
"Fixed in the follow-up pass" below. Note that only 16 real sub-components carry `requiredParent` in
`component-meta`; the review's list also named `p-button-group`, `p-select-wrapper` and
`p-text-field-wrapper`, which are **not** in `component-meta` at all (legacy/removed wrappers) — the
completeness gate would not cover them. If they still appear in any prose/examples, that is a separate
source-data issue, not a sub-component gap._

- **[P2] Per-file *prose* boilerplate still duplicated across ~58 component files.** The "Authoritative
  API data…" sentence, the "guidance for designers and developers…" filler line, the identical ARIA
  shadow-DOM "Limitations" table, and the all-✅ "Tests" section still repeat in every file. These come
  from the source MDX (usage/accessibility), so hoisting them means MDX post-processing (strip the known
  boilerplate blocks + add one shared copy to SKILL.md) or source edits — a different mechanism from the
  icon fix, deferred. _(The biggest offender — the ~290-name icon union, ~4.2 KB × ~9 files/tree — is
  done: it is now the shared `references/icons.md`, linked from each icon prop. See "Fixed in the
  follow-up pass".)_
### Content bugs (source-data / MDX-render, per component)

- **[P2] `p-popover.md` mangled intro body** (all trees): the intro splits "…in conjunction with the
  info" / "" / "-button." because the source MDX embeds an interactive `<PPopover>` between words (a
  paragraph break in source + a component that renders to ~nothing in the skill markdown). The **roster
  summary** is now curated (fixed); the intro **body** is still degraded — a genuine MDX→markdown
  fidelity limit for interactive components embedded in prose. Fix would need `renderMdxToMarkdown` to
  strip/placeholder inline interactive components and rejoin the surrounding text.
- **[P2] `p-select.md` garbled run-on intro** from concatenated list items ("Use to trigger an action
  based on the selected option choose and search one option…"). MDX intro render concatenates list
  items without separation. _(The related value-type-as-string-literals bug is fixed — see below.)_
- **[P3] `p-button` / `p-link` `variant` description names an invalid `tertiary` value.** The `variant`
  prop type is `LinkButtonVariant` = `'primary' | 'secondary'`, but the JSDoc on `button.tsx` /
  `link.tsx` says "(e.g. `primary`, `secondary`, `tertiary`)". **Not a contained skill fix:** the
  description is authored in the two `@Prop()` JSDocs and Stencil/wrapper codegen bakes it into many
  committed generated files — `components.d.ts`, the React (regular + SSR) and Vue wrappers, the
  jsdom-polyfill entries, `component-meta` (src + snapshot) and the four skill trees. Fixing it correctly
  means editing the two JSDocs (suggest "(`primary` or `secondary`)") and running the **full
  components-package build** (`stencil build` → wrappers → jsdom-polyfill → `component-meta` → skill) so
  every generated copy is regenerated in lockstep. Belongs in a dedicated components change, not a
  storefront-scoped skill pass.
- **[P3] React `p-button/examples/Form.tsx` duplicate React imports** (harmless lint noise; example
  source, not generated). Also `name` frontmatter is identical across all four trees — fine when one
  framework is installed, collides in a monorepo with two frontends; documented as a single fixed name,
  note only.

---

## 3. Generator code quality

- **[P2] Consolidate the six copies of the markdown `cell`/`table`/`code` helpers.** The backslash/pipe
  escaping was fixed in all six, but they remain duplicated: `packages/storefront/src/lib/skill/markdown.ts`
  and `packages/styles/projects/{tailwindcss,scss,emotion,vanilla-extract}/skill/skill.ts` +
  `packages/components/projects/stylesheets/skill/skill.ts`. Extract a shared util (e.g. in
  `packages/shared`) so escaping logic lives once. (markdown.ts's own header comment claims this was
  already done — it is not.)
- **[P3] Single source of truth for parallel lists (partial).** `STYLING_SOLUTIONS` (`skillMd.ts`) and
  `STYLE_REFERENCES` (`stylesReference.ts`) must still be edited in tandem to add a solution — fully
  merging them would couple `skillMd.ts` to the heavy `getXxxSkill` serializers, so left as-is. _(The
  `MIGRATION_GUIDES` / `SKELETON_REFERENCE_MAP` pair is done — see "Fixed in the follow-up pass".)_
- **[P3] `renderMdxToMarkdown` residual fragilities.** `renderPre`'s `<code>`-wrapper strip is still
  regex-based (now re-parses inner HTML, so highlighter markup is handled — but a literal `</code>` in
  example text could still confuse the strip); inline `CODE` wraps in single backticks without handling
  embedded backticks; `demoteHeadings` treats `~~~` and 4+-backtick fences as prose. Low probability
  with current sources; harden opportunistically.

---

## 4. bin CLI (`pds-skill.js`) robustness

_All items in this section are done — see "Fixed in the follow-up pass" below. One deliberately-skipped
detail: the §4 P3 suggestion of a **relative** symlink target was not adopted (a relative link points at
the same physical store path, so it does not survive a pnpm version bump either); the "re-run after
upgrading" log line is the pragmatic mitigation that shipped instead._

---

## 5. Test-gate gaps (beyond those above)

- **[P2] Styles/tokens/partials/migration coverage is indirect.** The component set is now gated in both
  directions (see below), but styles/tokens/partials/migration are still covered only via the link gate
  resolving SKILL.md's map rows; a partials reference that renders degraded-but-nonempty would pass
  everything except human review. (The degraded-prose gate in `build:skill` now catches the *empty*
  case; a non-empty-but-wrong render still isn't asserted.)
- **[P2] Generator determinism is unpinned.** Ordering assumptions (`Object.entries` in
  `componentExamples.ts`, `tokensReference.ts`) are enforced only on the committing dev's machine. The
  regenerate-and-diff `Skill` job now compares one fresh generation against the commit, but not two
  generations against each other. A true double-generation smoke test needs the MDX/alias runtime
  (unavailable under plain vitest), so it belongs as a script/CI step, not a unit test.

---

## Already fixed on this branch (do not re-investigate)

- CI: backslash escaping in all six markdown `cell` helpers (CodeQL high-severity); stale
  `stylesReference.spec.ts` rewritten to the link-in-place contract; `sitemap.json` fixture regenerated
  for the new docs page.
- Content: `partials.md` highlighter-HTML soup (`renderPre` re-parses inner HTML); 234/tree dead
  site-absolute links (`rewriteDocLinks` maps them to in-tree references or canonical URLs);
  `renderTable` now escapes pipes so union-type cells don't break rows.
- All four trees regenerated; full storefront unit suite green (drift, completeness, link gates).

### Fixed in the follow-up pass (do not re-investigate)

- **Bin CLI robustness (§4).** All four `pds-skill.js` copies hardened byte-identically: Windows uses a
  `junction` (no elevation) with an actionable `EPERM` fallback; `rmSync` now only removes a symlink it
  owns and refuses a real directory; `mkdirSync` ENOTDIR is caught with a clear message; a
  "re-run after upgrading" line addresses the pnpm store-path bump. New specs: byte-identical-sync check
  across all four bins, existing-real-directory refusal, ENOTDIR case, and an npx-resolution invariant
  (`packages/components-js/tests/unit/specs/pds-skill.spec.ts`).
- **React `npx` command (§1).** Docs page now uses `npx --package=@porsche-design-system/components-<fw>
  pds-skill` for all four (required for multi-bin `components-react`); guarded by
  `claudeCodeSkillDocs.spec.ts` (bare form banned on command lines) + the npx-resolution invariant above.
- **`build:skill` wiring + regenerate-and-diff (§1).** Root `build:skill` / `build:skill:check`; new
  storefront `assert-skill-in-sync.ts`; new `Skill` CI job in `test.yml` regenerates the four trees and
  fails on any diff vs the commit (the honest gate the fingerprint alone could not provide — noted in
  `skillDrift.spec.ts`).
- **Requirement doc criterion 6 (§1).** Scope + criteria 6/8 updated: the eval set is offline
  description-tuning (not a shipped/CI harness), and criterion 8 now names the regenerate-and-diff gate.
- **Getting-started + framework tag-name mapping (§2).** New per-framework "## Getting started" section
  in every `SKILL.md`: install + provider/module/`load()` + global stylesheet + FOUC guard, and the
  `p-button`→`<PButton>` / kebab→camel / event-name (`onDismiss` / `@dismiss` / `(dismiss)` /
  `addEventListener`) conventions. Covered by `skillGenerator.spec.ts`.
- **Sub-components documented under their parent (§2).** All 16 `requiredParent` sub-components
  (`p-table-*`, `p-select-option`, `p-optgroup`, `p-tabs-item`, …) now render their authoritative
  `component-meta` API in a "## Sub-components" section of each top-level ancestor's reference (shared
  subs appear under every parent they resolve to). SKILL.md notes where sub-components live. New
  completeness gate asserts every sub-component appears under a parent; unit tests for
  `parseRequiredParents` / `renderSubComponents` / `buildSubComponentMap`.
- **`{js|angular|react|vue}` placeholder resolution (§2).** `SkillTree` now resolves the framework
  placeholder to the concrete package name on every write (`resolveFrameworkPlaceholder` in `links.ts`)
  and drops the obsolete "replace with your framework" instruction. A completeness gate fails on any
  unresolved placeholder in a committed tree; unit tests cover the helper.
- **Union-type prop rendering (§2 content bug).** `formatType` now detects when a prop's `allowedValues`
  is the decomposition of a union type (all primitive keywords, e.g. `['string','number','null']`) and
  renders the type (`string | number | null`) instead of quoted string literals (`'string'`). Fixes the
  `p-select` `value` row (and every other union-typed prop); unit-tested. The `p-select` run-on intro
  (MDX list-item concatenation) is still open above.
- **Framework-wrapper raw-data note (§2).** SKILL.md core rules now explain, for angular/react/vue only,
  that the js-peer `/meta` and `/scss` subpaths are the authoritative source behind the wrapper's
  re-export shims; unit-tested.
- **Roster summary curation (§2).** `ROSTER_SUMMARY_OVERRIDES` in `componentsReference.ts` supplies
  concise "what it is" one-liners for the components whose `leadSentence(introduction)` was
  marketing/context/truncated (`p-flag`, `p-pagination`, `p-popover`, `p-spinner`); all others keep the
  auto-extracted lead sentence. Completeness gate asserts override keys are real documented tags and the
  curated text reaches every SKILL.md. (The `p-popover` *body* still shows the MDX-render artifact from
  an interactive component embedded mid-sentence — a known MDX-fidelity limit, see §2 content bugs.)
- **MDX SSR error context (§3).** `renderMdxToMarkdown` now wraps `renderToStaticMarkup` in try/catch and
  rethrows with a `tag › section` / `migration/<slug>` / `partials › <fn>` label threaded from every
  caller, so an SSR failure names the source instead of an anonymous stack; unit-tested.
- **`loadOptional` + degraded gate + CLI hardening (§3).** The three `loadXxxGeneration` loaders are one
  generic `loadOptional<T>()` that degrades to a skeleton **only** on `ERR_MODULE_NOT_FOUND`-family
  codes and rethrows real bugs. `build:skill` now fails (non-zero) on any degraded prose not in
  `DEGRADED_ALLOWLIST` (currently empty), rejects unknown flags, validates frameworks, and has a
  top-level `main().catch`. Verified via direct exit-code checks.
- **Bidirectional component completeness + markdown unit tests (§5).** `skillCompleteness.spec.ts` now
  asserts the committed component dirs equal `DOCUMENTED_TAGS` exactly (no missing *and* no extra), so
  the generator's iteration source (`componentDocsMeta`) can't drift from the `componentMeta` filter
  silently. Added direct `headingSlug` / `markdownTable` unit tests (documenting the whitespace-collapse
  divergence from GitHub, harmless for today's single-word categories).
- **MDX prose rendered once, not 4× (§3 P2).** `renderMdxToMarkdown` now memoizes on the MDX module's
  identity (module-level `WeakMap`), so each partial / migration guide / component-prose section renders
  exactly once across all four framework trees instead of once per framework. Prose is
  framework-independent (rendered under the default vanilla-js provider, no framework param), so the
  cache is output-neutral — regenerating all four trees produced zero drift. Only successful renders are
  cached; a throw is always re-raised. The existing `renderMdxToMarkdown.spec.tsx` cases (which reuse the
  same compiled fixtures across `it`s) stay green.
- **`referenceLinks.ts` root-relative `references/…` resolution (§3 P3).** `resolveProduced` now resolves
  `references/…` targets against the skill root and `./…` targets against the containing file's dir, so a
  bare `references/…` mention inside a *nested* file no longer reports a false dangling path. Output-neutral
  for today's tree (such mentions only appear in SKILL.md, the root file); the link gate stays green.
- **`MIGRATION_GUIDES` single source of truth (§3 P3).** The guide list now lives once in `skillMd.ts` as
  `{ slug, useWhen }[]`; `SKELETON_REFERENCE_MAP`'s migration rows are derived from it and `build-skill.ts`
  imports it for the MDX-load list, so adding a guide is a one-line edit. Output-neutral (same paths,
  `useWhen` text and order). The parallel `STYLING_SOLUTIONS` / `STYLE_REFERENCES` pair is left unmerged —
  see the open §3 note for why.
- **`registerReference` scaffolding removed (§3 P3).** The unused `SkillTree.registerReference` /
  `referenceMap` API (and its private row buffer) is deleted; `build-skill.ts` passes the now-static
  `SKELETON_REFERENCE_MAP` straight to `buildSkillMd` instead of seeding a per-tree buffer that no
  generator ever appended to. Output-neutral (regen produced zero tree drift); the obsolete
  register/read roundtrip test in `skillGenerator.spec.ts` was dropped.
- **`tokens.md` raw-pointer convention (§2 P3).** The design-tokens intro now writes the `../tokens`
  raw pointer as inline code ("read `../tokens` in the installed package") instead of a markdown link,
  matching how `component-meta`'s `../meta` and the styles "Full stylesheet" pointers are written. Drift
  snapshot refreshed for the four `tokens.md`; the link gate still classifies `../tokens` as `raw`.
- **`renderComponentProse` intro unified (§3 P3).** The introduction now renders through the same
  `renderSection` helper as usage/accessibility instead of a bespoke inline block; the helper returns the
  raw markdown so the roster summary is still the intro's lead sentence (degraded intro → empty →
  `NO_SUMMARY`). Output-neutral (zero tree drift; `componentsReference.spec.ts` incl. the prose snapshot
  stays green).
- **Cross-package deep source imports documented (§3 P3).** `tokensReference.ts` and `stylesReference.ts`
  now carry a comment explaining why they import sibling packages' *source* rather than built entry points:
  the `tokensMeta` / `getXxxSkill` serializers are build-time source modules the packages' published
  entries don't re-export, and the generator runs under `tsx` against source before the siblings are
  built — the same rationale `generateComponentMeta` documents.
- **Icon union hoisted to a shared `references/icons.md` (§2 P2, biggest offender).** The ~290-name icon
  enumeration was inlined (~4.2 KB) into every icon-typed prop's type cell across ~9 components × 4 trees.
  It now lives once per tree as `references/icons.md`; each icon prop's cell renders `one of N icon names —
  see [icon names](references/icons.md)` (keeping non-icon extras like `'none'` inline). The icon-name set
  is derived from `p-icon`'s own `name` allowed values (no new dependency / second source of truth), and
  the collapse is detected by superset match so `p-flag`'s separate flag-name union is untouched. Net
  ~130 KB removed across the four trees. New `componentApi.spec.ts` cases cover the collapse,
  `deriveIconNames` and `renderIconsReference`; the produced-link gate confirms every `references/icons.md`
  link resolves (relying on the root-relative `resolveProduced` fix above); drift snapshot refreshed.
