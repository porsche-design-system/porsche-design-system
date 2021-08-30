import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import globby from 'globby';
import { paramCase, camelCase } from 'change-case';
import { CDN_BASE_URL_DYNAMIC, CDN_KEY_TYPE_DEFINITION, CDN_BASE_PATH_EMAIL } from '../../../cdn.config';

type Manifest = {
  [name: string]: {
    [size: string]: {
      [resolution: string]: string;
    };
  };
};

const toHash = (str: string): string => crypto.createHash('md5').update(str, 'utf8').digest('hex');

const checkIntegrity = async (manifest: Manifest): Promise<void> => {
  for (const [name, size] of Object.entries(manifest)) {
    if (name.includes('Email')) {
      return;
    } else {
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
      }
    }
  }
};

const createManifestAndCopyMarque = async (cdn: string, files: string[]): Promise<void> => {
  fs.rmdirSync(path.normalize('./dist'), { recursive: true });
  fs.mkdirSync(path.normalize('./dist/email'), { recursive: true });

  const manifest: Manifest = {};

  for (let file of files) {
    const ext = path.extname(file);
    const sourcePath = path.normalize(file);
    const info = path.basename(sourcePath, ext).split(/[.@]/g);
    const name = info[0];
    const size = info[1];
    const resolution = info[2];
    const marque = fs.readFileSync(sourcePath, { encoding: 'binary' });
    const hash = toHash(marque);
    const filename = `${paramCase(name)}.${paramCase(size)}.min.${hash}@${paramCase(resolution)}.png`;
    const targetPath = path.normalize(`./dist/email/${filename}`);

    const nameKey = camelCase(name);
    const sizeKey = camelCase(size);
    const resolutionKey = camelCase(resolution);
    manifest[nameKey] = {
      ...manifest[nameKey],
      [sizeKey]: {
        ...manifest[nameKey]?.[sizeKey],
        [resolutionKey]: filename,
      },
    };

    fs.writeFileSync(targetPath, marque, { encoding: 'binary' });

    console.log(`Marque "${name}" copied as "${size}" variant in ${resolution} resolution.`);
  }

  await checkIntegrity(manifest);

  fs.writeFileSync(
    path.normalize('./index.ts'),
    `${CDN_KEY_TYPE_DEFINITION}

export const CDN_BASE_URL = ${cdn};
export const EMAIL_MANIFEST = ${JSON.stringify(manifest)};`
  );

  console.log('Created email manifest.');
};

(async (): Promise<void> => {
  const cdn = `${CDN_BASE_URL_DYNAMIC} + '/${CDN_BASE_PATH_EMAIL}'`;
  const files = (await globby('./src/**/*.png')).sort();

  await createManifestAndCopyMarque(cdn, files).catch((e) => {
    console.error(e);
    process.exit(1);
  });
})();
