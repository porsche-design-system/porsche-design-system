import { TAG_NAMES } from '../src/lib/tagNames';
import type { TagName } from '../src/lib/tagNames';
import { bundles } from '../../components/stencil.config';
import path from 'path';
import fs from 'fs';

const generateChunkNames = (): void => {
  const tagNamesWithoutChunk = bundles.map(({ components }) => components.slice(1)).flat();
  const tagNamesWithChunk: TagName[] = TAG_NAMES.filter((chunk) => !tagNamesWithoutChunk.includes(chunk));

  const content = `export const COMPONENT_TAG_NAMES_WITH_CHUNK = [${tagNamesWithChunk
    .map((x) => `'${x}'`)
    .join(', ')}] as const;
export type ComponentChunkName = typeof COMPONENT_TAG_NAMES_WITH_CHUNK[number];`;

  const targetDirectory = path.normalize('./src/lib');
  fs.mkdirSync(path.resolve(targetDirectory), { recursive: true });

  const targetFileName = 'componentChunkNames.ts';
  const targetFile = path.resolve(targetDirectory, targetFileName);
  fs.writeFileSync(targetFile, content);

  console.log(`Generated ${targetFileName} for ${tagNamesWithChunk.length} tags`);
};

generateChunkNames();
