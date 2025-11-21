import * as fs from 'node:fs';
import * as path from 'node:path';
import { describe, expect, test } from 'vitest';

const getSitemap = (): string[] => {
  const sitemapPath = path.resolve(__dirname, '../../e2e/fixtures/sitemap.json');
  const sitemapData = fs.readFileSync(sitemapPath, 'utf8');
  return JSON.parse(sitemapData);
};

describe.skip('url', () => {
  for (const url of getSitemap()) {
    describe(`"${url}"`, () => {
      // Since we are using trailingSlash: true in our next.config.js every link should end with a trailing slash
      test.skipIf(url === '/' || url.startsWith('http') || url.startsWith('/mailto:'))(
        'should end with trailing slash',
        () => {
          expect(url.endsWith('/')).toBe(true);
        }
      );

      describe.runIf(url.startsWith('https://') || url.startsWith('http://'))('external url', () => {
        test('should not use unencrypted http protocol', () => {
          expect(url.startsWith('http://')).toBe(false);
        });

        // Although it should be reachable without "www.", https://wechat.com is not.
        test.skipIf(url === 'https://www.wechat.com')('should not contain "www."', () => {
          expect(url.startsWith('https://www.')).toBe(false);
        });

        // TODO: Remove skipIf once website is loading normally again
        test.skipIf(url.includes('https://adrianroselli.com/'))('should be reachable', async () => {
          const { status } = await fetch(url);

          expect(status).not.toBe(404);
          expect(status).toBeLessThan(500);
        });
      });
    });
  }
});
