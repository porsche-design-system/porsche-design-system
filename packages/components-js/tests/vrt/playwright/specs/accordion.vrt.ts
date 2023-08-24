import { executeVisualRegressionTest, selectNode } from '../helpers/playwright-helper';
import { test } from '@playwright/test';

test.describe('should have no visual regression', async () => {
  await executeVisualRegressionTest('accordion');
});
