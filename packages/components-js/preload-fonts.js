const assets = require('@porsche-design-system/assets');

const cdnBaseUrl = assets.FONTS_CDN_BASE_URL;
const fontsObject = assets.FONTS_MANIFEST;
const cdnFontsCssFile = assets.FONTS_CDN_CSS_FILE_URL;
const flatFontsObject = Object.values(fontsObject)
  .map(Object.values)
  .flat();
const linkArray = flatFontsObject.map(
  (x) => `<link rel="preload" href="${cdnBaseUrl}/${x}" as="font" type="font/woff2" crossorigin>`
);

// ToDo: export const with hashed font-face.min.css in Asset package and load it here

console.log(`
Ever wondered how to fix flash of unstyled text? We got the solution. Wait for the porscheDesignSystemReady event before rendering your app
and copy all needed link tags into the head of your static 'index.html'. Boom, no flash of unstyled content anymore.

Stylesheet:
<link rel="preload" href="${cdnFontsCssFile}" as="style" onload="this.rel='stylesheet'">

Pick all woff or woff2 files:
${linkArray.join('\n')}

For further documentation visit https://designsystem.porsche.com/v1/#/helpers/flash-of-unstyled-content
`);
