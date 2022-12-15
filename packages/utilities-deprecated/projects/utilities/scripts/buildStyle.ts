import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import { FONTS_MANIFEST } from '@porsche-design-system/fonts';

type Options = {
  baseUrl: string;
  fontsManifest: typeof FONTS_MANIFEST;
  addContentBasedHash: boolean;
  suffix?: string;
};

const prepareFontFaceVariables = (opts: Options): void => {
  const { baseUrl, fontsManifest, suffix } = opts;
  const file = path.normalize(`./src/styles/font-face.variables${suffix ? '.' + suffix : ''}.scss`);

  fs.writeFileSync(
    file,
    `/* Auto Generated Below */

$p-font-porsche-next-w-la-thin-woff: '${baseUrl}/${fontsManifest.porscheNextWLaThin.woff}';
$p-font-porsche-next-w-la-thin-woff2: '${baseUrl}/${fontsManifest.porscheNextWLaThin.woff2}';
$p-font-porsche-next-w-la-regular-woff: '${baseUrl}/${fontsManifest.porscheNextWLaRegular.woff}';
$p-font-porsche-next-w-la-regular-woff2: '${baseUrl}/${fontsManifest.porscheNextWLaRegular.woff2}';
$p-font-porsche-next-w-la-semi-bold-woff: '${baseUrl}/${fontsManifest.porscheNextWLaSemiBold.woff}';
$p-font-porsche-next-w-la-semi-bold-woff2: '${baseUrl}/${fontsManifest.porscheNextWLaSemiBold.woff2}';
$p-font-porsche-next-w-la-bold-woff: '${baseUrl}/${fontsManifest.porscheNextWLaBold.woff}';
$p-font-porsche-next-w-la-bold-woff2: '${baseUrl}/${fontsManifest.porscheNextWLaBold.woff2}';

$p-font-porsche-next-w-gr-thin-woff: '${baseUrl}/${fontsManifest.porscheNextWGrThin.woff}';
$p-font-porsche-next-w-gr-thin-woff2: '${baseUrl}/${fontsManifest.porscheNextWGrThin.woff2}';
$p-font-porsche-next-w-gr-regular-woff: '${baseUrl}/${fontsManifest.porscheNextWGrRegular.woff}';
$p-font-porsche-next-w-gr-regular-woff2: '${baseUrl}/${fontsManifest.porscheNextWGrRegular.woff2}';
$p-font-porsche-next-w-gr-semi-bold-woff: '${baseUrl}/${fontsManifest.porscheNextWGrSemiBold.woff}';
$p-font-porsche-next-w-gr-semi-bold-woff2: '${baseUrl}/${fontsManifest.porscheNextWGrSemiBold.woff2}';
$p-font-porsche-next-w-gr-bold-woff: '${baseUrl}/${fontsManifest.porscheNextWGrBold.woff}';
$p-font-porsche-next-w-gr-bold-woff2: '${baseUrl}/${fontsManifest.porscheNextWGrBold.woff2}';

$p-font-porsche-next-w-cy-thin-woff: '${baseUrl}/${fontsManifest.porscheNextWCyThin.woff}';
$p-font-porsche-next-w-cy-thin-woff2: '${baseUrl}/${fontsManifest.porscheNextWCyThin.woff2}';
$p-font-porsche-next-w-cy-regular-woff: '${baseUrl}/${fontsManifest.porscheNextWCyRegular.woff}';
$p-font-porsche-next-w-cy-regular-woff2: '${baseUrl}/${fontsManifest.porscheNextWCyRegular.woff2}';
$p-font-porsche-next-w-cy-semi-bold-woff: '${baseUrl}/${fontsManifest.porscheNextWCySemiBold.woff}';
$p-font-porsche-next-w-cy-semi-bold-woff2: '${baseUrl}/${fontsManifest.porscheNextWCySemiBold.woff2}';
$p-font-porsche-next-w-cy-bold-woff: '${baseUrl}/${fontsManifest.porscheNextWCyBold.woff}';
$p-font-porsche-next-w-cy-bold-woff2: '${baseUrl}/${fontsManifest.porscheNextWCyBold.woff2}';`
  );
};

const toHash = (str: string): string =>
  crypto
    .createHash('md5')
    .update(str, 'utf8')
    .digest('hex');

const compileFontFaceScss = (opts: Options): string => {
  const sass = require('sass');

  const { addContentBasedHash, suffix } = opts;
  const scssPath = path.resolve(__dirname, '../src/styles/font-face.scss');

  // read raw css to replace import of font-face-variables for other cdn
  const rawScss = fs.readFileSync(scssPath, 'utf8');
  const result = sass.renderSync({
    data: suffix ? rawScss.replace(/(@import 'font-face.variables)(';)/, `$1.${suffix}$2`) : rawScss,
    includePaths: [path.resolve(__dirname, '../src/scss'), path.resolve(__dirname, '../src/styles')],
    outputStyle: 'compressed',
  });

  const hash = addContentBasedHash ? `.${toHash(result.css)}` : '';
  const filename = `font-face.min${suffix ? `.${suffix}` : ''}${hash}.css`;
  const targetPath = path.normalize(`./dist/styles/${filename}`);

  fs.writeFileSync(targetPath, result.css);

  return filename;
};

export function buildStyle(opts: Options): string {
  prepareFontFaceVariables(opts);
  return compileFontFaceScss(opts);
}
