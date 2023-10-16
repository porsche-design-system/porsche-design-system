import { type Page } from '@playwright/test';

export const openAllPopover = async (page: Page): Promise<void> => {
  await page.evaluate(() => {
    document.addEventListener('mousedown', (e) => e.stopPropagation(), true);
    document.querySelectorAll('p-popover, my-prefix-p-popover').forEach((popover) => {
      popover.shadowRoot.querySelector('button').click();
    });
  });
};

export const setAllPopoverManual = async (page: Page): Promise<void> => {
  await page.evaluate(() => {
    document.querySelectorAll('p-popover, my-prefix-p-popover').forEach((popover) => {
      // Spacer is only available in native case since it's not conditionally rendered
      const spacer = popover.shadowRoot.querySelector('.spacer');
      if (spacer) {
        (spacer as any).popover = 'manual'; // Set to manual to allow multiple popovers to be open at the same time
      }
    });
  });
};
