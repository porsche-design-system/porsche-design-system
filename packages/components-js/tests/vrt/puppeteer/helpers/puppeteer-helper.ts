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
    ${getInitialStyles()}
    ${options.injectIntoHead}
  </head>
  <body>
    ${content}
    <script type="text/javascript">porscheDesignSystem.load();</script>
  </body>
</html>`,
    options
  );

  await waitForComponentsReady(page);
};
