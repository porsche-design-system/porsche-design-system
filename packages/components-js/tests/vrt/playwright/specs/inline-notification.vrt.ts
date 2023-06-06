import { executeVisualRegressionTest } from '../helpers/playwright-helper';
import { test } from '@playwright/test';

test.describe('should have no visual regression', async () => {
  test.describe.configure({
    retries: 3,
  });
  await executeVisualRegressionTest('inline-notification');
});
