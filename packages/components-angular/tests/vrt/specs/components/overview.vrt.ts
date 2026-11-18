import { viewportWidthXXL } from '@porsche-design-system/testing';
import { expect, harnessPageConsole, test } from '@porsche-design-system/testing/playwright';

test.describe('overview', async () => {
  test.use({
    expectedConsole: async ({ expectedConsole }, use) =>
      use([...expectedConsole, ...harnessPageConsole['overview-components']]),
  });

  test('components', async ({ page }) => {
    await page.goto('/overview-components');
    await page.evaluate(() => (window as any).componentsReady());
    await page.setViewportSize({
      width: viewportWidthXXL,
      height: await page.evaluate(() => document.body.clientHeight),
    });
    await page.mouse.click(0, 0);
    await expect(page.locator('#app')).toHaveScreenshot(`overview-components-${viewportWidthXXL}.png`);
  });
});
