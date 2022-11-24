import path from 'path';
import fs from 'fs';
import * as partials from '../../components-js/projects/partials';

const generateTagNamesWithChunk = (): void => {
  const partialNames = Object.keys(partials).sort();

  const content = `export const PARTIAL_NAMES = [${partialNames.map((x) => `'${x}'`).join(', ')}] as const;
export type PartialName = typeof PARTIAL_NAMES[number];`;

  const targetDirectory = path.normalize('./src/lib');
  fs.mkdirSync(path.resolve(targetDirectory), { recursive: true });

  const targetFileName = 'partialNames.ts';
  const targetFile = path.resolve(targetDirectory, targetFileName);
  fs.writeFileSync(targetFile, content);

  console.log(`Generated ${targetFileName} for ${partialNames.length} tags`);
};

generateTagNamesWithChunk();
