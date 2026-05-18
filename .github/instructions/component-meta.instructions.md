---
applyTo: "packages/component-meta/**"
---

# Component Meta (`packages/component-meta/`)

Generates and bundles structured metadata for PDS components. Inspects component source files, extracts documented props/events/slots/CSS variables, and publishes metadata helpers.

## Structure

```
packages/component-meta/
├── scripts/
│   └── generateComponentMeta.ts    # Main generation script
├── src/
│   ├── index.ts                    # Public entrypoint
│   ├── lib/
│   │   └── componentMeta.ts        # Generated metadata (DO NOT HAND-EDIT)
│   ├── types/                      # Metadata type definitions
│   └── utils/                      # Generation helpers
├── tests/                          # Unit tests
└── rollup.config.js                # Dual CJS/ESM output
```

## How Metadata is Generated

The generator (`scripts/generateComponentMeta.ts`):
1. Reads component source from `../components/src/components/`
2. Parses source files for documented patterns
3. Extracts metadata from docblock annotations:
   - `@slot` — slot definitions with names and descriptions
   - `@css-variable` — CSS custom property documentation
   - `@controlled` — controlled component behavior
4. Builds structured metadata objects
5. Writes to `src/lib/componentMeta.ts`

## Exports

| Export | Purpose |
|--------|---------|
| `getComponentMeta('p-component')` | Get metadata for a specific component |
| Main entry | Full component metadata index |
| `*/utils` | Utility functions for metadata consumption |

Consumed by VRT/a11y test harnesses, storefront documentation, and tooling.

## Working Guidelines

- **Do not hand-edit `src/lib/`** — regenerate by running the build
- **Source analysis is fragile**: Uses regex and eval-based parsing. Small syntax changes in component source can break extraction.
- **Preserve docblock conventions**: `@slot`, `@css-variable`, `@controlled` annotations in component source are the metadata input.
- **Targeted changes**: Prefer targeted changes to generation logic over broad rewrites.
- **Verify downstream**: If a change affects produced metadata, verify both script output and consumer-facing types.

## Testing

Add or update unit tests when:
- Metadata shape or extraction logic changes
- New annotation types are added
- Type definitions are modified

## Commands

```bash
npm run build:component-meta        # Generate metadata and bundle
npm run test:unit:component-meta    # Unit tests
```
