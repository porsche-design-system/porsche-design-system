import { test } from '@playwright/test';
import { buildSitemap, getSitemap } from '../helpers';

test('should have complete sitemap.json', async ({ page }) => {
  test.setTimeout(2147483647);

  const oldUrls = getSitemap(); // reads fixture/sitemap.json
  const newUrls = await buildSitemap(page); // returns new result and writes results/sitemap.json

  expect(newUrls).toEqual(oldUrls);
});
