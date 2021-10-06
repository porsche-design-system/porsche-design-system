import { getConsoleErrorsAmount, goto, initConsoleObserver } from '../helpers';
import { Page } from 'puppeteer';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

it('should not crash after disconnectedCallback', async () => {
  initConsoleObserver(page);

  await goto('lifecycle-after-disconnect');
  await page.waitForTimeout(1500);

  expect(getConsoleErrorsAmount()).toBe(0);

  await page.evaluate(() => console.error('test error'));
  expect(getConsoleErrorsAmount()).toBe(1);
});
