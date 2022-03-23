import type { Page, JSHandle } from 'puppeteer';
import { SKELETONS_ACTIVE } from '../constants';

type Options = { withBackground: boolean };

export const openPopoversAndHighlightSpacer = async (page: Page, opts?: Options): Promise<void> => {
  const bodyHeightWidth = await page.evaluate(() => {
    return {
      height: document.body.clientHeight,
      width: document.body.clientWidth,
    };
  });

  await page.setViewport(bodyHeightWidth);

  await page.evaluate(() => {
    // Enable multiple open popovers
    document.addEventListener('mousedown', (e) => e.stopPropagation(), true);

    document.querySelectorAll('p-popover, my-prefix-p-popover').forEach((popover) => {
      const button = popover.shadowRoot.querySelector('p-button-pure, my-prefix-p-button-pure') as HTMLElement;
      button.click();
    });
  });

  if (opts?.withBackground) {
    const popoverHandles = await page.$$('p-popover');
    await Promise.all(
      popoverHandles.map(async (popoverHandle) => {
        const popover = await popoverHandle.evaluateHandle<JSHandle<HTMLElement>>((x: HTMLElement) => x);
        // Wait until popover is opened and selector is rendered
        const spacer: JSHandle<HTMLElement> = await page.waitForFunction(
          (popoverEl: HTMLElement) => popoverEl.shadowRoot.querySelector('.spacer'),
          {},
          popover
        );
        // Set background color of .spacer
        await spacer.evaluateHandle((spacerEl: HTMLElement) => (spacerEl.style.background = 'rgba(255, 0, 0, 0.4)'));
      })
    );
  }
};

export const itif = SKELETONS_ACTIVE ? it : xit;
