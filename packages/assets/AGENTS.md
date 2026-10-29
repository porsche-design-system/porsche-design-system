# AGENTS.md — Assets Package

> This file provides context for AI coding assistants working in `packages/assets/`. See the root
> [`AGENTS.md`](../../AGENTS.md) for project-wide guidance.

## Overview

This package turns the source files for crest, flags, fonts, icons, marque, meta-icons and model signatures into hashed
CDN files and typed manifests; `font-face` generates the font stylesheets from the fonts manifest. Each of them is a
private workspace in `projects/<name>`, named `@porsche-design-system/<name>` with no `assets-` prefix. `src/index.ts`
re-exports their manifests, name lists and CDN paths as `@porsche-design-system/assets`. It does not re-export
`FLAGS_ISO_3166`; import that from `@porsche-design-system/flags`.

```text
packages/assets/
├── projects/
│   ├── crest/ flags/ fonts/ font-face/ icons/ marque/ meta-icons/ model-signatures/
│   │   ├── src/              # source assets
│   │   └── scripts/          # build script: validates, hashes, writes dist/ and the generated index.ts
├── scripts/copyAssets.ts     # copies every sub-project's files into cdn/
└── src/
    ├── index.ts              # the @porsche-design-system/assets barrel
    └── serve-cdn.ts          # the local CDN server
```

## Commands

```bash
npm run build:assets                    # sub-project builds, the barrel bundle, then the copy into cdn/
npm run build:assetsCopyComponentsOnly  # refresh only cdn/components from the components-js build
npm run test:unit:assets                # all suites below
npm run test:unit:assets:{assets,flags,icons,font-face}
npx serve-cdn                           # serves cdn/ on http://localhost:3001
```

## Generated Files

Never edit these. All are git-ignored and rewritten by the build.

- `projects/*/index.ts`, written from scratch by each sub-project's build script. It is the rollup input of that
  sub-project, so a hand edit is lost on the next build.
- `dist/`, `projects/*/dist/`, `bin/` (built from `src/serve-cdn.ts`) and `cdn/`.
- `projects/{icons,flags}/tests/unit/results/stats.json`.

## Adding or Changing Assets

Put source files in `projects/<name>/src/` and rebuild. The build scripts reject an asset that breaks these rules:

| Sub-project  | Build fails when                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------ |
| `icons`      | the name is not kebab-case or not unique, or the optimised SVG is over 3,000 bytes               |
| `flags`      | the same, except that `xx` and `sa` may exceed the size limit                                    |
| `crest`      | a crest is missing one of `1x`, `2x`, `3x`, or a resolution lacks `png` or `webp`                |
| `marque`     | a marque is missing size `small` or `medium`, or the same resolution and format check fails      |
| `font-face`  | a file in `projects/fonts/src/` is not `porsche-next-<charset>-<regular\|semi-bold\|bold>.woff2` |
| `meta-icons` | an `android-chrome-*` file is not named `android-chrome-[maskable-]<size>x<size>.png`            |

The `crest` and `marque` format errors always name `1x`, whichever resolution lacks the format. The font charsets are
`latin`, `greek`, `cyril`, `arabic`, `pashto`, `urdu` and `thai` (`projects/font-face/scripts/fontFaceStyles.ts`).

Mistakes the build does not catch:

- **A new flag needs its name.** Add the code to the `flagsIso3166` map in `projects/flags/scripts/build.ts`. The build
  does not check that map against the SVGs, and the storefront labels flags from it.
- **Icon and flag file names contain a hash of the optimised SVG.** Changing `projects/{icons,flags}/svgo.config.ts`
  renames every file and changes every CDN URL. The icons config strips `stroke` and `fill` so CSS can colour icons; the
  flags config keeps them because flags are multi-coloured. Keep the two configs different.
- **`scripts/copyAssets.ts` skips a sub-project it cannot resolve** and logs `Skipping...`, so `build:assets` can
  succeed with an incomplete `cdn/`. Only the components-only copy (`build:assetsCopyComponentsOnly`) throws instead.

## Build Order

- `build:projects` runs `fonts` before `font-face`, because `projects/font-face/scripts/fontFaceStyles.ts` imports
  `FONTS_MANIFEST` from the generated fonts manifest. It also imports `getMinifiedCss` from
  `@porsche-design-system/shared` and the font weights from `@porsche-design-system/tokens`, so both must be built
  first.
- `cdn/components/` is a copy of `packages/components-js/dist/components`. `build:assets` copies whatever build exists
  at that moment, which in the root build order is the previous one; root `npm run build:components-js` then refreshes
  it through `build:assetsCopyComponentsOnly`.

## CDN

- The base URLs and the `CDN_BASE_PATH_*` constants live in the repo-root `cdn.config.ts`, which every build script
  imports.
- The font-face stylesheets are copied to the CDN directory `styles/`, not `font-face/` (the map in
  `scripts/copyAssets.ts`).
- The root `preinstall` creates `bin/serve-cdn.js` as an empty file so npm can link the bin; `serve-cdn` serves nothing
  until `build:assets` has replaced it.
- `serve-cdn` listens on port 3001 only. If the port is taken, it logs that and keeps running without serving, so a
  server started from another checkout keeps answering with that checkout's `cdn/`.

## Testing

None of the suites has a `pre` hook; build first.

- `icons` and `flags` are size gates. Each compares the tracked `tests/unit/fixtures/stats.json` with the
  `tests/unit/results/stats.json` the build writes, and fails when an asset grows or shrinks by more than 100 bytes and
  when an asset is added or removed. To accept the change, copy the results file over the fixture.
- `font-face` snapshots the `localhost`, `com` and `cn` stylesheets. The font URLs contain file hashes, so a changed
  font file changes the snapshot.
- `assets` snapshots the dependency tree of the built `dist/`, so it needs `build:assets` to have run.
