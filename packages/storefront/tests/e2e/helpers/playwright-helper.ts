import type { ConsoleMessage, ElementHandle, Locator, Page } from '@playwright/test';

const consoleMessages: ConsoleMessage[] = [];

export const initConsoleObserver = (page: Page): void => {
  consoleMessages.length = 0; // reset

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleMessages.push(msg);
      console.log(msg.text());
    }
  });
};
export const getConsoleErrorsAmount = () => consoleMessages.length;

export const getProperty = async <T>(element: Locator, prop: string): Promise<T> => {
  return element.evaluate((el, prop) => (el as any)[prop], prop);
};
