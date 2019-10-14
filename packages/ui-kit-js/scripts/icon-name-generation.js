const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

(async () => {
  const iconResponse = await fetch('https://cdn.ui.porsche.com/porsche-icons/icons.json');
  const iconData = await iconResponse.json();
  const iconNames = [];
  iconData.icons.forEach((icon) => {
    iconNames.push(`'${icon.id}'`);
  });
  const typeCode = `export type IconName = ${iconNames.join("\n | ")};`;
  const targetFile = path.join(__dirname, '../src/components/icon/icon/icon-name.ts');
  fs.writeFile(targetFile, typeCode, 'utf8', (err) => {
    if (err) throw err;
  });
})();



