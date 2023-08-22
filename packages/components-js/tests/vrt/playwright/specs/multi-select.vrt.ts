import { executeVisualRegressionTest, selectNode } from '../helpers/playwright-helper';
import { test } from '@playwright/test';

test.describe('should have no visual regression', async () => {
  await executeVisualRegressionTest('multi-select', {
    scenario: async (page) => {
      await page.evaluate(() => (window as any).componentsReady());
      // Call click on the shadow root input so isOutsideClick won't close the dropdowns
      await page.$$eval('p-multi-select.open', async (selects) =>
        selects.forEach((el: HTMLElement) => (el.shadowRoot.querySelector('INPUT') as HTMLElement).click())
      );
      // Highlight second option
      await page.$$eval('p-multi-select.highlight', async (selects) =>
        selects.forEach((select) =>
          select.children[1].shadowRoot.firstElementChild.classList.add('option--highlighted')
        )
      );
      // Select options with value "c"
      await page.$$eval('p-multi-select.selected', async (selects) =>
        selects.forEach((select: any) => (select.value = ['c']))
      );
      // Select multiple options
      await page.$$eval('p-multi-select.selected-multiple', async (selects) =>
        selects.forEach((select: any) => (select.value = ['a', 'b', 'c', 'd', 'e', 'f']))
      );

      // Type into inputs
      await (await selectNode(page, 'p-multi-select.no-results-1 >>> input')).type('No matching option');
      await (await selectNode(page, 'p-multi-select.no-results-2 >>> input')).type('No matching option');
    },
  });
});
