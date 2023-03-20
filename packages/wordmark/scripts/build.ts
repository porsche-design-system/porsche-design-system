import { CDN_BASE_PATH_WORDMARK, CDN_BASE_URL_DYNAMIC, CDN_KEY_TYPE_DEFINITION } from '../../../cdn.config';
import * as fs from 'fs';
import * as path from 'path';
import { optimize, Config } from 'svgo';
import globby from 'globby';
import * as crypto from 'crypto';
import { paramCase } from 'change-case';

type Manifest = {
  [name: string]: string;
};

const toHash = (str: string): string => crypto.createHash('md5').update(str, 'utf8').digest('hex');

const createManifestAndCopyAssets = (cdn: string, files: string[], config: Config): void => {
  fs.rmSync(path.normalize('./dist'), { force: true, recursive: true });
  fs.mkdirSync(path.normalize('./dist/wordmark'), { recursive: true });

  const manifest: Manifest = {};

  // TODO: loop is not needed for only one file
  for (const file of files) {
    const svgRawPath = path.normalize(file);
    const svgRawName = path.basename(svgRawPath, '.svg');
    const svgRawData = fs.readFileSync(svgRawPath, 'utf8');
    const svgOptimizedData = optimize(svgRawData, config).data;
    const svgOptimizedHash = toHash(svgOptimizedData);
    const svgOptimizedFilename = `${paramCase(svgRawName)}.min.${svgOptimizedHash}.svg`;
    const svgOptimizedPath = path.normalize(`./dist/wordmark/${svgOptimizedFilename}`);

    manifest[svgRawName] = svgOptimizedFilename;

    fs.copyFileSync(svgRawPath, svgOptimizedPath);

    console.log(`Wordmark "${svgRawName}" copied`);

    const svgRawSize = fs.statSync(svgRawPath).size;
    const svgOptimizedSize = fs.statSync(svgOptimizedPath).size;
    const svgSizeDiff = svgOptimizedSize - svgRawSize;

    console.log(
      `Icon "${svgRawName}" optimized: ${
        svgSizeDiff < 0 ? svgSizeDiff : '+' + svgSizeDiff
      } bytes (size: ${svgOptimizedSize} bytes)`
    );
  }

  fs.writeFileSync(
    path.normalize('./index.ts'),
    `${CDN_KEY_TYPE_DEFINITION}

export const WORDMARKS_CDN_BASE_URL = ${cdn};
export const WORDMARKS_MANIFEST = ${JSON.stringify(manifest)};`
  );

  console.log('Created wordmarks manifest.');
};

const cdn = `${CDN_BASE_URL_DYNAMIC} + '/${CDN_BASE_PATH_WORDMARK}'`;
const files = globby.sync('./src/raw/*.svg').sort();
const config: Config = require('../svgo.config.js');

createManifestAndCopyAssets(cdn, files, config);
