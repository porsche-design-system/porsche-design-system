import { executeVisualRegressionTest } from '../helpers/playwright-helper';
import { test } from '@playwright/test';

test.describe('should have no visual regression', async () => {
  await executeVisualRegressionTest('modal', {
    scenario: async (page) => {
      await page.mouse.click(0, 0); // click top left corner of the page to remove focus on modal

      // scroll modal once down and up to apply box-shadow
      await page.$eval('.scroll', async (scrollElement) => {
        scrollElement.scrollBy({ top: 5 });
        scrollElement.scrollBy({ top: -5 });
      });
    },
  });
});
