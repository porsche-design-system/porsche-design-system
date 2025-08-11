import { expect, test } from '@playwright/test';
import { getInternalUrls } from '../helpers/sitemap';

const internalUrls = getInternalUrls();

test('should have no exponential increase in internal urls', () => {
  expect(internalUrls.length).toBeLessThanOrEqual(493);
});

// TODO: Add markdown anchor links check?
for (const [url, index] of internalUrls.map<[string, number]>((url, i) => [url, i])) {
  test(`should have valid headline at (${index + 1}/${internalUrls.length}) "${url}"`, async ({ page }) => {
    const response = await page.goto(url);
    // match static files in public/assets directory
    if (url.match(/^\/assets\/.*\.\w{3,4}$/)) {
      expect(response?.status()).toBe(200);
    } else {
      if (url === '/') test.skip();
      await expect(page.locator('#main-content > p-display').first()).not.toHaveText('404');
    }
  });
}
