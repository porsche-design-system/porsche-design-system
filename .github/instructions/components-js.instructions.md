---
applyTo: "packages/components-js/**"
---

# Components JS Package (`packages/components-js/`)

JS wrapper, CDN build, partials, and the primary test harness (e2e/vrt/a11y) for all PDS components.

## Package Structure

```
packages/components-js/
├── src/                           # Vite dev app (test pages)
│   └── pages/                     # Pre-built HTML pages for VRT/e2e
├── projects/
│   ├── components-wrapper/        # JS wrapper output
│   ├── components-manager-cli/    # CLI for component loading
│   ├── components-manager-core/   # Runtime component loader
│   ├── partials/                  # Server-side HTML snippet generators
│   └── jsdom-polyfill/            # jsdom compatibility polyfill
├── tests/
│   ├── e2e/                       # Playwright functional tests
│   ├── vrt/                       # Playwright visual regression tests
│   ├── a11y/                      # Playwright accessibility tests
│   └── unit/                      # Unit tests
└── scripts/                       # Build scripts
```

## Test Architecture

| Suite | Location | Purpose | Command |
|-------|----------|---------|---------|
| E2E | `tests/e2e/specs/` | Functional browser tests | `npm run test:e2e:components-js` |
| VRT | `tests/vrt/specs/` | Visual regression snapshots | `./docker.sh npm run test:vrt:components-js` |
| A11y | `tests/a11y/specs/` | Axe-core + a11y tree snapshots | `npm run test:a11y:components-js` |
| Unit | `tests/unit/` | Wrapper logic tests | `npm run test:unit:components-js` |

## VRT Docker Requirement

**VRT tests must run in Docker.** Local screenshots will not match CI.

```bash
./docker.sh npm run test:vrt:components-js
```

Docker image: `mcr.microsoft.com/playwright:v1.59.1-jammy` with 5120MB NODE_OPTIONS.

## E2E Test Pattern

```ts
import { type Page, expect, test } from '@playwright/test';
import {
  addEventListener, getEventSummary, setContentWithDesignSystem, waitForStencilLifecycle,
} from '../helpers';

const getHost = (page: Page) => page.locator('p-button');
const getButton = (page: Page) => page.locator('p-button button');

const initButton = (page: Page): Promise<void> =>
  setContentWithDesignSystem(page, `<p-button>Click me</p-button>`);

test.describe('button', () => {
  test('should dispatch click event', async ({ page }) => {
    await initButton(page);
    const host = getHost(page);
    await addEventListener(page, host, 'click');
    await getButton(page).click();
    expect((await getEventSummary(host, 'click')).counter).toBe(1);
  });
});
```

Key helpers from `tests/e2e/helpers/`:
- `setContentWithDesignSystem(page, html)` — render HTML with PDS provider
- `waitForStencilLifecycle(page)` — wait for all component hydration
- `setProperty(locator, prop, value)` / `getProperty(locator, prop)` — DOM property access
- `addEventListener(page, locator, event)` / `getEventSummary(locator, event)` — event tracking
- `getActiveElementId(page)` — check focused element
- `getFormDataValue(page, name)` — get form submission values
- `skipInBrowsers(testInfo, ['firefox'])` — skip tests in specific browsers

## VRT Test Pattern

```ts
import { schemes, viewportWidths } from '@porsche-design-system/shared/testing';
import { setupScenario } from '../helpers';

test.describe('button', () => {
  for (const scheme of schemes) {
    for (const viewportWidth of viewportWidths) {
      test(`scheme=${scheme} viewport=${viewportWidth}`, async ({ page }) => {
        await setupScenario(page, '/button', viewportWidth);
        await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: scheme }]);
        await expect(page).toHaveScreenshot(`button-${scheme}-${viewportWidth}.png`);
      });
    }
  }
});
```

## A11y Test Pattern

```ts
import { schemes } from '@porsche-design-system/shared/testing';
import { makeAxeBuilder, setupScenario, viewportWidthM, viewportWidthXXS } from '../helpers';

test.describe('button', () => {
  for (const scheme of schemes) {
    for (const viewport of [viewportWidthXXS, viewportWidthM]) {
      test(`no violations scheme=${scheme} viewport=${viewport}`, async ({ page }) => {
        await setupScenario(page, '/button', viewport);
        const results = await makeAxeBuilder().analyze();
        expect(results.violations).toEqual([]);
      });
    }
  }
});
```

## Partials

Server-side HTML snippet generators in `projects/partials/`:
- `generateLoaderScriptPartial` — PDS component loader script tag
- `generateFontLinksPartial` — font preload link tags
- `generateIconLinksPartial` — icon preload link tags
- `generateMetaTagsAndIconLinksPartial` — meta tags + favicons
- `generateComponentChunkLinksPartial` — chunk preload for specific components

## Build Dependencies

Requires built first: `shared` → `tokens` → `assets` → `styles` → `utilities` → `component-meta` → `components`

## Commands

```bash
npm run build:components-js                     # Build
npm run test:e2e:components-js                  # E2E tests
./docker.sh npm run test:vrt:components-js      # VRT tests (Docker!)
npm run test:a11y:components-js                 # A11y tests
npm run test:unit:components-js                 # Unit tests
npm run start:components-js                     # Dev server
```
