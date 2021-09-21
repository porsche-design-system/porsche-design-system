import { Page } from 'puppeteer';
import path from 'path';
import * as fs from 'fs';
import { selectNode } from '../helpers';
import { browser } from '../config';

const getOverviewContent = (): string => {
  const packagesDir = require.resolve('@porsche-design-system/components-js');
  const directory = path.resolve(packagesDir, '../../../src/pages');
  const filePath = path.resolve(directory, 'overview.html');

  return fs.readFileSync(filePath, 'utf8');
};

const getJsdomPolyfillBuild = (): string => {
  const directory = require.resolve('@porsche-design-system/components-react');
  const filePath = path.resolve(directory, '../jsdom-polyfill/index.js');

  return fs.readFileSync(filePath, 'utf8');
};

describe('jsdomEvents()', () => {
  let page: Page;
  let requests: string[] = [];

  beforeEach(async () => {
    page = await browser.newPage();

    await page.setRequestInterception(true);

    page.removeAllListeners('request');
    page.on('request', (request) => {
      const url = request.url();

      if (url.startsWith('http')) {
        requests.push(url);
      }
      request.continue();
    });
  });
  afterEach(async () => {
    await page.close();
  });

  it('should have no cdn requests', async () => {
    await page.setContent(
      `<!DOCTYPE html>
    <html>
      <head>
        <base href="http://localhost:8575"> <!-- NOTE: we need a base tag so that document.baseURI returns something else than "about:blank" -->
        <script>
          ${getJsdomPolyfillBuild()}
        </script>
      </head>
      <body>
      </body>
    </html>`,
      { waitUntil: 'networkidle0' }
    );

    const markup = getOverviewContent();

    await page.evaluate((overviewPage) => {
      (window as any).PDS_SKIP_FETCH = true;
      document.body.innerHTML = overviewPage;
    }, markup);

    const button = await selectNode(page, 'p-button');

    expect(await button.evaluate((x) => x.shadowRoot !== null))
      .withContext('Shadowroot is defined')
      .toBeTrue();

    console.log('HTTP Requests:', requests);
    expect(requests.length).toBe(0);
  });
});
