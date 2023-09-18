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

  const styleHashes = [getInitialStyles({ format: 'sha256' })].map((hash) => `'${hash}'`).join(' ');
  const scriptHashes = [getLoaderScript({ format: 'sha256' }), getBrowserSupportFallbackScript({ format: 'sha256' })]
    .map((hash) => `'${hash}'`)
    .join(' ');

  const cspMeta = `<meta http-equiv="Content-Security-Policy" content="default-src 'self' https://cdn.ui.porsche.com; style-src 'self' https://cdn.ui.porsche.com ${styleHashes}; script-src 'self' https://cdn.ui.porsche.com ${scriptHashes}"; connect-src 'self' https://*.algolia.net https://*.algolianet.com />`;
  console.log(cspMeta);

  const placeholder = '<!-- CSP_PLACEHOLDER -->';
  const newIndexHtmlContent = indexHtmlContent.replace(
    new RegExp(`${placeholder}\\n.+`),
    `${placeholder}\n    ${cspMeta}`
  );

  fs.writeFileSync(indexHtmlFilePath, newIndexHtmlContent);
};

preparePartialResults();
