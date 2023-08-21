import { executeVisualRegressionTest } from '../helpers/playwright-helper';
import { test } from '@playwright/test';

test.describe('should have no visual regression', async () => {
  await executeVisualRegressionTest('flyout', {
    scenario: async (page) => {
      test.setTimeout(60000);
      await page.mouse.click(0, 0); // click top left corner of the page to remove focus on flyout
      // Scroll down flyouts
      await page.$$eval('.scroll-here', async (scrollElements) => {
        scrollElements.forEach((el) => {
          el.scrollIntoView(el.classList.contains('vertical-center') ? { block: 'center' } : true);
        });
      });
    },
  });
});
