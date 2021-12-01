import { Page } from 'puppeteer';

export const openPopoversAndSetBackground = async (
  page: Page,
  withBackground: boolean = false,
  prefixed: boolean = false
): Promise<void> => {
  // Enable mutliple open popovers
  await page.evaluate(() => {
    document.addEventListener(
      'mousedown',
      (e) => {
        e.stopPropagation();
      },
      true
    );
  });

  if (prefixed) {
    await page.evaluate(() => {
      document.querySelectorAll('my-prefix-p-popover').forEach((popover) => {
        const button = popover.shadowRoot.querySelector('my-prefix-p-button-pure').shadowRoot.querySelector('button');
        button.click();
      });
    });
  }

  return page.evaluate((withBackground) => {
    document.querySelectorAll('p-popover').forEach((popover) => {
      const button = popover.shadowRoot.querySelector('p-button-pure').shadowRoot.querySelector('button');
      button.click();
      withBackground &&
        // we need a tick to set the background
        setTimeout(
          () => ((popover.shadowRoot.querySelector('.spacer') as HTMLElement).style.background = 'rgba(255, 0, 0, 0.4)')
        );
    });
  }, withBackground);
};
