import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import { globbySync } from 'globby';
import { camelCase, paramCase } from 'change-case';
import { CDN_BASE_PATH_CREST } from '../../../../../cdn.config';

type Manifest = {
  [name: string]: {
    [resolution: string]: {
      png: string;
      webp: string;
    };
  };
};

const toHash = (str: string): string => crypto.createHash('md5').update(str, 'utf8').digest('hex');

const checkIntegrity = (manifest: Manifest): void => {
  for (const [name, resolution] of Object.entries(manifest)) {
    if (!resolution['1x']) {
      throw new Error(`Crest resolution declaration "1x" is missing in manifest for "${name}".`);
    }
    if (!resolution['2x']) {
      throw new Error(`Crest resolution declaration "2x" is missing in manifest for "${name}".`);
    }
    if (!resolution['3x']) {
      throw new Error(`Crest resolution declaration "3x" is missing in manifest for "${name}".`);
    }

    for (const format of Object.values(resolution)) {
      if (!format.png) {
        throw new Error(`Crest format "png" for declaration "1x" is missing in manifest for "${name}".`);
      }
      if (!format.webp) {
        throw new Error(`Crest format "webp" for declaration "1x" is missing in manifest for "${name}".`);
      }
    }
  }
};

const createManifestAndCopyCrest = (): void => {
  const files = globbySync('./src/**/*.{png,webp}').sort();

  fs.rmSync(path.normalize('./dist'), { force: true, recursive: true });
  fs.mkdirSync(path.normalize('./dist/crest'), { recursive: true });

  const manifest: Manifest = {};

  for (const file of files) {
    const ext = path.extname(file);
    const sourcePath = path.normalize(file);
    const crest = fs.readFileSync(sourcePath, { encoding: 'binary' });
    const hash = toHash(crest);
    const [name, resolution] = path.basename(sourcePath, ext).split(/[.@]/g);
    const extension = ext.slice(1);
    const filename = `${paramCase(name)}.min.${hash}@${paramCase(resolution)}.${extension}`;
    const targetPath = path.normalize(`./dist/crest/${filename}`);

    const nameKey = camelCase(name);
    const resolutionKey = camelCase(resolution);

    manifest[nameKey] = {
      ...manifest[nameKey],
      [resolutionKey]: {
        ...manifest[nameKey]?.[resolutionKey],
        [extension]: filename,
      },
    };

    fs.writeFileSync(targetPath, crest, { encoding: 'binary' });

    console.log(`Crest "${name}" copied as ${ext} and ${resolution} resolution.`);
  }

  checkIntegrity(manifest);

  fs.writeFileSync(
    path.normalize('./index.ts'),
    `export const CDN_BASE_PATH = '/${CDN_BASE_PATH_CREST}';
export const CRESTS_MANIFEST = ${JSON.stringify(manifest)};`
  );

  console.log('Created crest manifest.');
};

createManifestAndCopyCrest();
