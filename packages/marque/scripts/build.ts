import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import globby from 'globby';
import sharp from 'sharp';
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

  const manifest: any = {};

  for (let file of files) {
    const ext = path.extname(file);
    const sourcePath = path.normalize(file);
    const name = path.basename(sourcePath, ext);
    const marque = fs.readFileSync(sourcePath, {encoding: null});

    let i = 1;
    for (let opt of [{w: 123, h:75}, {w: 246, h:150}, {w: 369, h:225}]) {

      const optimizedMarque = await sharp(marque).resize(opt.w, opt.h).png().toBuffer();

      const hash = toHash(optimizedMarque.toString());
      const filename = `${paramCase(name)}.min.${hash}@${i}x.png`;
      const targetPath = path.normalize(`./dist/marque/${filename}`);

      if (!manifest[camelCase(name)]) manifest[camelCase(name)] = {};
      if (!manifest[camelCase(name)].medium) manifest[camelCase(name)].medium = {};
      manifest[camelCase(name)].medium[`${i}x`] = filename;
      fs.writeFileSync(targetPath, optimizedMarque, {encoding: 'utf8'});

      i++;
    }

    let c = 1;
    for (let opt of [{w: 102, h:62}, {w: 204, h:124}, {w: 306, h:186}]) {

      const optimizedMarque = await sharp(marque).resize(opt.w, opt.h).png().toBuffer();

      const hash = toHash(optimizedMarque.toString());
      const filename = `${paramCase(name)}.min.${hash}@${c}x.png`;
      const targetPath = path.normalize(`./dist/marque/${filename}`);

      if (!manifest[camelCase(name)]) manifest[camelCase(name)] = {};
      if (!manifest[camelCase(name)].small) manifest[camelCase(name)].small = {};
      manifest[camelCase(name)].small[`${c}x`] = filename;
      fs.writeFileSync(targetPath, optimizedMarque, {encoding: 'utf8'});

      c++;
    }
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
