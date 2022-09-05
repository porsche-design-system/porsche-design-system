import { AxePuppeteer } from '@axe-core/puppeteer';
import * as fs from 'fs';
import * as path from 'path';
import type { Page } from 'puppeteer';
import { baseURL } from './';

const console = require('console'); // workaround for nicer logs

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
    // defaults aren't good enough: https://github.com/dequelabs/axe-core/blob/master/doc/API.md#axe-core-tags
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();

  const { length: amountOfViolations } = result.violations;

  if (amountOfViolations > 0) {
    const testId = (pageUrl.replace(baseURL + '/', '').replace(/\//g, '-') || 'root') + (suffix ? `-${suffix}` : '');
    fs.writeFileSync(path.resolve(AXE_RESULTS_DIR, 'a11y-' + testId + '.json'), JSON.stringify(result, null, 2));

    const output = result.violations
      .map((item) => {
        const title = `${item.id} (${item.impact})` + (suffix ? ` on ${suffix}` : '');
        const selectors = item.nodes
          .map((node) => '– ' + (node.target as unknown as string[][])[0].join(' >>> '))
          .join('\n');
        return `${title}:\n${selectors}`;
      })
      .join('\n');

    console.log(output);
  }

  // temporary workaround until axe supports inert attribute
  // https://github.com/dequelabs/axe-core/issues/3448
  if (pageUrl.includes('components/carousel/examples')) {
    const { length: amountOfFilteredViolations } = result.violations.filter(
      (violation) => violation.id !== 'aria-hidden-focus'
    );
    expect(amountOfFilteredViolations).toBe(0);
  } else if (pageUrl.includes('components/tabs/example')) {
    // TODO: temporary workaround due to https://github.com/porscheui/porsche-design-system/issues/2019. Enable when fixed!
    const { length: amountOfFilteredViolations } = result.violations.filter(
      (violations) => violations.id !== 'color-contrast'
    );
    expect(amountOfFilteredViolations).toBe(0);
  } else {
    expect(amountOfViolations).toBe(0);
  }
};
