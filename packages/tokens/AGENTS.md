# AGENTS.md — Tokens Package

> This file provides context for AI coding assistants working in `packages/tokens/`.
> See the root [`AGENTS.md`](../../AGENTS.md) for project-wide guidance.

## Overview

This package is the source of truth for design tokens used throughout the design system. It publishes typed token exports for color, typography, spacing, motion, border, blur, gradient, breakpoint, and shadow values.

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
yarn build:tokens

# Run unit tests
yarn test:unit:tokens
```

## Working Guidelines

- Prefer simple, explicit token exports and keep barrel exports consistent.
- Do not edit generated `dist/` output.
- Preserve naming consistency across light, dark, and light-dark token variants.
- Token changes have broad downstream impact on styles, components, wrappers, storefront, and utilities; keep changes intentional and minimal.
- When introducing or renaming tokens, update related barrel exports and tests in the same change.

## Testing Expectations

- Add or update unit tests when token organization, exports, or package entrypoints change.
- Rebuild downstream packages if a token change affects public contracts or visual behavior outside this package.
