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

- **[P2] Per-file boilerplate duplicated across ~58 component files.** The "Authoritative API data…"
  sentence, the "guidance for designers and developers…" filler line, the identical ARIA shadow-DOM
  "Limitations" table, and the all-✅ "Tests" section repeat in every file. Biggest offender: the
  ~230-literal icon union (~4.2 KB) duplicated in ~8 files per tree (`p-button`, `p-link`, `p-icon`, …).
  Hoist shared prose to SKILL.md, link one shared icon list, and keep only exceptional Test rows
  (e.g. p-table's Safari screen-reader caveat).
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
- **[P3] `p-button.md` self-contradiction:** `variant` type is `'primary' | 'secondary'` but the prose
  says "(e.g. `primary`, `secondary`, `tertiary`)" — invites an invalid value. Source-data/prose fix.
- **[P3] `tokens.md` link convention mixing:** `[../tokens](../tokens)` reads as a file-relative link to
  a nonexistent `skill/tokens`; only correct under the SKILL.md "paths relative to skill root" note,
  which sibling `./examples/…` links do not follow. Pick one convention for raw-value pointers.
- **[P3] React `p-button/examples/Form.tsx` duplicate React imports** (harmless lint noise; example
  source, not generated). Also `name` frontmatter is identical across all four trees — fine when one
  framework is installed, collides in a monorepo with two frontends; documented as a single fixed name,
  note only.

---

## 3. Generator code quality

- **[P2] MDX prose is rendered 4× (once per framework) but is framework-independent.**
  `scripts/build-skill.ts` loops frameworks calling `writeComponentReferences` → `renderMdxToMarkdown`
  fresh each time; the renderer takes no framework param and always renders the `vanilla-js` provider
  default, so prose/summaries/example descriptions are identical across trees. Memoize prose rendering
  (or hoist it out of the framework loop) to cut the dominant build cost to ~25% and stop degraded
  warnings printing 4×. Corollary: framework-conditional MDX always comes out vanilla-js-flavoured —
  if that is ever wrong, `renderMdxToMarkdown` needs a framework argument.
- **[P2] Consolidate the six copies of the markdown `cell`/`table`/`code` helpers.** The backslash/pipe
  escaping was fixed in all six, but they remain duplicated: `packages/storefront/src/lib/skill/markdown.ts`
  and `packages/styles/projects/{tailwindcss,scss,emotion,vanilla-extract}/skill/skill.ts` +
  `packages/components/projects/stylesheets/skill/skill.ts`. Extract a shared util (e.g. in
  `packages/shared`) so escaping logic lives once. (markdown.ts's own header comment claims this was
  already done — it is not.)
- **[P3] Single source of truth for parallel lists.** `STYLING_SOLUTIONS` (`skillMd.ts`) and
  `STYLE_REFERENCES` (`stylesReference.ts`) must be edited in tandem to add a solution; likewise
  `MIGRATION_GUIDES` (`build-skill.ts`) vs the migration rows in `SKELETON_REFERENCE_MAP` (`skillMd.ts`).
  Merge each pair into one descriptor array.
- **[P3] `registerReference` is write-only scaffolding.** Only the skeleton seeding loop calls it; no
  content generator registers rows, despite comments saying they do. Either have generators register
  their rows (so the map cannot point at never-written files) or delete it and pass
  `SKELETON_REFERENCE_MAP` straight to `buildSkillMd`.
- **[P3] Cross-package deep source imports.** `stylesReference.ts` / `tokensReference.ts` import sibling
  packages' *source* (`../../../../styles/projects/…`, `../../../../tokens/projects/…`), coupling the
  storefront build to their internal layout. Prefer built workspace entry points, or centralize the
  paths with a comment on why source imports are required.
- **[P3] `renderComponentProse` intro handling.** The introduction is rendered/handled inline rather
  than through `renderSection` like usage/accessibility; unify the two. _(The other half of this
  item — `main().catch` and unknown-flag rejection — is done; see "Fixed in the follow-up pass".)_
- **[P3] `renderMdxToMarkdown` residual fragilities.** `renderPre`'s `<code>`-wrapper strip is still
  regex-based (now re-parses inner HTML, so highlighter markup is handled — but a literal `</code>` in
  example text could still confuse the strip); inline `CODE` wraps in single backticks without handling
  embedded backticks; `demoteHeadings` treats `~~~` and 4+-backtick fences as prose. Low probability
  with current sources; harden opportunistically.
- **[P3] `referenceLinks.ts` root-relative `references/…` mentions.** `resolveProduced` classifies any
  `references/…` string as produced and resolves it relative to the containing file's dir, so a bare
  `references/tokens.md` mention inside a nested file would report a false dangling path. Resolve
  `references/…` targets against the skill root, `./…` against the file's dir. (Low incidence today.)

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
