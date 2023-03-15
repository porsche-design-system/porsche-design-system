import { test } from '@playwright/test';
import { executeVisualRegressionTest, openPopovers } from '../helpers/playwright-helper';

test.describe('should have no visual regression', async () => {
  await executeVisualRegressionTest('overview', {
    scenario: async (page) => {
      await openPopovers(page);
      await page.mouse.click(0, 0); // Click top left corner of the page to remove focus on banner
    },
  });
});
