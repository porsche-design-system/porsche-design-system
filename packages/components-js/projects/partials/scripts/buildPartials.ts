import '../../../../components/scripts/mockMutationObserver';

// patch window usage in cross imports from utils of components package via skeleton styles
// @ts-ignore
global.window = { matchMedia: () => undefined };
// patch document for supportsScrollBehavior in scrolling.ts
// @ts-ignore
global.document = { documentElement: { style: {} } };

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
import { generateBrowserSupportFallbackScriptPartial } from './generateBrowserSupportFallbackScriptPartial';
import { generateCookiesFallbackScriptPartial } from './generateCookiesFallbackScriptPartial';

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
    generateBrowserSupportFallbackScriptPartial(),
    generateCookiesFallbackScriptPartial(),
  ].join('\n\n');

  fs.mkdirSync(targetDirectory, { recursive: true });
  fs.writeFileSync(targetFile, content);
};

generatePartials().catch((e) => {
  console.error(e);
  process.exit(1);
});
