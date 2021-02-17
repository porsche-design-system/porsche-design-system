import * as path from 'path';
import { CDN_BASE_PATH_COMPONENTS } from '../../../../cdn.config';
import { version } from './package.json';

const isDev = process.env.PORSCHE_DESIGN_SYSTEM_DEV === '1';
console.log('Environment:', isDev ? 'dev' : 'prod');

export const deployUrl = isDev
  ? 'http://localhost:3001/components'
  : `%%%CDN_BASE_URL_DYNAMIC%%%/${CDN_BASE_PATH_COMPONENTS}`; // placeholder is replaced via replace.ts script

export const cdnDistPath = path.resolve('./dist/components');
export const npmDistPath = path.resolve('./dist/components-wrapper');
export { version } from './package.json';
export const snakeCaseVersion = version.replace(/\.|-/g, '_');
