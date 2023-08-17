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
          const root = el.shadowRoot.querySelector('.root');
          root.scrollTo(0, root.scrollHeight);
        });
      });
      // If no sub-footer is provided content is scrollable instead of root
      await page.$$eval('.scroll-content', async (scrollElements) => {
        scrollElements.forEach((el) => {
          const content = el.shadowRoot.querySelector('.content');
          content.scrollTo(0, content.scrollHeight);
        });
      });
    },
  });
});
