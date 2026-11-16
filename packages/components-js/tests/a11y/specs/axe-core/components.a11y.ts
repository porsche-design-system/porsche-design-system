import type { Page } from '@playwright/test';
import { schemes, viewportWidthM, viewportWidthXXS } from '@porsche-design-system/testing';
import { axeAllowlist, components, getPages } from '../../../helpers/coverage';
import { setupScenario } from '../../../vrt/helpers';
import { expect, test } from '../../helpers';

// VRT pages making use of iFrames can't reliably ensure which iframe is loaded last
// and therefore can't be sure which autofocus gets triggered
const revertAutoFocus = async (page: Page, component: string): Promise<void> => {
  if (['drilldown', 'flyout'].includes(component)) {
    await page.mouse.click(0, 0); // click top left corner of the page to remove focus
  }
};

for (const component of components) {
  for (const pageName of getPages(component).filter((pageName) => !axeAllowlist.includes(pageName))) {
    // executed in Chrome only
    test.describe(pageName, async () => {
      test.skip(({ browserName }) => browserName !== 'chromium');

      // Accessibility: AXE-Core tests basic
      // tests for light and dark color schemes on 2 different viewports
      [viewportWidthXXS, viewportWidthM].forEach((viewportWidth) => {
        for (const scheme of schemes) {
          test(`should have no accessibility regression for viewport ${viewportWidth} with color-scheme ${scheme}`, async ({
            page,
            makeAxeBuilder,
          }, testInfo) => {
            await setupScenario(page, `/${pageName}?scheme=${scheme}`, viewportWidth);
            await revertAutoFocus(page, component);

            const accessibilityScanResults = await makeAxeBuilder().analyze();

            await testInfo.attach(`a11y-scan-results-${pageName}-${viewportWidth}-scheme-${scheme}`, {
              body: JSON.stringify(accessibilityScanResults.violations, null, 2),
              contentType: 'application/json',
            });

            expect(accessibilityScanResults.violations).toEqual([]);
          });
        }
      });
    });
  }
}
