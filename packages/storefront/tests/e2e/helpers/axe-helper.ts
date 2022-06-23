import { AxePuppeteer } from '@axe-core/puppeteer';
import * as fs from 'fs';
import * as path from 'path';
import type { Page } from 'puppeteer';
import { baseURL } from './';

const AXE_RESULTS_DIR = path.resolve(__dirname, '../results');
fs.mkdirSync(AXE_RESULTS_DIR, { recursive: true });
fs.readdirSync(AXE_RESULTS_DIR)
  .filter((file) => file.match(/^a11y-[a-z\d-]+\.json$/))
  .forEach((file) => fs.rmSync(path.resolve(AXE_RESULTS_DIR, file)));

// We're using `@axe-core/puppeteer` over `@axe-devtools/puppeteer` since result wise they are identical.
// The only potential benefit of `@axe-devtools/reporter` is the possibility to create html reports.
export const a11yAnalyze = async (page: Page, suffix?: string) => {
  const pageUrl = page.url();

  // docs: https://github.com/dequelabs/axe-core-npm/tree/develop/packages/puppeteer
  const result = await new AxePuppeteer(page)
    // .include('.main') // ignore sidebar
    .withTags(['wcag21aa']) // defaults aren't good enough: https://github.com/dequelabs/axe-core/blob/master/doc/API.md#axe-core-tags
    .analyze();

  const { length: amountOfViolations } = result.violations;

  if (amountOfViolations > 0) {
    const testId = (pageUrl.replace(baseURL + '/', '').replace(/\//g, '-') || 'root') + (suffix ? `-${suffix}` : '');
    fs.writeFileSync(path.resolve(AXE_RESULTS_DIR, 'a11y-' + testId + '.json'), JSON.stringify(result, null, 2));
  }

  expect(amountOfViolations, 'amount of violations').toBe(0);
};
