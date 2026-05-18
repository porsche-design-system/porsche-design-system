# AGENTS.md — Shared Package

> This file provides context for AI coding assistants working in `packages/shared/`.
> See the root [`AGENTS.md`](../../AGENTS.md) for project-wide guidance.

## Overview

This package contains internal shared data, models, testing helpers, style utilities, and generated lookup files used across the monorepo. It is an upstream dependency for many other packages.

## Structure

```text
packages/shared/
├── scripts/               # Generators for tag names, partials, and code examples
├── src/data/              # Shared data sets
├── src/lib/               # Generated lookup files
├── src/models/            # Shared types/models
├── src/styles/            # Shared style helpers
├── src/testing/           # Playwright helper exports
├── src/utils/             # Framework conversion and misc helpers
└── tests/                 # Unit tests
```

## Commands

```bash
# Build shared generated files and bundle package
npm run build:shared

# Run unit tests
npm run test:unit:shared
```

## Key Import Paths

| Import path | What it provides |
|-------------|-----------------|
| `@porsche-design-system/shared` | Data, models, utils, styles |
| `@porsche-design-system/shared/testing` | Playwright helpers: `schemes`, `viewportWidths`, `viewportWidthXXS`, `viewportWidthM`, `setupScenario`, `makeAxeBuilder` |
| `@porsche-design-system/shared/examples` | Generated cross-framework code examples for storefront |

These resolve via the `exports` map in the generated `dist/package.json` (produced by `rollup-plugin-generate-package-json` in `rollup.config.js`).

## Generated Files

- `src/lib/` is generated during build.
- Build scripts also generate framework code examples consumed elsewhere in the repo.
- Do not hand-edit generated files in `src/lib/`, generated examples, or `dist/`.

## Implementation Notes

- Changes here can affect components, wrappers, styles, storefront tooling, and tests across the monorepo.
- Generators read source files from sibling packages, so keep paths and naming conventions stable unless you intentionally update all consumers.
- Prefer updating source data, models, and generator scripts rather than patching generated output.
- Be conservative when changing framework conversion helpers because they feed example generation and docs tooling.

## Testing Expectations

- Add or update unit tests when changing generated lookup formats, conversion helpers, or shared data contracts.
- If you modify generators, rebuild and inspect the resulting output before finishing.
