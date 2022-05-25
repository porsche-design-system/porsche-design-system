import { AxePuppeteer } from '@axe-core/puppeteer';
import * as fs from 'fs';
import * as path from 'path';
import type { Page } from 'puppeteer';
import { baseURL } from './';

const AXE_RESULTS_DIR = './tests/e2e/results';
fs.rmSync(AXE_RESULTS_DIR, { force: true, recursive: true });
fs.mkdirSync(AXE_RESULTS_DIR);

// to avoid duplicate scans and errors in writing results
const analyzedUrls: string[] = [];

// We're using `@axe-core/puppeteer` over `@axe-devtools/puppeteer` since result wise they are identical.
// The only potential benefit of `@axe-devtools/reporter` is the possibility to create html reports.
export const a11yAnalyze = async (page: Page) => {
  const pageUrl = page.url();

  if (!analyzedUrls.includes(pageUrl)) {
    // docs: https://github.com/dequelabs/axe-core-npm/tree/develop/packages/puppeteer
    const result = await new AxePuppeteer(page)
      .include('.main') // ignore sidebar
      .withTags(['wcag2a', 'wcag2aa']) // defaults aren't good enough and inconsistent with `@axe-devtools/puppeteer`
      .analyze();

    const testId = pageUrl.replace(baseURL + '/', '').replace(/\//g, '-') || 'root';
    fs.writeFileSync(path.resolve(AXE_RESULTS_DIR, 'a11y-' + testId + '.json'), JSON.stringify(result, null, 2));

    analyzedUrls.push(pageUrl);

    expect(result.violations.length, 'amount of violations').toBeLessThanOrEqual(1);
  }
};

export const a11yFinalize = async () => {
  console.log(`Finished analyzing ${analyzedUrls.length} pages`);
  analyzedUrls.length = 0; // reset
};
