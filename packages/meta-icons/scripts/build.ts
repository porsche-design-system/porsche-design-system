import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import globby from 'globby';
import { paramCase, camelCase } from 'change-case';
import { CDN_BASE_URL_DYNAMIC, CDN_BASE_PATH_META_ICONS, CDN_KEY_TYPE_DEFINITION } from '../../../cdn.config';

type Manifest = {
  [type: string]: {
    [name: string]: string;
  };
};

const toHash = (str: string): string => crypto.createHash('md5').update(str, 'utf8').digest('hex');

const createManifestAndCopyMetaIcons = async (cdn: string, files: string[]): Promise<void> => {
  fs.rmdirSync(path.normalize('./dist'), { recursive: true });
  fs.mkdirSync(path.normalize('./dist/meta-icons'), { recursive: true });

  const manifest: Manifest = {};

  for (let file of files) {
    const ext = path.extname(file);
    const sourcePath = path.normalize(file);
    const info = sourcePath.split(/[\/]/g);
    const type = info[1];
    const name = path.basename(sourcePath, ext);
    const metaIcons = fs.readFileSync(sourcePath, { encoding: 'binary' });
    const hash = toHash(metaIcons);
    const filename = `${paramCase(name)}.${hash}${ext}`;
    const targetPath = path.normalize(`./dist/meta-icons/${filename}`);

    const typeKey = camelCase(type);
    const nameKey = camelCase(name);
    manifest[typeKey] = {
      ...manifest[typeKey],
      [nameKey]: filename,
    };

    fs.writeFileSync(targetPath, metaIcons, { encoding: 'binary' });

    console.log(`Meta Icon "${name}" copied.`);
  }

  const separator = '/* Auto Generated Below */\n';

  fs.writeFileSync(
    path.normalize('./index.ts'),
    `${separator}
${CDN_KEY_TYPE_DEFINITION}

export const CDN_BASE_URL = ${cdn};
export const META_ICONS_MANIFEST = ${JSON.stringify(manifest)};`
  );

  console.log('Created meta-icons manifest.');
};

(async (): Promise<void> => {
  const cdn = `${CDN_BASE_URL_DYNAMIC} + '/${CDN_BASE_PATH_META_ICONS}'`;
  const icons = (await globby('./src/**/*')).sort();

  await createManifestAndCopyMetaIcons(cdn, icons).catch((e) => {
    console.error(e);
    process.exit(1);
  });
})();
