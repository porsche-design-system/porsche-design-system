---
applyTo: "packages/shared/**"
---

# Shared Package (`packages/shared/`)

Internal shared data, models, testing helpers, style utilities, and generated lookup files used across the entire monorepo. This is an upstream dependency for many other packages.

## Structure

```
packages/shared/
├── scripts/                # Generators
│   ├── generateTagNames.ts         # Component tag name lookups
│   ├── generateChunkNames.ts       # Webpack chunk name lookups
│   ├── generatePartialNames.ts     # Partial component names
│   └── generateCodeExamples.ts     # Cross-framework code examples for storefront
├── src/
│   ├── data/               # Shared data sets
│   ├── lib/                # Generated lookup files (DO NOT HAND-EDIT)
│   ├── models/             # Shared types and models
│   ├── styles/             # Shared style helpers
│   ├── testing/            # Playwright helper exports (@porsche-design-system/shared/testing)
│   └── utils/              # Framework conversion and misc helpers
├── bin/
│   ├── serve-dummyassets.js        # Local dummy asset server
│   └── prepareVRTSnapshots.js      # VRT snapshot management
├── tests/                  # Unit tests
└── dist/                   # Built output (published as @porsche-design-system/shared)
```

## Generated Files

`src/lib/` is **generated during build** — do not hand-edit these files. They include:
- Tag name lookups
- Chunk name mappings
- Partial name mappings
- Code examples

Generators in `scripts/` read source files from sibling packages. Keep paths and naming conventions stable.

## Key Exports

| Export Path | Content |
|-------------|---------|
| `@porsche-design-system/shared` | Data, models, utils, styles |
| `@porsche-design-system/shared/testing` | Playwright test helpers: `schemes`, `viewportWidths`, `viewportWidthXXS`, `viewportWidthM`, `setupScenario`, `makeAxeBuilder` |
| `@porsche-design-system/shared/examples` | Generated cross-framework code examples |

These resolve via subdirectory files in the built `dist/` output — not via `package.json#exports`.

## Code Example Generation

`scripts/generateCodeExamples.ts` generates framework-specific code examples consumed by the storefront:
- Reads component source and generates React, Angular, Vue variants
- Output used by `ComponentExample` in storefront pages
- Register new examples here before using `ComponentExample` in storefront MDX

## Working Guidelines

- **Changes cascade everywhere**: This package is a dependency for components, wrappers, styles, storefront, and tests. Test thoroughly.
- **Prefer source data over output patching**: Update generators, models, and data — not generated output.
- **Keep generator paths stable**: Generators read from sibling packages. Path changes need generator updates.
- **Be conservative with conversion helpers**: Framework conversion helpers feed example generation and docs tooling.

## Testing

Add or update unit tests when:
- Generated lookup formats change
- Conversion helpers are modified
- Shared data contracts change

If you modify generators, rebuild and inspect the resulting output before finishing.

## Commands

```bash
npm run build:shared        # Build generated files and bundle
npm run test:unit:shared    # Unit tests
```
