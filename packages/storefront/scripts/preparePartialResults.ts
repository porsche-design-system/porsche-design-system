import {
  getFontFaceStylesheet,
  getInitialStyles,
  getLoaderScript,
  getMetaTagsAndIconLinks,
} from '@porsche-design-system/components-js/partials';
import * as fs from 'fs';
import * as path from 'path';

const preparePartialResults = (): void => {
  const codePenConfig = {
    css: getInitialStyles({ withoutTags: true }),
    css_external: getFontFaceStylesheet({ withoutTags: true }),
    js: getLoaderScript({ withoutTags: true }),
  };

  const metaTagsAndIconLinksDemo = getMetaTagsAndIconLinks({ appTitle: 'TITLE_OF_YOUR_APP' });

  const content = `/* Auto Generated File */

export const codePenConfig = ${JSON.stringify(codePenConfig, null, 2)};

export const metaTagsAndIconLinksDemo = ${JSON.stringify(metaTagsAndIconLinksDemo)};
`;

  const targetFile = path.resolve(__dirname, '../src/utils/partialResults.ts');
  fs.writeFileSync(targetFile, content);
};

preparePartialResults();
