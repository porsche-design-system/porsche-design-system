# Changelog guidelines

These are the rules for `packages/components/CHANGELOG.md`, the changelog published with
`@porsche-design-system/components-{js|angular|react|vue}`.

They are the single source of truth for both the `update-changelog` agent skill (which writes entries) and the
`code-review-changelog` agent skill (which reviews them). Humans writing entries by hand should follow them too.

`packages/assets/CHANGELOG.md` is maintained manually and is out of scope.

## What the changelog is for

The changelog is read by consumers of the published packages to answer one question: **"what changes for me if I
upgrade?"**

Every entry must earn its place. A changelog nobody can skim is a changelog nobody reads, so favour omission over
completeness.

## What belongs in it

Anything a consumer can observe from outside the packages:

- New, changed, deprecated or removed public API — components, props, slots, events, event payloads, types, exported
  functions, CSS custom properties, custom states, design tokens, style utilities
- Changed rendered output, visual appearance, layout or animation
- Changed behaviour — keyboard interaction, focus handling, form participation, validation, screen reader output
- Bugs that were visible to consumers
- Changed peer dependency, browser or framework support
- New or changed runtime warnings and errors

The published surface is broader than `packages/components`. Entries for `**Testing**`, `**Jsdom Polyfill**`,
`**AG Grid**`, `**Angular**` or `pds-skill` are all legitimate.

## What does not belong in it

- Documentation, storefront pages, examples and README changes
- Tests of any kind, including VRT baselines and snapshots
- Internal refactoring, renames and file moves with no observable effect
- Build, tooling, CI, linting and formatting changes
- Dependency bumps that do not change the published surface or the supported versions
- Anything a consumer cannot observe from outside the package

Do not decide this by file path. Decide it by asking: **would a consumer notice this after upgrading?** Some
consumer-facing code lives in unexpected places, and plenty of `packages/components` changes are invisible from the
outside.

## Structure

Entries go under `## [Unreleased]`, never into an already-released section. `npm run prepare-release` keeps the
`[Unreleased]` heading and inserts the new version below it.

Sections use `###` and appear in Keep a Changelog order. Only create a section when it has entries:

1. `### Added` — new capability
2. `### Changed` — existing behaviour or API works differently
3. `### Deprecated` — still works, but scheduled for removal
4. `### Removed` — gone
5. `### Fixed` — a consumer-visible bug is gone

New entries are appended to the end of their section.

### Choosing a section

- A rename that keeps the old name working with a deprecation warning is **two** entries: `Deprecated` for the old name
  and `Added` for the new one. It only becomes a `Removed` entry once the old name actually stops working.
- Restoring intended behaviour is `Fixed`. Changing intended behaviour is `Changed`.
- A new prop on an existing component is `Added`, not `Changed`.

## Entry anatomy

```md
- `Component Name`: what changed, from the consumer's point of view
  ([#1234](https://github.com/porsche-design-system/porsche-design-system/pull/1234))
```

- **One entry per distinct consumer-facing change.** A pull request that changes four things gets four entries, each
  citing the same pull request link. Do not collapse them into one summary entry.
- **One entry for one change affecting several subjects.** Use a comma-separated prefix:
  `` `Flyout`, `Modal`, `Sheet`: ``.
- **Prefix.** Backticked Title Case for components (`` `Link Tile` ``, `` `Multi Select` ``); bold for cross-cutting
  topics and framework-specific notes (`**Testing**`, `**Shadow DOM**`, `**Angular**`).
- **Link.** Every entry ends with the pull request link.

### Markers

- `- **Breaking Change** \`Component\`: …` for anything that forces consumers to change their code. A breaking entry
  must always state what breaks _and_ the migration step.
- `(🧪Experimental)` after the prefix when the underlying API is marked `🧪Experimental` in its JSDoc or `@css-variable`
  description. Mirror the marker; do not invent it.

## Style

- **Length follows consumer impact.** One sentence by default. Spend extra sentences only on what breaks and what to do
  about it. ``- `Icon`: `ai-chat` icon`` is a complete entry.
- **`Fixed` entries describe the symptom the consumer experienced, in past tense** — not the implementation of the fix.
  Write "slides were dropped when the amount of slides changed", not "corrected the slide index calculation".
- Write for someone who does not know the codebase. No internal file names, function names or ticket jargon.
- Name the API exactly as consumers write it, in backticks: `slides-per-page`, `--p-button-bg`, `dismiss`.

### Examples

```md
### Added

- `Icon`: `ai-chat` icon ([#4693](https://github.com/porsche-design-system/porsche-design-system/pull/4693))

### Changed

- **Breaking Change** `Radio Group`: default value of `value` prop is now `undefined`. Use `undefined`/`null` to
  represent an unselected state, since `''` is a valid option value. An unselected radio group is now omitted from
  native form submissions instead of submitting an empty string.
  ([#4411](https://github.com/porsche-design-system/porsche-design-system/pull/4411))

### Fixed

- `Carousel`: changing `slides-per-page` at runtime had no effect. Slide widths and the pagination kept the value the
  carousel was initialised with. ([#4686](https://github.com/porsche-design-system/porsche-design-system/pull/4686))
```

## Formatting

The file is formatted with Prettier using `proseWrap: 'always'`. `npm run format` runs Biome and does **not** cover
Markdown, so format it explicitly:

```bash
npx prettier --write packages/components/CHANGELOG.md
```
