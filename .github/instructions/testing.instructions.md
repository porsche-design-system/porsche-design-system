---
applyTo: ["**/*.spec.ts", "**/tests/**/*.ts", "**/*.e2e.ts", "**/*.vrt.ts", "**/*.a11y.ts"]
---

# Testing Conventions (Cross-Cutting)

## Frameworks

| Framework | Purpose | Config |
|-----------|---------|--------|
| Vitest | Unit tests (jsdom) | Per-package `tests/unit/config/vitest.config.ts` |
| Playwright | E2E, VRT, a11y | Per-suite `tests/{type}/config/playwright.config.ts` |
| axe-core | Accessibility scanning | Via `@axe-core/playwright` |

## Unit Testing (Vitest)

### Component Unit Tests

Components are instantiated directly — no DOM rendering framework:

```ts
import { vi } from 'vitest';
import { Button } from './button';

const initComponent = (): Button => {
  const component = new Button();
  component.host = document.createElement('p-button');
  component.host.attachShadow({ mode: 'open' });
  // Mock ElementInternals for form components
  component['internals'] = {
    setFormValue: vi.fn(),
    form: { requestSubmit: vi.fn(), reset: vi.fn() } as unknown as HTMLFormElement,
  } as unknown as ElementInternals;
  return component;
};

describe('componentWillLoad', () => {
  it('should set form value', () => {
    const component = initComponent();
    component.value = 'test';
    component.form = 'form-id';
    component.componentWillLoad();
    expect(component['internals'].setFormValue).toHaveBeenCalledWith('test');
  });
});
```

Key patterns:
- `new ComponentClass()` — direct instantiation
- `document.createElement('p-tag')` + `attachShadow({ mode: 'open' })` — manual host setup
- Mock `ElementInternals` with `vi.fn()` for form components
- Call lifecycle methods explicitly: `connectedCallback()`, `componentWillLoad()`, etc.
- Access private members via bracket notation: `component['privateField']`
- `vi.fn()` for all mock functions

### Style Unit Tests

Snapshot-based testing of JSS style output:

```ts
import { getComponentCss } from './button-styles';

it('should return correct CSS for primary variant', () => {
  expect(getComponentCss('none', undefined, 'primary', false, false, false, false)).toMatchSnapshot();
});
```

## E2E Testing (Playwright)

### Pattern

```ts
import { type Page, expect, test } from '@playwright/test';
import {
  addEventListener, getActiveElementId, getEventSummary,
  getFormDataValue, getProperty, setContentWithDesignSystem,
  setProperty, skipInBrowsers, waitForStencilLifecycle,
} from '../helpers';

const getHost = (page: Page) => page.locator('p-component');
const getInput = (page: Page) => page.locator('p-component input');

const initComponent = (page: Page, opts = {}): Promise<void> => {
  return setContentWithDesignSystem(page, `<p-component></p-component>`);
};

test.describe('component', () => {
  test('should emit change event', async ({ page }) => {
    await initComponent(page);
    const host = getHost(page);
    await addEventListener(page, host, 'change');
    expect((await getEventSummary(host, 'change')).counter).toBe(1);
  });
});
```

### Key Helpers

| Helper | Purpose |
|--------|---------|
| `setContentWithDesignSystem(page, html)` | Render HTML with PDS provider loaded |
| `waitForStencilLifecycle(page)` | Wait for all components to hydrate |
| `setProperty(locator, prop, value)` | Set a DOM property on an element |
| `getProperty(locator, prop)` | Get a DOM property value |
| `addEventListener(page, locator, event)` | Start tracking events |
| `getEventSummary(locator, event)` | Get event count and details |
| `getActiveElementId(page)` | Get the currently focused element's ID |
| `getFormDataValue(page, name)` | Get value from form submission |
| `skipInBrowsers(testInfo, ['firefox'])` | Skip test in specific browsers |

## VRT Testing (Playwright)

**Must run in Docker**: `./docker.sh npm run test:vrt:components-js`

### Pattern

```ts
import { schemes, viewportWidths } from '@porsche-design-system/shared/testing';
import { setupScenario } from '../helpers';

test.describe('component', () => {
  for (const scheme of schemes) {
    for (const viewportWidth of viewportWidths) {
      test(`scheme=${scheme} viewport=${viewportWidth}`, async ({ page }) => {
        await setupScenario(page, '/component', viewportWidth);
        await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: scheme }]);
        await expect(page).toHaveScreenshot(`component-${scheme}-${viewportWidth}.png`);
      });
    }
  }
});
```

- Iterate `schemes` (light, dark) and `viewportWidths` from `@porsche-design-system/shared/testing`
- Tests run against pre-built HTML pages in `src/pages/`
- Sharded 6 ways in CI for parallel execution

## A11y Testing (Playwright + axe-core)

### Pattern

```ts
import { schemes } from '@porsche-design-system/shared/testing';
import { makeAxeBuilder, setupScenario, viewportWidthM, viewportWidthXXS } from '../helpers';

test.describe('component', () => {
  for (const scheme of schemes) {
    for (const viewport of [viewportWidthXXS, viewportWidthM]) {
      test(`no violations scheme=${scheme} viewport=${viewport}`, async ({ page }) => {
        await setupScenario(page, '/component', viewport);
        const results = await makeAxeBuilder().analyze();
        expect(results.violations).toEqual([]);
      });
    }
  }
});
```

A11y tree snapshot tests compare accessibility tree structure against saved baselines.

## When to Add Which Test Type

| Change | Test Type |
|--------|-----------|
| New component logic | Unit test |
| Changed markup/behavior | Unit test + consider e2e |
| Changed visual appearance | VRT |
| New interactive pattern | A11y test |
| Changed ARIA | A11y tree snapshot |
| Form submission behavior | E2e with `getFormDataValue()` |
| Keyboard navigation | E2e with `getActiveElementId()` |

## Test Commands

| Command | Purpose |
|---------|---------|
| `npm run test:unit:components` | Component unit tests |
| `npm run test:unit:{package}` | Package-specific unit tests |
| `npm run test:e2e:components-js` | E2E functional tests |
| `./docker.sh npm run test:vrt:components-js` | VRT (Docker required!) |
| `npm run test:a11y:components-js` | Accessibility tests |
| `npm run test:unit:storefront` | Storefront unit tests |
| `npm run test:e2e:storefront` | Storefront E2E tests |
