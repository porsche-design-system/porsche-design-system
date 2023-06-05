import { test } from '@playwright/test';
import { executeVisualRegressionTest, openPopovers } from '../helpers/playwright-helper';

test.describe.only('should have no visual regression', async () => {
  await executeVisualRegressionTest('overview', {
    scenario: async (page) => {
      // Enable console logging
      context.on('console', (msg) => {
        const type = msg.type();
        const location = msg.location();
        console.log(`[${type}] ${location.url}:${location.lineNumber}:${location.columnNumber} ${msg.text()}`);
      });

      await openPopovers(page);
      await page.mouse.click(0, 0); // Click top left corner of the page to remove focus on banner
    },
  });
});

test.describe('should have no visual regression', async () => {
  await executeVisualRegressionTest('overview-flaky', {
    scenario: async (page) => {
      await openPopovers(page);
      await page.mouse.click(0, 0); // Click top left corner of the page to remove focus on banner
    },
  });
});
