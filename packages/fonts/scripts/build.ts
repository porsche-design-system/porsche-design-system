import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import globby from 'globby';
import { paramCase, camelCase } from 'change-case';
import { CDN_BASE_URL_DYNAMIC, CDN_BASE_PATH_FONTS, CDN_KEY_TYPE_DEFINITION } from '../../../cdn.config';

type Manifest = {
  [name: string]: string;
};

const toHash = (str: string): string => crypto.createHash('md5').update(str, 'utf8').digest('hex');

const checkIfDirectoryExists = async (path: string): Promise<boolean> => {
  try {
    fs.accessSync(path, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
};

const createManifestAndCopyFonts = async (cdn: string, files: string[]): Promise<void> => {
  if (await checkIfDirectoryExists(path.resolve('./dist'))) {
    fs.rmSync(path.resolve('./dist'), { recursive: true });
  }
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
    `${CDN_KEY_TYPE_DEFINITION}

export const CDN_BASE_URL = ${cdn};
export const FONTS_MANIFEST = ${JSON.stringify(manifest)};`
  );

  console.log('Created fonts manifest.');
};

(async (): Promise<void> => {
  const cdn = `${CDN_BASE_URL_DYNAMIC} + '/${CDN_BASE_PATH_FONTS}'`;
  const files = (await globby('./src/**/*.@(woff2|ttf)')).sort();

  console.log(files);

  await createManifestAndCopyFonts(cdn, files).catch((e) => {
    console.error(e);
    process.exit(1);
  });
})();
