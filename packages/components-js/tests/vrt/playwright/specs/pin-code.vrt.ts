import { executeVisualRegressionTest } from '../helpers/playwright-helper';
import { test } from '@playwright/test';

test.describe('should have no visual regression', async () => {
  await executeVisualRegressionTest('pin-code', {
    scenario: async (page) => {
      await page.evaluate(() => (window as any).componentsReady());
      await page.$$eval('p-pin-code.filled', async (pinCodes) =>
        pinCodes.forEach((pinCode: any) => (pinCode.value = ['1', '2', '3', '4']))
      );
    },
  });
});
