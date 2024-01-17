import { expect, test } from '@playwright/test';
import { forceHoverState } from '../../../../../components-js/tests/vrt/playwright/helpers';
import { viewportWidthM } from '@porsche-design-system/shared/testing/playwright.vrt.config';

const style = 'styles-hover';

test.describe(style, async () => {
  // TODO: test is pointless?
  // hover media query isn't supported by puppeteer and therefore no hover style is visible
  test(`should have no visual regression for viewport ${viewportWidthM}`, async ({ page }) => {
    await page.goto(`/${style}`);
    await page.setViewportSize({ width: viewportWidthM, height: 600 });
    await forceHoverState(page, 'a');
    await expect(page.locator('#app')).toHaveScreenshot(`${style}-${viewportWidthM}.png`);
  });
});
