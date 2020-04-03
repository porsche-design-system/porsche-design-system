const fs = require('fs');
const path = require('path');
const icons = require('@porsche-design-system/icons');

const iconNames = Object.keys(icons.svg).sort().map(icon => `'${icon}'`);
const file = path.normalize('./src/types.d.ts');
const types = fs.readFileSync(file).toString().replace(/\s\/\* Auto Generated Below \*\/.*/s, '');

fs.writeFileSync(file,
  `${types}
/* Auto Generated Below */\n
export type IconName = ${iconNames.join("\n| ")};`
);
