import { expect, test } from '@playwright/test';
import { schemes } from '../helpers';

test.describe('markdown', async () => {
  schemes.forEach((scheme) => {
    const viewportWidth = 1000;

    test(`should have no visual regression for viewport ${viewportWidth} and theme auto with prefers-color-scheme ${scheme}`, async ({
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
        width: viewportWidth,
        height: await page.evaluate(() => document.body.clientHeight),
      });
      await expect(page.locator('#app > main')).toHaveScreenshot(`markdown-${viewportWidth}-scheme-${scheme}.png`);
    });
  });

  ([320, 480, 760, 1300, 1760] as const).forEach((viewportWidth) => {
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
