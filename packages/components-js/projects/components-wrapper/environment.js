const path = require('path');
const { version } = require('./package.json');

const isDev = process.env.PORSCHE_DESIGN_SYSTEM_DEV === '1';
console.log('Environment:', isDev ? 'dev' : 'prod');

module.exports = {
  deployUrl: isDev ? 'http://localhost:3001/components' : 'https://cdn.ui.porsche.com/porsche-design-system/components',
  cdnDistPath: path.resolve('./dist/components'),
  npmDistPath: path.resolve('./dist/components-wrapper'),
  version: version,
  snakeCaseVersion: version.replace(/\.|-/g, '_')
};
