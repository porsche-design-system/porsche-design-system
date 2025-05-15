import { expect, test } from '@playwright/test';
import {
  schemes,
  viewportWidthM,
  viewportWidthXL,
  viewportWidths,
} from '@porsche-design-system/shared/testing/playwright.vrt';
import { viewportWidthL } from 'shared/src/testing/playwright.vrt';
import { closeSidebars, resetAnimations, waitForImagesToBeLoaded } from '../helpers/helpers';

test.describe('markdown', async () => {
  schemes.forEach((scheme) => {
    test(`should have no visual regression for viewport ${viewportWidthM} and theme auto with prefers-color-scheme ${scheme}`, async ({
      page,
    }) => {
      await page.emulateMedia({
        colorScheme: scheme,
      });
      await page.goto('/-/mdx');
      await page.setViewportSize({
        width: viewportWidthM,
        height: await page.evaluate(() => document.body.clientHeight),
      });
      await resetAnimations(page);
      await page.evaluate(() =>
        (window as unknown as Window & { componentsReady: () => Promise<number> }).componentsReady()
      );
      const screenshot = await page.screenshot({ fullPage: true });
      expect(screenshot).toMatchSnapshot(`markdown-${viewportWidthM}-scheme-${scheme}.png`);
    });
  });

  viewportWidths
    .filter((x) => x !== viewportWidthM)
    .forEach((viewportWidth) => {
      test(`should have no visual regression for viewport ${viewportWidth}`, async ({ page }) => {
        await page.goto('/-/mdx');
        await page.setViewportSize({
          width: viewportWidth,
          height: await page.evaluate(() => document.body.clientHeight),
        });
        await resetAnimations(page);
        await page.evaluate(() =>
          (window as unknown as Window & { componentsReady: () => Promise<number> }).componentsReady()
        );
        await closeSidebars(page);

        const screenshot = await page.screenshot({ fullPage: true });
        expect(screenshot).toMatchSnapshot(`markdown-${viewportWidth}.png`);
      });
    });
});
