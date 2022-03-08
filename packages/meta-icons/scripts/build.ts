import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import globby from 'globby';
import { paramCase, camelCase } from 'change-case';
import {
  CDN_BASE_URL_DYNAMIC,
  CDN_BASE_PATH_META_ICONS,
  CDN_KEY_TYPE_DEFINITION,
  CDN_BASE_URL,
  CDN_BASE_URL_CN,
} from '../../../cdn.config';

type Cdn = 'auto' | 'cn';

type MetaIconsManifest = {
  [type: string]: {
    [name: string]: string;
  };
};

const toHash = (str: string): string => crypto.createHash('md5').update(str, 'utf8').digest('hex');

const generateWebManifestAndExtendIconManifest = (metaIconsManifest: MetaIconsManifest): MetaIconsManifest => {
  const iconPaths = Object.values(metaIconsManifest)
    .map((item) => Object.values(item))
    //@ts-ignore
    .flat();

  const androidIconFilenames = iconPaths.filter((iconPath: string) => iconPath.includes('android-chrome-'));

  const hashedManifestFilename = writeWebManifest(androidIconFilenames, 'auto');
  const hashedManifestFilenameCN = writeWebManifest(androidIconFilenames, 'cn');

  metaIconsManifest.webManifest = {
    auto: hashedManifestFilename,
    cn: hashedManifestFilenameCN,
  };
  return metaIconsManifest;
};

const writeWebManifest = (androidIconPaths: string[], cdn: Cdn): string => {
  const cdnURL = cdn === 'auto' ? CDN_BASE_URL : CDN_BASE_URL_CN;
  const icons = androidIconPaths.map((androidIconPath: string) => {
    const [, size] = androidIconPath.match(/android-chrome-([0-9]+)x\1/) ?? [];
    if (isNaN(parseInt(size))) {
      throw new Error('Size of android icon could not be extracted');
    }
    return {
      src: `${cdnURL}/${CDN_BASE_PATH_META_ICONS}/${androidIconPath}`,
      sizes: `${size}x${size}`,
      type: 'image/png',
    };
  });

  const manifest = JSON.stringify({ icons });
  const hash = toHash(manifest);
  const manifestFileName = `manifest${cdn === 'auto' ? '' : `.${cdn}`}.${hash}.webmanifest`;

  fs.writeFileSync(path.normalize(`./dist/meta-icons/${manifestFileName}`), manifest);
  console.log(`${manifestFileName} written.`);
  return manifestFileName;
};

const copyMetaIconsAndBuildIconManifest = (cdn: string, files: string[]): MetaIconsManifest => {
  fs.mkdirSync(path.normalize('./dist/meta-icons'), { recursive: true });

  const manifest: MetaIconsManifest = {};

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

  return manifest;
};
const writeMetaIconManifest = (cdn: string, manifest: MetaIconsManifest) => {
  fs.writeFileSync(
    path.normalize('./index.ts'),
    `${CDN_KEY_TYPE_DEFINITION}

export const CDN_BASE_URL = ${cdn};
export const META_ICONS_MANIFEST = ${JSON.stringify(manifest)};`
  );

  console.log('Created meta-icons manifest.');
};

const generate = (): void => {
  const cdnMetaIconsUrl = `${CDN_BASE_URL_DYNAMIC} + '/${CDN_BASE_PATH_META_ICONS}'`;
  const icons = globby.sync('./src/**/*').sort();
  const metaIconsManifest = copyMetaIconsAndBuildIconManifest(cdnMetaIconsUrl, icons);
  const metaIconsManifestWithWebManifest = generateWebManifestAndExtendIconManifest(metaIconsManifest);

  writeMetaIconManifest(cdnMetaIconsUrl, metaIconsManifestWithWebManifest);
};

generate();
