import type { ConsoleMessage, Page, ElementHandle } from 'puppeteer';

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

export const getElementInnerText = (element: ElementHandle): Promise<string> =>
  element.evaluate((el) => (el as HTMLElement).innerText);

export const getProperty = async <T>(element: ElementHandle, prop: string): Promise<T> => {
  return element.evaluate((el, prop: string) => el[prop], prop);
};
