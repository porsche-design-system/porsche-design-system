import { executeVisualRegressionTest } from '../helpers/playwright-helper';
import { test } from '@playwright/test';

test.describe('should have no visual regression for flyout', async () => {
  await executeVisualRegressionTest('flyout', {
    scenario: async (page) => {
      await page.mouse.click(0, 0); // click top left corner of the page to remove focus on flyout
      // Scroll down flyouts
      console.log(await page.evaluate(() => (window as any).componentsReady()));
      await page.$$eval('.scroll-here', async (scrollElements) => {
        scrollElements.forEach((el) => el.scrollIntoView({ behavior: 'instant' as any }));
        await new Promise((resolve) => setTimeout(resolve, 500));
      });
    },
  });
});
