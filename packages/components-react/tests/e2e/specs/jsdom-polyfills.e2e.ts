import { Page } from 'puppeteer';
import path from 'path';
import * as fs from 'fs';
import { selectNode } from '../helpers';
import { browser } from '../config';

const getOverviewContent = (): string => {
  const componentsJsEntry = require.resolve('@porsche-design-system/components-js');
  const pagesDirectory = path.resolve(componentsJsEntry, '../../../src/pages');
  const filePath = path.resolve(pagesDirectory, 'overview.html');

  return fs.readFileSync(filePath, 'utf8');
};

const getJsdomPolyfillBuild = (): string => {
  const componentsReactEntry = require.resolve('@porsche-design-system/components-react');
  const filePath = path.resolve(componentsReactEntry, '../jsdom-polyfill/index.js');

  return fs.readFileSync(filePath, 'utf8');
};

const getComponentsJsBuild = (): string => {
  return fs.readFileSync(require.resolve('@porsche-design-system/components-js'), 'utf8');
};

const setContentWithJsdomPolyfillBuild = async (page: Page): Promise<void> => {
  await page.setContent(
    `<!DOCTYPE html>
<html>
  <head>
    <base href="http://localhost:3000"> <!-- NOTE: we need a base tag so that document.baseURI returns something else than "about:blank" -->
    <script>${getJsdomPolyfillBuild()}</script>
    <script>${getComponentsJsBuild()}</script>
  </head>
  <body></body>
</html>`,
    { waitUntil: 'networkidle0' }
  );
};

describe('jsdom polyfill', () => {
  let page: Page;
  let requests: string[] = [];

  beforeEach(async () => {
    page = await browser.newPage();
    requests = [];
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
    await setContentWithJsdomPolyfillBuild(page);

    const markup = getOverviewContent();

    await page.evaluate(async (overviewPage) => {
      (window as any).PDS_SKIP_FETCH = true;
      document.body.innerHTML = overviewPage;
      await (window as any).porscheDesignSystem.componentsReady();
    }, markup);

    const button = await selectNode(page, 'p-button');

    expect(await button.evaluate((x) => x.shadowRoot !== null))
      .withContext('Shadowroot is defined')
      .toBeTrue();

    if (requests.length > 0) {
      console.log('HTTP Requests:', requests);
    }
    expect(requests.length).withContext('Request count').toBe(0);
  });

  it('should have cdn requests', async () => {
    await setContentWithJsdomPolyfillBuild(page);

    const markup = getOverviewContent();

    await page.evaluate(async (overviewPage) => {
      (window as any).PDS_SKIP_FETCH = false;
      document.body.innerHTML = overviewPage;
      await (window as any).porscheDesignSystem.componentsReady();
    }, markup);

    expect(requests.length).withContext('Request count').toBeGreaterThan(0);
  });
});
