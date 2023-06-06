import { test } from '@playwright/test';
import { executeVisualRegressionTest } from '../helpers/playwright-helper';

test.describe('should have no visual regression', async () => {
  test.describe.configure({
    retries: 3,
  });
  await executeVisualRegressionTest('content-wrapper');
});
