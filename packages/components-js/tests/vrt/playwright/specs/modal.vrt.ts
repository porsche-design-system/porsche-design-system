import { executeVisualRegressionTest } from '../helpers/playwright-helper';
import { test } from '@playwright/test';

test.describe('should have no visual regression', async () => {
  await executeVisualRegressionTest('modal', {
    scenario: async (page) => {
      await page.mouse.click(0, 0); // click top left corner of the page to remove focus on modal

      await page.evaluate(() => {
        // page is initially 1px high and then resized which affects scroll based behavior
        window.addEventListener('resize', () => {
          const modal = Array.from(document.querySelectorAll('p-modal')).pop();
          modal.scrollBy({ top: 5 });
          modal.scrollBy({ top: -5 });
        });
      });
    },
  });
});
