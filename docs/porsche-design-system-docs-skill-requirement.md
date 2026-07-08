# Requirement: `porsche-design-system-docs` skill

## Summary

Ship a Claude Code skill named **`porsche-design-system-docs`** as part of the published PDS wrapper
packages (`@porsche-design-system/js`, `/angular`, `/react`, `/vue`). The skill gives a consuming
team's AI coding assistant first-class, **version-exact** knowledge of the Porsche Design System so it
can answer questions, generate new code, review/fix existing usage, and assist migrations — using the
best available PDS reference for every task.

The skill's content lives **inside `node_modules`** (the installed wrapper package), and the
discoverable entry in the consumer's `.claude/skills/` is a **symlink** into that package. Because the
content is bound to the installed package version, there is no possibility of a docs/version mismatch.
The skill is **auto-activating**: it fires whenever a consumer does frontend-relevant work, even when
the design system is not explicitly mentioned.

## Scope

### In scope

- A `skill/` directory shipped inside each wrapper package (`js`, `angular`, `react`, `vue`), generated
  at build time and published with the package.
- Each wrapper ships a **self-contained, framework-specific** skill (the `react` package documents React
  usage, `vue` documents Vue, etc.). The `js` package ships the vanilla-JS skill for pure-JS consumers.
- A **package-scoped CLI command** (macOS/Linux) that creates the `.claude/skills/porsche-design-system-docs`
  symlink pointing at the invoking package's own `skill/` dir.
- A new **storefront documentation page** explaining installation, how the mechanism works, and the
  manual Windows symlink fallback.
- Aggregating the **existing per-domain skill generators** (`packages/styles/projects/{tailwindcss,scss,
  vanilla-extract,emotion}/skill`, `packages/components/projects/stylesheets/skill` — each exposing a
  `getXxxSkill()` serializer) plus a new components/tokens/partials/migration generator into one tree.
- Capabilities: **answer** PDS questions, **generate** new PDS code, **review/fix** existing usage,
  **migrate/upgrade** (driven by the storefront migration guides).
- Auto-activation tuned to fire broadly on UI/frontend work and proactively surface PDS where useful.
- A **CI gate** in the PDS repo asserting reference completeness, resolvable paths, and that the
  committed skill trees are regenerate-and-diff clean.
