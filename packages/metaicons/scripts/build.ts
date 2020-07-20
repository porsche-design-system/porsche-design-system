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

const createManifestAndCopyMetaicons = async (cdn: string, files: string[]): Promise<void> => {
  fs.rmdirSync(path.normalize('./dist'), {recursive: true});
  fs.mkdirSync(path.normalize('./dist/metaicons'), {recursive: true});

  const manifest: Manifest = {};

  for (let file of files) {
    const ext = path.extname(file);
    const sourcePath = path.normalize(file);
    const name = path.basename(sourcePath, ext);
    const metaicons = fs.readFileSync(sourcePath, {encoding: 'binary'});
    const hash = toHash(metaicons);
    const filename = `${paramCase(name)}.${hash}.png`;
    const targetPath = path.normalize(`./dist/metaicons/${filename}`);

    const nameKey = camelCase(name);
    manifest[nameKey] = filename;

    fs.writeFileSync(targetPath, metaicons, {encoding: 'binary'});

    console.log(`Metaicon "${name}" copied.`);
  }

  fs.writeFileSync(path.normalize('./index.ts'),
    `export const CDN_BASE_URL = "${cdn}";
export const METAICONS_MANIFEST = ${JSON.stringify(manifest)};`
  );

  console.log('Created metaicons manifest.');
};

(async (): Promise<void> => {
  const url = 'https://cdn.ui.porsche.com/porsche-design-system/metaicons/metaicons';
  const icons = await globby('./src/**/*');

  await createManifestAndCopyMetaicons(url, icons).catch(e => {
    console.error(e);
    process.exit(1);
  });
})();
