import * as fs from 'fs';
import * as path from 'path';
import { ICONS_MANIFEST } from '@porsche-design-system/assets';
import { paramCase } from 'change-case';

const iconNames = Object.keys(ICONS_MANIFEST).sort().map((icon) => `'${paramCase(icon)}'`);
const file = path.normalize('./src/types.d.ts');
const types = fs.readFileSync(file, 'utf8').replace(/\s\/\* Auto Generated Below \*\/.*/s, '');

fs.writeFileSync(
  file,
  `${types}
/* Auto Generated Below */

export type IconName = ${iconNames.join('\n| ')};`
);
