import type { ConsoleMessage, Locator, Page } from '@playwright/test';

export const waitForComponentsReady = (page: Page): Promise<number> => {
  // componentsReady is exposed via index.tsx of React vrt app
  return page.evaluate(() =>
    (window as unknown as Window & { componentsReady: () => Promise<number> }).componentsReady()
  );
};

export const goto = async (page: Page, url: string) => {
  await page.goto(url);
  await waitForComponentsReady(page);
};

const consoleMessages: ConsoleMessage[] = [];

export const initConsoleObserver = (page: Page): void => {
  consoleMessages.length = 0; // reset

  page.on('console', (msg: ConsoleMessage): void => {
    consoleMessages.push(msg);
    if (msg.type() === 'error') {
      const description = msg.text();
      if (description) {
        console.error(description);
      }
    }
  });
};
export const getConsoleErrorsAmount = (): number => {
  return consoleMessages.filter((x: ConsoleMessage): boolean => x.type() === 'error').length;
};
export const getConsoleWarningsAmount = (): number => {
  return consoleMessages.filter((x: ConsoleMessage): boolean => x.type() === 'warning').length;
};

export const getAttribute = (element: Locator, attribute: string): Promise<string> => {
  return element.evaluate((el: HTMLElement, attr: string) => el.getAttribute(attr), attribute);
};
