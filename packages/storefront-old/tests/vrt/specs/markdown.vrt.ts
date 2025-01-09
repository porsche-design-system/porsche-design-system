import { expect, test } from '@playwright/test';
import { schemes, viewportWidthM, viewportWidths } from '@porsche-design-system/shared/testing/playwright.vrt';

test.describe('markdown', async () => {
  schemes.forEach((scheme) => {
    test(`should have no visual regression for viewport ${viewportWidthM} and theme auto with prefers-color-scheme ${scheme}`, async ({
      page,
    }) => {
      await page.emulateMedia({
        colorScheme: scheme,
      });
      await page.goto('/markdown');
      await page.evaluate(() =>
        (window as unknown as Window & { componentsReady: () => Promise<number> }).componentsReady()
      );
      await page.focus('a[href="https://designsystem.porsche.com/"]:not([title])');
      await page.setViewportSize({
        width: viewportWidthM,
        height: await page.evaluate(() => document.body.clientHeight),
      });
      await expect(page.locator('#app > main')).toHaveScreenshot(`markdown-${viewportWidthM}-scheme-${scheme}.png`);
    });
  });

  viewportWidths
    .filter((x) => x !== viewportWidthM)
    .forEach((viewportWidth) => {
      test(`should have no visual regression for viewport ${viewportWidth}`, async ({ page }) => {
        await page.goto('/markdown');
        await page.evaluate(() =>
          (window as unknown as Window & { componentsReady: () => Promise<number> }).componentsReady()
        );
        await page.focus('a[href="https://designsystem.porsche.com/"]:not([title])');
        await page.setViewportSize({
          width: viewportWidth,
          height: await page.evaluate(() => document.body.clientHeight),
        });
        await expect(page.locator('#app > main')).toHaveScreenshot(`markdown-${viewportWidth}.png`);
      });
    });
});
