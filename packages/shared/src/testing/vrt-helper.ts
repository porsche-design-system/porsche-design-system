import type { Page, JSHandle } from 'puppeteer';
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
      const button = popover.shadowRoot.querySelector('button');
      button.click();
    });
  });

  if (opts?.withBackground) {
    const popoverHandles = await page.$$('p-popover');
    await Promise.all(
      popoverHandles.map(async (popoverHandle) => {
        const popover = (await popoverHandle.evaluateHandle((x: HTMLElement) => x)) as JSHandle<HTMLElement>;
        // Wait until popover is opened and selector is rendered
        const spacer = (await page.waitForFunction(
          (popoverEl: HTMLElement) => popoverEl.shadowRoot.querySelector('.spacer'),
          {},
          popover
        )) as JSHandle<Element>;
        // Set background color of .spacer
        await spacer.evaluateHandle((spacerEl: HTMLElement) => (spacerEl.style.background = 'rgba(255, 0, 0, 0.4)'));
      })
    );
  }
};
