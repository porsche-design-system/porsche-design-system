import { Page } from 'puppeteer';
import * as fs from 'fs';
import { getBrowser } from './setup';

export const setContentWithDesignSystem = async (
  page: Page,
  content: string,
  cdn: 'auto' | 'cn' = 'auto'
): Promise<void> => {
  // inject the web components manager inline
  const indexJsFile = require.resolve('@porsche-design-system/components-js');
  const indexJsCode = fs.readFileSync(indexJsFile).toString();

  await page.setContent(
    `
      <head>
        <base href="https://porsche.com"> <!-- NOTE: we need a base tag so that document.baseURI returns something else than "about:blank" -->
        <script type="text/javascript">${indexJsCode}</script>
      </head>
      <body>
        <script type="text/javascript">
          PORSCHE_DESIGN_SYSTEM_CDN = '${cdn}';
          porscheDesignSystem.load();
        </script>
        ${content}
      </body>
    `,
    { waitUntil: 'networkidle0' }
  );
  await page.waitForSelector('html.hydrated');
};

export const requests: { url: string }[] = [];
export const responses: { url: string; status: number }[] = [];

export const setRequestInterceptor = async (page: Page) => {
  await page.setRequestInterception(true);

  requests.length = 0;
  responses.length = 0;

  page.removeAllListeners('request');
  page.removeAllListeners('response');

  page.on('request', (req) => {
    const url = req.url();

    if (url.includes('cdn.ui.porsche')) {
      requests.push({ url });
    }
    req.continue();
  });

  page.on('response', (resp) => {
    const url = resp.url();
    const status = resp.status();

    if (url.includes('cdn.ui.porsche')) {
      responses.push({ url, status });
    }
  });
};
