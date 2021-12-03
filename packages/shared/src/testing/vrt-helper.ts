import { Page } from 'puppeteer';

export const openPopoversAndHighlightSpacer = async (
  page: Page,
  withBackground: boolean = false,
  isVanillaJS: boolean = false
): Promise<void> => {
  const bodyHeightWidth = await page.evaluate(() => {
    return {
      height: document.body.clientHeight,
      width: document.body.clientWidth,
    };
  });

  await page.setViewport(bodyHeightWidth);

  await page.evaluate(
    async (withBackground, isVanillaJS) => {
      // Enable multiple open popovers
      document.addEventListener('mousedown', (e) => e.stopPropagation(), true);

      const popoverEls = document.querySelectorAll('p-popover, my-prefix-p-popover');

      popoverEls.forEach((popover) => {
        const button = popover.shadowRoot.querySelector('p-button-pure, my-prefix-p-button-pure');
        (button as HTMLElement).click();
      });
      // Workaround to have a delay due to waitForStencilLifecycle is not available
      const newPopover = document.createElement('p-popover');
      newPopover.style.margin = '-10rem';
      document.body.appendChild(newPopover);
      isVanillaJS
        ? await (window as any).porscheDesignSystem.componentsReady()
        : await (window as any).componentsReady();

      if (withBackground) {
        popoverEls.forEach((popover) => {
          (popover.shadowRoot.querySelector('.spacer') as HTMLElement).style.background = 'rgba(255, 0, 0, 0.4)';
        });
      }
    },
    withBackground,
    isVanillaJS
  );
};
