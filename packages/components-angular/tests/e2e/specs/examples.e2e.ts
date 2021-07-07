import { Page } from 'puppeteer';
import { goto, getConsoleErrorsAmount, initConsoleObserver } from '../helpers';
import { browser } from '../config';

describe('examples', () => {
  let page: Page;

  beforeEach(async () => {
    page = await browser.newPage();
    initConsoleObserver(page);
  });
  afterEach(async () => await page.close());

  describe('accordion', () => {
    it('should work without errors', async () => {
      await goto(page, 'accordion-example');
      expect(getConsoleErrorsAmount()).toBe(0);

      await page.evaluate(() => console.error('test error'));
      expect(getConsoleErrorsAmount()).toBe(1);
    });
  });

  for (const example of ['table-example-basic', 'table-example-sorting', 'table-example-advanced']) {
    it(`should work without error for ${example}`, async () => {
      await goto(page, example);
      expect(getConsoleErrorsAmount()).toBe(0);

      await page.evaluate(() => console.error('test error'));
      expect(getConsoleErrorsAmount()).toBe(1);
    });
  }
});
