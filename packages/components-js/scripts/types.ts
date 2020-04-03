import * as fs from 'fs';
import * as path from 'path';
import * as icons from '@porsche-design-system/icons';

const iconNames = Object.keys(icons.svg).sort().map(icon => `'${icon}'`);
const file = path.normalize('./src/types.d.ts');
const types = fs.readFileSync(file).toString().replace(/\s\/\* Auto Generated Below \*\/.*/s, '');

fs.writeFileSync(file,
  `${types}
/* Auto Generated Below */\n
export type IconName = ${iconNames.join("\n| ")};`
);
