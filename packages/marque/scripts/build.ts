import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import globby from 'globby';
import sharp from 'sharp';
import { paramCase, camelCase } from 'change-case';

interface Manifest {
  [name: string]: {
    [size: string]: {
      '1x': string;
      '2x': string;
      '3x': string;
    };
  }
}

interface Config {
  [size: string]: {
    w: number;
    h: number;
  };
}

const toHash = (str: string): string => {
  return crypto
    .createHash('md5')
    .update(str, 'utf8')
    .digest('hex');
};

const createManifestAndOptimizeMarque = async (cdn: string, files: string[], config: Config): Promise<void> => {
  fs.rmdirSync(path.normalize('./dist'), {recursive: true});
  fs.mkdirSync(path.normalize('./dist/marque'), {recursive: true});

  const manifest: Manifest = {};

  for (let file of files) {
    const ext = path.extname(file);
    const sourcePath = path.normalize(file);
    const name = path.basename(sourcePath, ext);
    const marque = fs.readFileSync(sourcePath, {encoding: null});

    for (const [size, dimension] of Object.entries(config)) {
      for (let i = 1; i <= 3; i++) {

        const width = dimension.w * i;
        const height = dimension.h * i;
        const optimizedMarque = await sharp(marque).resize(width, height).png().toBuffer();
        const hash = toHash(optimizedMarque.toString());
        const filename = `${paramCase(name)}.min.${hash}@${i}x.png`;
        const targetPath = path.normalize(`./dist/marque/${filename}`);

        const nameKey = camelCase(name);
        const sizeKey = camelCase(size);
        const resolutionKey = camelCase(`${i}x`);
        manifest[nameKey] = {
          ...manifest[nameKey],
          [sizeKey]: {
            ...manifest[nameKey]?.[sizeKey],
            [resolutionKey]: filename
          }
        };
        fs.writeFileSync(targetPath, optimizedMarque, {encoding: 'utf8'});

        console.log(`Marque "${name}" optimized as "${size}" variant in ${i}x resolution.`);
      }
    }
  }

  fs.writeFileSync(path.normalize('./index.ts'),
    `export const cdn = "${cdn}";
export const marque = ${JSON.stringify(manifest)};`
  );

  console.log('Created marque manifest.');
};

(async (): Promise<void> => {
  const cdn = 'https://cdn.ui.porsche.com/porsche-design-system/marque';
  const files = await globby('./src/**/*.svg');
  const config: Config = {
    'small': {w: 102, h: 62},
    'medium': {w: 123, h: 75}
  };

  await createManifestAndOptimizeMarque(cdn, files, config).catch(e => {
    console.error(e);
    process.exit(1);
  });
})();
