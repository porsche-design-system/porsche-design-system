import { expect, test } from '@playwright/test';
import { forceHoverState } from '../../../../../components-js/tests/vrt/playwright/helpers';

const style = 'styles-hover';
const viewportWidth = 1000;

test.describe(style, async () => {
  // TODO: test is pointless?
  // hover media query isn't supported by puppeteer and therefore no hover style is visible
  test(`should have no visual regression for viewport ${viewportWidth}`, async ({ page }) => {
    await page.goto(`/${style}`);
    await page.setViewportSize({ width: viewportWidth, height: 600 });
    await forceHoverState(page, 'a');
    await expect(page.locator('#app')).toHaveScreenshot(`${style}-${viewportWidth}.png`);
  });
});
