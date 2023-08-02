import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import globby from 'globby';
import { paramCase, camelCase } from 'change-case';
import { CDN_BASE_PATH_FONTS } from '../../../cdn.config';

type Manifest = {
  [name: string]: string;
};

const toHash = (str: string): string => crypto.createHash('md5').update(str, 'utf8').digest('hex');

const createManifestAndCopyFonts = (files: string[]): void => {
  fs.rmSync(path.resolve('./dist'), { force: true, recursive: true });
  fs.mkdirSync(path.resolve('./dist/fonts'), { recursive: true });

  const manifest: Manifest = {};

  for (const file of files) {
    const ext = path.extname(file);
    const sourcePath = path.normalize(file);
    const name = path.basename(sourcePath, ext);
    const font = fs.readFileSync(sourcePath, { encoding: 'binary' });
    const hash = toHash(font);
    const filename = `${paramCase(name)}.min.${hash}${ext}`;
    const targetPath = path.normalize(`./dist/fonts/${filename}`);

    const nameKey = camelCase(name);
    manifest[nameKey] = filename;

    fs.writeFileSync(targetPath, font, { encoding: 'binary' });

    console.log(`Font "${name}${ext}" copied.`);
  }

  fs.writeFileSync(
    path.normalize('./index.ts'),
    `export const CDN_BASE_PATH = '/${CDN_BASE_PATH_FONTS}';
export const FONTS_MANIFEST = ${JSON.stringify(manifest)};
`
  );

  console.log('Created fonts manifest.');
};

const generate = (): void => {
  const files = globby.sync('./src/**/*.@(woff2)').sort();

  createManifestAndCopyFonts(files);
};

generate();
