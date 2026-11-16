# AGENTS.md — Components JS Package

> This file provides context for AI coding assistants working in `packages/components-js/`. See the root
> [`AGENTS.md`](../../AGENTS.md) for project-wide guidance.

## Overview

This package assembles the published `@porsche-design-system/components-js`. Its own workspace is
`@porsche-design-system/js` (private), so run its scripts with `--workspace=@porsche-design-system/js`. The published
manifest and `exports` map live in `projects/components-wrapper/package.json`. The package root is also the demo app
that the e2e, VRT and a11y suites load.

```text
packages/components-js/
├── src/pages/          # hand-written test pages, the input of generateVRTPages
├── src/examples/       # vanilla JS code samples for the storefront, read by generateCodeExamples
├── scripts/            # wrapper build steps and generateVRTPages
├── projects/
│   ├── components-manager-cli/   # `cm`, the build-time chunker
│   ├── components-manager-core/  # the runtime component loader
│   ├── components-wrapper/       # published manifest, webpack config
│   ├── jsdom-polyfill/           # ./jsdom-polyfill and ./testing
│   └── partials/                 # ./partials
└── tests/{unit,e2e,vrt,a11y,smoke}/
```

The other sub-projects are the workspaces `@porsche-design-system/components-manager-cli`,
`@porsche-design-system/components-manager-core`, `@porsche-design-system/jsdom-polyfill` and
`@porsche-design-system/partials`.

## Commands

```bash
npm run start:components-js    # serve-cdn (3001), serve-dummyassets (3002) and the Vite demo app
npm run build:components-js    # the workspace build, then refreshes packages/assets/cdn/components
npm run test:unit:components-js     # every unit suite of this package and its sub-projects
npm run test:smoke:components-js    # against the live CDN, see Testing
```

`serve-cdn` and `serve-dummyassets` listen on fixed ports. When a port is taken they log it and keep running without
serving, so a server started from another checkout keeps answering with that checkout's files.

## Generated Files

Never edit these; change the source and rebuild.

- `dist/components-wrapper/` is the npm package. `build` deletes `dist/` first, and each `build:<subpath>` copy step
  deletes its target before copying another package's `dist` in. `dist/components/` is the CDN payload, a separate tree.
- `projects/jsdom-polyfill/src/lib/` is replaced by the `packages/components` build (`build:copyCjsBuildToComponentsJs`)
  with the Stencil CJS output. Its filenames are content-hashed, so never reference one.
- `projects/partials/src/lib/` is written by `projects/partials/scripts/buildPartials.ts`. Edit the
  `generate*Partial.ts` scripts instead; the exported function name in each is the partial name. Partials are
  server-side only and throw when called in a browser (`projects/partials/src/shared.ts`).
- `projects/components-wrapper/lib/` is written by `scripts/generateChunksManifest.ts`.

### VRT pages for the other frameworks

`npm run generateVRTPages` (also run by `build-app`) converts `src/pages/*.html` into Angular, React, Next.js and React
Router pages. Most output is git-ignored, but two outputs are tracked:

- the files in `packages/components-react/projects/react-router/app/routes/` that start with `/* Auto Generated File */`
  (`home.tsx` and `accordion-layout-shift.tsx` are hand-written)
- the block between `/* Auto Generated Below */` and `/* Auto Generated Above */` in
  `packages/components-react/projects/nextjs/routes.ts`

After editing a page under `src/pages/`, run `npm run generateVRTPages` and commit those regenerated files with it. Vue
is not a target: port the change to `packages/components-vue/src/pages/` by hand.

## Build

- `PORSCHE_DESIGN_SYSTEM_DEV` defaults to `1`, so a plain `npm run build` points the loader at
  `http://localhost:3001/components`. `npm run build-prod` sets it to `0` and emits the `%%%CDN_BASE_URL_DYNAMIC%%%`
  placeholder that `scripts/replaceCdnBaseUrlDynamicPlaceholder.ts` replaces. Which suites need which mode is in the
  table in [`docs/runbooks/dependency-updates-agent.md`](../../docs/runbooks/dependency-updates-agent.md).
- `cm` finds `cm.config.cjs` by globbing from the working directory, so run it from `packages/components-js`.
- `build:partials` needs `build:components-wrapper` first: the chunk-links generator imports the chunks manifest and the
  loader-script generator reads `dist/components-tmp/index.js`, the IIFE `cm` build.
- Root `npm run build:components-js` also refreshes `packages/assets/cdn/components`; the workspace `build` alone does
  not, and `serve-cdn` keeps serving the previous components.
- `vite.config.js` leaves `getIconLinks` out on purpose: its links make the flyout iframes page fail with
  `ERR_INSUFFICIENT_RESOURCES`.
