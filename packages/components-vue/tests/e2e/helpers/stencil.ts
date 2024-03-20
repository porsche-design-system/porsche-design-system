import { type Page } from '@playwright/test';

export const waitForComponentsReady = (page: Page): Promise<number> => {
  // componentsReady is exposed via index.tsx of React vrt app
  return page.evaluate(() =>
    (window as unknown as Window & { componentsReady: () => Promise<number> }).componentsReady()
  );
};
