import { Page } from 'puppeteer';

export const waitForStencilLifecycle = async (page: Page): Promise<void> => {
  await page.evaluate(
    async (): Promise<void> => {
      await (window as any).componentsReady();
    }
  );
};
