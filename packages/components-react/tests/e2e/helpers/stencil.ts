import { Page } from 'puppeteer';

export const waitForComponentsReady = async (page: Page): Promise<void> => {
  // componentsReady is exposed via index.tsx of react vrt app
  await page.evaluate((): Promise<void> => (window as any).componentsReady());
};
