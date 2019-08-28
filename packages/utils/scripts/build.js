const fs = require('fs');
const path = require('path');
const sass = require('node-sass');
const tildeImporter = require('node-sass-tilde-importer');

const scssPath = path.resolve(__dirname, '../src/components-overview.scss');
const targetPath = path.resolve(__dirname, '../dist/components-overview.css');
const result = sass.renderSync({
  file: scssPath,
  importer: tildeImporter,
  outputStyle: 'compressed'
});

fs.writeFileSync(targetPath, result.css);
