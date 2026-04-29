import * as fs from 'node:fs';
import * as path from 'node:path';
import * as crypto from 'crypto';
import { CDN_BASE_PATH_STYLES } from '../../../../../cdn.config';
import type { GetMinifiedPorscheNextFontFaceCssOptions } from './fontFaceStyles';
import { getMinifiedPorscheNextFontFaceCss } from './fontFaceStyles';

const toHash = (str: string): string => {
  return crypto.createHash('md5').update(str, 'utf8').digest('hex').substring(0, 7);
};

const buildFontFaceStylesheet = (opts: GetMinifiedPorscheNextFontFaceCssOptions): string => {
  const { cdn } = opts;
  const style = getMinifiedPorscheNextFontFaceCss({ cdn });
  const suffix = cdn === 'cn' ? '.cn' : '';
  const hash = cdn !== 'localhost' ? `.${toHash(style)}` : '';
  const targetDirectory = './dist/styles';
  const targetFilename = `font-face${suffix}${hash}.css`;
  const targetPath = path.normalize(`${targetDirectory}/${targetFilename}`);

  fs.mkdirSync(path.resolve(targetDirectory), { recursive: true });
  fs.writeFileSync(targetPath, style);

  return targetFilename;
};

const buildFontFaceManifest = (hashedFontFaceFilenameCom: string, hashedFontFaceFilenameCn: string): void => {
  const cdnFontFacePathCom = `${hashedFontFaceFilenameCom}`;
  const cdnFontFacePathCn = `${hashedFontFaceFilenameCn}`;

  const content = `export const CDN_BASE_PATH = '/${CDN_BASE_PATH_STYLES}';
export const FONT_FACE_CDN_FILE_COM = '${cdnFontFacePathCom}';
export const FONT_FACE_CDN_FILE_CN = '${cdnFontFacePathCn}';
`;

  const targetPath = path.normalize('./index.ts');

  fs.writeFileSync(targetPath, content);
};

const buildFontFace = (): void => {
  buildFontFaceStylesheet({ cdn: 'localhost' });
  const fontFaceFilenameCom = buildFontFaceStylesheet({ cdn: 'com' });
  const fontFaceFilenameCn = buildFontFaceStylesheet({ cdn: 'cn' });

  buildFontFaceManifest(fontFaceFilenameCom, fontFaceFilenameCn);
};

buildFontFace();
