import { executeVisualRegressionTest } from '../helpers/playwright-helper';
import { test } from '@playwright/test';

test.skip('should have no visual regression', async () => {
  await executeVisualRegressionTest('text');
});
