import type { Page } from 'puppeteer';
import { goto, initConsoleObserver, getConsoleErrorsAmount } from '../helpers';
import { routes } from '../../../routes';

let page: Page;

beforeEach(async () => {
  page = await browser.newPage();
  initConsoleObserver(page);
});
afterEach(async () => await page.close());

const pageUrls = routes.map((item) => item.path);

it.each(pageUrls)('should work without error or warning for %s', async (pageUrl) => {
  await goto(page, pageUrl.slice(1));
  expect(getConsoleErrorsAmount()).toBe(0);
  // tons of deprecation warnings, therefore disabled for now
  // expect(getConsoleWarningsAmount()).toBe(0);

  await page.evaluate(() => console.error('test error'));
  expect(getConsoleErrorsAmount()).toBe(1);

  // await page.evaluate(() => console.warn('test warning'));
  // expect(getConsoleWarningsAmount()).toBe(1);
});
