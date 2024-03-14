import { type Page } from '@playwright/test';

export const openAllSelectWrapper = async (page: Page): Promise<void> => {
  await page.evaluate(() => {
    document.addEventListener('mousedown', (e) => e.stopPropagation(), true);
    document.querySelectorAll('p-select-wrapper').forEach((select) => {
      const selectType = select.getAttribute('filter') === 'true' ? 'filter' : 'select';
      select.shadowRoot
        .querySelector('p-select-wrapper-dropdown')
        .shadowRoot.querySelector(selectType == 'filter' ? 'input' : 'button')
        .click();
    });
  });
};
