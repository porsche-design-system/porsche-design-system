import { TAG_NAMES } from '../src/lib/tagNames';
import { bundles } from '../../components/stencil.config';
import path from 'path';
import fs from 'fs';

const generateChunkNames = (): void => {
  const bundlesWithoutParent = bundles.map(({ components }) => components.slice(1)).flat();
  const tagNamesWithoutChildren = TAG_NAMES.filter((chunk) => !bundlesWithoutParent.includes(chunk));

  const content = `export const COMPONENT_CHUNK_NAMES = [${tagNamesWithoutChildren
    .map((x) => `'${x}'`)
    .join(', ')}] as const;
export type ComponentChunkName = typeof COMPONENT_CHUNK_NAMES[number];`;

  const targetDirectory = path.normalize('./src/lib');
  fs.mkdirSync(path.resolve(targetDirectory), { recursive: true });

  const targetFileName = 'componentChunkNames.ts';
  const targetFile = path.resolve(targetDirectory, targetFileName);
  fs.writeFileSync(targetFile, content);

  console.log(`Generated ${targetFileName} for ${tagNamesWithoutChildren.length} tags`);
};

generateChunkNames();
