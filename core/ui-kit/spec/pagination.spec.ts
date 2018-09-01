import 'jasmine';
import * as puppeteer from 'puppeteer';
import { Browser, Page } from 'puppeteer';
import { VisualRegressionTester } from './testers/visual-regression-tester';

describe('Pagination', () => {
  let browser: Browser, page: Page, visualRegressionTester: VisualRegressionTester;

  beforeAll(async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
    browser = await puppeteer.launch();
    page = await browser.newPage();
    visualRegressionTester = new VisualRegressionTester(page);
  });

  it('should look the same', async () => {
    expect(await visualRegressionTester.test('pagination', async () => {
      
      await page.goto('http://localhost:4251/de/de_DE', {waitUntil: 'networkidle0'});

    }, ['.charge-contract-information .notification-icon__text'])).toBeFalsy();
  });

  afterAll(async () => {
    await browser.close();
  });
});