- Several steps patch built code by pattern and pass silently when the pattern stops matching:
  `replaceCdnBaseUrlDynamicPlaceholder.ts`, the `modify()` patches in `projects/jsdom-polyfill/rollup.config.js` and the
  loader-script regex in `vite.config.js`. `generateChunksManifest.ts` regex-scrapes and `eval`s minified webpack
  output, and `projects/components-wrapper/CustomNamedChunkIdsPlugin.js` is a fork of webpack internals. After a
  webpack, Stencil or polyfill upgrade, check the built output, not only the exit code.

### Published manifest

- Each stylesheet has two `exports` entries, `./<name>.css` and `./<name>`; add both for a new one.
- `./partials` uses the `module` condition where the other JS subpaths use `import`; `./jsdom-polyfill` and `./testing`
  are CJS only.
- `shadow-dom-testing-library` stays external in the `./testing` bundle and is a `dependencies` entry of the wrapper,
  because it patches `ShadowRoot.prototype` on import and a bundled copy crashes next to the consumer's copy.
  `@testing-library/dom` is external too, so consumers install it.

## Testing

- The unit config excludes `projects/**`; the sub-projects have their own suites and root
  `test:unit:components-js:<sub-project>` scripts. `tests/unit/specs/chunks.spec.ts` reads
  `tests/unit/results/stats-raw.json`, which only the webpack build writes.
- The e2e, VRT and a11y configs in `tests/{e2e,vrt,a11y}/config/` spread the base configs from
  `@porsche-design-system/testing` and start `npm run start-app`, which serves the built `dist/demo-app` on
  port 8575. Run `npm run build-app` after editing a page, or the suites test the previous build.
- Shards: e2e runs `test:e2e:{chrome,firefox,safari}:N/4`, VRT `test:vrt:chrome:N/6` and `test:vrt:safari:N/3` (no
  Firefox), a11y Chrome only and unsharded. The layout exists three times: here, in the root
  `test:{e2e,vrt}:components-js:*` scripts and in the `.github/workflows/test.yml` matrix. Change all three together.
- `tests/{e2e,vrt,smoke}` each keep a `playwright-helper.ts` for the helpers only components-js uses; the ones other
  packages use too come from `@porsche-design-system/testing`. The smoke `setContentWithDesignSystem` is a different
  function from the e2e one of the same name.
- Smoke tests load the live CDN, so they run in `.github/workflows/deploy.yml` after the upload. The smoke e2e config
  sends a real Chrome user agent and `sec-ch-ua` because `cdn.ui.porsche.cn` answers `HeadlessChrome` with a 403 and no
  CORS headers. Keep the override.
- Playwright drops CSS `filter` from screenshots in the cases listed in `tests/vrt/README.md`. Read it before chasing a
  missing filter.

### Demo app pages

- A page URL is `/<page>` with the query parameters `scheme`, `dir`, `scale`, `transition`, `animation` and `iframe`
  (`main.js`). `transition` and `animation` default to `none`, which sets `--p-transition-duration` and
  `--p-animation-duration` to `0s` and keeps screenshots stable. Pass `transitioned` or `animated` only to test motion.
- Slugs matching `/^[a-z-]+-example/` load from `src/examples/`, everything else from `src/pages/`. Inline `<script>`
  tags run through indirect `eval`.

### Accessibility suite

- Import `test` and `expect` from `tests/a11y/helpers`, not from `@playwright/test`; the `makeAxeBuilder` fixture there
  sets the WCAG tags, scopes the scan to `#app`, disables page-level rules and excludes `.skip-axe-core-test` and
  deprecated components.
- An element opts into an ARIA-tree snapshot with `class="a11ytree-snapshot-test"` in its page; the snapshots are the
  `.aria.yml` files in `tests/a11y/specs/a11ytree/__snapshots__/`.
- `amountOfTestableComponents` in `tests/a11y/specs/axe-core/components.a11y.ts` is hard-coded, so adding or removing a
  component fails it until you update the number.

### VRT snapshots

Baselines are `tests/vrt/specs/__screenshots__/<name>-<chrome|safari>.png`. The Angular, React and Vue VRT suites
compare against the same files, so updating one here changes their baselines too.

1. Run VRT in Docker. A changed screenshot fails the run, and npm then skips the `posttest:vrt*` hook, so run
   `npm run test:vrt:prepare-regression-snapshots --workspace=@porsche-design-system/js` yourself: it renames each
   `*-actual.png` in `tests/vrt/results` to `*-chrome.png` or `*-safari.png`.
2. `npm run test:vrt:update-regression-snapshots --workspace=@porsche-design-system/js` copies those into
   `__screenshots__`. There is no root alias, and Playwright's `--update-snapshots` is not used.

The Safari shards have no `posttest` hook of their own; the hooks of the inner `test:vrt:safari` and `test:vrt` scripts
run for them. Do not add one.

## Linting

Biome's `linter.includes` excludes this package, so `npm run lint` checks nothing here. Biome formatting still applies.
