import { expect, test } from '@playwright/test';
import { buildSitemap, getSitemap } from '../helpers/sitemap';

const ONE_MINUTE_IN_MS = 60000;

// locally the run takes about 3-4 minutes, so we triple that for the pipeline
test.setTimeout(ONE_MINUTE_IN_MS * 13);

test.skip('should have complete sitemap.json', async ({ page }) => {
  const oldUrls = getSitemap(); // reads fixture/sitemap.json
  const newUrls = await buildSitemap(page); // returns new result and writes results/sitemap.json

  expect(newUrls).toEqual(oldUrls);
});
