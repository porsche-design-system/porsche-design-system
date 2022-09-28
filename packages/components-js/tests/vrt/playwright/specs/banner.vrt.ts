import { executeVisualRegressionTest } from '../helpers/playwright-helper';
import { test } from '@playwright/test';

test.describe('should have no visual regression', async () => {
  await executeVisualRegressionTest('banner', {
    scenario: async (page) => {
      await page.waitForFunction(() => document.querySelector('template') === null);
    },
  });
});
