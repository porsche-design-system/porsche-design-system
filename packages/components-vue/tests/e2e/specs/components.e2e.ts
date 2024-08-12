import { test, expect } from '@playwright/test';
import { getConsoleErrorsAmount, getOuterHTML, goto, initConsoleObserver } from '../helpers';

const console = require('console');

test('overview should work without errors', async ({ page }) => {
  initConsoleObserver(page);
  await goto(page, 'overview');

  expect(getConsoleErrorsAmount()).toBe(0);

  await page.evaluate(() => console.error('test error'));
  expect(getConsoleErrorsAmount()).toBe(1);
});

test('should stringify object props correctly', async ({ page }) => {
  await goto(page, 'overview');

  const innerHTML = await page.evaluate(() => document.querySelector('#app').innerHTML);

  expect(innerHTML).toContain('<p-headline');
  expect(innerHTML).toContain('<my-prefix-p-headline');
  expect(innerHTML).not.toContain('[object Object]');
});

test.fixme('should initialize component deterministically', async ({ page }) => {
  await goto(page, 'core-initializer');
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const [component1, component2] = await page.locator('p-text-field-wrapper').all();

  const component1HTML = await getOuterHTML(component1);
  const component2HTML = await getOuterHTML(component2);

  expect(component1HTML).toBe(component2HTML);

  if (component1HTML !== component2HTML) {
    console.log('component1HTML', component1HTML);
    console.log('component2HTML', component2HTML);
  }
});
