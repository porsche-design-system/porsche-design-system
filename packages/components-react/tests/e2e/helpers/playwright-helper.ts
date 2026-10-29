import { type ConsoleMessage, type Page } from '@playwright/test';
import { getLifecycleTrackingScript } from '@porsche-design-system/testing/playwright';

export const trackLifecycleStatus = async (page: Page): Promise<void> => {
  await page.evaluate((text) => {
    const script = document.createElement('script');
    script.text = text;
    document.body.appendChild(script);
  }, getLifecycleTrackingScript());
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
