import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import globby from 'globby';
import { paramCase, camelCase } from 'change-case';
import { CDN_BASE_URL_DYNAMIC, CDN_BASE_PATH_MARQUE, CDN_KEY_TYPE_DEFINITION } from '../../../cdn.config';

type Manifest = {
  [name: string]: {
    [size: string]: {
      [resolution: string]: {
        png: string;
        webp: string;
      };
    };
  };
};

const toHash = (str: string): string => crypto.createHash('md5').update(str, 'utf8').digest('hex');

const checkIntegrity = (manifest: Manifest): void => {
  for (const [name, size] of Object.entries(manifest)) {
    if (!size.small) {
      throw new Error(`Marque size declaration "small" is missing in manifest for "${name}".`);
    }
    if (!size.medium) {
      throw new Error(`Marque size declaration "medium" is missing in manifest for "${name}".`);
    }
    for (const resolution of Object.values(size)) {
      if (!resolution['1x']) {
        throw new Error(`Marque resolution declaration "1x" is missing in manifest for "${name}".`);
      }
      if (!resolution['2x']) {
        throw new Error(`Marque resolution declaration "2x" is missing in manifest for "${name}".`);
      }
      if (!resolution['3x']) {
        throw new Error(`Marque resolution declaration "3x" is missing in manifest for "${name}".`);
      }

      for (const format of Object.values(resolution)) {
        if (!format.png) {
          throw new Error(`Marque format "png" for declaration "1x" is missing in manifest for "${name}".`);
        }
        if (!format.webp) {
          throw new Error(`Marque format "webp" for declaration "1x" is missing in manifest for "${name}".`);
        }
      }
    }
  }
};

const createManifestAndCopyMarque = (): void => {
  const cdn = `${CDN_BASE_URL_DYNAMIC} + '/${CDN_BASE_PATH_MARQUE}'`;
  const files = globby.sync('./src/**/*.{png,webp}').sort();

  fs.rmSync(path.normalize('./dist'), { force: true, recursive: true });
  fs.mkdirSync(path.normalize('./dist/marque'), { recursive: true });

  const manifest: Manifest = {};

  for (const file of files) {
    const ext = path.extname(file);
    const sourcePath = path.normalize(file);
    const marque = fs.readFileSync(sourcePath, { encoding: 'binary' });
    const hash = toHash(marque);
    const [name, size, resolution] = path.basename(sourcePath, ext).split(/[.@]/g);
    const extension = ext.slice(1);
    const filename = `${paramCase(name)}.${paramCase(size)}.min.${hash}@${paramCase(resolution)}.${extension}`;
    const targetPath = path.normalize(`./dist/marque/${filename}`);

    const nameKey = camelCase(name);
    const sizeKey = camelCase(size);
    const resolutionKey = camelCase(resolution);

    manifest[nameKey] = {
      ...manifest[nameKey],
      [sizeKey]: {
        ...manifest[nameKey]?.[sizeKey],
        [resolutionKey]: {
          ...manifest[nameKey]?.[sizeKey]?.[resolutionKey],
          [extension]: filename,
        },
      },
    };

    fs.writeFileSync(targetPath, marque, { encoding: 'binary' });

    console.log(`Marque "${name}" copied as ${ext} in "${size}" variant and ${resolution} resolution.`);
  }

  checkIntegrity(manifest);

  fs.writeFileSync(
    path.normalize('./index.ts'),
    `${CDN_KEY_TYPE_DEFINITION}

export const CDN_BASE_URL = ${cdn};
export const MARQUES_MANIFEST = ${JSON.stringify(manifest)};`
  );

  console.log('Created marque manifest.');
};

createManifestAndCopyMarque();
