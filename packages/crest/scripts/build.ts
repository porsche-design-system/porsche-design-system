import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import globby from 'globby';
import { camelCase, paramCase } from 'change-case';
import { CDN_BASE_PATH_CREST, CDN_BASE_URL_DYNAMIC, CDN_KEY_TYPE_DEFINITION } from '../../../cdn.config';

type Manifest = {
  [name: string]: {
    [variant: string]: {
      [resolution: string]: {
        png: string;
        webp: string;
      };
    };
  };
};

const toHash = (str: string): string => crypto.createHash('md5').update(str, 'utf8').digest('hex');

const checkIntegrity = (manifest: Manifest): void => {
  for (const [name, variant] of Object.entries(manifest)) {
    if (!variant.old) {
      throw new Error(`Crest variant declaration "old" is missing in manifest for "${name}".`);
    }
    if (!variant.new) {
      throw new Error(`Crest variant declaration "new" is missing in manifest for "${name}".`);
    }
    for (const resolution of Object.values(variant)) {
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
  }
};

const createManifestAndCopyCrest = (): void => {
  const cdn = `${CDN_BASE_URL_DYNAMIC} + '/${CDN_BASE_PATH_CREST}'`;
  const files = globby.sync('./src/**/*.{png,webp}').sort();

  fs.rmSync(path.normalize('./dist'), { force: true, recursive: true });
  fs.mkdirSync(path.normalize('./dist/crest'), { recursive: true });

  const manifest: Manifest = {};

  for (const file of files) {
    const ext = path.extname(file);
    const sourcePath = path.normalize(file);
    const crest = fs.readFileSync(sourcePath, { encoding: 'binary' });
    const hash = toHash(crest);
    const [name, variant, resolution] = path.basename(sourcePath, ext).split(/[.@]/g);
    const extension = ext.slice(1);
    const filename = `${paramCase(name)}.${paramCase(variant)}.min.${hash}@${paramCase(resolution)}.${extension}`;
    const targetPath = path.normalize(`./dist/crest/${filename}`);

    const nameKey = camelCase(name);
    const variantKey = camelCase(variant);
    const resolutionKey = camelCase(resolution);

    manifest[nameKey] = {
      ...manifest[nameKey],
      [variantKey]: {
        ...manifest[nameKey]?.[variantKey],
        [resolutionKey]: {
          ...manifest[nameKey]?.[variantKey]?.[resolutionKey],
          [extension]: filename,
        },
      },
    };

    fs.writeFileSync(targetPath, crest, { encoding: 'binary' });

    console.log(`Crest "${name}" copied as ${ext} in "${variant}" variant and ${resolution} resolution.`);
  }

  checkIntegrity(manifest);

  fs.writeFileSync(
    path.normalize('./index.ts'),
    `${CDN_KEY_TYPE_DEFINITION}

export const CDN_BASE_URL = ${cdn};
export const CREST_MANIFEST = ${JSON.stringify(manifest)};`
  );

  console.log('Created crest manifest.');
};

createManifestAndCopyCrest();
