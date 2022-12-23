import type { Page } from 'puppeteer';
import { getConsoleErrorsAmount, getOuterHTML, goto, initConsoleObserver } from '../helpers';

const console = require('console');

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

it('overview should work without errors', async () => {
  initConsoleObserver(page);
  await goto(page, 'overview');

  expect(getConsoleErrorsAmount()).toBe(0);

  await page.evaluate(() => console.error('test error'));
  expect(getConsoleErrorsAmount()).toBe(1);
});

it('should stringify object props correctly', async () => {
  await goto(page, 'overview');

  const innerHTML = await page.evaluate(() => document.querySelector('#app').innerHTML);

  expect(innerHTML).toContain('<p-headline');
  expect(innerHTML).toContain('<my-prefix-p-headline');
  expect(innerHTML).not.toContain('[object Object]');
});

it('should initialize component deterministically', async () => {
  await goto(page, 'core-initializer');
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const [component1, component2] = await page.$$('p-text-field-wrapper');

  const component1HTML = await getOuterHTML(component1);
  const component2HTML = await getOuterHTML(component2);

  expect(component1HTML).toBe(component2HTML);

  if (component1HTML !== component2HTML) {
    console.log('component1HTML', component1HTML);
    console.log('component2HTML', component2HTML);
  }
});
