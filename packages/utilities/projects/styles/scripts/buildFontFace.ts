import type { GetMinifiedPorscheNextFontFaceCssOptions } from './fontFaceStyles';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import {
  CDN_BASE_URL,
  CDN_BASE_URL_CN,
  CDN_KEY_TYPE_DEFINITION,
  CDN_BASE_PATH_STYLES,
  CDN_BASE_URL_CN_CONDITION,
} from '../../../../../cdn.config';
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
  const cdnFontFacePathCom = `${CDN_BASE_URL}/${CDN_BASE_PATH_STYLES}/${hashedFontFaceFilenameCom}`;
  const cdnFontFacePathCn = `${CDN_BASE_URL_CN}/${CDN_BASE_PATH_STYLES}/${hashedFontFaceFilenameCn}`;

  const content = [
    CDN_KEY_TYPE_DEFINITION,
    `export const FONT_FACE_CDN_URL = (${CDN_BASE_URL_CN_CONDITION} ? '${cdnFontFacePathCn}' : '${cdnFontFacePathCom}');`,
  ].join('\n\n');

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
