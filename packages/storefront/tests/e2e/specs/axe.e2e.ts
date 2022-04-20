import type { Page } from 'puppeteer';
import { AxeDevToolsPuppeteer } from '@axe-devtools/puppeteer';
// import AxeDevToolsLogger from '@axe-devtools/logger';
import Reporter from '@axe-devtools/reporter';
import { baseURL } from '../helpers';
import * as fs from 'fs';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

const AXE_RESULTS_DIR = './tests/e2e/results';
fs.rmSync(AXE_RESULTS_DIR, { recursive: true });

it('works', async () => {
  await page.goto(baseURL, { waitUntil: 'networkidle0' });

  const results = await new AxeDevToolsPuppeteer(page).analyze();

  // const logger = new AxeDevToolsLogger('Report Name');
  // logger.logTestResult('test-name', results);

  const reporter = new Reporter('a11y', AXE_RESULTS_DIR);
  reporter.logTestResult('home', results);

  await page.goto(baseURL + '/about/introduction', { waitUntil: 'networkidle0' });
  const results2 = await new AxeDevToolsPuppeteer(page).analyze();
  reporter.logTestResult('about-introduction', results2);

  await reporter.buildHTML(AXE_RESULTS_DIR);
});
