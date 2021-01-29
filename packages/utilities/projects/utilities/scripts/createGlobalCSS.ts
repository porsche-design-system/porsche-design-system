import * as fs from 'fs';
import * as path from 'path';
import { FONTS_MANIFEST } from '@porsche-design-system/fonts';
import { buildStyle } from './buildStyle';
import {
  CDN_BASE_URL,
  CDN_BASE_URL_CN,
  CDN_BASE_URL_DYNAMIC,
  CDN_BASE_PATH_STYLES,
  CDN_BASE_PATH_FONTS,
  CDN_KEY_TYPE_DEFINITION,
} from '../../../../../cdn.config';

const createGlobalCSS = async (cdn: string): Promise<void> => {
  fs.mkdirSync(path.resolve('./dist/styles'), { recursive: true });

  buildStyle({
    baseUrl: 'http://localhost:3001/fonts',
    fontsManifest: FONTS_MANIFEST,
    addContentBasedHash: false,
  });

  const fontFaceCdnFileName = buildStyle({
    baseUrl: `${CDN_BASE_URL}/${CDN_BASE_PATH_FONTS}`,
    fontsManifest: FONTS_MANIFEST,
    addContentBasedHash: true,
  });

  const fontFaceCdnFileNameCn = buildStyle({
    baseUrl: `${CDN_BASE_URL_CN}/${CDN_BASE_PATH_FONTS}`,
    fontsManifest: FONTS_MANIFEST,
    addContentBasedHash: true,
    suffix: 'cn',
  });

  // extract the condition from cdn config to use its result in a constant
  const cdnCondition = CDN_BASE_URL_DYNAMIC.substr(0, CDN_BASE_URL_DYNAMIC.lastIndexOf('?') - 1).slice(1);
  const cdnResult = `const isCdnCn = ${cdnCondition};`;
  const url = `${cdn.replace(
    cdnCondition,
    'isCdnCn'
  )} + (isCdnCn ? '${fontFaceCdnFileNameCn}' : '${fontFaceCdnFileName}')`;

  const targetFile = path.normalize('./src/js/index.ts');
  const separator = '\n/* Auto Generated Below */';

  const oldContent = fs.readFileSync(targetFile, 'utf8');
  const newContent = `${oldContent.substr(
    0,
    oldContent.indexOf(separator) > 0 ? oldContent.indexOf(separator) : undefined
  )}${separator}
${CDN_KEY_TYPE_DEFINITION}

${cdnResult}
export const FONT_FACE_CDN_URL = ${url};

/**
 * @deprecated since v1.1.0.
 * Please use FONT_FACE_CDN_URL instead.
 */
export const FONT_FACE_STYLE_CDN_URL = FONT_FACE_CDN_URL;`;

  fs.writeFileSync(targetFile, newContent);
};

(async (): Promise<void> => {
  const cdn = `${CDN_BASE_URL_DYNAMIC} + '/${CDN_BASE_PATH_STYLES}/'`;

  await createGlobalCSS(cdn).catch((e) => {
    console.error(e);
    process.exit(1);
  });
})();
