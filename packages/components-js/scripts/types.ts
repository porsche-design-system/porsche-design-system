import * as fs from 'fs';
import * as path from 'path';
import * as icons from '@porsche-design-system/icons';

const iconNames = Object.keys(icons.SVG_MANIFEST).sort().map(icon => `'${icon}'`);
const file = path.normalize('./src/types.d.ts');
const types = fs.readFileSync(file, 'utf8').replace(/\s\/\* Auto Generated Below \*\/.*/s, '');

fs.writeFileSync(file,
  `${types}
/* Auto Generated Below */

export type IconName = ${iconNames.join("\n| ")};`
);
