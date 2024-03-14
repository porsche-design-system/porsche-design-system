import { type Page } from '@playwright/test';
import type { TagName } from '@porsche-design-system/shared';

export const openAllSelect = async (page: Page, tagName: TagName, nested: boolean): Promise<void> => {
  await page.evaluate(
    ({ tagName, nested }) => {
      document.addEventListener('mousedown', (e) => e.stopPropagation(), true);
      document.querySelectorAll(tagName).forEach((select) => {
        if (select.shadowRoot) {
          const combobox: HTMLElement | undefined =
            nested === true
              ? select.shadowRoot
                  .querySelector('p-select-wrapper-dropdown')
                  .shadowRoot.querySelector('[role="combobox"]')
              : select.shadowRoot.querySelector('[role="combobox"]');
          combobox.click();
        }
      });
    },
    { tagName, nested }
  );
};
