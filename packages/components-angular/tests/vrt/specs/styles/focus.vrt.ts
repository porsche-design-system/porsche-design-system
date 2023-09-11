import { expect, test } from '@playwright/test';
import { forceFocusState } from '../../../../../components-js/tests/vrt/playwright/helpers';

const style = 'styles-focus';
const viewportWidth = 1000;

test.describe(style, async () => {
  test(`should have no visual regression for viewport ${viewportWidth}`, async ({ page }) => {
    await page.goto(`/${style}`);
    await page.setViewportSize({ width: viewportWidth, height: 600 });
    await forceFocusState(page, 'a');
    await forceFocusState(page, 'button');
    await expect(page.locator('#app')).toHaveScreenshot(`${style}-${viewportWidth}.png`);
  });
});
