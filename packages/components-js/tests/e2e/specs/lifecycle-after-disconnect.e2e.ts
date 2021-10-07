import { getConsoleErrorsAmount, goto, initConsoleObserver, waitForComponentsReady } from '../helpers';
import { Page } from 'puppeteer';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

it('should not crash after disconnectedCallback', async () => {
  initConsoleObserver(page);
  await goto(page, ''); // start page

  await page.evaluate(() => {
    const item = '<p-grid-item>Loading</p-grid-item>';
    document.getElementById('app').innerHTML = item;
  });

  await waitForComponentsReady(page);
  expect(getConsoleErrorsAmount()).toBe(0);

  await page.evaluate(() => console.error('test error'));
  expect(getConsoleErrorsAmount()).toBe(1);
});
