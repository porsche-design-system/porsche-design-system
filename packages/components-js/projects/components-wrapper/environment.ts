import * as path from 'path';
import { CDN_BASE_PATH_COMPONENTS } from '../../../../cdn.config';
import { version } from './package.json';

const isDev = process.env.PORSCHE_DESIGN_SYSTEM_DEV === '1';

export const deployUrl = isDev ? 'http://localhost:3001/components' : `./assets/${CDN_BASE_PATH_COMPONENTS}`; // placeholder is replaced via replaceCdnBaseUrlDynamicPlaceholder.ts script

const packageDir = path.resolve(__dirname, '../..');
export const cdnDistPath = path.resolve(packageDir, 'dist/components');
export const npmDistPath = path.resolve(packageDir, 'dist/components-wrapper');
export const npmDistTmpSubPath = 'dist/components-tmp';
export const npmDistTmpPath = path.resolve(packageDir, npmDistTmpSubPath);

export { version } from './package.json';
export const snakeCaseVersion = version.replace(/\.|-/g, '_');
