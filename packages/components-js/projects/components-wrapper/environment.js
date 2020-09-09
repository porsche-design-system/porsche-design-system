import {CDN_BASE_PATH_COMPONENTS, CDN_BASE_URL} from '../../../../cdn.config';

const path = require('path');
const { version } = require('./package.json');

const isDev = process.env.PORSCHE_DESIGN_SYSTEM_DEV === '1';
console.log('Environment:', isDev ? 'dev' : 'prod');

module.exports = {
  deployUrl: isDev ? 'http://localhost:3001/components' : `${CDN_BASE_URL}/${CDN_BASE_PATH_COMPONENTS}`,
  cdnDistPath: path.resolve('./dist/components'),
  npmDistPath: path.resolve('./dist/components-wrapper'),
  version: version,
  snakeCaseVersion: version.replace(/\.|-/g, '_')
};
