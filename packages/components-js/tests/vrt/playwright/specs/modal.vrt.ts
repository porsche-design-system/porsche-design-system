import { executeVisualRegressionTest } from '../helpers/playwright-helper';
import { test } from '@playwright/test';

test.describe('should have no visual regression for basic modal', async () => {
  await executeVisualRegressionTest('modal-basic');
});

test.describe('should have no visual regression for scrollable modal', async () => {
  await executeVisualRegressionTest('modal-scrollable', {
    scenario: (page) =>
      page.evaluate(async () => {
        document.querySelector('p-modal').scrollTo(0, 10000);
      }),
  });
});

test.describe('should have no visual regression for prefixed modal', async () => {
  await executeVisualRegressionTest('modal-prefixed');
});

test.describe('should have no visual regression for fullscreen modal', async () => {
  await executeVisualRegressionTest('modal-fullscreen');
});

test.describe('should have no visual regression for fullscreen breakpoint modal', async () => {
  await executeVisualRegressionTest('modal-fullscreen-breakpoint');
  await executeVisualRegressionTest('modal-fullscreen-breakpoint', {
    namePostfix: '-m',
    scenario: (page) =>
      page.evaluate(() => {
        (document.querySelector('p-modal') as any).fullscreen = { base: false, m: true };
      }),
  });
});

test.describe('should have no visual regression for full-width-slot', async () => {
  await executeVisualRegressionTest('modal-full-width-slot');
});

test.describe('should have no visual regression for modal without heading', async () => {
  await executeVisualRegressionTest('modal-no-heading');
});

test.describe('should have no visual regression for modal with slotted heading', async () => {
  await executeVisualRegressionTest('modal-slotted-heading');
});
