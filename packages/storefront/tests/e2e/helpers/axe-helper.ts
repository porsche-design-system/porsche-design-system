import { AxeDevToolsPuppeteer } from '@axe-devtools/puppeteer';
import Reporter from '@axe-devtools/reporter';
import * as fs from 'fs';
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
    const result = await new AxeDevToolsPuppeteer(page).analyze();

    const testId = pageUrl.replace(baseURL + '/', '').replace(/\//g, '-') || 'root';
    reporter.logTestResult(testId, result);

    analyzedUrls.push(pageUrl);
  }
};

export const a11yFinalize = async () => {
  await reporter.buildHTML(AXE_RESULTS_DIR);
  analyzedUrls.length = 0; // reset
};
