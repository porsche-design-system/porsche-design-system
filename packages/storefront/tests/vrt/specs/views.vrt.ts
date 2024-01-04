import { expect, test } from '@playwright/test';
import { schemes } from '../helpers';

const urls = {
  home: '/',
  page: '/components/pagination/examples',
  'not-found': '/404',
  // pattern: …
  // custom: …
} as const;

for (const [name, url] of Object.entries(urls)) {
  test.describe(name, async () => {
    schemes.forEach((scheme) => {
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
        await expect(page.locator('#app')).toHaveScreenshot(`views-${name}-${viewportWidth}-scheme-${scheme}.png`);
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
        await expect(page.locator('#app')).toHaveScreenshot(`views-${name}-${viewportWidth}.png`);
      });
    });
  });
}
