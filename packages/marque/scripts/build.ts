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

const createManifestAndOptimizeMarque = async (cdn: string, files: string[]): Promise<void> => {
  fs.rmdirSync(path.normalize('./dist'), {recursive: true});
  fs.mkdirSync(path.normalize('./dist/marque'), {recursive: true});

  const manifest: { [key: string]: string } = {};

  for (let file of files) {
    const ext = path.extname(file);
    const sourcePath = path.normalize(file);
    const name = path.basename(sourcePath, ext);
    const marque = fs.readFileSync(sourcePath, {encoding: 'utf8'});
    const hash = toHash(marque);
    const filename = `${paramCase(name)}.min.${hash}${ext}`;
    const targetPath = path.normalize(`./dist/marque/${filename}`);

    manifest[camelCase(name)] = filename;
    fs.writeFileSync(targetPath, marque, {encoding: 'utf8'});
  }

  fs.writeFileSync(path.normalize('./index.ts'),
    `export const cdn = "${cdn}";
export const marque = ${JSON.stringify(manifest)};`
  );
};

(async (): Promise<void> => {
  const cdn = 'https://cdn.ui.porsche.com/porsche-design-system/marque';
  const files = await globby('./src/**/*.svg');

  await createManifestAndOptimizeMarque(cdn, files).catch(e => {
    console.error(e);
    process.exit(1);
  });
})();
