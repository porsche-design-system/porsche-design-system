import { executeVisualRegressionTest } from '../helpers/playwright-helper';
import { test } from '@playwright/test';

test.describe('should have no visual regression', async () => {
  await executeVisualRegressionTest('select-wrapper', {
    scenario: async (page) => {
      // expanded select will be rendered by the system, not the browser,
      // since touchDevice will be detected and thus will not appear on screenshot
      await page.locator('#open-options').click();
      await page.evaluate(() => (window as any).componentsReady());
    },
  });
});
