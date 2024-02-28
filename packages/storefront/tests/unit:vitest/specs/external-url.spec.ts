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

const describeIf = (condition: boolean) => (condition ? describe : describe.skip);
const testIf = (condition: boolean) => (condition ? test : test.skip);

describe('urls', () => {
  for (const url of getSitemap()) {
    describe(`"${url}"`, () => {
      testIf(url !== '/')('should not end with trailing slash', async () => {
        expect(url.endsWith('/')).toBe(false);
      });

      describeIf(!url.startsWith('/'))('external url', () => {
        test('should not use unencrypted http protocol', async () => {
          expect(url.startsWith('http://')).toBe(false);
        });

        // Although it should be reachable without "www.", https://wechat.com is not.
        testIf(url !== 'https://www.wechat.com')('should not contain "www."', async () => {
          expect(url.startsWith('https://www.')).toBe(false);
        });

        test('should be reachable', async () => {
          const { status } = await fetch(url);

          switch (url) {
            case 'https://reddit.com':
            case 'https://figma.com/file/0GbGhymVN01gdkpWBTv8wS/Overview-%26-Key-Screens?node-id=235%3A6014&t=HmQ6ZStK7BiIj6EW-1':
              expect(status).toBe(403); // 403 Forbidden
              break;
            case 'https://vmmedia.porsche.de':
              expect(status).toBe(401); // 401 Unauthorized
              break;
            case 'https://twitter.com':
              expect(status).toBe(400); // 400 Bad Request
              break;
            default:
              expect(status).toBe(200); // 200: OK
          }
        });
      });
    });
  }
});
