import { Page } from 'puppeteer';
import * as fs from 'fs';

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
