import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import globby from 'globby';
import { paramCase, camelCase } from 'change-case';
const { CDN_BASE_URL, CDN_BASE_PATH_META_ICONS } = require('../../../cdn.config');

type Manifest = {
  [type: string]: {
    [name: string]: string;
  };
};

const toHash = (str: string): string =>
  crypto
    .createHash('md5')
    .update(str, 'utf8')
    .digest('hex');

const createManifestAndCopyMetaicons = async (cdn: string, files: string[]): Promise<void> => {
  fs.rmdirSync(path.normalize('./dist'), { recursive: true });
  fs.mkdirSync(path.normalize('./dist/metaicons'), { recursive: true });

  const manifest: Manifest = {};

  for (let file of files) {
    const ext = path.extname(file);
    const sourcePath = path.normalize(file);
    const info = sourcePath.split(/[\/]/g);
    const type = info[1];
    const name = path.basename(sourcePath, ext);
    const metaicons = fs.readFileSync(sourcePath, { encoding: 'binary' });
    const hash = toHash(metaicons);
    const filename = `${paramCase(name)}.${hash}${ext}`;
    const targetPath = path.normalize(`./dist/metaicons/${filename}`);

    const typeKey = camelCase(type);
    const nameKey = camelCase(name);
    manifest[typeKey] = {
      ...manifest[typeKey],
      [nameKey]: filename
    };

    fs.writeFileSync(targetPath, metaicons, { encoding: 'binary' });

    console.log(`Metaicon "${name}" copied.`);
  }

  fs.writeFileSync(
    path.normalize('./index.ts'),
    `export const CDN_BASE_URL = "${cdn}";
export const METAICONS_MANIFEST = ${JSON.stringify(manifest)};`
  );

  console.log('Created metaicons manifest.');
};

(async (): Promise<void> => {
  const cdn = `${CDN_BASE_URL}/${CDN_BASE_PATH_META_ICONS}`;
  const icons = (await globby('./src/**/*')).sort();

  await createManifestAndCopyMetaicons(cdn, icons).catch((e) => {
    console.error(e);
    process.exit(1);
  });
})();
