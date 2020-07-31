const assets = require('@porsche-design-system/assets');

const cdnBaseUrl = assets.FONTS_CDN_BASE_URL;
const fontsObject = assets.FONTS_MANIFEST;

const objectLength = Object.keys(fontsObject).length;
const objectKeys = Object.keys(fontsObject);

const getNestedObject = (nestedObj, pathArr) => {
  return pathArr.reduce((obj, key) =>
    (obj && obj[key] !== 'undefined') ? obj[key] : undefined, nestedObj);
};

let linkArray = [];

for (let i = 0; i < objectLength; i++) {
  const key = objectKeys[i];
  const woff = getNestedObject(fontsObject, [key, 'woff']);
  const woff2 =  getNestedObject(fontsObject, [key, 'woff2']);

  const linkWoff = `<link rel="preload" href="${cdnBaseUrl}/${woff}" as="font" type="font/woff2" crossorigin>`;
  const linkWoff2 = `<link rel="preload" href="${cdnBaseUrl}/${woff2}" as="font" type="font/woff2" crossorigin>`;

  linkArray.push(linkWoff, linkWoff2);
}

// ToDo: export const with hashed font-face.min.css in Asset package and load it here

console.log(`
Ever wondered how to fix flash of unstyled text? We got the solution. Wait for the porscheDesignSystemReady event before rendering your app
and copy all needed link tags into the head of your static 'index.html'. Boom, no flash of unstyled content anymore.

Stylesheet:
<link rel="preload" href="${cdnBaseUrl}/font-face.min.css" as="style" onload="this.rel='stylesheet'">

Pick all woff or woff2 files:
${linkArray.join('\n')}

For further documentation visit https://designsystem.porsche.com/v1/#/helpers/flash-of-unstyled-content
`);
