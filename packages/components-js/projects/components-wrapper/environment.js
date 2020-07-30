const path = require('path');
const packageJson = require('./package.json');

const isDev = process.env.PORSCHE_DESIGN_SYSTEM_DEV === '1';

module.exports = {
  deployUrl: isDev
    ? 'http://localhost:3001/components'
    : 'https://cdn.ui.porsche.com/porsche-design-system/components',
  cdnDistPath: path.resolve('./dist/components'),
  npmDistPath: path.resolve('./dist/components-wrapper'),
  version: packageJson.version,
  snakeCaseVersion: packageJson.version.replace(/\.|-/g, '_')
};
