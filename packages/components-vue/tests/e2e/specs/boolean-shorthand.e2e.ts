import { expect, test } from '@playwright/test';
import { getConsoleErrorsAmount, goto, initConsoleObserver } from '../helpers';

const console = require('console');

test('should work without errors', async ({ page }) => {
  initConsoleObserver(page);
  await goto(page, 'boolean-shorthand');

  expect(getConsoleErrorsAmount()).toBe(0);

  await page.evaluate(() => console.error('test error'));
  expect(getConsoleErrorsAmount()).toBe(1);
});
