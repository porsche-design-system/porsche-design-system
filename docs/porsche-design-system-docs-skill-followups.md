# Skill (`porsche-design-system-docs`) — outstanding follow-ups

Handoff backlog for PR #4555 (branch `issue/4450-skill`). This lists **only the items still open**; the
completed work (the original branch fixes, the §4 bin-CLI hardening, and the follow-up pass) has been
removed — see the branch's git history (`git log issue/4450-skill`) for what shipped. What remains is
P2/P3 content polish, one cross-package generator refactor, and two test-gate hardening items; several
entries are **not contained skill fixes** (they live in source content or need a full components build)
and are labelled as such.

Each item is tagged **[P1]** (blocks a good release / user-facing / correctness), **[P2]** (quality,
maintainability, meaningful gaps), **[P3]** (polish). Paths are relative to the repo root; line numbers
are approximate.

---

## 1. CI / release wiring

- **[P1] Storefront A11y / E2E CI checks red on the PR but not branch-caused.** Full e2e passed locally
  (617 tests); the `/developing/claude-code-skill/` page passes a11y in both schemes. Most likely
  infra/flake in the June-26 run. Action: re-trigger those jobs; if still red, pull the
  `regression-storefront-{e2e,a11y}-*` artifacts (needs authenticated `gh`). _(No code change — left
  open pending a re-trigger.)_

---

## 2. Skill content quality (impact on an agent using the skill)

- **[P2] Per-file *prose* boilerplate duplicated across the component files.** The "Authoritative API
  data…" sentence (58 files), the "guidance for designers and developers…" filler line (50 files), the
  identical ARIA shadow-DOM "Limitations" table (~15 files), and the all-✅ "Tests" section still repeat
  in every file. These come from the source MDX (usage/accessibility), so hoisting means MDX
  post-processing (strip the known boilerplate blocks + add one shared copy to SKILL.md) or source edits —
  a different mechanism from the already-shipped icon-union hoist.

### Content bugs (source-data / MDX-render, per component)

- **[P2] `p-popover.md` mangled intro body** (all trees): the intro splits "…in conjunction with the
  info" / "" / "-button." because the source MDX
  (`components/popover/configurator/introduction.mdx`) puts a paragraph break mid-sentence around an
  inline `<PPopover>` that renders to ~nothing in markdown. The **roster summary** is already curated;
  the intro **body** is still degraded. Contained fix options: a per-component prose override (the
  `ROSTER_SUMMARY_OVERRIDES` pattern in `componentsReference.ts`), or fix the source MDX (also changes
  the live page). A generic `renderMdxToMarkdown` fix (strip/placeholder inline interactive components
  and rejoin surrounding text) is heuristic and fragile.
- **[P2 → source-data, not a skill fix] `p-select.md` run-on "Do" bullet.** Line ~17 ("Use to trigger an
  action based on the selected option choose and search one option…") is a **malformed bullet in the
  source MDX** (`components/select/usage/page.mdx`), faithfully rendered — several use-case phrases were
  mashed into one bullet. The earlier diagnosis ("MDX render concatenates list items") was wrong: the
  renderer is fine. Fix belongs in the storefront source content (also affects the live usage page), not
  the skill generator.
- **[P3 → source-data, not a skill fix] `p-button` / `p-link` `variant` names an invalid `tertiary`
  value.** The type is `LinkButtonVariant` = `'primary' | 'secondary'`, but the `@Prop()` JSDoc on
  `button.tsx:68` / `link.tsx:49` says "(e.g. `primary`, `secondary`, `tertiary`)". Stencil/wrapper codegen
  bakes this into many committed generated files (`components.d.ts`, React regular+SSR and Vue wrappers,
  jsdom-polyfill, `component-meta` src+snapshot, the four skill trees). Fixing it correctly means editing
  the two JSDocs (suggest "(`primary` or `secondary`)") and running the **full components-package build**
  so every generated copy regenerates in lockstep — a dedicated components change, not a storefront-scoped
  skill pass.

---

## 3. Generator code quality

- **[P2] Consolidate the six copies of the markdown `cell`/`table`/`code` helpers.** The backslash/pipe
  escaping is correct in all six, but they remain duplicated: `packages/storefront/src/lib/skill/markdown.ts`
  and `packages/styles/projects/{tailwindcss,scss,emotion,vanilla-extract}/skill/skill.ts` +
  `packages/components/projects/stylesheets/skill/skill.ts`. Extract a shared util (e.g. in
  `packages/shared`, already a dep of all three) so escaping lives once. **Watch-outs:** the storefront
  `escapeCell` collapses all whitespace + trims, whereas the styles `cell` only collapses newlines — unify
  to the storefront (stricter) semantics and confirm output-neutral via the regenerate-and-diff gate; all
  six run under the storefront `tsx` build (via `stylesReference.ts`) **and** each styles project's own
  `scripts/build-skill.ts`, so the shared import must resolve in both contexts. `markdown.ts`'s header
  comment implies this is done — it only centralises the storefront copies, not across packages.
- **[P3] Single source of truth for parallel lists (partial, deliberately left).** `STYLING_SOLUTIONS`
  (`skillMd.ts`) and `STYLE_REFERENCES` (`stylesReference.ts`) must still be edited in tandem to add a
  solution; fully merging them would couple `skillMd.ts` to the heavy `getXxxSkill` serializers, so left
  as-is.
- **[P3] `renderMdxToMarkdown` residual fragilities.** `renderPre`'s `<code>`-wrapper strip is regex-based
  (a literal `</code>` in example text could confuse the strip); inline `CODE` wraps in single backticks
  without handling embedded backticks; `demoteHeadings` treats `~~~` and 4+-backtick fences as prose. Low
  probability with current sources; harden opportunistically.

---

## 4. Test-gate gaps

- **[P2] Styles/tokens/partials/migration coverage is indirect.** The component set is gated in both
  directions, but styles/tokens/partials/migration are covered only via the link gate resolving SKILL.md's
  map rows; a partials reference that renders degraded-but-nonempty would pass everything except human
  review. (The degraded-prose gate in `build:skill` catches the *empty* case; a non-empty-but-wrong render
  still isn't asserted.)
- **[P2] Generator determinism is unpinned.** Ordering assumptions (`Object.entries` in
  `componentExamples.ts`, `tokensReference.ts`) are enforced only on the committing dev's machine. The
  regenerate-and-diff `Skill` job compares one fresh generation against the commit, but not two generations
  against each other. A true double-generation smoke test needs the MDX/alias runtime (unavailable under
  plain vitest), so it belongs as a script/CI step, not a unit test.
