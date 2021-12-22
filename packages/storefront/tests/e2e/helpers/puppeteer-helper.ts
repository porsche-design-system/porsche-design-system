import { ConsoleMessage, Page } from 'puppeteer';

let consoleMessages: ConsoleMessage[] = [];

export const initConsoleObserver = (page: Page): void => {
  consoleMessages = []; // reset

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleMessages.push(msg);
      console.log(msg.text());
    }
  });
};
export const getConsoleErrorsAmount = () => consoleMessages.length;
