import { test } from '@playwright/test';
import { executeVisualRegressionTest } from '../helpers/playwright-helper';

test.describe('should have no visual regression', async (): Promise<void> => {
  await executeVisualRegressionTest('button', '/button');

  // TODO:
  // create screenshots with CDP
  // create screenshots for Safari/Firefox only for viewport width 1000
  // create force focus screenshots based on playground state css classes
});
