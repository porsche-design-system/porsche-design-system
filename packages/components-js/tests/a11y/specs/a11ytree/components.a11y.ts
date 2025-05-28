import type { Page } from '@playwright/test';
import { componentsValid, expect, test } from '../../helpers';
import { setupScenario } from '../../../vrt/helpers';
import { viewportWidthM } from '@porsche-design-system/shared/testing/playwright.vrt';

const components = componentsValid;

// VRT pages making use of iFrames can't reliably ensure which iframe is loaded last
// and therefore can't be sure which autofocus gets triggered
const revertAutoFocus = async (page: Page, component: string): Promise<void> => {
  if (['drilldown', 'flyout'].includes(component)) {
    await page.mouse.click(0, 0); // click top left corner of the page to remove focus
  }
};

const amountOfTestableComponents = 53;

test('should have certain amount of components', () => {
  expect(components.length).toBe(amountOfTestableComponents);
});

// TODO: remove filter once the height issue is fixed (issue/#3687)
for (const component of components) {
  // executed in Chrome only
  test.describe(component, async () => {
    test.skip(({ browserName }) => browserName !== 'chromium');

    // A11Y Tree Snapshot Tests
    test('should match a11y tree', async ({ page }) => {
      await setupScenario(page, `/${component}`, viewportWidthM);
      await revertAutoFocus(page, component);

      const getComponentTagName = `p-${component}`;

      let index = 0;
      for (const element of await page.locator('.a11ytree-snapshot-test').all()) {
        const isIframe = await element.evaluate((el) => el.children[0]?.tagName.toLowerCase() === 'iframe');
        const locator = isIframe ? element.frameLocator('iframe').locator(getComponentTagName) : element;

        await expect(locator).toMatchAriaSnapshot({
          name: `p-${component}-variant-${index++}.aria.yml`,
        });
      }
    });
  });
}
