import { executeVisualRegressionTest } from '../helpers/playwright-helper';
import { test } from '@playwright/test';

test.describe('should have no visual regression on retina 3x display', async () => {
  await executeVisualRegressionTest('crest');
});
