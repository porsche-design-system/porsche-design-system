import { expect, test } from '@playwright/test';
import {
  schemes,
  viewportWidth3XL,
  viewportWidth4XL,
  viewportWidthM,
  viewportWidths,
  viewportWidthXXL,
} from '@porsche-design-system/shared/testing/playwright.vrt';

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
      test(`should have no visual regression for viewport ${viewportWidthM} and theme auto with prefers-color-scheme ${scheme}`, async ({
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
          width: viewportWidthM,
          height: await page.evaluate(() => document.body.clientHeight),
        });
        await expect(page.locator('#app')).toHaveScreenshot(`views-${name}-${viewportWidthM}-scheme-${scheme}.png`);
      });
    });

    (
      [
        ...viewportWidths.filter((x) => x !== viewportWidthM),
        viewportWidthXXL,
        viewportWidth3XL,
        viewportWidth4XL,
      ] as const
    ).forEach((viewportWidth) => {
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
