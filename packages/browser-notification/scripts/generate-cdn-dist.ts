import * as fs from 'fs';
import * as crypto from 'crypto';

const CDN_PATH = 'https://cdn.ui.porsche.com/feature-detection';

const FEATURE_DETECTION = ['browser-support', 'cookie-support'] as const;
type FeatureDetection = typeof FEATURE_DETECTION[number];

const outputDirCdn = './cdn';
const outputDirDist = './dist';

const createFreshDirectory = (dir: string): void => {
  fs.rmSync(dir, { force: true, recursive: true });
  fs.mkdirSync(dir, { recursive: true });
};

const toHash = (str: string): string => {
  return crypto.createHash('md5').update(str, 'utf8').digest('hex');
};

const generateCdnDist = (featureDetection: FeatureDetection): void => {
  const fileContentOverlay = fs.readFileSync(`tmp/${featureDetection}.min.js`, 'utf8');
  const contentHashOverlay = toHash(fileContentOverlay);
  const targetFileNameOverlay = `${featureDetection}.${contentHashOverlay}.js`;
  const targetFilePathOverlay = `${outputDirCdn}/${targetFileNameOverlay}`;

  const fileContentLoader = fs.readFileSync(`tmp/${featureDetection}-loader.min.js`, 'utf8');
  const newFileContentLoader = fileContentLoader.replace(
    `${featureDetection}.min.js`,
    `${CDN_PATH}/${targetFileNameOverlay}`
  );
  const targetFilePathLoader = `${outputDirDist}/${featureDetection}.js`;

  fs.writeFileSync(targetFilePathOverlay, fileContentOverlay);
  fs.writeFileSync(targetFilePathLoader, newFileContentLoader);
};

[outputDirCdn, outputDirDist].forEach((dir) => createFreshDirectory(dir));
FEATURE_DETECTION.forEach((featureDetection) => generateCdnDist(featureDetection));
