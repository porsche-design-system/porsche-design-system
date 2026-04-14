---
name: remove-ai-code-slop
description:
  Identifies and removes AI-generated code slop-generic patterns, verbose comments, over-engineering-and cleans code
  style for consistency. Use when the user asks to clean up code, remove AI slop, fix code style, or when reviewing
  AI-generated code.
---

# Remove AI Code Slop & Cleanup Style

## Goal

Make the change look like deliberate human code: minimal, consistent with surrounding files, no tutorial tone.

## Common slop to remove

- **Obvious comments**: Restating the next line (`// increment i`), section banners (`// --- helpers ---`), or JSDoc
  that duplicates types the IDE already shows.
- **Apologetic / meta comments**: “Note:”, “This function does X”, “Important:” on straightforward code.
- **Over-defensiveness**: Try/catch that only rethrows or logs generically; null checks where types or callers already
  guarantee values; `|| ''` / `??` chains that mask real bugs.
- **Fake enterprise patterns**: Wrappers that add no behavior, `handle*` / `process*` names for one-liners, `utils`
  buckets for a single trivial helper.
- **Inconsistent style vs. neighbors**: Different quote style, import order, or error-handling pattern than the rest of
  the file or package.
- **Dead or speculative code**: Unused imports, commented-out blocks, feature flags or props nobody asked for, `TODO`
  without a ticket/owner.
- **Verbose AI scaffolding**: Extra interfaces for one object, `as const` / generics where inference suffices, repeated
  string literals that should be one constant next to similar code.

## Workflow

1. **Read context first** — Open nearby files in the same package; match naming, patterns, and comment density (often:
   almost none).
2. **Delete before you simplify** — Remove redundant comments, unused code, and abstraction layers that don’t buy
   clarity.
3. **Align with project tooling** — Run the repo’s formatter and linter; fix what they flag instead of debating style in
   prose.
4. **Preserve behavior** — Do not change public APIs or semantics unless the user asked; prefer mechanical refactors and
   deletions.
5. **Verify** — Run targeted tests for touched packages if they exist and are fast enough for the session.

## Checklist

- [ ] No comment that only repeats code or types
- [ ] Imports minimal; no unused symbols
- [ ] Names match local conventions (length and tone of existing symbols)
- [ ] Error handling matches sibling code (don’t add logging if the file never logs)
- [ ] Formatter/linter clean for edited files

## In this repository (Porsche Design System)

- Use **NPM**; follow nearest **AGENTS.md** and `.cursor/rules/pds-*.mdc`.
- Format/lint: **`npm run lint`** and **`npm run format`** from repo root (Biome + Prettier for MD/MDX).
- After substantive component changes, **`npm run build:core-dependencies`** or full **`npm run build`** before
  cross-package tests (see root **AGENTS.md**).

## Output to the user

Briefly list what was removed or tightened (e.g. “dropped 12 redundant comments, merged duplicate guard, aligned imports
with `foo.ts`”).
