import { executeVisualRegressionTest } from '../helpers/playwright-helper';
import { test } from '@playwright/test';

test.skip('should have no visual regression on retina 3x display', async () => {
  await executeVisualRegressionTest('marque');
});
