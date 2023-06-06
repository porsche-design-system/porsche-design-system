import { executeVisualRegressionTest } from '../helpers/playwright-helper';
import { test } from '@playwright/test';

test.describe('should have no visual regression', async () => {
  test.describe.configure({
    retries: 3,
  });
  await executeVisualRegressionTest('banner', {
    scenario: async (page) => {
      await page.mouse.click(0, 0); // click top left corner of the page to remove focus on modal
    },
  });
});
