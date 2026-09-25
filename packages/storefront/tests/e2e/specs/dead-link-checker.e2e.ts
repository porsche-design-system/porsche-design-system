import { expect, test } from '@playwright/test';
import { getInternalUrls } from '../helpers/sitemap';

const internalUrls = getInternalUrls();

/** The patterns and templates `WebsiteViewer` frames: static files copied into `public/examples/`, not routes. */
const isExampleUrl = (url: string): boolean => url.startsWith('/examples/');

test('should have no exponential increase in internal urls', () => {
  expect(internalUrls.filter((url) => !isExampleUrl(url)).length).toBeLessThanOrEqual(600);
});

// TODO: Add markdown anchor links check?
for (const [url, index] of internalUrls.map<[string, number]>((url, i) => [url, i])) {
  test(`should have valid headline at (${index + 1}/${internalUrls.length}) "${url}"`, async ({ page }) => {
    const response = await page.goto(url);
    // match static files in public/assets directory, and the examples in public/examples
    if (url.match(/^\/assets\/.*\.\w{3,4}$/) || isExampleUrl(url)) {
      expect(response?.status()).toBe(200);
    } else {
      if (url === '/') test.skip();
      await expect(page.locator('#main-content > p-heading').first()).not.toHaveText('404');
    }
  });
}
