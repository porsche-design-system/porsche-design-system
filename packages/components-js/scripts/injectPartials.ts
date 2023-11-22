import * as fs from 'fs';
import * as path from 'path';
import {
  getComponentChunkLinks,
  getIconLinks,
  getInitialStyles,
  getFontLinks,
  getBrowserSupportFallbackScript,
  getCookiesFallbackScript,
} from '@porsche-design-system/components-js/partials';
import { COMPONENT_CHUNK_NAMES } from '../projects/components-wrapper';
import { ICON_NAMES } from '@porsche-design-system/assets';

const injectPartials = (): void => {
  const indexHtmlFilePath = path.resolve(__dirname, '../www/index.html');
  const oldContent = fs.readFileSync(indexHtmlFilePath, 'utf8');

  const headPartials = [
    getComponentChunkLinks({ components: [...COMPONENT_CHUNK_NAMES] }),
    getIconLinks({ icons: [...ICON_NAMES] }),
    getInitialStyles({ prefix: ['', 'my-prefix'] }),
    getFontLinks({ weights: ['regular', 'semi-bold', 'bold'] }),
  ]
    .join('\n')
    .replace(/https:\/\/cdn\.ui\.porsche\.com\/porsche-design-system/g, 'http://localhost:3001');

  const bodyPartials = [getBrowserSupportFallbackScript(), getCookiesFallbackScript()]
    .join('\n')
    .replace(/https:\/\/cdn\.ui\.porsche\.com\/porsche-design-system/g, 'http://localhost:3001');

  const newContent = oldContent.replace(/<\/head>/, `\n${headPartials}$&`).replace(/<\/body>/, `\n${bodyPartials}$&`);
  fs.writeFileSync(indexHtmlFilePath, newContent);
  console.log('Injected partials via injectPartials');
};

injectPartials();
