import { expect, test } from '@playwright/test';
import { schemes, viewportWidthM } from '@porsche-design-system/shared/testing';
import { setupScenario } from '../helpers';

const component = 'ag-grid';

const variants = [
  { name: 'community', page: 'ag-grid-example-community' },
  { name: 'compact-community', page: 'ag-grid-example-compact-community' },
  { name: 'enterprise', page: 'ag-grid-example-enterprise' },
  { name: 'compact-enterprise', page: 'ag-grid-example-compact-enterprise' },
];

// executed in Chrome only
test.describe(component, () => {
  test.skip(({ browserName }) => browserName !== 'chromium');

  for (const { name, page: examplePage } of variants) {
    for (const scheme of schemes) {
      test(`should have no visual regression for ag-grid ${name} with color-scheme "${scheme}"`, async ({ page }) => {
        await setupScenario(page, `/${examplePage}?scheme=${scheme}`, viewportWidthM);
        await expect(page.locator('#app')).toHaveScreenshot(`${component}-${name}-${viewportWidthM}-${scheme}.png`);
      });
    }
  }
});
