import { executeVisualRegressionTest } from '../helpers/playwright-helper';
import { test } from '@playwright/test';

test.skip('should have no visual regression for basic modal', async () => {
  await executeVisualRegressionTest('modal-basic');
});

test.skip('should have no visual regression for scrollable modal', async () => {
  await executeVisualRegressionTest('modal-scrollable', {
    scenario: async (page) => {
      const el = await page.$('#scroll-into-view');
      await el.scrollIntoViewIfNeeded();
    },
  });
});

test.skip('should have no visual regression for prefixed modal', async () => {
  await executeVisualRegressionTest('modal-prefixed');
});

test.skip('should have no visual regression for fullscreen modal', async () => {
  await executeVisualRegressionTest('modal-fullscreen');
});

test.skip('should have no visual regression for fullscreen breakpoint modal', async () => {
  await executeVisualRegressionTest('modal-fullscreen-breakpoint');
});

test.skip('should have no visual regression for full-width-slot', async () => {
  await executeVisualRegressionTest('modal-full-width-slot');
});

test.skip('should have no visual regression for modal without heading', async () => {
  await executeVisualRegressionTest('modal-no-heading');
});

test.skip('should have no visual regression for modal with slotted heading', async () => {
  await executeVisualRegressionTest('modal-slotted-heading');
});
