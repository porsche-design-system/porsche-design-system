'use strict';

const sass = require('node-sass');
const configFile = require('./config');
const fs = require('fs-extra');
const path = require('path');
const tildeImporter = require('node-sass-tilde-importer');

let env = process.env.NODE_ENV || 'development';
let config = configFile[process.env.BUILD_TYPE || 'stylesheet'][env];
config.importer = tildeImporter;

let result = sass.renderSync(config);

if (result.css) {
  fs.outputFile(path.resolve(config.outFile), result.css);
}

if (result.map) {
  fs.outputFile(`${path.resolve(config.outFile)}.map`, result.map);
}

fs.copy('./src/base/font/porsche-next-latin/', './dist/porsche-next-latin/', (error) => {
  if (error) return console.error(error);
});

fs.copy('./src/base/font/porsche-next-cyril/', './dist/porsche-next-cyril/', (error) => {
  if (error) return console.error(error);
});

fs.copy('./src/base/font/porsche-next-greek/', './dist/porsche-next-greek/', (error) => {
  if (error) return console.error(error);
});

fs.copy('./src/base/font/porsche-next-pashto/', './dist/porsche-next-pashto/', (error) => {
  if (error) return console.error(error);
});

fs.copy('./src/base/font/porsche-next-persian/', './dist/porsche-next-persian/', (error) => {
  if (error) return console.error(error);
});

fs.copy('./src/base/font/porsche-next-urdu/', './dist/porsche-next-urdu/', (error) => {
  if (error) return console.error(error);
});

fs.copy('./src/base/font/porsche-next-arabic/', './dist/porsche-next-arabic/', (error) => {
  if (error) return console.error(error);
});

fs.copy('./src/deprecated/icon-font/pag-iconfont/', './dist/pag-iconfont/', (error) => {
  if (error) return console.error(error);
});
