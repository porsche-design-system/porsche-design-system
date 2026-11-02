import { expect, test } from '@playwright/test';
import { getInternalUrls } from '../helpers/sitemap';

const internalUrls = getInternalUrls();

/** The patterns and templates `WebsiteViewer` frames: static files copied into `public/examples/`, not routes. */
const isExampleUrl = (url: string): boolean => url.startsWith('/examples/');

/** Console errors and warnings a page is expected to log, by url. Each entry says why. */
const expectedConsole: Record<string, RegExp[]> = {
  // The page documents the deprecated p-display component.
  '/components/display/configurator/': [/component p-display is deprecated/],
  '/components/display/examples/': [/component p-display is deprecated/],
  // TODO Code example previews load images relative to the page. Remove once #4800 resolves them in toPreview.
  '/components/button-tile/examples/': [/status of 404/],
  '/components/link-tile/examples/': [/status of 404/],
  '/components/multi-select/examples/': [/status of 404/],
  '/components/table/examples/': [/status of 404/],
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
    } else {
      if (url !== '/') {
        await expect(page.locator('#main-content > p-heading').first()).not.toHaveText('404');
      }
      await page.evaluate(() => (window as any).componentsReady());
    }

    const consoleMessages = (await page.consoleMessages())
      .filter((message) => ['error', 'warning'].includes(message.type()))
      .filter((message) => !expectedConsole[url]?.some((pattern) => pattern.test(message.text())))
      .map((message) => ({ text: message.text(), url: message.location().url }));
    const pageErrors = (await page.pageErrors()).map((error) => error.stack || error.message);
    expect.soft(consoleMessages, 'console errors and warnings').toEqual([]);
    expect.soft(pageErrors, 'page errors').toEqual([]);
  });
}
