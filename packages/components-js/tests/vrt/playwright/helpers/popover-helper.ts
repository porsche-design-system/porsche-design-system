import { type Page } from '@playwright/test';

export const openAllPopover = async (page: Page): Promise<void> => {
  await page.evaluate(() => {
    document.addEventListener('mousedown', (e) => e.stopPropagation(), true);
    document.querySelectorAll('p-popover, my-prefix-p-popover').forEach((popover) => {
      popover.shadowRoot.querySelector('button').click();
    });
  });
};

export const setNativePopoversToAllowMultipleOpen = async (page: Page): Promise<void> => {
  await page.evaluate(() => {
    document.querySelectorAll('p-popover, my-prefix-p-popover').forEach((popover) => {
      const spacer: HTMLElement | undefined = popover.shadowRoot.querySelector('.spacer');
      if (spacer?.popover) {
        spacer.popover = 'manual'; // Set to manual to allow multiple popovers to be open at the same time
      }
    });
  });
};
