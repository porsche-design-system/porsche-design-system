import type { Page } from 'puppeteer';

export const waitForComponentsReady = (page: Page): Promise<number> => {
  // componentsReady is exposed via index.tsx of react vrt app
  return page.evaluate(() => (window as any).componentsReady());
};
