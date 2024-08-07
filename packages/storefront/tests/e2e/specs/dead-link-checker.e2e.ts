import { expect, type Page, test } from '@playwright/test';
import { getInternalUrls } from '../helpers';

const console = require('console'); // workaround for nicer logs

// TODO: move validateMarkdownLinks() test into unit test `url.spec.ts`
const validateMarkdownLinks = async (page: Page): Promise<void> => {
  const markdownLinks = await page.locator('.markdown [href]').all();
  const markdownHrefs: string[] = await Promise.all(
    markdownLinks.map((link) => link.evaluate((el) => el.getAttribute('href')))
  );

  const markdownHrefsStartingWithSlash = markdownHrefs.filter((url) => url.startsWith('/'));
  if (markdownHrefsStartingWithSlash.length) {
    console.error('Link(s) starting with "/" were found:', markdownHrefsStartingWithSlash);
  }
  expect(markdownHrefsStartingWithSlash.length).toBe(0);
};

const getHeadline = async (page: Page): Promise<string> => {
  const selector = '.vmark > h1';
  await page.waitForSelector(selector), { visible: true };
  return page.locator(selector).evaluate((el) => el.innerHTML);
};

const internalUrls = getInternalUrls();

test('should have no exponential increase in internal urls', () => {
  expect(internalUrls.length).toBeLessThanOrEqual(250);
});

for (const [url, index] of internalUrls.map<[string, number]>((url, i) => [url, i])) {
  test(`should have valid headline at (${index + 1}/${internalUrls.length}) "${url}"`, async ({ page }) => {
    const response = await page.goto(url);

    // match static files in public/assets directory
    if (url.match(/^\/assets\/.*\.\w{3,4}$/)) {
      expect(response.status()).toBe(200);
    } else {
      const heading =
        url === '/'
          ? 'first page'
          : url.startsWith('/patterns/forms/example/') || url.startsWith('/patterns/styles/example/')
            ? 'some pattern or style example standalone page'
            : await getHeadline(page);

      expect(heading).not.toContain('404');

      await validateMarkdownLinks(page);
    }
  });
}
