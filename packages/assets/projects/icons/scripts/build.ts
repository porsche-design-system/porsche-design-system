import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import { optimize, Config } from 'svgo';
import * as globby from 'globby';
import { paramCase } from 'change-case';
import { CDN_BASE_PATH_ICONS } from '../../../../../cdn.config';
import * as gzipSize from 'gzip-size';
import { format } from 'prettier';

type Manifest = {
  [name: string]: string;
};
type IconsMap = Manifest;

const toHash = (str: string): string => crypto.createHash('md5').update(str, 'utf8').digest('hex');

type Stats = { name: string; size: number; gzipSize: number };
const stats: Stats[] = [];
const statsDir = path.normalize('./tests/unit/results');
const statsPath = path.normalize(`${statsDir}/stats.json`);

const createManifestAndOptimizeIcons = async (files: string[], config: Config): Promise<void> => {
  fs.rmSync(path.normalize('./dist'), { force: true, recursive: true });
  fs.mkdirSync(path.normalize('./dist/icons'), { recursive: true });

  const manifest: Manifest = {};
  const iconsMap: IconsMap = {};

  for (const file of files) {
    const svgRawPath = path.normalize(file);
    const svgRawName = path.basename(svgRawPath, '.svg');
    const svgRawData = fs.readFileSync(svgRawPath, 'utf8');
    const svgOptimizedData = optimize(svgRawData, config).data;
    const svgOptimizedHash = toHash(svgOptimizedData);
    const svgOptimizedFilename = `${svgRawName}.min.${svgOptimizedHash}.svg`;
    const svgOptimizedPath = path.normalize(`./dist/icons/${svgOptimizedFilename}`);

    if (svgRawName !== paramCase(svgRawName)) {
      throw new Error(`Icon name "${svgRawName}" does not fit naming convention »param-case«.`);
    }
    if (svgRawName in manifest) {
      throw new Error(`Icon name "${svgRawName}" is not unique.`);
    }

    manifest[svgRawName] = svgOptimizedFilename;
    iconsMap[svgRawName] = svgOptimizedData;

    fs.writeFileSync(svgOptimizedPath, svgOptimizedData, 'utf8');

    // TODO: we should create a shared and standardized stats generator for all assets
    stats.push({
      name: svgRawName,
      size: Buffer.byteLength(svgOptimizedData),
      gzipSize: gzipSize.sync(svgOptimizedData),
    });

    const svgRawSize = fs.statSync(svgRawPath).size;
    const svgOptimizedSize = fs.statSync(svgOptimizedPath).size;
    const svgSizeDiff = svgOptimizedSize - svgRawSize;

    console.log(
      `Icon "${svgRawName}" optimized: ${
        svgSizeDiff < 0 ? svgSizeDiff : '+' + svgSizeDiff
      } bytes (size: ${svgOptimizedSize} bytes)`
    );

    if (svgOptimizedSize > 3000) {
      throw new Error(`Icon "${svgRawName}" is too large.`);
    }
  }

  fs.rmSync(statsDir, { force: true, recursive: true });
  fs.mkdirSync(statsDir, { recursive: true });
  fs.writeFileSync(statsPath, await format(JSON.stringify(stats), { parser: 'json' }), 'utf8');
  console.log(`Write optimized icon stats into "${statsPath}"`);

  const sortedManifestKeys = Object.keys(manifest).sort();
  const sortedManifest: Manifest = sortedManifestKeys.reduce((result, key) => {
    result[key] = manifest[key];
    return result;
  }, {} as Manifest);

  fs.writeFileSync(
    path.normalize('./index.ts'),
    `export const CDN_BASE_PATH = '/${CDN_BASE_PATH_ICONS}';
export const ICONS_MANIFEST = ${JSON.stringify(sortedManifest)};
export const ICON_NAMES = ${JSON.stringify(sortedManifestKeys)} as const;
export type IconName = typeof ICON_NAMES[number];
`
  );

  console.log('Created icons manifest.');
};

const generate = async (): Promise<void> => {
  const files = globby.sync('./src/**/*.svg').sort();
  const config: Config = require('../svgo.config.js');

  await createManifestAndOptimizeIcons(files, config);
};

(async (): Promise<void> => {
  await generate();
})();
