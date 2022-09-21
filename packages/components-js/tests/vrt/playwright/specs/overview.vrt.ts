import { test } from '@playwright/test';
import { executeVisualRegressionTest, openPopovers } from '../helpers/playwright-helper';

test.describe('should have no visual regression', async () => {
  await executeVisualRegressionTest('overview', { scenario: (page) => openPopovers(page) });
});
