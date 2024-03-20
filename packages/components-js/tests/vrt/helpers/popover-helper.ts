import { type Page } from '@playwright/test';
import type { TagName } from '@porsche-design-system/shared';

export const openAllPopover = async (page: Page): Promise<void> => {
  await page.evaluate(() => {
    document.addEventListener('mousedown', (e) => e.stopPropagation(), true);
    document.querySelectorAll('p-popover, my-prefix-p-popover').forEach((popover) => {
      popover.shadowRoot.querySelector('button').click();
    });
  });
};

export const setNativePopoversToAllowMultipleOpen = async (page: Page, tagName: TagName): Promise<void> => {
  await page.evaluate((tagName) => {
    document.querySelectorAll(tagName).forEach((el) => {
      const nativePopover: HTMLElement | undefined =
        el.tagName === 'P-SELECT-WRAPPER'
          ? el.shadowRoot.querySelector('p-select-wrapper-dropdown').shadowRoot.querySelector('[popover="auto"]')
          : el.shadowRoot.querySelector('[popover="auto"]');
      if (nativePopover?.popover) {
        nativePopover.popover = 'manual'; // Set to manual to allow multiple popovers to be open at the same time
      }
    });
  }, tagName);
};
