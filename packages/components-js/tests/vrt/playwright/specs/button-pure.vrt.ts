import { test } from '@playwright/test';
import { executeVisualRegressionTest } from '../helpers/playwright-helper';

test.describe('should have no visual regression', async () => {
  await executeVisualRegressionTest('button-pure');
});
