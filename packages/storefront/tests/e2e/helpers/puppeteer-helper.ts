import { ConsoleMessage, Page } from 'puppeteer';

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
