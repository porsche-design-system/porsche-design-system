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

describe('url', () => {
  for (const url of getSitemap()) {
    describe(`"${url}"`, () => {
      test.skipIf(url === '/')('should not end with trailing slash', async () => {
        expect(url.endsWith('/')).toBe(false);
      });

      describe.runIf(url.startsWith('https://') || url.startsWith('http://'))('external url', () => {
        test('should not use unencrypted http protocol', async () => {
          expect(url.startsWith('http://')).toBe(false);
        });

        // Although it should be reachable without "www.", https://wechat.com is not.
        test.skipIf(url === 'https://www.wechat.com')('should not contain "www."', async () => {
          expect(url.startsWith('https://www.')).toBe(false);
        });

        test('should be reachable', async () => {
          const { status } = await fetch(url);

          switch (url) {
            case 'https://reddit.com':
              expect(status).toBe(403); // 403 Forbidden
              break;
            case 'https://vmmedia.porsche.de':
              expect([401, 429]).toContain(status); // 401 Unauthorized or 429 Too Many Requests
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
