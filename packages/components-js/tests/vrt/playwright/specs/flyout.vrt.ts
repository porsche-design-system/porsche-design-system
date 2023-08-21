import { executeVisualRegressionTest } from '../helpers/playwright-helper';
import { test } from '@playwright/test';

test.describe('should have no visual regression', async () => {
  await executeVisualRegressionTest('flyout', {
    scenario: async (page) => {
      test.setTimeout(60000);
      await page.mouse.click(0, 0); // click top left corner of the page to remove focus on flyout
      // Scroll down flyouts
      await page.$$eval('.scroll', async (scrollElements) => {
        scrollElements.forEach((el) => {
          const content = el.shadowRoot.querySelector(el.classList.contains('root') ? '.root' : '.content');
          const scrollHeight = el.classList.contains('center') ? content.scrollHeight / 3 : content.scrollHeight;
          content.scrollTo(0, scrollHeight);
        });
      });
    },
  });
});
