import type { ConsoleMessage, Page } from '@playwright/test';
import { goto as gotoAndWait } from '@porsche-design-system/testing/playwright';

// it looks like vue event binding is a bit unreliable and happens after onMounted
export const goto = (page: Page, url: string): Promise<void> => gotoAndWait(page, url, { delayAfterReady: 100 });

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
