import { type Page } from '@playwright/test';

export const openAllSelectWrapper = async (page: Page): Promise<void> => {
  await page.evaluate(() => {
    document.addEventListener('mousedown', (e) => e.stopPropagation(), true);
    document.querySelectorAll('p-select-wrapper, my-prefix-p-select-wrapper').forEach((select) => {
      select.shadowRoot
        .querySelector('p-select-wrapper-dropdown' || 'my-prefix-p-select-wrapper-dropdown')
        .shadowRoot.querySelector('button' || 'input')
        .click();
    });
  });
};
