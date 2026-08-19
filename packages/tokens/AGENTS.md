# AGENTS.md — Tokens Package

> This file provides context for AI coding assistants working in `packages/tokens/`.
> See the root [`AGENTS.md`](../../AGENTS.md) for project-wide guidance.

## Overview

This package is the source of truth for design tokens used throughout the design system. It publishes typed token exports for color, typography, spacing, motion, border, blur, gradient, breakpoint, and shadow values.
Tokens are used in the `../styles/` package to define style declarations for Emotion, Tailwind, SCSS amd Vanilla-Extract.

## Structure

```text
packages/tokens/
├── src/color/
├── src/font/
├── src/spacing/
├── src/motion/
├── src/border/
├── src/blur/
├── src/gradient/
├── src/breakpoint/
├── src/shadow/
└── tests/
```

## Commands

```bash
# Build token package
npm run build:tokens

# Run unit tests
npm run test:unit:tokens
```

## Working Guidelines

- Prefer simple, explicit token exports and keep barrel exports consistent.
- Do not edit generated `dist/` output.
- Preserve naming consistency across light, dark, and light-dark token variants.
- Token changes have broad downstream impact on styles, components, wrappers, storefront, and utilities; keep changes intentional and minimal.
- When introducing or renaming tokens, update related barrel exports and tests in the same change.

## Deprecating a Token

A token declaration is the only place a token deprecation is recorded. `@porsche-design-system/tokens-meta` generates
`tokensMeta` (the documented catalog) and `tokenDeprecationsMeta` (the legacy one) from these declarations, and the
knowledge skill's deprecation index reads the published result — so an annotation here is what makes a deprecated token
show up for an audit, and removing it from `tokensMeta` is automatic.

Annotate the declaration, keeping the replacement a `{@link}` symbol reference rather than prose:

```ts
/**
 * Holds a **frosted** blur effect value.
 *
 * @deprecated {@link blurSoft}
 */
export const blurFrosted = 'blur(32px)';
```

- The `{@link}` target must be a documented token export; the generator fails on a link the type
  checker cannot resolve and on one naming a token that is itself deprecated, so a rename cannot leave a
  deprecation pointing at a token that no longer exists.
- Text beside the link becomes the deprecation's `message` and replaces the shared default sentence — write one only
  when the migration needs more than "This API will be removed with the next major release."
- A bare `@deprecated` is complete: it means "removed with the next major release, no replacement".
- The description is no longer rendered for a deprecated token and may be dropped; the token stays indexed either way.

## Testing Expectations

- Add or update unit tests when token organization, exports, or package entrypoints change.
- Rebuild downstream packages if a token change affects public contracts or visual behavior outside this package.
