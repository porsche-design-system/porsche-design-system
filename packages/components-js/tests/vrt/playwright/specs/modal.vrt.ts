import { executeVisualRegressionTest } from '../helpers/playwright-helper';
import { test } from '@playwright/test';

test.describe('should have no visual regression for modal', async () => {
  await executeVisualRegressionTest('modal', {
    scenario: async (page) => {
      test.describe.configure({
        retries: 3,
      });
      await page.mouse.click(0, 0); // click top left corner of the page to remove focus on modal
    },
  });
});
