import type { Page, ConsoleMessage } from '@playwright/test';
import { waitForComponentsReady } from '../utils';

const BASE_URL = 'http://localhost:8575';

export const goto = async (page: Page, url: string) => {
  await page.goto(`${BASE_URL}/${url}`);
  await waitForComponentsReady(page);
};

const consoleMessages: ConsoleMessage[] = [];

export const enableBrowserLogging = (page: Page): void => {
  page.on('console', (msg) => {
    console.log(msg.type() + ':', msg.text());
  });
};

// Use to track console errors, excluding custom thrown errors
export const initConsoleObserver = (page: Page): void => {
  consoleMessages.length = 0; // reset
  page.on('console', async (msg) => {
    consoleMessages.push(msg);
    if (msg.type() === 'error') {
      console.error(msg.text());
    }
  });
};

const getConsoleErrors = () => consoleMessages.filter((x) => x.type() === 'error');
export const getConsoleWarnings = () => consoleMessages.filter((x) => x.type() === 'warning');
export const getConsoleErrorsAmount = () => getConsoleErrors().length;
export const getConsoleErrorMessages = () =>
  getConsoleErrors()
    .map((msg) => '- ' + msg.text())
    .join('\n');
export const getConsoleWarningsAmount = () => getConsoleWarnings().length;
export const getConsoleWarningMessages = () =>
  getConsoleWarnings()
    .map((msg) => '- ' + msg.text())
    .join('\n');
