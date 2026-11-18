import { expect, test } from '@porsche-design-system/testing/playwright';
import { expectedConsoleByUrl } from '../../helpers/expectedConsole';
import { buildSitemap, getSitemap } from '../helpers/sitemap';

const ONE_MINUTE_IN_MS = 60000;

// The crawl opens every page in one test, so it expects what any page of the record logs.
test.use({
  expectedConsole: async ({ expectedConsole }, use) =>
    use([...expectedConsole, ...Object.values(expectedConsoleByUrl).flat()]),
});

// locally the run takes about 3-4 minutes, so we triple that for the pipeline
test.setTimeout(ONE_MINUTE_IN_MS * 13);

test('should have complete sitemap.json', async ({ page }) => {
  const oldUrls = getSitemap(); // reads fixture/sitemap.json
  const newUrls = await buildSitemap(page); // returns new result and writes results/sitemap.json

  expect(newUrls).toEqual(oldUrls);
});
