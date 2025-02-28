import * as fs from 'node:fs';
import * as path from 'node:path';
import { getInitialStyles, getMetaTagsAndIconLinks } from '@porsche-design-system/components-js/partials';

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
};

preparePartialResults();
