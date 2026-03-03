import { bundles } from '@porsche-design-system/components/stencil.config';
import fs from 'fs';
import path from 'path';
import type { TagName } from '../src/lib/tagNames';
import { TAG_NAMES } from '../src/lib/tagNames';

const generateTagNamesWithChunk = (): void => {
  const tagNamesWithoutChunk = bundles.map(({ components }) => components.slice(1)).flat();
  const tagNamesWithChunk: TagName[] = TAG_NAMES.filter((chunk) => !tagNamesWithoutChunk.includes(chunk));

  const content = `export const TAG_NAMES_WITH_CHUNK = [${tagNamesWithChunk.map((x) => `'${x}'`).join(', ')}] as const;
export type TagNameWithChunk = typeof TAG_NAMES_WITH_CHUNK[number];`;

  const targetDirectory = path.normalize('./src/lib');
  fs.mkdirSync(path.resolve(targetDirectory), { recursive: true });

  const targetFileName = 'tagNamesWithChunk.ts';
  const targetFile = path.resolve(targetDirectory, targetFileName);
  fs.writeFileSync(targetFile, content);

  console.log(`Generated ${targetFileName} for ${tagNamesWithChunk.length} tags`);
};

generateTagNamesWithChunk();
