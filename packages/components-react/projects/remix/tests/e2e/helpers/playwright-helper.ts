import { type ElementHandle, type Page } from '@playwright/test';

export const waitForComponentsReady = (page: Page): Promise<number> => {
  // componentsReady is exposed via index.tsx of React vrt app
  return page.evaluate(() =>
    (window as unknown as Window & { componentsReady: () => Promise<number> }).componentsReady()
  );
};

export const goto = async (page: Page, url: string) => {
  await page.goto(url);
  await page.locator('html.hydrated').waitFor();
  await waitForComponentsReady(page);
};

export const getAttribute = (element: ElementHandle, attribute: string): Promise<string | null> => {
  return element.evaluate((el: HTMLElement, attr: string) => el.getAttribute(attr), attribute);
};
