import { AxeDevToolsPuppeteer } from '@axe-devtools/puppeteer';
import { AxePuppeteer } from '@axe-core/puppeteer';
import Reporter from '@axe-devtools/reporter';
import * as fs from 'fs';
import * as path from 'path';
import type { Page } from 'puppeteer';
import { baseURL } from './';

const AXE_RESULTS_DIR = './tests/e2e/results';
fs.rmSync(AXE_RESULTS_DIR, { force: true, recursive: true });

const reporter = new Reporter('a11y', AXE_RESULTS_DIR);

// to avoid duplicate scans and errors in writing reports
const analyzedUrls: string[] = [];

export const a11yAnalyze = async (page: Page) => {
  const pageUrl = page.url();

  if (!analyzedUrls.includes(pageUrl)) {
    // core
    const resultCore = await new AxePuppeteer(page).include('.main').analyze();
    console.log('core incomplete:', resultCore.incomplete.length, 'core violations:', resultCore.violations.length);

    const testId = pageUrl.replace(baseURL + '/', '').replace(/\//g, '-') || 'root';
    fs.writeFileSync(path.resolve(AXE_RESULTS_DIR, 'fs-' + testId + '.json'), JSON.stringify(resultCore, null, 2));

    // dev tools
    const resultDevTools = await new AxeDevToolsPuppeteer(page).include('.main').analyze();
    console.log(
      'dev tools incomplete:',
      resultDevTools.incomplete.length,
      'dev tools violations:',
      resultDevTools.violations.length
    );
    reporter.logTestResult(testId, resultDevTools);

    analyzedUrls.push(pageUrl);
  }
};

export const a11yFinalize = async () => {
  await reporter.buildHTML(AXE_RESULTS_DIR);

  console.log(`Finished analyzing ${analyzedUrls.length} pages`);
  analyzedUrls.length = 0; // reset
};
