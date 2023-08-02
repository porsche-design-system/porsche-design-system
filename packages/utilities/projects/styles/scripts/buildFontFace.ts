import type { GetMinifiedPorscheNextFontFaceCssOptions } from './fontFaceStyles';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import { CDN_KEY_TYPE_DEFINITION, CDN_BASE_PATH_STYLES, CDN_BASE_URL_DYNAMIC } from '../../../../../cdn.config';
import { getMinifiedPorscheNextFontFaceCss } from './fontFaceStyles';

const toHash = (str: string): string => {
  return crypto.createHash('md5').update(str, 'utf8').digest('hex');
};

const buildFontFaceStylesheet = (opts: GetMinifiedPorscheNextFontFaceCssOptions): string => {
  const { cdn } = opts;
  const style = getMinifiedPorscheNextFontFaceCss({ cdn });
  const suffix = cdn === 'cn' ? '.cn' : '';
  const hash = cdn !== 'localhost' ? `.${toHash(style)}` : '';
  const targetDirectory = './dist/styles';
  const targetFilename = `font-face.min${suffix}${hash}.css`;
  const targetPath = path.normalize(`${targetDirectory}/${targetFilename}`);

  fs.mkdirSync(path.resolve(targetDirectory), { recursive: true });
  fs.writeFileSync(targetPath, style);

  return targetFilename;
};

const buildFontFaceManifest = (hashedFontFaceFilenameCom: string, hashedFontFaceFilenameCn: string): void => {
  const cdnFontFacePathCom = `${hashedFontFaceFilenameCom}`;
  const cdnFontFacePathCn = `${hashedFontFaceFilenameCn}`;

  const content = `${CDN_KEY_TYPE_DEFINITION}

export const CDN_BASE_PATH = '/${CDN_BASE_PATH_STYLES}';
export const CDN_BASE_URL = ${CDN_BASE_URL_DYNAMIC} + CDN_BASE_PATH;
export const FONT_FACE_CDN_FILE_COM = '${cdnFontFacePathCom}';
export const FONT_FACE_CDN_FILE_CN = '${cdnFontFacePathCn}';
export const FONT_FACE_CDN_URL = CDN_BASE_URL + '/' + (${CDN_BASE_URL_DYNAMIC}.match(/\\.com$/) ? FONT_FACE_CDN_FILE_COM : FONT_FACE_CDN_FILE_CN);
`;

  const targetDirectory = './src';
  const targetPath = path.normalize(`${targetDirectory}/index.ts`);

  fs.mkdirSync(path.resolve(targetDirectory), { recursive: true });
  fs.writeFileSync(targetPath, content);
};

const buildFontFace = (): void => {
  buildFontFaceStylesheet({ cdn: 'localhost' });
  const fontFaceFilenameCom = buildFontFaceStylesheet({ cdn: 'com' });
  const fontFaceFilenameCn = buildFontFaceStylesheet({ cdn: 'cn' });

  buildFontFaceManifest(fontFaceFilenameCom, fontFaceFilenameCn);
};

buildFontFace();
