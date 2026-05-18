---
applyTo: "packages/tokens/**"
---

# Design Tokens (`packages/tokens/`)

Source of truth for design tokens used throughout the Porsche Design System. Publishes typed token exports consumed by `packages/styles/` and all downstream packages.

## Structure

```
packages/tokens/
├── src/
│   ├── color/          # Color tokens (light, dark, light-dark variants)
│   ├── font/           # Typography tokens (family, size, weight, line-height)
│   ├── spacing/        # Spacing tokens
│   ├── motion/         # Motion/animation tokens (duration, easing)
│   ├── border/         # Border tokens (width, radius)
│   ├── blur/           # Blur tokens
│   ├── gradient/       # Gradient tokens
│   ├── breakpoint/     # Breakpoint tokens
│   └── shadow/         # Shadow tokens
├── tests/              # Unit tests
└── rollup.config.js    # Dual CJS/ESM output
```

## Build Output

Rollup bundles to dual format (CJS + ESM) with TypeScript definitions.

## Working Guidelines

- **Keep barrel exports consistent**: When adding/renaming tokens, update `index.ts` barrels.
- **Preserve naming across variants**: Light, dark, and light-dark token variants must follow consistent naming.
- **Changes cascade broadly**: Token modifications affect `styles`, `components`, all wrappers, `storefront`, and `utilities`. Keep changes intentional and minimal.
- **Do not edit `dist/`**: Generated output — rebuild instead.
- **Simple, explicit exports**: Prefer direct typed constant exports.

## Downstream Impact

Token changes trigger rebuilds across the entire monorepo:

```
tokens → styles → components → components-js → wrappers → storefront
tokens → utilities (ag-grid theme)
```

After changing tokens, rebuild and verify downstream packages.

## Testing

Add or update unit tests when:
- Token organization, exports, or package entrypoints change
- New token categories are introduced
- Token naming conventions are modified

## Commands

```bash
npm run build:tokens        # Build token package
npm run test:unit:tokens    # Unit tests
```
