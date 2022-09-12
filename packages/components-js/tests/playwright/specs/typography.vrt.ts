import { executeVisualRegressionTest } from '../helpers/playwright-helper';
import { test } from '@playwright/test';

test.describe('should have no visual regression for font family fallback strategy', async () => {
  await executeVisualRegressionTest('typography-fallback-strategy');
});

test.describe('should have no visual regression for latin charset U+0020-1EFF', async () => {
  await executeVisualRegressionTest('typography-latin-U+0020-1EFF');
});

test.describe('should have no visual regression for latin charset U+2000-26FF', async () => {
  await executeVisualRegressionTest('typography-latin-U+2000-26FF');
});

test.describe('should have no visual regression for latin charset U+FB00-FEFF', async () => {
  await executeVisualRegressionTest('typography-latin-U+FB00-FEFF');
});

test.describe('should have no visual regression greek and coptic charset', async () => {
  await executeVisualRegressionTest('typography-greek-and-coptic');
});

test.describe('should have no visual regression cyril charset', async () => {
  await executeVisualRegressionTest('typography-cyril');
});
