import { expect, test } from '@playwright/test';

const views = {
  home: '/',
  page: '/components/pagination/examples',
  'not-found': '/404',
  // pattern: …
  // custom: …
} as const;

for (const [view, url] of Object.entries(views)) {
  test.describe(view, async () => {
    (['light', 'dark'] as const).forEach((scheme) => {
      const viewportWidth = 1000;

      test(`should have no visual regression for viewport ${viewportWidth} and theme auto with prefers-color-scheme ${scheme}`, async ({
        page,
      }) => {
        await page.emulateMedia({
          colorScheme: scheme,
        });
        await page.goto(url);
        await page.evaluate(() =>
          (window as unknown as Window & { componentsReady: () => Promise<number> }).componentsReady()
        );
        await page.setViewportSize({
          width: viewportWidth,
          height: await page.evaluate(() => document.body.clientHeight),
        });
        await expect(page.locator('#app')).toHaveScreenshot(`views-${view}-${viewportWidth}-scheme-${scheme}.png`);
      });
    });

    ([320, 480, 760, 1300, 1760, 1920, 2560, 3000] as const).forEach((viewportWidth) => {
      test(`should have no visual regression for viewport ${viewportWidth}`, async ({ page }) => {
        await page.goto(url);
        await page.evaluate(() =>
          (window as unknown as Window & { componentsReady: () => Promise<number> }).componentsReady()
        );
        await page.setViewportSize({
          width: viewportWidth,
          height: await page.evaluate(() => document.body.clientHeight),
        });
        await expect(page.locator('#app')).toHaveScreenshot(`views-${view}-${viewportWidth}.png`);
      });
    });
  });
}
