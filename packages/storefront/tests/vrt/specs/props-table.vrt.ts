import { expect, test } from '@playwright/test';
import { schemes, viewportWidthXL } from '@porsche-design-system/shared/testing/playwright.vrt';
import { resetAnimations } from '../helpers/helpers';

const urls = {
  'tabs-bar': '/components/tabs-bar/api',
  button: '/components/button/api',
} as const;

for (const [name, url] of Object.entries(urls)) {
  test.describe(name, async () => {
    schemes.forEach((scheme) => {
      test(`should have no visual regression for viewport ${viewportWidthXL} and theme auto with prefers-color-scheme ${scheme}`, async ({
        page,
      }) => {
        await page.emulateMedia({
          colorScheme: scheme,
        });
        await page.goto(url);
        await resetAnimations(page);
        await page.evaluate(() =>
          (window as unknown as Window & { componentsReady: () => Promise<number> }).componentsReady()
        );
        await page.setViewportSize({
          width: viewportWidthXL,
          height: await page.evaluate(() => document.body.clientHeight),
        });
        await expect(page.locator('#main-content')).toHaveScreenshot(
          `props-table-${name}-${viewportWidthXL}-scheme-${scheme}.png`
        );
      });
    });
  });
}
