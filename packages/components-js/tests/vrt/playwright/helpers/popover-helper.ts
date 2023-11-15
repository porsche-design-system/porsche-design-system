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
    document
      .querySelectorAll('p-popover, my-prefix-p-popover, p-select-wrapper, my-prefix-p-select-wrapper')
      .forEach((popover) => {
        const nativePopover: HTMLElement | undefined =
          popover.tagName === 'p-popover' || 'my-prefix-p-popover'
            ? popover.shadowRoot.querySelector('[popover="auto"]')
            : popover.shadowRoot
                .querySelector('p-select-wrapper-dropdown' || 'my-prefix-p-select-wrapper-dropdown')
                .shadowRoot.querySelector('[popover="auto"]');
        if (nativePopover?.popover) {
          nativePopover.popover = 'manual'; // Set to manual to allow multiple popovers to be open at the same time
        }
      });
  });
};
