import { expect, test } from '@playwright/test';
import { viewportWidthM } from '@porsche-design-system/shared/testing/playwright.vrt';
import { forceFocusState, forceFocusVisibleState } from '../../../../../components-js/tests/vrt/helpers';

const style = 'styles-focus';

test.describe(style, async () => {
  test(`should have no visual regression for vanilla-extract at viewport ${viewportWidthM}`, async ({ page }) => {
    await page.goto(`/vanilla-extract-${style}`);
    await page.setViewportSize({ width: viewportWidthM, height: 600 });
    await forceFocusState(page, 'a');
    await forceFocusVisibleState(page, 'a');
    await forceFocusState(page, 'button');
    await forceFocusVisibleState(page, 'button');
    await expect(page.locator('#app')).toHaveScreenshot(`${style}-${viewportWidthM}.png`);
  });
});
