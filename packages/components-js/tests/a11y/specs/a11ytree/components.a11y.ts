import { viewportWidthM } from '@porsche-design-system/testing';
import { a11yTreeSnapshotAllowlist, components, getPages } from '../../../helpers/coverage';
import { setupScenario } from '../../../vrt/helpers';
import { expect, test } from '../../helpers';

for (const component of components) {
  const getComponentTagName =
    component === 'popover' ? 'p-popover button' : `p-${component}${component === 'banner' ? ' [popover]' : ''}`;

  for (const pageName of getPages(component).filter((pageName) => !a11yTreeSnapshotAllowlist.includes(pageName))) {
    // executed in Chrome only
    test.describe(pageName, async () => {
      test.skip(({ browserName }) => browserName !== 'chromium');

      // A11Y Tree Snapshot Tests
      test('should match a11y tree', async ({ page }) => {
        await setupScenario(page, `/${pageName}`, viewportWidthM);

        let index = 0;

        expect(await page.locator('.a11ytree-snapshot-test').count()).toBeGreaterThan(0);

        for (const element of await page.locator('.a11ytree-snapshot-test').all()) {
          const isIframe = await element.evaluate((el) => el.children[0]?.tagName.toLowerCase() === 'iframe');
          const locator = isIframe ? element.frameLocator('iframe').locator(getComponentTagName) : element;

          await expect(locator).toMatchAriaSnapshot({
            name: `p-${pageName}-${index++}.aria.yml`,
          });
        }
      });
    });
  }
}
