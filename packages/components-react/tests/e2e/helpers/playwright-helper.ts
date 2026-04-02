import { type ConsoleMessage, type Locator, type Page } from '@playwright/test';
import { waitForComponentsReady } from './stencil';

export const getOuterHTML = (el: Locator): Promise<string> => el.evaluate((el) => el.outerHTML);

export const goto = async (page: Page, url: string): Promise<void> => {
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
