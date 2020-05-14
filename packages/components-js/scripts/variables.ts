import * as fs from 'fs';
import * as path from 'path';
import { CDN_BASE_URL, FONTS_MANIFEST } from '@porsche-design-system/fonts';

const file = path.normalize('./src/styles/font-face.variables.scss');

fs.writeFileSync(file,
  `/* Auto Generated Below */

$p-font-porsche-next-w-la-thin-woff: '${CDN_BASE_URL}/${FONTS_MANIFEST.porscheNextWLaThin.woff}';
$p-font-porsche-next-w-la-thin-woff2: '${CDN_BASE_URL}/${FONTS_MANIFEST.porscheNextWLaThin.woff2}';
$p-font-porsche-next-w-la-regular-woff: '${CDN_BASE_URL}/${FONTS_MANIFEST.porscheNextWLaRegular.woff}';
$p-font-porsche-next-w-la-regular-woff2: '${CDN_BASE_URL}/${FONTS_MANIFEST.porscheNextWLaRegular.woff2}';
$p-font-porsche-next-w-la-semi-bold-woff: '${CDN_BASE_URL}/${FONTS_MANIFEST.porscheNextWLaSemiBold.woff}';
$p-font-porsche-next-w-la-semi-bold-woff2: '${CDN_BASE_URL}/${FONTS_MANIFEST.porscheNextWLaSemiBold.woff2}';
$p-font-porsche-next-w-la-bold-woff: '${CDN_BASE_URL}/${FONTS_MANIFEST.porscheNextWLaBold.woff}';
$p-font-porsche-next-w-la-bold-woff2: '${CDN_BASE_URL}/${FONTS_MANIFEST.porscheNextWLaBold.woff2}';

$p-font-porsche-next-w-gr-thin-woff: '${CDN_BASE_URL}/${FONTS_MANIFEST.porscheNextWGrThin.woff}';
$p-font-porsche-next-w-gr-thin-woff2: '${CDN_BASE_URL}/${FONTS_MANIFEST.porscheNextWGrThin.woff2}';
$p-font-porsche-next-w-gr-regular-woff: '${CDN_BASE_URL}/${FONTS_MANIFEST.porscheNextWGrRegular.woff}';
$p-font-porsche-next-w-gr-regular-woff2: '${CDN_BASE_URL}/${FONTS_MANIFEST.porscheNextWGrRegular.woff2}';
$p-font-porsche-next-w-gr-semi-bold-woff: '${CDN_BASE_URL}/${FONTS_MANIFEST.porscheNextWGrSemiBold.woff}';
$p-font-porsche-next-w-gr-semi-bold-woff2: '${CDN_BASE_URL}/${FONTS_MANIFEST.porscheNextWGrSemiBold.woff2}';
$p-font-porsche-next-w-gr-bold-woff: '${CDN_BASE_URL}/${FONTS_MANIFEST.porscheNextWGrBold.woff}';
$p-font-porsche-next-w-gr-bold-woff2: '${CDN_BASE_URL}/${FONTS_MANIFEST.porscheNextWGrBold.woff2}';

$p-font-porsche-next-w-cy-thin-woff: '${CDN_BASE_URL}/${FONTS_MANIFEST.porscheNextWCyThin.woff}';
$p-font-porsche-next-w-cy-thin-woff2: '${CDN_BASE_URL}/${FONTS_MANIFEST.porscheNextWCyThin.woff2}';
$p-font-porsche-next-w-cy-regular-woff: '${CDN_BASE_URL}/${FONTS_MANIFEST.porscheNextWCyRegular.woff}';
$p-font-porsche-next-w-cy-regular-woff2: '${CDN_BASE_URL}/${FONTS_MANIFEST.porscheNextWCyRegular.woff2}';
$p-font-porsche-next-w-cy-semi-bold-woff: '${CDN_BASE_URL}/${FONTS_MANIFEST.porscheNextWCySemiBold.woff}';
$p-font-porsche-next-w-cy-semi-bold-woff2: '${CDN_BASE_URL}/${FONTS_MANIFEST.porscheNextWCySemiBold.woff2}';
$p-font-porsche-next-w-cy-bold-woff: '${CDN_BASE_URL}/${FONTS_MANIFEST.porscheNextWCyBold.woff}';
$p-font-porsche-next-w-cy-bold-woff2: '${CDN_BASE_URL}/${FONTS_MANIFEST.porscheNextWCyBold.woff2}';`
);