- **Offline tuning of the auto-activation `description`** against a fixed positive/negative
  sample-prompt set. This is a manual, offline exercise (per the design's testing strategy), **not** a
  shipped harness or a blocking CI gate — model stochasticity must not gate releases.

### Out of scope

- **Yarn PnP (`nodeLinker: pnp`)** — it has no `node_modules`; PnP consumers must opt into
  `nodeLinker: node-modules`. Documented, not supported directly.
- **Windows-native automated install** — only documented as a manual symlink step; the CLI targets
  macOS/Linux.
- Consumer-side editing of the docs and reinstall fragility — general npm behavior; not specified beyond
  a note on the storefront page.
- Per-framework skill **names** (the skill name is the single fixed string `porsche-design-system-docs`).
- Supporting PDS versions that predate the `skill/` dir (handled by silent no-op, see Edge cases).

## Actors

- **Consuming developer** — a team using a PDS wrapper in their app; installs the skill once and benefits
  from auto-activation thereafter.
- **Claude Code (the assistant)** — reads the skill, auto-activates it, and uses the references to answer
  and generate code.
- **PDS maintainers** — own the generators, the CLI, the storefront page, and the CI gate; responsible for
  keeping the producer side correct at release time.

## Acceptance criteria

Phrased so a tester can verify each objectively.

1. **Install produces a working symlink.** After running the documented CLI on macOS/Linux,
   `.claude/skills/porsche-design-system-docs` exists and resolves to the invoking wrapper package's
   `skill/` dir, and the skill is discoverable/activatable by Claude Code.
2. **Package-scoped resolution.** With `@porsche-design-system/js` also installed (always true for
   `angular`/`react`/`vue`), running the `react` (resp. `angular`/`vue`) CLI links the **framework's own**
   skill and never routes to the `js` package's skill.
3. **Version-bound content.** The content the skill exposes always equals the installed package version's
   generated content; bumping the installed version changes the exposed content with no extra step.
4. **Generated code valid vs `component-meta`.** Code the skill generates uses only props, allowed values,
   and events that exist and are **not deprecated** in the installed `component-meta` — no hallucinated or
   stale APIs. `component-meta` is authoritative when it disagrees with examples/MDX.
5. **Reference completeness & resolvable paths.** Every component present in `component-meta` has a
   per-component md file and an entry in the components overview table, and every "where to find it" path
   in every reference table resolves to a real file. Enforced by the CI gate (criterion 8).
6. **Auto-activation.** The `SKILL.md` `description` is tuned — **offline**, not via a shipped/CI
   harness — so the skill activates unprompted on the positive sample-prompt set (e.g. "add a Porsche
   button", "style a card", "upgrade PDS", "build a settings form") and stays dormant on the negative
   set (backend/non-UI, unrelated tests/tooling, pure content/docs, explicit opt-out). Verified by
   manual spot-check, since model stochasticity must not gate releases.
7. **Migration support.** When asked to upgrade/migrate, the skill references the relevant storefront
   migration guide(s).
8. **Producer CI gate.** A PDS-repo CI test fails the build if any component is undocumented, any
   reference-table path does not resolve, the `skill/` dir is not generated and published, or the
   committed skill trees are stale relative to their source (regenerate-and-diff via the `Skill` job's
   `build:skill:check`).

## Edge cases & failure modes

- **Multiple PDS wrappers installed.** `react`/`angular`/`vue` depend on `js`, so `js` is always present.
  The CLI is **package-scoped** (resolves its own package via the bin's own location), so it links the
  framework-specific skill and never falls through to `js`. The single fixed skill name is therefore
  unambiguous: last package-scoped install wins.
- **Installed version has no `skill/` dir** (older PDS release) → CLI is a **silent no-op**.
- **Re-runs / dangling (stale) symlink** → CLI is **idempotent**: it repairs/repoints/overwrites the
  `porsche-design-system-docs` symlink it owns.
- **Yarn PnP** → no `node_modules`; out of scope (documented requirement to use `nodeLinker: node-modules`).
- **Windows** → no automated install; manual `mklink` documented on the storefront page (may need
  developer mode/admin).
- **Another UI library present alongside PDS** → prefer and surface PDS for new UI, but do not hijack work
  clearly targeting another library or rewrite existing non-PDS UI unasked.
- **Editing the docs / reinstall** → content is read-only in effect (edits to `node_modules` are lost on
  reinstall); recovery is to re-run the CLI. Out of scope beyond a storefront note.

## Constraints & dependencies

- **Discovery constraint.** Claude Code only auto-discovers skills under `.claude/skills/` (project) or
  `~/.claude/skills/` (personal); a skill in `node_modules` is not discoverable on its own — hence the
  symlink.
- **Package-manager support.** Direct referencing into `node_modules` works on **npm, Yarn Classic (v1),
  pnpm (via transparent symlink), and Bun**. It does **not** work on Yarn Berry/PnP (no `node_modules`).
- **Path resolution.** The CLI resolves the package path **dynamically at use time** (e.g.
  `require.resolve`), robust to workspace hoisting.
- **Content form.** Generated **LLM-optimized markdown** for most docs, plus references to the actual
  implementation files (e.g. the Tailwind `index.css`) for exact values — following the existing
  convention: *the md is the index, the implementation file is the detail*.
- **Source-of-truth & precedence.** `component-meta` is authoritative for component APIs; storefront
  docs/examples inform idiomatic patterns; migration guides drive upgrades; tokens/styles/partials cover
  foundations and setup.
- **Reuse, don't duplicate.** The styling/stylesheets skills already exist as `getXxxSkill()` generators
  and are aggregated, not rewritten. The storefront already has per-component `.meta` objects usable to
  generate component docs. Some remaining docs are scraped from storefront `src` for now.
- **Build/release integration.** Generation must slot into the existing monorepo build (mirroring how
  `components-js` already copies `styles/*/dist`, `component-meta`, `tokens`, etc. into the wrapper) and be
  included in the published package. Published-package public API and existing artifacts must not change.
- **Structure.** Tree-like: `SKILL.md` (always-loaded entry) holds the auto-activation description, a
  top-level reference map/table, and general always-apply PDS guidance; per-domain overview files hold the
  detailed reference tables; implementation files / raw `component-meta` provide exact detail.

## Open questions

- **Exact auto-activation description wording.** Agreed intent: fire on explicit PDS mentions, editing
  files that use PDS, any UI/component/styling work, and new frontend scaffolding — broadly, preferring PDS
  by default, while staying dormant on backend/non-UI, unrelated tests/tooling, pure content/docs, and on
  explicit opt-out. The precise `SKILL.md` `description` string to achieve this reliably (without
  over-firing) is to be tuned during implementation against the eval set.
- **Raw `component-meta` exposure form.** Per-component md is in scope; whether to additionally expose the
  raw `component-meta` object as the authoritative fallback (vs. relying on generated md alone) to be
  confirmed during implementation.
- **CLI naming/invocation.** Exact command surface (e.g. `npx @porsche-design-system/react pds-skill
  install`) and whether to add a `bin` to each wrapper package.
- **Scope of "scraped from storefront src" docs.** Which non-component docs (must-know topics, partials
  setup, general guidance) get dedicated generators vs. interim scraping.
