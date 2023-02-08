import { executeVisualRegressionTest } from '../helpers/playwright-helper';
import { test } from '@playwright/test';

test.skip('should have no visual regression for font family fallback strategy', async () => {
  await executeVisualRegressionTest('typography-fallback-strategy');
});

test.skip('should have no visual regression for latin charset', async () => {
  await executeVisualRegressionTest('typography-latin');
});

test.skip('should have no visual regression greek and coptic charset', async () => {
  await executeVisualRegressionTest('typography-greek-and-coptic');
});

test.skip('should have no visual regression cyril charset', async () => {
  await executeVisualRegressionTest('typography-cyril');
});
