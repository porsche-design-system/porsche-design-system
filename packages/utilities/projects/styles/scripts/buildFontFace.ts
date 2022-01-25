import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import jss from 'jss';
import preset from 'jss-preset-default';
import { getPorscheNextFontFaceStyles } from '../src/font-face.jss';
import {
  CDN_BASE_URL,
  CDN_BASE_URL_CN,
  CDN_BASE_PATH_FONTS,
  CDN_KEY_TYPE_DEFINITION,
  CDN_BASE_PATH_STYLES,
  CDN_BASE_URL_CN_CONDITION,
} from '../../../../../cdn.config';

jss.setup(preset());

const toHash = (str: string): string => {
  return crypto.createHash('md5').update(str, 'utf8').digest('hex');
};

type Options = {
  baseUrl: string;
  addContentBasedHash: boolean;
  addSuffix?: string;
};

const buildFontFaceStylesheet = (opts: Options): string => {
  const { baseUrl, addContentBasedHash, addSuffix } = opts;

  const style = jss
    .createStyleSheet(getPorscheNextFontFaceStyles({ baseUrl }))
    .toString()
    // removes default '.' before class name, all unneeded whitespace, semi colons, escaping backslashes and new lines
    .replace(/\s\s+|\.\\(?=:)|[\n\\]+| (?={)|;(?=\s+})|(:|media)\s(?=.*;?)/g, '$1');

  const suffix = addSuffix ? `.${addSuffix}` : '';
  const hash = addContentBasedHash ? `.${toHash(style)}` : '';
  const targetDirectory = './dist/styles';
  const targetFilename = `font-face.min${suffix}${hash}.css`;
  const targetPath = path.normalize(`${targetDirectory}/${targetFilename}`);

  fs.mkdirSync(path.resolve(targetDirectory), { recursive: true });
  fs.writeFileSync(targetPath, style);

  return targetFilename;
};

const buildFontFaceManifest = (hashedFontFaceFilename: string, hashedFontFaceFilenameCn: string): void => {
  const cdnFontFacePath = `${CDN_BASE_URL}/${CDN_BASE_PATH_STYLES}/${hashedFontFaceFilename}`;
  const cdnFontFacePathCn = `${CDN_BASE_URL_CN}/${CDN_BASE_PATH_STYLES}/${hashedFontFaceFilenameCn}`;
  const content = `
${CDN_KEY_TYPE_DEFINITION}

export const FONT_FACE_CDN_URL = (${CDN_BASE_URL_CN_CONDITION} ? '${cdnFontFacePathCn}' : '${cdnFontFacePath}');
`;

  const targetDirectory = './src/lib';
  const targetPath = path.normalize(`${targetDirectory}/index.ts`);

  fs.mkdirSync(path.resolve(targetDirectory), { recursive: true });
  fs.writeFileSync(targetPath, content);
};

buildFontFaceStylesheet({ baseUrl: 'http://localhost:3001/fonts', addContentBasedHash: false });
const fontFaceFilename = buildFontFaceStylesheet({
  baseUrl: `${CDN_BASE_URL}/${CDN_BASE_PATH_FONTS}`,
  addContentBasedHash: true,
});
const fontFaceFilenameCn = buildFontFaceStylesheet({
  baseUrl: `${CDN_BASE_URL_CN}/${CDN_BASE_PATH_FONTS}`,
  addContentBasedHash: true,
  addSuffix: 'cn',
});

buildFontFaceManifest(fontFaceFilename, fontFaceFilenameCn);
