import * as fs from 'fs';
import * as crypto from 'crypto';
import type { Fallbacks } from './utils';
import { FALLBACKS } from './utils';

const cdnPath = 'https://cdn.ui.porsche.com/fallbacks';
const outputDirFallbacks = './dist/fallbacks';
const outputDirLoader = './dist/loader';

const createFreshDirectory = (dir: string): void => {
  fs.rmSync(dir, { force: true, recursive: true });
  fs.mkdirSync(dir, { recursive: true });
};

const toHash = (str: string): string => {
  return crypto.createHash('md5').update(str, 'utf8').digest('hex');
};

const generateCdnDist = (fallback: Fallbacks): void => {
  const fileContentOverlay = fs.readFileSync(`tmp/${fallback}.min.js`, 'utf8');
  const contentHashOverlay = toHash(fileContentOverlay);
  const targetFileNameOverlay = `${fallback}.${contentHashOverlay}.js`;
  const targetFilePathOverlay = `${outputDirFallbacks}/${targetFileNameOverlay}`;

  const fileContentLoader = fs.readFileSync(`tmp/${fallback}-loader.min.js`, 'utf8');
  const newFileContentLoader = fileContentLoader.replace(`${fallback}.min.js`, `${cdnPath}/${targetFileNameOverlay}`);
  const targetFilePathLoader = `${outputDirLoader}/${fallback}.js`;

  fs.writeFileSync(targetFilePathOverlay, fileContentOverlay);
  fs.writeFileSync(targetFilePathLoader, newFileContentLoader);
};

[outputDirFallbacks, outputDirLoader].forEach((dir) => createFreshDirectory(dir));
FALLBACKS.forEach((fallback) => generateCdnDist(fallback));
