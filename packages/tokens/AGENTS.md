# AGENTS.md — Tokens Package

> This file provides context for AI coding assistants working in `packages/tokens/`. See the root
> [`AGENTS.md`](../../AGENTS.md) for project-wide guidance.

## Overview

This package is the source of truth for design tokens used throughout the design system. It exposes typed token exports
for color, typography, spacing, motion, border, blur, gradient, breakpoint, and shadow values. Tokens are used in the
`../styles/` package to define style declarations for Emotion, Tailwind, SCSS amd Vanilla-Extract.

Neither `@porsche-design-system/tokens` nor `@porsche-design-system/tokens-meta` is published to npm. Tokens reach
consumers as the `./tokens` subpath of the wrapper packages, which copy `packages/tokens/dist`. **`tokens-meta` is
copied nowhere** — `tokensMeta` and `tokenDeprecations` exist for the storefront docs and the skills generator, so
changing them is never a breaking change and never earns a changelog entry, while changing a token in
`@porsche-design-system/tokens` does. Confirm either way in the built wrapper `dist/` folders, which are the npm
packages themselves: `grep -rl "tokensMeta\|tokenDeprecations" packages/components-*/dist/*-wrapper/` returns nothing.
See [`docs/public-api.md`](../../docs/public-api.md).

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
- Token changes have broad downstream impact on styles, components, wrappers, storefront, and utilities; keep changes
  intentional and minimal.
- When introducing or renaming tokens, update related barrel exports and tests in the same change.

## Deprecating a Token

A token declaration is the only place a token deprecation is recorded. `@porsche-design-system/tokens-meta` generates
`tokensMeta` (the documented catalog) and `tokenDeprecations` (the shared `Deprecations` list of the legacy surface)
from these declarations, and the knowledge skill's deprecation index reads the latter — so an annotation here is what
makes a deprecated token show up for an audit, and removing it from `tokensMeta` is automatic.

Annotate the declaration in exactly the wording `getDeprecationComment` generates, naming the replacement as a `{@link}`
symbol reference rather than prose — the same convention the Emotion and vanilla-extract packages follow:

```ts
/**
 * Holds a **frosted** blur effect value.
 *
 * @deprecated Use {@link blurSoft} instead. This API will be removed with the next major release.
 */
export const blurFrosted = 'blur(32px)';
```

- The generator validates rather than guesses: it takes the replacement from the link, reconstructs the sentence
  `getDeprecationComment({ replacement }, 'jsdoc')` renders and compares. An annotation that does not start with it
  fails the build, printing the expected form.
- The `{@link}` target must be a documented token export; the generator fails on a name no token carries and on one
  naming a token that is itself deprecated, so a rename cannot leave a deprecation pointing at a token that no longer
  exists. Guidance naming anything else belongs in the sentence after the lifecycle message.
- Text after the generated sentence becomes the deprecation's `note` and is **appended** to it — write one only when the
  migration needs more than the sentence itself.
- `@deprecated This API will be removed with the next major release.` is the minimal complete annotation: deprecated,
  with no replacement named.
- The description is no longer rendered for a deprecated token and may be dropped; the token stays indexed either way.

## Testing Expectations

- Add or update unit tests when token organization, exports, or package entrypoints change.
- Rebuild downstream packages if a token change affects public contracts or visual behavior outside this package.
