---
globs: packages/assets/**
---

# Assets Package (`packages/assets/`)

Provides manifests and CDN URLs for fonts, icons, marque, crest, flags, meta-icons, and model-signatures.

## Structure

```
packages/assets/
├── projects/
│   ├── crest/              # Porsche crest logo
│   ├── flags/              # International flag icons
│   ├── fonts/              # Font files
│   ├── font-face/          # CSS @font-face declarations
│   ├── icons/              # Icon library (SVG with SVGO optimization)
│   ├── marque/             # Marque/brand assets
│   ├── meta-icons/         # Meta/social icons (favicons, etc.)
│   └── model-signatures/   # Car model signature graphics
├── bin/
│   └── serve-cdn.js        # Local CDN server for development
├── cdn/                    # CDN-ready asset output (do not edit)
└── src/                    # Asset manifest generation
```

## Sub-Projects

Each asset type is its own workspace with independent build:
- `@porsche-design-system/assets-crest`
- `@porsche-design-system/assets-flags`
- `@porsche-design-system/assets-fonts`
- `@porsche-design-system/assets-font-face`
- `@porsche-design-system/assets-icons`
- `@porsche-design-system/assets-marque`
- `@porsche-design-system/assets-meta-icons`
- `@porsche-design-system/assets-model-signatures`

## CDN Configuration

Assets are served from:
- **COM**: `https://cdn.ui.porsche.com/porsche-design-system/{asset-type}/`
- **CN**: `https://cdn.ui.porsche.cn/porsche-design-system/{asset-type}/`

Configuration in root `cdn.config.ts`.

## Local Development

Use `serve-cdn` for local CDN serving during development:

```bash
npx serve-cdn
```

This is auto-linked via postinstall to `node_modules/.bin/serve-cdn`.

## Working Guidelines

- Do not edit `dist/` or `cdn/` directories directly — they are generated during build
- Icon SVGs are optimized with SVGO during build
- Manifest files map asset names to CDN paths
- Changes to assets affect components (icon rendering, font loading, etc.)

## Testing

Asset builds are primarily validated through downstream integration — components render these assets.

## Commands

```bash
npm run build:assets                    # Build all assets
npm run build:assetsCopyComponentsOnly  # Copy component assets only (faster)
```
