import { kebabCase } from 'change-case';
import * as crypto from 'crypto';
import * as fs from 'fs';
import { globbySync } from 'globby';
import { gzipSizeSync } from 'gzip-size';
import * as path from 'path';
import { format } from 'prettier';
import { type Config, optimize } from 'svgo';
import { CDN_BASE_PATH_FLAGS } from '../../../../../cdn.config';
import { config } from '../svgo.config';

type Manifest = {
  [name: string]: string;
};
type FlagsMap = Manifest;

const toHash = (str: string): string => crypto.createHash('md5').update(str, 'utf8').digest('hex').substring(0, 7);

type Stats = { name: string; size: number; gzipSize: number };
const stats: Stats[] = [];
const statsDir = path.normalize('./tests/unit/results');
const statsPath = path.normalize(`${statsDir}/stats.json`);

const createManifestAndOptimizeFlags = async (files: string[], config: Config): Promise<void> => {
  fs.rmSync(path.normalize('./dist'), { force: true, recursive: true });
  fs.mkdirSync(path.normalize('./dist/flags'), { recursive: true });

  const manifest: Manifest = {};
  const flagsMap: FlagsMap = {};

  for (const file of files) {
    const svgRawPath = path.normalize(file);
    const svgRawName = path.basename(svgRawPath, '.svg');
    const svgRawData = fs.readFileSync(svgRawPath, 'utf8');
    const svgOptimizedData = optimize(svgRawData, config).data;
    const svgOptimizedHash = toHash(svgOptimizedData);
    const svgOptimizedFilename = `${svgRawName}.${svgOptimizedHash}.svg`;
    const svgOptimizedPath = path.normalize(`./dist/flags/${svgOptimizedFilename}`);

    if (svgRawName !== kebabCase(svgRawName)) {
      throw new Error(`Flag name "${svgRawName}" does not fit naming convention »param-case«.`);
    }
    if (svgRawName in manifest) {
      throw new Error(`Flag name "${svgRawName}" is not unique.`);
    }

    manifest[svgRawName] = svgOptimizedFilename;
    flagsMap[svgRawName] = svgOptimizedData;

    fs.writeFileSync(svgOptimizedPath, svgOptimizedData, 'utf8');

    // TODO: we should create a shared and standardized stats generator for all assets
    stats.push({
      name: svgRawName,
      size: Buffer.byteLength(svgOptimizedData),
      gzipSize: gzipSizeSync(svgOptimizedData),
    });

    const svgRawSize = fs.statSync(svgRawPath).size;
    const svgOptimizedSize = fs.statSync(svgOptimizedPath).size;
    const svgSizeDiff = svgOptimizedSize - svgRawSize;

    console.log(
      `Flag "${svgRawName}" optimized: ${
        svgSizeDiff < 0 ? svgSizeDiff : '+' + svgSizeDiff
      } bytes (size: ${svgOptimizedSize} bytes)`
    );

    if (svgOptimizedSize > 3000) {
      throw new Error(`Flag "${svgRawName}" is too large.`);
    }
  }

  fs.rmSync(statsDir, { force: true, recursive: true });
  fs.mkdirSync(statsDir, { recursive: true });
  fs.writeFileSync(statsPath, await format(JSON.stringify(stats), { parser: 'json' }), 'utf8');
  console.log(`Write optimized flag stats into "${statsPath}"`);

  const sortedManifestKeys = Object.keys(manifest).sort();
  const sortedManifest: Manifest = sortedManifestKeys.reduce((result, key) => {
    result[key] = manifest[key];
    return result;
  }, {} as Manifest);

  fs.writeFileSync(
    path.normalize('./index.ts'),
    `export const CDN_BASE_PATH = '/${CDN_BASE_PATH_FLAGS}';
export const FLAGS_MANIFEST = ${JSON.stringify(sortedManifest)};
export const FLAG_NAMES = ${JSON.stringify(sortedManifestKeys)} as const;
export type FlagName = typeof FLAG_NAMES[number];
`
  );

  console.log('Created flags manifest.');
};

(async (): Promise<void> => {
  const files = globbySync('./src/**/*.svg').sort();
  await createManifestAndOptimizeFlags(files, config);
})();
