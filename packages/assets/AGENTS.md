# AGENTS.md — Assets Package

> This file provides context for AI coding assistants working in `packages/assets/`.
> See the root [`AGENTS.md`](../../AGENTS.md) for project-wide guidance.

## Overview

This package provides manifests and CDN URLs for fonts, icons, marque, crest, flags, meta-icons, and model-signatures used by PDS components.

## Package Structure

```
packages/assets/
├── projects/
│   ├── crest/              # Porsche crest logo
│   ├── flags/              # International flag icons
│   ├── fonts/              # Font files
│   ├── font-face/          # CSS @font-face declarations
│   ├── icons/              # Icon library (SVG, SVGO-optimized)
│   ├── marque/             # Marque/brand assets
│   ├── meta-icons/         # Meta/social icons (favicons, etc.)
│   └── model-signatures/   # Car model signature graphics
├── bin/
│   └── serve-cdn.js        # Local CDN server for development
├── cdn/                    # CDN-ready asset output (do not edit)
└── src/                    # Asset manifest generation
```

## Sub-Package Names

| Project | npm package |
|---------|------------|
| `projects/crest/` | `@porsche-design-system/assets-crest` |
| `projects/flags/` | `@porsche-design-system/assets-flags` |
| `projects/fonts/` | `@porsche-design-system/assets-fonts` |
| `projects/font-face/` | `@porsche-design-system/assets-font-face` |
| `projects/icons/` | `@porsche-design-system/assets-icons` |
| `projects/marque/` | `@porsche-design-system/assets-marque` |
| `projects/meta-icons/` | `@porsche-design-system/assets-meta-icons` |
| `projects/model-signatures/` | `@porsche-design-system/assets-model-signatures` |

## CDN URLs

Assets are served from:
- **COM**: `https://cdn.ui.porsche.com/porsche-design-system/{asset-type}/`
- **CN**: `https://cdn.ui.porsche.cn/porsche-design-system/{asset-type}/`

## Local CDN Development

Use `serve-cdn` for local asset serving during development:

```bash
npx serve-cdn
```

## Working Guidelines

- Do not edit `dist/` or `cdn/` directories — they are generated during build
- Icon SVGs are optimized with SVGO during build
- Manifest files map asset names to CDN paths
- Changes to assets affect downstream components (icon rendering, font loading, etc.)

## Commands

```bash
# Build all assets
npm run build:assets

# Copy component assets only (faster)
npm run build:assetsCopyComponentsOnly
```
