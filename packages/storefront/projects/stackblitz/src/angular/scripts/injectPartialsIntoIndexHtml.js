const fs = require('node:fs');
const path = require('node:path');
const {
  getComponentChunkLinks,
  getFontLinks,
  getIconLinks,
  getLoaderScript,
  getMetaTagsAndIconLinks,
} = require('@porsche-design-system/components-angular/partials');

const REGEX_HEAD = /<\/head>/;
const REGEX_BODY = /<\/body>/;

// The stock @angular/build:application builder has no index transform hook, so instead of the Vite
// plugin the other sandboxes use, the partials are injected into a generated copy of index.html that
// angular.json points at as its index input.
const inputPath = path.resolve(__dirname, '../src/index.html');
const outputDir = path.resolve(__dirname, '../.generated');

const headPartials = [
  getFontLinks(),
  getComponentChunkLinks(),
  getIconLinks(),
  getMetaTagsAndIconLinks({ appTitle: 'Example' }),
].join('');

const bodyPartials = [getLoaderScript()].join('');

const html = fs.readFileSync(inputPath, 'utf-8');

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(
  path.join(outputDir, 'index.html'),
  html.replace(REGEX_HEAD, `${headPartials}$&`).replace(REGEX_BODY, `${bodyPartials}$&`),
  'utf-8'
);
