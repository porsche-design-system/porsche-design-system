import {
  getMetaTagsAndIconLinks,
  getInitialStyles,
  getLoaderScript,
  getHashMap,
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

  getLoaderScript(); // identical call as in index.html, so it gets added to map
  getInitialStyles(); // identical call as in index.html, so it gets added to map
  const hashMap = getHashMap();
  console.log(hashMap);

  const indexHtmlFilePath = path.resolve(__dirname, '../public/index.html');
  const indexHtmlContent = fs.readFileSync(indexHtmlFilePath, 'utf8');

  const partialHashTuples = Object.entries(hashMap).map(([partial, hash]) => [partial.toLowerCase(), `'${hash}'`]);

  const styleHashes = partialHashTuples
    .filter(([partial]) => partial.includes('style'))
    .map(([, hash]) => hash)
    .flat()
    .join(' ');

  const scriptHashes = partialHashTuples
    .filter(([partial]) => partial.includes('script'))
    .map(([, hash]) => hash)
    .flat()
    .join(' ');

  const cspMeta = `<meta http-equiv="Content-Security-Policy" content="default-src 'self' https://cdn.ui.porsche.com; style-src 'self' https://cdn.ui.porsche.com ${styleHashes}; script-src 'self' https://cdn.ui.porsche.com ${scriptHashes}" />`;
  console.log(cspMeta);

  const placeholder = '<!-- CSP_PLACEHOLDER -->';
  const newIndexHtmlContent = indexHtmlContent.replace(
    new RegExp(`${placeholder}\\n.+`),
    `${placeholder}\n    ${cspMeta}`
  );

  fs.writeFileSync(indexHtmlFilePath, newIndexHtmlContent);
};

preparePartialResults();
