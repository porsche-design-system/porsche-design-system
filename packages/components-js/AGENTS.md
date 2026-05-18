# AGENTS.md — Components JS Package

> This file provides context for AI coding assistants working in `packages/components-js/`.
> See the root [`AGENTS.md`](../../AGENTS.md) for project-wide guidance.

## Overview

This package contains the **JS wrapper**, CDN build, server-side partials, and the primary **test harness** (e2e, VRT, a11y) for all PDS components.

## Package Structure

```
packages/components-js/
├── src/pages/                         # Pre-built HTML pages for VRT/e2e
├── projects/
│   ├── components-wrapper/            # JS wrapper output
│   ├── components-manager-cli/        # CLI for component loading
│   ├── components-manager-core/       # Runtime component loader
│   ├── partials/                      # Server-side HTML snippet generators
│   └── jsdom-polyfill/                # jsdom compatibility polyfill
└── tests/
    ├── e2e/specs/                     # Playwright functional tests
    ├── vrt/specs/                     # Playwright visual regression tests
    ├── a11y/specs/                    # Playwright accessibility tests
    └── unit/                          # Vitest unit tests
```

## Test Architecture

| Suite | Location | Command |
|-------|----------|---------|
| E2E | `tests/e2e/specs/` | `npm run test:e2e:components-js` |
| VRT | `tests/vrt/specs/` | `./docker.sh npm run test:vrt:components-js` |
| A11y | `tests/a11y/specs/` | `npm run test:a11y:components-js` |
| Unit | `tests/unit/` | `npm run test:unit:components-js` |

## VRT — Docker Required

**VRT tests must run in Docker.** Local screenshots will not match CI.

```bash
./docker.sh npm run test:vrt:components-js
```

## E2E Test Pattern

```ts
import { setContentWithDesignSystem, waitForStencilLifecycle, addEventListener, getEventSummary } from '../helpers';

const initComponent = (page: Page): Promise<void> =>
  setContentWithDesignSystem(page, `<p-button>Click</p-button>`);

test('should dispatch click event', async ({ page }) => {
  await initComponent(page);
  const host = page.locator('p-button');
  await addEventListener(page, host, 'click');
  await page.locator('p-button button').click();
  expect((await getEventSummary(host, 'click')).counter).toBe(1);
});
```

Key helpers (`tests/e2e/helpers/`): `setContentWithDesignSystem`, `waitForStencilLifecycle`, `setProperty`, `getProperty`, `addEventListener`, `getEventSummary`, `getActiveElementId`, `getFormDataValue`, `skipInBrowsers`.

## A11y Test Pattern

```ts
import { schemes } from '@porsche-design-system/shared/testing';
import { makeAxeBuilder, setupScenario, viewportWidthM } from '../helpers';

for (const scheme of schemes) {
  test(`no violations scheme=${scheme}`, async ({ page }) => {
    await setupScenario(page, '/component', viewportWidthM);
    const results = await makeAxeBuilder().analyze();
    expect(results.violations).toEqual([]);
  });
}
```

## Partials

Server-side HTML generators in `projects/partials/`:
- `generateLoaderScriptPartial` — PDS component loader script tag
- `generateFontLinksPartial` — font preload link tags
- `generateMetaTagsAndIconLinksPartial` — meta tags + favicons
- `generateComponentChunkLinksPartial` — chunk preload for specific components

## Build Dependencies

Requires built first: `shared` → `tokens` → `assets` → `styles` → `utilities` → `component-meta` → `components`

## Commands

```bash
# Build
npm run build:components-js

# Dev server
npm run start:components-js

# Tests
npm run test:e2e:components-js
./docker.sh npm run test:vrt:components-js
npm run test:a11y:components-js
npm run test:unit:components-js
```
