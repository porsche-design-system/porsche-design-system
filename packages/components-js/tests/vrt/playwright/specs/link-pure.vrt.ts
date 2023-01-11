import { executeVisualRegressionTest } from '../helpers/playwright-helper';
import { test } from '@playwright/test';

test('should have no visual regression', async () => {
  await executeVisualRegressionTest('link-pure');
});
