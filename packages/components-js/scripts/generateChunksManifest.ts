import * as fs from 'fs';
import * as path from 'path';
import { paramCase } from 'change-case';
import type { TagName } from '@porsche-design-system/shared';

type Manifest = {
  [key in TagName | 'core']?: string;
};

const createManifest = (indexJsFile: string): Manifest => {
  // read web components manager to retrieve url to stencil core entrypoint
  const indexJsCode = fs.readFileSync(indexJsFile, 'utf8');
  const [, coreFileName] = /\/components\/(porsche-design-system\.v.*\.js)/.exec(indexJsCode) || [];

  // read stencil core entrypoint to retrieve component chunk mapping
  const chunksDir = path.resolve(indexJsFile, '../../components');
  const coreJsFile = path.resolve(chunksDir, coreFileName);
  const coreJsCode = fs.readFileSync(coreJsFile, 'utf8');

  const [, rawChunkFileMapping] = /porsche-design-system\.".*?({.*?})/.exec(coreJsCode) || [];
  const chunkFileMapping = eval(`(${rawChunkFileMapping})`); // convert object string to real js object
  const chunkFileNames = Object.entries(chunkFileMapping).map(
    ([chunk, hash]) => `porsche-design-system.${chunk}.${hash}.js`
  );

  // build manifest
  const manifest: Manifest = {
    core: coreFileName,
  };

  chunkFileNames.forEach((chunkFileName) => {
    const [, componentName] = /\.([a-z-]+)\./.exec(chunkFileName) || [];
    manifest[paramCase(componentName) as keyof Manifest] = chunkFileName;
  });

  return manifest;
};

const generateChunksManifest = (): void => {
  let manifest: Manifest = {}; // fallback

  const packageName = '@porsche-design-system/components-js';
  try {
    const indexJsFile = require.resolve(packageName);
    manifest = createManifest(indexJsFile);
  } catch (e) {
    console.log(`Error: ${packageName} can't be resolved, so manifest will be empty`);
  }

  const chunkNames = Object.keys(manifest).filter((chunkName) => chunkName !== 'core');
  const content = `export const COMPONENT_CHUNKS_MANIFEST = ${JSON.stringify(manifest)};

export const COMPONENT_CHUNK_NAMES = [${chunkNames.map((x) => `'${x}'`).join(', ')}] as const;
export type ComponentChunkName = typeof COMPONENT_CHUNK_NAMES[number];`;

  const targetDirectory = path.normalize('./projects/components-wrapper/lib');
  fs.mkdirSync(path.resolve(targetDirectory), { recursive: true });

  const targetFileName = 'chunksManifest.ts';
  const targetFile = path.resolve(targetDirectory, targetFileName);
  fs.writeFileSync(targetFile, content);

  console.log(`Generated ${targetFileName} for ${Object.keys(manifest).length} chunks`);
};

generateChunksManifest();
