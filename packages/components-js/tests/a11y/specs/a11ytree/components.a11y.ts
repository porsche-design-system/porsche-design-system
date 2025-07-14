import { componentsValid, expect, test } from '../../helpers';
import { setupScenario } from '../../../vrt/helpers';
import { viewportWidthM } from '@porsche-design-system/shared/testing/playwright.vrt';

const pagesToTest = componentsValid.filter((item) => {
  return item !== 'flyout'; // removes 'flyout' as it is not available as a page
});
const additionalPages = ['flyout-1']; // add additional pages that are not in componentsValid
const advancedPagesToTest = [...pagesToTest, ...additionalPages];

for (const component of advancedPagesToTest) {
  // executed in Chrome only
  test.describe(component, async () => {
    test.skip(({ browserName }) => browserName !== 'chromium');

    // A11Y Tree Snapshot Tests
    test('should match a11y tree', async ({ page }) => {
      await setupScenario(page, `/${component}`, viewportWidthM);

      let selector = component;

      // maps pages which aren't equal with component names
      if (!componentsValid.includes(component)) {
        selector = componentsValid.find((item) => component.includes(item));
      }
      const getComponentTagName = `p-${selector}`;

      let index = 0;
      for (const element of await page.locator('.a11ytree-snapshot-test').all()) {
        const isIframe = await element.evaluate((el) => el.children[0]?.tagName.toLowerCase() === 'iframe');
        const locator = isIframe ? element.frameLocator('iframe').locator(getComponentTagName) : element;

        await expect(locator).toMatchAriaSnapshot({
          name: `p-${component}-${index++}.aria.yml`,
        });
      }
    });
  });
}
