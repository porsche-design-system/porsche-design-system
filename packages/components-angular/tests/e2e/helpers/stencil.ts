import type { Page } from 'puppeteer';

export const waitForComponentsReady = async (page: Page): Promise<void> => {
  // componentsReady is exposed via main.ts of angular vrt app
  await page.evaluate((): Promise<void> => (window as any).componentsReady());
};
