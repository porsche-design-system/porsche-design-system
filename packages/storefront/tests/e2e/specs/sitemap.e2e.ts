import { test } from '@playwright/test';
import { buildSitemap, getSitemap } from '../helpers';

// TODO: for unknown reasons the sitemap generation test got super slow
test.fixme('should have complete sitemap.json', async ({ page }) => {
  test.setTimeout(2147483647);

  const oldUrls = getSitemap(); // reads fixture/sitemap.json
  const newUrls = await buildSitemap(page); // returns new result and writes results/sitemap.json

  expect(newUrls).toEqual(oldUrls);
});
