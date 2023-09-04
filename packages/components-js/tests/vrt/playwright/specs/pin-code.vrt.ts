import { executeVisualRegressionTest } from '../helpers/playwright-helper';
import { test } from '@playwright/test';

test.describe('should have no visual regression', async () => {
  await executeVisualRegressionTest('pin-code', {
    scenario: async (page) => {
      await page.$$eval('p-pin-code.filled', async (pinCode) =>
        pinCode.forEach((pin: any) => (pin.value = ['1', '2', '3', '4']))
      );
    },
  });
  await executeVisualRegressionTest('pin-code');
});
