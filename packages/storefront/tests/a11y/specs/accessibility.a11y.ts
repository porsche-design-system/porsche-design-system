import console from 'node:console'; // workaround for nicer logs
import * as fs from 'node:fs';
import * as path from 'node:path';
import type { Locator, Page } from '@playwright/test';
import { schemes } from '@porsche-design-system/shared/testing/playwright.vrt';
import { expect, test } from '../helpers/axe-helper';

const getInternalUrls = (): string[] => {
  const sitemapPath = path.resolve(__dirname, '../../e2e/fixtures/sitemap.json');
  const sitemap: string[] = JSON.parse(fs.readFileSync(sitemapPath, 'utf8'));

  return (
    sitemap
      .filter((link) => link.startsWith('/'))
      // drop "base" links that are redirected to first tab
      .filter((link, _, array) => !array.some((x) => x.startsWith(`${link}/`)))
  );
};

// style overrides for css variables
const styleOverrides = fs.readFileSync(
  path.resolve(require.resolve('@porsche-design-system/shared'), '../css/styles.css'),
  'utf8'
);
const [, rootStyles] = /(:root {[\s\S]+?})/.exec(styleOverrides) || [];

const gotoUrl = async (page: Page, url: string): Promise<void> => {
  await page.goto(url, { waitUntil: 'domcontentloaded' });

  // inject style overrides for css variables
  await page.evaluate((styles) => {
    const styleEl = document.createElement('style');
    styleEl.innerText = styles;
    document.head.append(styleEl);
  }, rootStyles);

  await page.waitForSelector('html.hydrated');
  await page.evaluate(() =>
    (window as unknown as Window & { componentsReady: () => Promise<number> }).componentsReady()
  );
};

const enableDarkMode = async (page: Page, themeSelect: Locator): Promise<void> => {
  await themeSelect.click();
  const dark = themeSelect.getByText('Dark', { exact: true });
  await dark.click();
  await expect(page.locator('html')).toHaveClass(/dark/);
};

test('should have successfully extracted :root styles', () => {
  expect(rootStyles).toContain(':root');
  expect(rootStyles).toContain('--p-transition-duration: 0s');
  expect(rootStyles).toContain('--p-animation-duration: 0s');
});

test.describe('storefront pages', () => {
  // filter out files from public/assets directory and ag-grid
  const internalUrls = getInternalUrls().filter(
    (url) =>
      !url.match(/^\/assets\/.*\.\w{3,4}$/) &&
      !url.includes('/ag-grid/theme') &&
      // Changelog has wrong heading order
      !url.includes('/news/changelog/') &&
      // Example has wrong heading order & color contrast problems
      !url.includes('/styles/grid/') &&
      // TODO: Unclear why those fail, dev tools don't show error
      !url.includes('developing/angular') &&
      !url.includes('components/button-tile/examples') &&
      !url.includes('components/canvas/api') &&
      !url.includes('components/canvas/configurator') &&
      !url.includes('developing/next-js') &&
      !url.includes('components/link-tile-model-signature/examples') &&
      !url.includes('help/bug-report') &&
      !url.includes('/components/table/api/') &&
      !url.includes('components/link-tile/examples')
  );

  schemes.forEach((scheme) => {
    for (const [url, index] of internalUrls.map<[string, number]>((url, i) => [url, i])) {
      test(`should have no accessibility issues for scheme-${scheme} at (${index + 1}/${internalUrls.length}) "${url}"`, async ({
        page,
        makeAxeBuilder,
      }, testInfo) => {
        await gotoUrl(page, url);

        if (scheme === 'dark') {
          await page.getByText('Open sidebar').click();
          const themeSelect = page.locator('p-select[name="theme"]').first();
          await enableDarkMode(page, themeSelect);
        }

        const accessibilityScanResults = await makeAxeBuilder().analyze();

        await testInfo.attach(`a11y-scan-results-main-${scheme}`, {
          body: JSON.stringify(accessibilityScanResults.violations, null, 2),
          contentType: 'application/json',
        });

        console.log(accessibilityScanResults.violations);

        // Filter out violations for p-scroller inside p-table.
        // This is a known issue with p-scroller in chrome when there is a scroll area but the component does not add tabindex=0.
        const filteredViolations = accessibilityScanResults.violations
          .map((violation) => ({
            ...violation,
            nodes: violation.nodes.filter((node) => node.target.every((selector) => !selector.includes('p-scroller'))),
          }))
          .filter((violation) => violation.nodes.length > 0);

        expect(filteredViolations.length).toBe(0);
      });
    }
  });
});
