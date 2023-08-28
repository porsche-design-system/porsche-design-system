import type { Page, WaitForOptions } from 'puppeteer';
import { waitForComponentsReady } from '../../../e2e/puppeteer/helpers';
import { getInitialStyles } from '@porsche-design-system/components-js/partials';

type Options = WaitForOptions & {
  enableLogging?: boolean;
  injectIntoHead?: string;
};

export const setContentWithDesignSystem = async (page: Page, content: string, opts?: Options): Promise<void> => {
  const options: Options = {
    waitUntil: 'networkidle0',
    injectIntoHead: '',
    ...opts,
  };

  const initialStyles = getInitialStyles({ format: 'html' });
  // Unsupported media feature: hover
  const initialStylesWithoutMediaQuery = initialStyles
    .replace(/\@media\(hover\:hover\)\{/g, '')
    .replace(
      /a\:hover\{background-color\:rgba\(126,127,130,0.20\)\}\}/g,
      'a:hover{background-color:rgba(126,127,130,0.20)}'
    );

  // get rid of spaces as we do during static VRTs
  content = content.replace(/>(\s)*</g, '><');

  await page.setContent(
    `<!DOCTYPE html>
    <html>
      <head>
        <base href="http://localhost:8575"> <!-- NOTE: we need a base tag so that document.baseURI returns something else than "about:blank" -->
        <script type="text/javascript" src="http://localhost:8575/index.js"></script>
        <link rel="stylesheet" href="http://localhost:3001/styles/font-face.min.css">
        <link rel="stylesheet" href="assets/styles.css">
        ${initialStylesWithoutMediaQuery}
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
