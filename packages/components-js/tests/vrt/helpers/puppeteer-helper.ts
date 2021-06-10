import { Page, WaitForOptions } from 'puppeteer';
import { waitForComponentsReady } from '../../e2e/helpers';

type Options = WaitForOptions & { enableLogging?: boolean; injectIntoHead?: string };
const defaultOptions: Options = { waitUntil: 'networkidle0', injectIntoHead: '' };

export const setContentWithDesignSystem = async (page: Page, content: string, opts?: Options): Promise<void> => {
  const options: Options = { ...defaultOptions, ...opts };
  await page.setContent(
    `<!DOCTYPE html>
    <html>
      <head>
        <base href="http://localhost:8575"> <!-- NOTE: we need a base tag so that document.baseURI returns something else than "about:blank" -->
        <script type="text/javascript" src="http://localhost:8575/index.js"></script>
        <link rel="stylesheet" href="styles.css" />
        <link rel="stylesheet" href="styles-overrides.css" />
        ${options.injectIntoHead}
      </head>
      <body>
        <script type="text/javascript">porscheDesignSystem.load();</script>
        ${content}
      </body>
    </html>`,
    options
  );

  await waitForComponentsReady(page);
};
