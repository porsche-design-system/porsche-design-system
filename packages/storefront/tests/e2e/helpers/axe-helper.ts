import { AxePuppeteer } from '@axe-core/puppeteer';
import * as fs from 'fs';
import * as path from 'path';
import type { Page } from 'puppeteer';
import { baseURL } from './';

const AXE_RESULTS_DIR = './tests/e2e/results';
fs.rmSync(AXE_RESULTS_DIR, { force: true, recursive: true });

// to avoid duplicate scans and errors in writing reports
const analyzedUrls: string[] = [];

// we're using @axe-core/puppeteer over @axe-devtools/puppeteer since result wise they are identical
// the only potential benefit of @axe-devtools/reporter is the possibility to create html reports
export const a11yAnalyze = async (page: Page) => {
  const pageUrl = page.url();

  if (!analyzedUrls.includes(pageUrl)) {
    const resultCore = await new AxePuppeteer(page).include('.main').withTags(['wcag2a', 'wcag2aa']).analyze();

    const testId = pageUrl.replace(baseURL + '/', '').replace(/\//g, '-') || 'root';
    fs.writeFileSync(path.resolve(AXE_RESULTS_DIR, 'fs-' + testId + '.json'), JSON.stringify(resultCore, null, 2));

    analyzedUrls.push(pageUrl);
  }
};

export const a11yFinalize = async () => {
  console.log(`Finished analyzing ${analyzedUrls.length} pages`);
  analyzedUrls.length = 0; // reset
};
