import { executeVisualRegressionTest, openPopovers } from '../helpers/playwright-helper';
import { test } from '@playwright/test';

test.skip('should have no visual regression', async () => {
  await executeVisualRegressionTest('popover', { scenario: (page) => openPopovers(page) });
});
