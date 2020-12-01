import { Page } from 'puppeteer';

export const waitForStencilLifecycle = async (page: Page): Promise<void> => {
  await page.waitForTimeout(20);
  await page.evaluate(
    async (): Promise<void> => {
      await (window as any).porscheDesignSystem.componentsReady();
    }
  );
};
