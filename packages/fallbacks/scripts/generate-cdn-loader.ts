import * as fs from 'fs';
import * as crypto from 'crypto';
import type { Fallbacks } from './utils';
import { FALLBACKS } from './utils';
import * as path from 'path';
import { CDN_BASE_PATH_FALLBACKS, CDN_BASE_URL_DYNAMIC, CDN_KEY_TYPE_DEFINITION } from '../../../cdn.config';

const inputDir = './dist/tmp';
const cdnPath = 'https://cdn.ui.porsche.com/fallbacks';
const outputDirFallbacks = './dist/fallbacks';
const outputDirLoader = './dist/loader';

type Manifest = {
  [fallback: string]: string;
};
let manifest: Manifest = {};

const createFreshDirectory = (dir: string): void => {
  fs.rmSync(dir, { force: true, recursive: true });
  fs.mkdirSync(dir, { recursive: true });
};

const toHash = (str: string): string => {
  return crypto.createHash('md5').update(str, 'utf8').digest('hex');
};

const generateCdnLoader = (fallback: Fallbacks): void => {
  const fileContentOverlay = fs.readFileSync(`${inputDir}/${fallback}.min.js`, 'utf8');
  const contentHashOverlay = toHash(fileContentOverlay);
  const targetFileNameOverlay = `${fallback}.${contentHashOverlay}.js`;
  const targetFilePathOverlay = `${outputDirFallbacks}/${targetFileNameOverlay}`;
  const targetCdnFilePathOverlay = `${cdnPath}/${targetFileNameOverlay}`;

  const fileContentLoader = fs.readFileSync(`${inputDir}/${fallback}-loader.min.js`, 'utf8');
  const newFileContentLoader = fileContentLoader.replace(`${fallback}.min.js`, targetCdnFilePathOverlay);
  const targetFilePathLoader = `${outputDirLoader}/${fallback}.js`;

  manifest = {
    ...manifest,
    [fallback]: targetFileNameOverlay,
  };

  fs.writeFileSync(targetFilePathOverlay, fileContentOverlay);
  fs.writeFileSync(targetFilePathLoader, newFileContentLoader);
};

const writeManifest = (cdnPath: string, manifest: Manifest): void => {
  fs.writeFileSync(
    path.normalize('./index.ts'),
    `${CDN_KEY_TYPE_DEFINITION}

export const CDN_BASE_URL = ${cdnPath};
export const FALLBACKS_MANIFEST = ${JSON.stringify(manifest)};`
  );

  console.log('Created fallbacks manifest.');
};

[outputDirFallbacks, outputDirLoader].forEach((dir) => createFreshDirectory(dir));
FALLBACKS.forEach((fallback) => generateCdnLoader(fallback));

const cdn = `${CDN_BASE_URL_DYNAMIC} + '/${CDN_BASE_PATH_FALLBACKS}'`;

writeManifest(cdn, manifest);
