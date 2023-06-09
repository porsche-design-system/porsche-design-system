import type { ConsoleMessage, Page } from 'puppeteer';

export const waitForComponentsReady = (page: Page): Promise<number> => {
  // componentsReady is exposed via index.tsx of react vrt app
  return page.evaluate(() => (window as any).componentsReady());
};

const BASE_URL = 'http://localhost:3000';

export const goto = async (page: Page, url: string) => {
  await page.goto(`${BASE_URL}/${url}`);
  await page.waitForSelector('html.hydrated');
  await waitForComponentsReady(page);
};

const consoleMessages: ConsoleMessage[] = [];

export const initConsoleObserver = (page: Page): void => {
  consoleMessages.length = 0; // reset

  page.on('console', (msg) => {
    consoleMessages.push(msg);
    if (msg.type() === 'error') {
      const { description } = msg.args()[0].remoteObject();
      if (description) {
        console.error(description);
      }
    }
  });
};
export const getConsoleErrorsAmount = () => consoleMessages.filter((x) => x.type() === 'error').length;
export const getConsoleWarningsAmount = () => consoleMessages.filter((x) => x.type() === 'warning').length;
