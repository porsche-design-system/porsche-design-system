import { test, expect } from '@playwright/test';
import { getConsoleErrorsAmount, getOuterHTML, goto, initConsoleObserver } from '../helpers';
import * as console from 'console';

test('overview should work without errors', async ({ page }) => {
  initConsoleObserver(page);
  await goto(page, 'overview');

  expect(getConsoleErrorsAmount()).toBe(0);

  await page.evaluate(() => console.error('test error'));
  expect(getConsoleErrorsAmount()).toBe(1);
});

test('should stringify object props correctly', async ({ page }) => {
  await goto(page, 'overview-components');

  const innerHTML = await page.evaluate(() => document.querySelector('#app').innerHTML);

  expect(innerHTML).toContain('<p-heading');
  expect(innerHTML).toContain('<my-prefix-p-heading');
  expect(innerHTML).not.toContain('[object Object]');
});

test('should initialize component deterministically', async ({ page }) => {
  await goto(page, 'core-initializer');
  await page.waitForFunction(() => document.querySelectorAll('p-input-text').length === 2);

  const [component1, component2] = await page.locator('p-input-text').all();

  const component1HTML = await getOuterHTML(component1);
  const component2HTML = await getOuterHTML(component2);

  expect(component1HTML).toBe(component2HTML);

  if (component1HTML !== component2HTML) {
    console.log('component1HTML', component1HTML);
    console.log('component2HTML', component2HTML);
  }
});
