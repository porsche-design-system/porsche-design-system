import { expect, test } from '@playwright/test';
import { waitForComponentsHydrated } from '@porsche-design-system/testing/playwright';
import { getInternalUrls } from '../helpers/sitemap';

const internalUrls = getInternalUrls();

/** The patterns and templates `WebsiteViewer` frames: static files copied into `public/examples/`, not routes. */
const isExampleUrl = (url: string): boolean => url.startsWith('/examples/');

/**
 * Console errors and warnings a page is expected to log, by url. A pattern is tested against the message text
 * followed by its source url, so a 404 can be expected for one file only. Each entry says why.
 */
const expectedConsole: Record<string, RegExp[]> = {
  // The page documents the deprecated p-display component.
  '/components/display/configurator/': [/component p-display is deprecated/],
  '/components/display/examples/': [/component p-display is deprecated/],
  // TODO Code example previews load images relative to the page. Remove once #4800 resolves them in toPreview.
  '/components/button-tile/examples/': [/status of 404 .*\/assets\/lights\.jpg$/],
  '/components/link-tile/examples/': [/status of 404 .*\/assets\/lights\.jpg$/],
  '/components/multi-select/examples/': [/status of 404 .*\/assets\/(718|911|cayenne|macan|panamera|taycan)\.png$/],
  '/components/table/examples/': [/status of 404 .*\/assets\/(718|911|macan|panamera|taycan)\.png$/],
};

test('should have no exponential increase in internal urls', () => {
  expect(internalUrls.filter((url) => !isExampleUrl(url)).length).toBeLessThanOrEqual(600);
});

// TODO: Add markdown anchor links check?
for (const [url, index] of internalUrls.map<[string, number]>((url, i) => [url, i])) {
  test(`should load without errors at (${index + 1}/${internalUrls.length}) "${url}"`, async ({ page }) => {
    const response = await page.goto(url);
    // match static files in public/assets directory, and the examples in public/examples
    if (url.match(/^\/assets\/.*\.\w{3,4}$/) || isExampleUrl(url)) {
      expect(response?.status()).toBe(200);
      if (isExampleUrl(url)) {
        await waitForComponentsHydrated(page);
      }
    } else {
      if (url !== '/') {
        await expect(page.locator('#main-content > p-heading').first()).not.toHaveText('404');
      }
      await page.evaluate(() => (window as any).componentsReady());
    }

    const consoleMessages = (await page.consoleMessages())
      .filter((message) => ['error', 'warning'].includes(message.type()))
      .map((message) => ({ text: message.text(), url: message.location().url }))
      .filter((message) => !expectedConsole[url]?.some((pattern) => pattern.test(`${message.text} ${message.url}`)));
    const pageErrors = (await page.pageErrors()).map((error) => error.stack || error.message);
    expect.soft(consoleMessages, 'console errors and warnings').toEqual([]);
    expect.soft(pageErrors, 'page errors').toEqual([]);
  });
}
