import { executeVisualRegressionTest } from '../helpers/playwright-helper';
import { test } from '@playwright/test';

test.describe('should have no visual regression', async () => {
  await executeVisualRegressionTest('toast-basic');
});

test.describe('should have no visual regression when dark', async () => {
  await executeVisualRegressionTest('toast-basic-dark');
});

test.describe('should have no visual regression with long-text', async () => {
  await executeVisualRegressionTest('toast-basic-long-text');
});

test.describe('should have no visual regression with offset', async () => {
  await executeVisualRegressionTest('toast-offset');
});

test.describe('should have no visual regression with prefix', async () => {
  await executeVisualRegressionTest('toast-prefixed');
});
