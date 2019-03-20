/* tslint:disable */

import 'jasmine';
import * as puppeteer from 'puppeteer';
import { Browser } from 'puppeteer';
import { VisualRegressionTester, VisualRegressionTestOptions } from '@porscheui/visual-regression-tester';

describe('Example integration of visual regression tester', () => {
  let browser: Browser, visualRegressionTester: VisualRegressionTester;

  const testOptions: VisualRegressionTestOptions = {
    viewports: [1024, 1920],
    fixturesDir: 'vrt/fixtures',
    resultsDir: 'vrt/results',
    tolerance: 0,
    baseUrl: 'http://localhost:3000'
  };

  beforeAll(async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    visualRegressionTester = new VisualRegressionTester(browser, testOptions);
  });

  it('should show hello world without regression', async () => {
    expect(await visualRegressionTester.test('hello-world', async () => {
      await visualRegressionTester.goTo('/demo/markdown?featureComponents');
    })).toBeFalsy();
  });

  afterAll(async () => {
    await browser.close();
  });
});
