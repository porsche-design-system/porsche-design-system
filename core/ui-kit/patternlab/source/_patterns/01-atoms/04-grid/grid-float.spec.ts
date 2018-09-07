import 'jasmine';
import * as puppeteer from 'puppeteer';
import { Browser, Page } from 'puppeteer';
import { VisualRegressionTester } from './../../../../../vrt/visual-regression-tester';

describe('Grid Float', () => {
  let browser: Browser, page: Page, visualRegressionTester: VisualRegressionTester;

  beforeAll(async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
    browser = await puppeteer.launch();
    page = await browser.newPage();
    visualRegressionTester = new VisualRegressionTester(page);
  });

  it('should have no visual regression', async () => {
    expect(await visualRegressionTester.test('grid-float', async () => {
      
      await visualRegressionTester.goTo('01-atoms-04-grid-grid-float/01-atoms-04-grid-grid-float.rendered.html');

    })).toBeFalsy();
  });

  afterAll(async () => {
    await browser.close();
  });
});
