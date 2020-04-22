import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import globby from 'globby';
import { paramCase, camelCase } from 'change-case';

const toHash = (str: string): string => {
  return crypto
    .createHash('md5')
    .update(str, 'utf8')
    .digest('hex');
};

const checkIntegrity = async (manifest: { [key: string]: { [key: string]: string; }; }): Promise<void> => {
  const formats = Object.values(manifest);
  for (let format of formats) {
    if (!format.woff) throw new Error('Font declaration .woff is missing in manifest.');
    if (!format.woff2) throw new Error('Font declaration .woff2 is missing in manifest.');
  }
};

const createManifestAndCopyFonts = async (cdn: string, files: string[]): Promise<void> => {
  fs.rmdirSync(path.normalize('./dist'), {recursive: true});
  fs.mkdirSync(path.normalize('./dist/fonts'), {recursive: true});

  const manifest: { [key: string]: { [key: string]: string; }; } = {};

  for (let file of files) {
    const ext = path.extname(file);
    const sourcePath = path.normalize(file);
    const name = path.basename(sourcePath, ext);
    const font = fs.readFileSync(sourcePath, 'utf8');
    const hash = toHash(font);
    const filename = `${paramCase(name)}.min.${hash}${ext}`;
    const targetPath = path.normalize(`./dist/fonts/${filename}`);

    if (!manifest[camelCase(name)]) manifest[camelCase(name)] = {};
    manifest[camelCase(name)][ext.substring(1)] = filename;
    fs.writeFileSync(targetPath, font);
  }

  await checkIntegrity(manifest);

  fs.writeFileSync(path.normalize('./index.ts'),
    `export const cdn = "${cdn}";
export const fonts = ${JSON.stringify(manifest)};`
  );
};

(async (): Promise<void> => {
  const cdn = 'https://cdn.ui.porsche.com/porsche-design-system/fonts';
  const files = await globby('./src/**/*.@(woff|woff2)');

  await createManifestAndCopyFonts(cdn, files).catch(e => {
    console.error(e);
    process.exit(1);
  });
})();
