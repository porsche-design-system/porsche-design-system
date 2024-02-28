import { describe, test, expect } from 'vitest';
import * as url from 'url';
import * as fs from 'fs';
import * as path from 'path';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const getSitemap = (): string[] => {
  const sitemapPath = path.resolve(__dirname, '../../e2e/fixtures/sitemap.json');
  const sitemapData = fs.readFileSync(sitemapPath, 'utf8');
  return JSON.parse(sitemapData);
};

const getAllUrlsExceptRoot = (): string[] => {
  return getSitemap().filter((link) => link !== '/');
};

const getExternalUrls = (): string[] => {
  return getSitemap().filter((link) => !link.startsWith('/'));
};

describe('all urls except root ("/")', () => {
  for (const url of getAllUrlsExceptRoot()) {
    test(`should not end with trailing slash: "${url}"`, async () => {
      expect(url.slice(-1)).not.toBe('/');
    });
  }
});

describe('external urls', () => {
  for (const url of getExternalUrls()) {
    test(`should be reachable: "${url}"`, async () => {
      const { status } = await fetch(url);

      if (
        [
          'https://www.reddit.com',
          'https://www.figma.com/file/0GbGhymVN01gdkpWBTv8wS/Overview-%26-Key-Screens?node-id=235%3A6014&t=HmQ6ZStK7BiIj6EW-1',
        ].includes(url)
      ) {
        expect(status).toBe(403); // 403 Forbidden
      } else if (['https://vmmedia.porsche.de'].includes(url)) {
        expect(status).toBe(401); // 401 Unauthorized
      } else if (['https://www.twitter.com'].includes(url)) {
        expect(status).toBe(400); // 400 Bad Request
      } else {
        expect(status).toBe(200); // 200: OK
      }
    });
  }
});
