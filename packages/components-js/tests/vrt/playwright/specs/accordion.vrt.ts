import { executeVisualRegressionTest, selectNode } from '../helpers/playwright-helper';
import { test } from '@playwright/test';

test.describe('should have no visual regression', async () => {
  await executeVisualRegressionTest('accordion', {
    scenario: async (page) => {
      const btn = await selectNode(page, 'p-select-wrapper#open-options >>> p-select-wrapper-dropdown >>> button');
      await btn.click();
      await page.evaluate(() => (window as any).componentsReady());
    },
  });
});
