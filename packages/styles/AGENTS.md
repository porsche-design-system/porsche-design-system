# AGENTS.md — Styles Package

> This file provides context for AI coding assistants working in `packages/styles/`.
> See the root [`AGENTS.md`](../../AGENTS.md) for project-wide guidance.

## Overview

This package contains the publishable PDS style libraries and the local demo app used to preview them. It covers multiple styling targets, including global CSS, Tailwind CSS, SCSS, Emotion, and Vanilla Extract.

## Structure

```text
packages/styles/
├── projects/global-styles/    # Global CSS package
├── projects/tailwindcss/      # Tailwind package
├── projects/scss/             # SCSS package
├── projects/emotion/          # Emotion package
├── projects/vanilla-extract/  # Vanilla Extract package
├── src/                       # Demo app / local preview UI
└── tests/vrt/                 # Visual regression tests
```

## Commands

```bash
# Build all style packages and demo app
yarn build:styles

# Run unit tests for all style packages
yarn test:unit:styles

# Run visual regression tests
yarn test:vrt:styles
```

## Working Guidelines

- Treat `projects/*` as the source of truth for publishable style packages.
- Treat root `src/` as the demo application and preview surface, not the published library output.
- Do not edit generated `dist/` output.
- When possible, make changes in the relevant style target package rather than patching the demo only.
- Keep naming and token usage aligned across style targets unless a package intentionally exposes a target-specific API.

## Testing Expectations

- Run the relevant unit tests for the subpackage you change.
- Run `yarn test:vrt:styles` when a visual contract or rendered demo output changes.
- Be careful with cross-target changes: a token or helper adjustment may affect several style packages at once.
