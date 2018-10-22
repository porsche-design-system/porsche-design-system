import 'jasmine';
import * as puppeteer from 'puppeteer';
import { Browser, Page } from 'puppeteer';
import { VisualRegressionTester } from './../../../../../vrt/visual-regression-tester';

describe('Flex', () => {
  let browser: Browser, page: Page, visualRegressionTester: VisualRegressionTester;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    visualRegressionTester = new VisualRegressionTester(page);
  });

  it('should have no visual regression', async () => {
    expect(await visualRegressionTester.test('flex~complete', async () => {
      await visualRegressionTester.goTo('04-layout-flex-flex/04-layout-flex-flex.rendered.html');
    })).toBeFalsy();
  });

  afterAll(async () => {
    await browser.close();
  });
});
