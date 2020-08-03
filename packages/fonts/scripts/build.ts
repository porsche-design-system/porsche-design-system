import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import globby from 'globby';
import { paramCase, camelCase } from 'change-case';

type Manifest = {
  [name: string]: {
    woff: string;
    woff2: string;
  };
};

const toHash = (str: string): string =>
  crypto
    .createHash('md5')
    .update(str, 'utf8')
    .digest('hex');

const checkIntegrity = async (manifest: Manifest): Promise<void> => {
  for (const [name, format] of Object.entries(manifest)) {
    if (!format.woff) {
      throw new Error(`Font declaration .woff is missing in manifest for "${name}".`);
    }
    if (!format.woff2) {
      throw new Error(`Font declaration .woff2 is missing in manifest for "${name}".`);
    }
  }
};

const checkIfDirectoryExists = async (path: string): Promise<boolean> => {
  try {
    await fs.promises.access(path, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
};

const createManifestAndCopyFonts = async (fontCdnPath: string, styleCdnPath: string, files: string[]): Promise<void> => {
  if (await checkIfDirectoryExists(path.resolve('./dist'))) {
    await fs.promises.rmdir(path.resolve('./dist'), { recursive: true });
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
    const formatKey = camelCase(ext.substring(1));
    manifest[nameKey] = {
      ...manifest[nameKey],
      [formatKey]: filename
    };

    fs.writeFileSync(targetPath, font, { encoding: 'binary' });

    console.log(`Font "${name}${ext}" copied.`);
  }

  await checkIntegrity(manifest);

  fs.writeFileSync(
    path.normalize('./index.ts'),
    `export const CDN_BASE_URL = "${fontCdnPath}";
export const CDN_FONT_CSS_FILE_URL = "${styleCdnPath}";
export const FONTS_MANIFEST = ${JSON.stringify(manifest)};`
  );

  console.log('Created fonts manifest.');
};

(async (): Promise<void> => {
  const fontCdnPath = 'https://cdn.ui.porsche.com/porsche-design-system/fonts';
  // ToDo: Write the hashed css file dynamic
  const styleCdnPath = 'https://cdn.ui.porsche.com/porsche-design-system/style/font-face.min.677d41d9905a04aadcb253f71e5f71e9.css';
  const files = await globby('./src/**/*.@(woff|woff2)');

  await createManifestAndCopyFonts(fontCdnPath, styleCdnPath, files).catch((e) => {
    console.error(e);
    process.exit(1);
  });
})();
