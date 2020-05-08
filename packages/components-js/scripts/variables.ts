import * as fs from 'fs';
import * as path from 'path';
import { cdn, fonts } from '@porsche-design-system/fonts';

const file = path.normalize('./src/styles/font-face.variables.scss');

fs.writeFileSync(file,
  `/* Auto Generated Below */

$p-font-porsche-next-w-la-thin-woff: '${cdn}/${fonts.porscheNextWLaThin.woff}';
$p-font-porsche-next-w-la-thin-woff2: '${cdn}/${fonts.porscheNextWLaThin.woff2}';
$p-font-porsche-next-w-la-regular-woff: '${cdn}/${fonts.porscheNextWLaRegular.woff}';
$p-font-porsche-next-w-la-regular-woff2: '${cdn}/${fonts.porscheNextWLaRegular.woff2}';
$p-font-porsche-next-w-la-semi-bold-woff: '${cdn}/${fonts.porscheNextWLaSemiBold.woff}';
$p-font-porsche-next-w-la-semi-bold-woff2: '${cdn}/${fonts.porscheNextWLaSemiBold.woff2}';
$p-font-porsche-next-w-la-bold-woff: '${cdn}/${fonts.porscheNextWLaBold.woff}';
$p-font-porsche-next-w-la-bold-woff2: '${cdn}/${fonts.porscheNextWLaBold.woff2}';

$p-font-porsche-next-w-gr-thin-woff: '${cdn}/${fonts.porscheNextWGrThin.woff}';
$p-font-porsche-next-w-gr-thin-woff2: '${cdn}/${fonts.porscheNextWGrThin.woff2}';
$p-font-porsche-next-w-gr-regular-woff: '${cdn}/${fonts.porscheNextWGrRegular.woff}';
$p-font-porsche-next-w-gr-regular-woff2: '${cdn}/${fonts.porscheNextWGrRegular.woff2}';
$p-font-porsche-next-w-gr-semi-bold-woff: '${cdn}/${fonts.porscheNextWGrSemiBold.woff}';
$p-font-porsche-next-w-gr-semi-bold-woff2: '${cdn}/${fonts.porscheNextWGrSemiBold.woff2}';
$p-font-porsche-next-w-gr-bold-woff: '${cdn}/${fonts.porscheNextWGrBold.woff}';
$p-font-porsche-next-w-gr-bold-woff2: '${cdn}/${fonts.porscheNextWGrBold.woff2}';

$p-font-porsche-next-w-cy-thin-woff: '${cdn}/${fonts.porscheNextWCyThin.woff}';
$p-font-porsche-next-w-cy-thin-woff2: '${cdn}/${fonts.porscheNextWCyThin.woff2}';
$p-font-porsche-next-w-cy-regular-woff: '${cdn}/${fonts.porscheNextWCyRegular.woff}';
$p-font-porsche-next-w-cy-regular-woff2: '${cdn}/${fonts.porscheNextWCyRegular.woff2}';
$p-font-porsche-next-w-cy-semi-bold-woff: '${cdn}/${fonts.porscheNextWCySemiBold.woff}';
$p-font-porsche-next-w-cy-semi-bold-woff2: '${cdn}/${fonts.porscheNextWCySemiBold.woff2}';
$p-font-porsche-next-w-cy-bold-woff: '${cdn}/${fonts.porscheNextWCyBold.woff}';
$p-font-porsche-next-w-cy-bold-woff2: '${cdn}/${fonts.porscheNextWCyBold.woff2}';`
);
