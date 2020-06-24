import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import globby from 'globby';
import { paramCase, camelCase } from 'change-case';
import { buildStyles } from './styles';

interface Manifest {
  [name: string]: {
    woff: string;
    woff2: string;
  };
}

const toHash = (str: string): string => {
  return crypto
    .createHash('md5')
    .update(str, 'utf8')
    .digest('hex');
};

const checkIntegrity = async (manifest: Manifest): Promise<void> => {
  for (const [name, format] of Object.entries(manifest)) {
    if (!format.woff) throw new Error(`Font declaration .woff is missing in manifest for "${name}".`);
    if (!format.woff2) throw new Error(`Font declaration .woff2 is missing in manifest for "${name}".`);
  }
};

const createManifestAndCopyFonts = async (cdn: string, files: string[]): Promise<void> => {
  if (await fs.promises.stat(path.normalize('./dist'))) {
    await fs.promises.rmdir(path.normalize('./dist'), { recursive: true });
  }
  fs.mkdirSync(path.normalize('./dist/fonts'), { recursive: true });

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

  const fontFaceFileNameCdn = buildStyles();
  const fontFaceFileNameLocal = buildStyles({ isStaging: true });

  fs.writeFileSync(
    path.normalize('./index.ts'),
    `export const CDN_BASE_URL = "${cdn}";
export const FONTS_MANIFEST = ${JSON.stringify(manifest)};
export const FONT_FACE_CSS_NAME = "${fontFaceFileNameCdn}";`
  );

  console.log('Created fonts manifest.');
};

(async (): Promise<void> => {
  const cdn = 'https://cdn.ui.porsche.com/porsche-design-system/fonts';
  const files = await globby('./src/**/*.@(woff|woff2)');

  await createManifestAndCopyFonts(cdn, files).catch((e) => {
    console.error(e);
    process.exit(1);
  });
})();
