import {
  getBrowserSupportFallbackScript,
  getInitialStyles,
  getLoaderScript,
  getMetaTagsAndIconLinks,
} from '@porsche-design-system/components-js/partials';
import * as fs from 'fs';
import * as path from 'path';

const preparePartialResults = (): void => {
  const metaTagsAndIconLinksDemo = getMetaTagsAndIconLinks({ appTitle: 'TITLE_OF_YOUR_APP' });
  const initialStyles = getInitialStyles();

  const content = `/* Auto Generated File */

export const metaTagsAndIconLinksDemo = ${JSON.stringify(metaTagsAndIconLinksDemo)};
export const initialStyles = ${JSON.stringify(initialStyles)};
`;

  const targetFolder = '../src/lib';
  fs.mkdirSync(path.resolve(__dirname, targetFolder), { recursive: true });

  const targetFileName = 'partialResults.ts';
  const targetFilePath = path.resolve(__dirname, targetFolder, targetFileName);
  fs.writeFileSync(targetFilePath, content);

  console.log(`Generated: ${targetFolder}/${targetFileName}`);

  const indexHtmlFilePath = path.resolve(__dirname, '../public/index.html');
  const indexHtmlContent = fs.readFileSync(indexHtmlFilePath, 'utf8');

  const scriptHashes = [
    getLoaderScript({ format: 'sha256' }),
    getBrowserSupportFallbackScript({ format: 'sha256' }),
  ].join(' ');

  const connectUrls = [
    'https://*.algolia.net',
    'https://*.algolianet.com',
    'https://registry.npmjs.org/@porsche-design-system/components-js', // stackblitz bug report does a fetch call
  ].join(' ');

  // NOTE: getInitialStyles hash would be great to use but we need 'unsafe-inline' for all our inline styles and this can't be combined with a whitelisted hash
  // for img-src `data:` is needed for inline background images, e.g. for our checkbox-wrapper and radio-button-wrapper
  const cspMeta = `<meta http-equiv="Content-Security-Policy" content="default-src 'self' https://cdn.ui.porsche.com; style-src 'self' 'unsafe-inline' https://cdn.ui.porsche.com; script-src 'self' https://cdn.ui.porsche.com ${scriptHashes}; img-src 'self' https://cdn.ui.porsche.com https://porsche-design-system.github.io data:; connect-src 'self' ${connectUrls}" />`;
  console.log(cspMeta);

  const placeholder = '<!-- CSP_PLACEHOLDER -->';
  const newIndexHtmlContent = indexHtmlContent.replace(
    new RegExp(`${placeholder}\\n.+`),
    `${placeholder}\n    ${cspMeta}`
  );

  fs.writeFileSync(indexHtmlFilePath, newIndexHtmlContent);
};

preparePartialResults();
