import * as fs from 'fs';
import * as path from 'path';
import type { TagName } from '@porsche-design-system/shared';
import { paramCase } from 'change-case';

type Manifest = {
  [key in TagName | 'core']?: string;
};

const createManifest = (indexJsFile: string): Manifest => {
  // read web components manager to retrieve url to stencil core entrypoint
  const indexJsCode = fs.readFileSync(indexJsFile, 'utf8');

  if (indexJsCode.includes('localhost:3001')) {
    throw new Error('You need to run `yarn build:components-js-prod` in order to have a prod build.');
  }

  const [, coreFileName] = /porsche-design-system\/components\/(porsche-design-system\.v.*\.js)/.exec(indexJsCode);

  // read stencil core entrypoint to retrieve component chunk mapping
  const chunksDir = path.resolve(indexJsFile, '../../components');
  const coreJsFile = path.resolve(chunksDir, coreFileName);
  const coreJsCode = fs.readFileSync(coreJsFile, 'utf8');

  const [, rawChunkFileMapping] = /porsche-design-system\.".*?({.*?})/.exec(coreJsCode);
  const chunkFileMapping = eval(`(${rawChunkFileMapping})`); // convert object string to real js object
  const chunkFileNames = Object.entries(chunkFileMapping).map(
    ([chunk, hash]) => `porsche-design-system.${chunk}.${hash}.js`
  );

  // build manifest
  const manifest: Manifest = {
    core: coreFileName,
  };

  chunkFileNames.forEach((chunkName) => {
    const chunkFile = path.resolve(chunksDir, chunkName);
    const chunkCode = fs.readFileSync(chunkFile, 'utf8');
    const [, componentName] = /,{(p_[a-z_]*):function/.exec(chunkCode);
    manifest[paramCase(componentName)] = chunkName;
  });

  return manifest;
};

const generateChunksManifest = (): void => {
  let manifest: Manifest = {};

  try {
    const indexJsFile = require.resolve('@porsche-design-system/components-js');
    manifest = createManifest(indexJsFile);
  } catch (e) {
    console.log("Error: @porsche-design-system/components-js can't be resolved, so manifest will be empty");
  }

  const content = `export const COMPONENT_CHUNKS_MANIFEST = ${JSON.stringify(manifest)};`;

  const targetDirectory = path.normalize('./src/lib');
  fs.mkdirSync(path.resolve(targetDirectory), { recursive: true });

  const targetFileName = 'chunksManifest.ts';
  const targetFile = path.resolve(targetDirectory, targetFileName);
  fs.writeFileSync(targetFile, content);

  console.log(`Generated ${targetFileName} for ${Object.keys(manifest).length} chunks`);
};

generateChunksManifest();
