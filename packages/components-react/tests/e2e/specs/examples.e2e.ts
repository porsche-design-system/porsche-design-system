import { Page } from 'puppeteer';
import { goto, initConsoleObserver, getConsoleErrorsAmount } from '../helpers';
import { browser } from '../config';

describe('examples', () => {
  let page: Page;

  beforeEach(async () => {
    page = await browser.newPage();
    initConsoleObserver(page);
  });
  afterEach(async () => await page.close());

  for (const example of ['table-example-basic', 'table-example-sorting', 'table-example-advanced']) {
    it(`should work without error for ${example}`, async () => {
      await goto(page, example);
      expect(getConsoleErrorsAmount()).toBe(0);

      await page.evaluate(() => console.error('test error'));
      expect(getConsoleErrorsAmount()).toBe(1);
    });
  }
});
