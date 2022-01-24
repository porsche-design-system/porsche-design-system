import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import jss from 'jss';
import preset from 'jss-preset-default';
import { getPorscheNextFontFaceStyles } from '../src/font-face';
import {
  CDN_BASE_URL,
  CDN_BASE_URL_CN,
  CDN_BASE_PATH_FONTS,
  CDN_BASE_URL_DYNAMIC,
  CDN_KEY_TYPE_DEFINITION,
  CDN_BASE_PATH_STYLES,
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

const buildFontFaceManifest = (fontFaceCdnFileName: string, fontFaceCdnFileNameCn: string): void => {
  const cdn = `${CDN_BASE_URL_DYNAMIC} + '/${CDN_BASE_PATH_STYLES}/'`;
  // extract the condition from cdn config to use its result in a constant
  const cdnCondition = CDN_BASE_URL_DYNAMIC.substr(0, CDN_BASE_URL_DYNAMIC.lastIndexOf('?') - 1).slice(1);
  const cdnResult = `const isCdnCn = ${cdnCondition};`;
  const url = `${cdn.replace(
    cdnCondition,
    'isCdnCn'
  )} + (isCdnCn ? '${fontFaceCdnFileNameCn}' : '${fontFaceCdnFileName}')`;

  const content = `
${CDN_KEY_TYPE_DEFINITION}

${cdnResult}
export const FONT_FACE_CDN_URL = ${url};
`;

  const targetDirectory = './src/lib';
  const targetPath = path.normalize(`${targetDirectory}/index.ts`);

  fs.mkdirSync(path.resolve(targetDirectory), { recursive: true });
  fs.writeFileSync(targetPath, content);
};

buildFontFaceStylesheet({ baseUrl: 'http://localhost:3001/fonts', addContentBasedHash: false });
const fontFaceCdnFileName = buildFontFaceStylesheet({
  baseUrl: `${CDN_BASE_URL}/${CDN_BASE_PATH_FONTS}`,
  addContentBasedHash: true,
});
const fontFaceCdnFileNameCn = buildFontFaceStylesheet({
  baseUrl: `${CDN_BASE_URL_CN}/${CDN_BASE_PATH_FONTS}`,
  addContentBasedHash: true,
  addSuffix: 'cn',
});

buildFontFaceManifest(fontFaceCdnFileName, fontFaceCdnFileNameCn);
