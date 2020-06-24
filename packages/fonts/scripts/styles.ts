import * as fs from 'fs';
import * as path from 'path';
import { CDN_BASE_URL, FONTS_MANIFEST } from '@porsche-design-system/fonts';
import crypto from 'crypto';

type Options = { isStaging: boolean };

const prepareFontFaceVariables = (opts?: Options): void => {
  const file = path.normalize('./src/styles/font-face.variables.scss');

  const baseUrl = opts?.isStaging ? 'http://localhost:3001' : CDN_BASE_URL;

  fs.writeFileSync(
    file,
    `/* Auto Generated Below */

$p-font-porsche-next-w-la-thin-woff: '${baseUrl}/${FONTS_MANIFEST.porscheNextWLaThin.woff}';
$p-font-porsche-next-w-la-thin-woff2: '${baseUrl}/${FONTS_MANIFEST.porscheNextWLaThin.woff2}';
$p-font-porsche-next-w-la-regular-woff: '${baseUrl}/${FONTS_MANIFEST.porscheNextWLaRegular.woff}';
$p-font-porsche-next-w-la-regular-woff2: '${baseUrl}/${FONTS_MANIFEST.porscheNextWLaRegular.woff2}';
$p-font-porsche-next-w-la-semi-bold-woff: '${baseUrl}/${FONTS_MANIFEST.porscheNextWLaSemiBold.woff}';
$p-font-porsche-next-w-la-semi-bold-woff2: '${baseUrl}/${FONTS_MANIFEST.porscheNextWLaSemiBold.woff2}';
$p-font-porsche-next-w-la-bold-woff: '${baseUrl}/${FONTS_MANIFEST.porscheNextWLaBold.woff}';
$p-font-porsche-next-w-la-bold-woff2: '${baseUrl}/${FONTS_MANIFEST.porscheNextWLaBold.woff2}';

$p-font-porsche-next-w-gr-thin-woff: '${baseUrl}/${FONTS_MANIFEST.porscheNextWGrThin.woff}';
$p-font-porsche-next-w-gr-thin-woff2: '${baseUrl}/${FONTS_MANIFEST.porscheNextWGrThin.woff2}';
$p-font-porsche-next-w-gr-regular-woff: '${baseUrl}/${FONTS_MANIFEST.porscheNextWGrRegular.woff}';
$p-font-porsche-next-w-gr-regular-woff2: '${baseUrl}/${FONTS_MANIFEST.porscheNextWGrRegular.woff2}';
$p-font-porsche-next-w-gr-semi-bold-woff: '${baseUrl}/${FONTS_MANIFEST.porscheNextWGrSemiBold.woff}';
$p-font-porsche-next-w-gr-semi-bold-woff2: '${baseUrl}/${FONTS_MANIFEST.porscheNextWGrSemiBold.woff2}';
$p-font-porsche-next-w-gr-bold-woff: '${baseUrl}/${FONTS_MANIFEST.porscheNextWGrBold.woff}';
$p-font-porsche-next-w-gr-bold-woff2: '${baseUrl}/${FONTS_MANIFEST.porscheNextWGrBold.woff2}';

$p-font-porsche-next-w-cy-thin-woff: '${baseUrl}/${FONTS_MANIFEST.porscheNextWCyThin.woff}';
$p-font-porsche-next-w-cy-thin-woff2: '${baseUrl}/${FONTS_MANIFEST.porscheNextWCyThin.woff2}';
$p-font-porsche-next-w-cy-regular-woff: '${baseUrl}/${FONTS_MANIFEST.porscheNextWCyRegular.woff}';
$p-font-porsche-next-w-cy-regular-woff2: '${baseUrl}/${FONTS_MANIFEST.porscheNextWCyRegular.woff2}';
$p-font-porsche-next-w-cy-semi-bold-woff: '${baseUrl}/${FONTS_MANIFEST.porscheNextWCySemiBold.woff}';
$p-font-porsche-next-w-cy-semi-bold-woff2: '${baseUrl}/${FONTS_MANIFEST.porscheNextWCySemiBold.woff2}';
$p-font-porsche-next-w-cy-bold-woff: '${baseUrl}/${FONTS_MANIFEST.porscheNextWCyBold.woff}';
$p-font-porsche-next-w-cy-bold-woff2: '${baseUrl}/${FONTS_MANIFEST.porscheNextWCyBold.woff2}';`
  );
};

const toHash = (str: string): string => {
  return crypto
    .createHash('md5')
    .update(str, 'utf8')
    .digest('hex');
};

const compileFontFaceScss = (opts?: Options): string => {
  const sass = require('node-sass');

  const scssPath = path.resolve(__dirname, '../src/styles/font-face.scss');
  const result = sass.renderSync({
    file: scssPath,
    outputStyle: 'compressed'
  });

  const hash = opts?.isStaging ? '' : `.${toHash(result.css)}`;
  const filename = `font-face.min${hash}.css`;
  const targetPath = path.normalize(`./dist/fonts/${filename}`);

  fs.writeFileSync(targetPath, result.css);

  return filename;
};

export function buildStyles(opts?: Options): string {
  prepareFontFaceVariables(opts);
  return compileFontFaceScss(opts);
}
