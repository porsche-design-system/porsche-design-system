import { Page } from 'puppeteer';

export const openPopoverAndSetBackground = (page: Page, withBackground: boolean = false): Promise<void> =>
  page.evaluate((withBackground) => {
    document.querySelectorAll('p-popover').forEach((x) => {
      const button = x.shadowRoot.querySelector('p-button-pure').shadowRoot.querySelector('button');
      button.click();
      withBackground &&
        setTimeout(
          () => ((x.shadowRoot.querySelector('.spacer') as HTMLElement).style.background = 'rgba(255, 0, 0, 0.4)')
        );
    });
  }, withBackground);

export const openPrefixedPopover = (page: Page): Promise<void> =>
  page.evaluate(() => {
    document.querySelectorAll('my-prefix-p-popover').forEach((x) => {
      const button = x.shadowRoot.querySelector('my-prefix-p-button-pure').shadowRoot.querySelector('button');
      button.click();
    });
  });
