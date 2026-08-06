import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import { sync as globbySync } from 'fast-glob';
import { kebabCase, camelCase } from 'change-case';
import { CDN_BASE_PATH_FONTS } from '../../../../../cdn.config';

type Manifest = {
  [name: string]: string;
};

const toHash = (str: string): string => crypto.createHash('md5').update(str, 'utf8').digest('hex').substring(0, 7);

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
    const filename = `${kebabCase(name)}.${hash}${ext}`;
    const targetPath = path.normalize(`./dist/fonts/${filename}`);

    const nameKey = camelCase(name);
    manifest[nameKey] = filename;

    fs.writeFileSync(targetPath, font, { encoding: 'binary' });

    console.log(`Font "${name}${ext}" copied.`);
  }

  // Fallback: for any "*Bold" entry without a matching "*SemiBold" entry,
  // alias the semi-bold key to the bold file so consumers can rely on a
  // semi-bold weight being available for every script.
  for (const [key, filename] of Object.entries(manifest)) {
    // Match keys ending in "Bold" but not "SemiBold" (negative lookbehind).
    const boldMatch = key.match(/^(.*?)(?<!Semi)Bold$/);
    if (!boldMatch) continue;
    const semiBoldKey = `${boldMatch[1]}SemiBold`;
    if (!(semiBoldKey in manifest)) {
      manifest[semiBoldKey] = filename;
      console.log(`Font "${semiBoldKey}" aliased to "${key}" (no dedicated semi-bold variant).`);
    }
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
  const files = globbySync('./src/**/*.@(woff2)').sort();

  createManifestAndCopyFonts(files);
};

generate();
