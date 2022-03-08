import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import globby from 'globby';
import { paramCase, camelCase } from 'change-case';
import { CDN_BASE_URL_DYNAMIC, CDN_KEY_TYPE_DEFINITION, CDN_BASE_PATH_EMAIL } from '../../../cdn.config';

type Manifest = {
  [name: string]: string;
};

const toHash = (str: string): string => crypto.createHash('md5').update(str, 'utf8').digest('hex');

const createManifestAndCopyMarque = (cdn: string, files: string[]): void => {
  fs.rmSync(path.normalize('./dist'), { force: true, recursive: true });
  fs.mkdirSync(path.normalize('./dist/email'), { recursive: true });

  const manifest: Manifest = {};

  for (const file of files) {
    const ext = path.extname(file);
    const sourcePath = path.normalize(file);
    const [name] = path.basename(sourcePath, ext).split(/[.]/g);
    const marque = fs.readFileSync(sourcePath, { encoding: 'binary' });
    const hash = toHash(marque);
    const filename = `${paramCase(name)}.min.${hash}.png`;
    const targetPath = path.normalize(`./dist/email/${filename}`);

    const nameKey = camelCase(name);

    manifest[nameKey] = filename;

    fs.writeFileSync(targetPath, marque, { encoding: 'binary' });

    console.log(`Marque "${name}" copied`);
  }

  fs.writeFileSync(
    path.normalize('./index.ts'),
    `${CDN_KEY_TYPE_DEFINITION}

export const CDN_BASE_URL = ${cdn};
export const EMAIL_MANIFEST = ${JSON.stringify(manifest)};`
  );

  console.log('Created email manifest.');
};

const cdn = `${CDN_BASE_URL_DYNAMIC} + '/${CDN_BASE_PATH_EMAIL}'`;
const files = globby.sync('./src/**/*.png').sort();

createManifestAndCopyMarque(cdn, files);
