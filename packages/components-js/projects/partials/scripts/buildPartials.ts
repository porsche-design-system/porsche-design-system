import '../../../../components/scripts/mockMutationObserver';

import * as fs from 'fs';
import * as path from 'path';
import { CDN_BASE_URL, CDN_BASE_URL_CN } from '../../../../../cdn.config';
import { generateFontFaceStylesheetPartial } from './generateFontFaceStylesheetPartial';
import { generateInitialStylesPartial } from './generateInitialStylesPartial';
import { generateFontLinksPartial } from './generateFontLinksPartial';
import { generateComponentChunkLinksPartial } from './generateComponentChunkLinksPartial';
import { generateIconLinksPartial } from './generateIconLinksPartial';
import { generateMetaTagsAndIconLinksPartial } from './generateMetaTagsAndIconLinksPartial';
import { generateLoaderScriptPartial } from './generateLoaderScriptPartial';
import { generateBrowserSupportScriptPartial } from './generateBrowserSupportScriptPartial';
import { generateCookieSupportScriptPartial } from './generateCookieSupportScriptPartial';

const generateSharedCode = (): string => {
  return `import type { Cdn, Format } from '../shared';
import { throwIfRunInBrowser } from '../shared';

const getCdnBaseUrl = (cdn: Cdn): string => (cdn === 'cn' ? '${CDN_BASE_URL_CN}' : '${CDN_BASE_URL}');`;
};

const generatePartials = async (): Promise<void> => {
  const targetDirectory = path.normalize('./src/lib');
  const targetFile = path.resolve(targetDirectory, 'partials.tsx');

  const content = [
    generateSharedCode(),
    generateFontFaceStylesheetPartial(),
    generateInitialStylesPartial(),
    generateFontLinksPartial(),
    generateComponentChunkLinksPartial(),
    generateMetaTagsAndIconLinksPartial(),
    generateIconLinksPartial(),
    generateLoaderScriptPartial(),
    generateBrowserSupportScriptPartial(),
    generateCookieSupportScriptPartial(),
  ].join('\n\n');

  fs.mkdirSync(targetDirectory, { recursive: true });
  fs.writeFileSync(targetFile, content);
};

generatePartials().catch((e) => {
  console.error(e);
  process.exit(1);
});
