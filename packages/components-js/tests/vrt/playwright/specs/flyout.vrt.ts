import { executeVisualRegressionTest } from '../helpers/playwright-helper';
import { test } from '@playwright/test';

test.describe('should have no visual regression for flyout', async () => {
  await executeVisualRegressionTest('flyout', {
    scenario: async (page) => {
      await page.mouse.click(0, 0); // click top left corner of the page to remove focus on flyout
      // Scroll down flyouts
      await page.$$eval('.scroll-here', (scrollElements) => {
        scrollElements.forEach((el) => el.scrollIntoView());
      });
    },
  });
});
