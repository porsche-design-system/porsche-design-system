const path = require('path');
const packageJson = require('./projects/components-wrapper/package.json');

const isDev = process.env.PORSCHE_DESIGN_SYSTEM_DEV === '1';

module.exports = {
  deployUrl: isDev
    ? 'http://localhost:8576/data'
    : 'https://cdn.ui.porsche.com/porsche-design-system/components',
  cdnDistPath: path.resolve('./dist/cdn/data'),
  cdnBasePath: path.resolve('./dist/cdn'),
  npmDistPath: path.resolve('./dist/components-wrapper'),
  version: packageJson.version,
  snakeCaseVersion: packageJson.version.replace(/\.|-/g, '_')
};
