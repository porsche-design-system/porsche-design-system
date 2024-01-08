import { expect, test } from '@playwright/test';
import { schemes } from '../helpers';

const urls = {
  'tabs-bar': '/components/tabs-bar/props',
  button: '/components/button/props',
} as const;

for (const [name, url] of Object.entries(urls)) {
  test.describe(name, async () => {
    schemes.forEach((scheme) => {
      const viewportWidth = 1760;

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
        await expect(page.locator('#app > main')).toHaveScreenshot(
          `props-table-${name}-${viewportWidth}-scheme-${scheme}.png`
        );
      });
    });
  });
}
