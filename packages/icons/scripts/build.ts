import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import { optimize, OptimizedSvg, OptimizeOptions } from 'svgo';
import globby from 'globby';
import { paramCase, camelCase } from 'change-case';
import { CDN_BASE_URL_DYNAMIC, CDN_BASE_PATH_ICONS, CDN_KEY_TYPE_DEFINITION } from '../../../cdn.config';

type Manifest = {
  [name: string]: string;
};

const toHash = (str: string): string => crypto.createHash('md5').update(str, 'utf8').digest('hex');

const createManifestAndOptimizeIcons = (cdn: string, files: string[], config: OptimizeOptions): void => {
  fs.rmdirSync(path.normalize('./dist'), { recursive: true });
  fs.mkdirSync(path.normalize('./dist/icons'), { recursive: true });

  const manifest: Manifest = {};

  for (const file of files) {
    const svgRawPath = path.normalize(file);
    const svgRawName = path.basename(svgRawPath, '.svg');
    const svgRawData = fs.readFileSync(svgRawPath, 'utf8');
    const svgOptimizedData = (optimize(svgRawData, config) as OptimizedSvg).data;
    const svgOptimizedHash = toHash(svgOptimizedData);
    const svgOptimizedFilename = `${paramCase(svgRawName)}.min.${svgOptimizedHash}.svg`;
    const svgOptimizedPath = path.normalize(`./dist/icons/${svgOptimizedFilename}`);

    if (svgRawName !== paramCase(svgRawName)) {
      throw new Error(`Icon name "${svgRawName}" does not fit naming convention »kebab-case«.`);
    }
    if (svgRawName in manifest) {
      throw new Error(`Icon name "${svgRawName}" is not unique.`);
    }

    const nameKey = camelCase(svgRawName);
    manifest[nameKey] = svgOptimizedFilename;

    fs.writeFileSync(svgOptimizedPath, svgOptimizedData, 'utf8');

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

  const sortedManifestKeys = Object.keys(manifest).sort();
  const sortedManifest: Manifest = sortedManifestKeys.reduce((result, key) => {
    result[key] = manifest[key];
    return result;
  }, {} as Manifest);

  fs.writeFileSync(
    path.normalize('./index.ts'),
    `${CDN_KEY_TYPE_DEFINITION}

export const CDN_BASE_URL = ${cdn};
export const ICONS_MANIFEST = ${JSON.stringify(sortedManifest)};
export const ICON_NAMES = ${JSON.stringify(sortedManifestKeys)};
export type IconName = ${sortedManifestKeys.map((x) => `'${paramCase(x)}'`).join(' | ')};
export type IconNameCamelCase = ${sortedManifestKeys.map((x) => `'${x}'`).join(' | ')};`
  );

  console.log('Created icons manifest.');
};

const generate = (): void => {
  const cdn = `${CDN_BASE_URL_DYNAMIC} + '/${CDN_BASE_PATH_ICONS}'`;
  const files = globby.sync('./src/**/*.svg').sort();
  const config: OptimizeOptions = require('../svgo.config.js');

  createManifestAndOptimizeIcons(cdn, files, config);
};

generate();
