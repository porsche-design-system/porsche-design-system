const fs = require('fs');
const path = require('path');
const sass = require('node-sass');
const tildeImporter = require('node-sass-tilde-importer');

const scssPath = path.resolve(__dirname, 'component-overview.scss');
const targetPath = path.resolve(__dirname, '../dist/component-overview.css');
const result = sass.renderSync({
  file: scssPath,
  importer: tildeImporter
});

fs.writeFileSync(targetPath, result.css);
