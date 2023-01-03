import type { Page } from 'puppeteer';

export const waitForComponentsReady = (page: Page): Promise<number> => {
  // componentsReady is exposed via main.ts of angular vrt app
  return page.evaluate(() => (window as any).componentsReady());
};
