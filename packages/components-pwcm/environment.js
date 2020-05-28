const path = require('path');
const packageJson = require('./src/package.json');

const isDev = !!process.env.PORSCHE_DESIGN_SYSTEM_DEV;

module.exports = {
  deployUrl: isDev
    ? 'http://localhost:8576/dist/dev/cdn'
    : 'https://cdn.ui.porsche.com/porsche-design-system/pwcm',
  cdnDistPath: isDev
    ? path.resolve('./dist/dev/cdn')
    : path.resolve('./dist/p/cdn'),
  npmDistPath: isDev
    ? path.resolve('./dist/dev/npm')
    : path.resolve('./dist/p/npm'),
  version: packageJson.version,
  snakeCaseVersion: packageJson.version.replace(/\./g, '_')
};
