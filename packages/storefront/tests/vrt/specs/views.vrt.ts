import { expect, test } from '@playwright/test';
import {
  schemes,
  viewportWidth3XL,
  viewportWidth4XL,
  viewportWidthM,
  viewportWidthXXL,
  viewportWidths,
} from '@porsche-design-system/shared/testing/playwright.vrt';
import { closeSidebars, resetAnimations } from '../helpers/helpers';

const urls = {
  home: '/',
  page: '/components/button/configurator',
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
        await resetAnimations(page);

        // Modify video height if on the homepage
        if (url === '/') {
          await page.evaluate(() => {
            const video = document.querySelector('video');
            if (video) {
              (video as HTMLElement).style.height = '600px';
              // biome-ignore lint/style/noNonNullAssertion: <explanation>
              video.parentElement!.style.height = '600px';
            }
          });
        }

        await page.evaluate(() =>
          (window as unknown as Window & { componentsReady: () => Promise<number> }).componentsReady()
        );
        await page.setViewportSize({
          width: viewportWidthM,
          height: await page.evaluate(() => document.body.clientHeight),
        });

        const screenshot = await page.screenshot({ fullPage: true });
        expect(screenshot).toMatchSnapshot(`views-${name}-${viewportWidthM}-scheme-${scheme}.png`);
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
        await resetAnimations(page);

        // Modify video height if on the homepage
        if (url === '/') {
          await page.evaluate(() => {
            const video = document.querySelector('video');
            if (video) {
              (video as HTMLElement).style.height = '600px';
              // biome-ignore lint/style/noNonNullAssertion: <explanation>
              video.parentElement!.style.height = '600px';
            }
          });
        }

        await page.evaluate(() =>
          (window as unknown as Window & { componentsReady: () => Promise<number> }).componentsReady()
        );
        await page.setViewportSize({
          width: viewportWidth,
          height: await page.evaluate(() => document.body.clientHeight),
        });

        await closeSidebars(page);

        const screenshot = await page.screenshot({ fullPage: true });
        expect(screenshot).toMatchSnapshot(`views-${name}-${viewportWidth}.png`);
      });
    });
  });
}
