import { executeVisualRegressionTest, selectNode } from '../helpers/playwright-helper';
import { test } from '@playwright/test';

test.describe('should have no visual regression', async () => {
  await executeVisualRegressionTest('select-wrapper', {
    scenario: async (page) => {
      await page.click('.open');
      await page.evaluate(() => (window as any).componentsReady());
    },
  });
});
