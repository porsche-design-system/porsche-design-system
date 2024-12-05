import * as fs from 'fs';
import * as path from 'path';
import { Locator, type Page } from '@playwright/test';
import { schemes } from '@porsche-design-system/shared/testing/playwright.vrt';
import { expect, test } from '../helpers';

const console = require('console'); // workaround for nicer logs

const getInternalUrls = (): string[] => {
  const sitemapPath = path.resolve(__dirname, '../../e2e/fixtures/sitemap.json');
  const sitemap = JSON.parse(fs.readFileSync(sitemapPath, 'utf8'));

  return (
    sitemap
      .filter((link) => link.startsWith('/'))
      // drop "base" links that are redirected to first tab
      .filter((link, i, array) => !array.some((x) => x.startsWith(link + '/')))
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

const enableDarkMode = async (page: Page, themeBtn: Locator): Promise<void> => {
  await themeBtn.click();
  await page.waitForFunction(() => document.body.className === 'dark-mode');
};

test('should have successfully extracted :root styles', () => {
  expect(rootStyles).toContain(':root');
  expect(rootStyles).toContain('--p-transition-duration: 0s');
  expect(rootStyles).toContain('--p-animation-duration: 0s');
});

test.describe('storefront pages', () => {
  // filter out files from public/assets directory and ag-grid
  const internalUrls = getInternalUrls().filter(
    (url) => !url.match(/^\/assets\/.*\.\w{3,4}$/) && !url.includes('/ag-grid/theme')
  );

  schemes.forEach((scheme) => {
    for (const [url, index] of internalUrls.map<[string, number]>((url, i) => [url, i])) {
      test(`should have no accessibility issues for scheme-${scheme} at (${index + 1}/${internalUrls.length}) "${url}"`, async ({
        page,
        makeAxeBuilder,
      }, testInfo) => {
        await gotoUrl(page, url);

        if (scheme === 'dark') {
          const themeBtn = page.locator('.cycle-platform-theme');
          test.skip((await themeBtn.count()) === 0, 'No theme switcher found, skipping dark mode test');

          await enableDarkMode(page, themeBtn);
          const themeSwitch = page.locator('p-select[value="light"]').first();

          // change the theme of component to dark if the option exists
          if (await themeSwitch.count()) {
            await themeSwitch.click();
            const option = themeSwitch.getByText('Dark');
            await option.click();
            const example = page.locator('.example--dark').first();
            await expect(example).toHaveCount(1);
          }
        }

        const accessibilityScanResults = await makeAxeBuilder().analyze();

        await testInfo.attach(`a11y-scan-results-main-${scheme}`, {
          body: JSON.stringify(accessibilityScanResults.violations, null, 2),
          contentType: 'application/json',
        });

        console.log(accessibilityScanResults.violations);

        // Filter out violations for embedded stackblitz iframe
        const filteredViolations = accessibilityScanResults.violations
          .map((violation) => ({
            ...violation,
            nodes: violation.nodes.filter((node) =>
              node.target.every((selector) => !selector.includes('#stackblitz-demo'))
            ),
          }))
          .filter((violation) => violation.nodes.length > 0);

        expect(filteredViolations.length).toBe(0);
      });
    }
  });
});
