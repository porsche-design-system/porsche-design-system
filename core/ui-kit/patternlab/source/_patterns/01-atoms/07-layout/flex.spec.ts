import 'jasmine';
import * as puppeteer from 'puppeteer';
import { Browser, Page } from 'puppeteer';
import { VisualRegressionTester } from './../../../../../vrt/visual-regression-tester';

describe('Layout Flex', () => {
  let browser: Browser, page: Page, visualRegressionTester: VisualRegressionTester;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    visualRegressionTester = new VisualRegressionTester(page);
  });

  it('should have no visual regression', async () => {
    expect(await visualRegressionTester.test('layout~complete', async () => {
      await visualRegressionTester.goTo('01-atoms-07-layout-flex/01-atoms-07-layout-flex.rendered.html');
    })).toBeFalsy();
  });

  afterAll(async () => {
    await browser.close();
  });
});
