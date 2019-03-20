/* tslint:disable */

import 'jasmine';
import { VisualRegressionTester, VisualRegressionTestOptions } from '@porscheui/visual-regression-tester';
import * as puppeteer from 'puppeteer';
import { Browser } from 'puppeteer';

let browser: Browser;
let visualRegressionTester: VisualRegressionTester;

const testOptions: VisualRegressionTestOptions = {
  viewports: [320, 480, 760, 1000, 1300, 1760],
  fixturesDir: 'vrt/fixtures',
  resultsDir: 'vrt/results',
  tolerance: 0,
  baseUrl: 'http://localhost:3000'
};

jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

afterAll(async () => {
  if (browser) {
    await browser.close();
  }
});

export async function getVisualRegressionTester(): Promise<VisualRegressionTester> {
  if (!visualRegressionTester) {
    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    visualRegressionTester = new VisualRegressionTester(browser, testOptions);
  }

  return visualRegressionTester;
}
