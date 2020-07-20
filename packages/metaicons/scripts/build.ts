import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import globby from 'globby';
import { paramCase, camelCase } from 'change-case';

type Manifest = {
  [name: string]: string;
};


const toHash = (str: string): string => {
  return crypto
    .createHash('md5')
    .update(str, 'utf8')
    .digest('hex');
};

// const checkIntegrity = async (manifest: Manifest): Promise<void> => {
//   for (const [name, size] of Object.entries(manifest)) {
//     if (!size.small) throw new Error(`Touchicon size declaration "small" is missing in manifest for "${name}".`);
//     if (!size.medium) throw new Error(`Touchicon size declaration "medium" is missing in manifest for "${name}".`);
//   }
// };

const createManifestAndCopyTouchicon = async (cdn: string, files: string[]): Promise<void> => {
  fs.rmdirSync(path.normalize('./dist'), {recursive: true});
  fs.mkdirSync(path.normalize('./dist/touchicons'), {recursive: true});

  const manifest: Manifest = {};

  for (let file of files) {
    const ext = path.extname(file);
    const sourcePath = path.normalize(file);
    const name = path.basename(sourcePath, ext);
    const touchicons = fs.readFileSync(sourcePath, {encoding: 'binary'});
    const hash = toHash(touchicons);
    const filename = `${paramCase(name)}.min.${hash}.png`;
    const targetPath = path.normalize(`./dist/touchicons/${filename}`);

    const nameKey = camelCase(name);
    manifest[nameKey] = filename;

    fs.writeFileSync(targetPath, touchicons, {encoding: 'binary'});

    console.log(`Touchicon "${name}" copied.`);
  }

  // await checkIntegrity(manifest);

  fs.writeFileSync(path.normalize('./index.ts'),
    `export const CDN_BASE_URL = "${cdn}";
export const TOUCHICON_MANIFEST = ${JSON.stringify(manifest)};`
  );

  console.log('Created touchicon manifest.');
};

(async (): Promise<void> => {
  const cdnTouchicons = 'https://cdn.ui.porsche.com/porsche-design-system/metaicons/touchicons';
  const filesTouchicons = await globby('./src/touchicons/*.png');

  await createManifestAndCopyTouchicon(cdnTouchicons, filesTouchicons).catch(e => {
    console.error(e);
    process.exit(1);
  });
})();
