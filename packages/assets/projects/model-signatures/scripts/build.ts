import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import { globbySync } from 'globby';
import { kebabCase } from 'change-case';
import { optimize, Config } from 'svgo';
import { CDN_BASE_PATH_MODEL_SIGNATURES } from '../../../../../cdn.config';
import { config } from '../svgo.config';

type Manifest = {
  [name: string]: {
    src: string;
    width: number;
    height: number;
  };
};

const toHash = (str: string): string => crypto.createHash('md5').update(str, 'utf8').digest('hex');

const getSVGDimensions = (svg: string): { width: number; height: number } => {
  const [, width, height] = /<svg.+viewBox=["']\d+\s+\d+\s+(\d+)\s+(\d+)["']/.exec(svg) || [];
  return {
    width: parseInt(width),
    height: parseInt(height),
  };
};

const createManifestAndCopyAssets = (files: string[], config: Config): void => {
  fs.rmSync(path.normalize('./dist'), { force: true, recursive: true });
  fs.mkdirSync(path.normalize('./dist/model-signatures'), { recursive: true });

  const manifest: Manifest = {};

  for (const file of files) {
    const svgRawPath = path.normalize(file);
    const svgRawName = path.basename(svgRawPath, '.svg');
    const svgRawData = fs.readFileSync(svgRawPath, 'utf8');
    const svgOptimizedData = optimize(svgRawData, config).data;
    const svgOptimizedHash = toHash(svgOptimizedData);
    const svgOptimizedFilename = `${kebabCase(svgRawName)}.min.${svgOptimizedHash}.svg`;
    const svgOptimizedPath = path.normalize(`./dist/model-signatures/${svgOptimizedFilename}`);
    const { width, height } = getSVGDimensions(svgOptimizedData);

    if (svgRawName !== kebabCase(svgRawName)) {
      throw new Error(`Model Signature name "${svgRawName}" does not fit naming convention »kebab-case«.`);
    }
    if (svgRawName in manifest) {
      throw new Error(`Model Signature name "${svgRawName}" is not unique.`);
    }

    manifest[svgRawName] = {
      src: svgOptimizedFilename,
      width,
      height,
    };

    fs.writeFileSync(svgOptimizedPath, svgOptimizedData, 'utf8');

    console.log(`Model signature "${svgRawName}" optimized`);
  }

  fs.writeFileSync(
    path.normalize('./index.ts'),
    `export const CDN_BASE_PATH = '/${CDN_BASE_PATH_MODEL_SIGNATURES}';
export const MODEL_SIGNATURES_MANIFEST = ${JSON.stringify(manifest)};
`
  );

  console.log('Created model-signatures manifest.');
};

const files = globbySync('./src/*.svg').sort();
createManifestAndCopyAssets(files, config);
