import path from 'path';
import fs from 'fs';
import * as globby from 'globby';

const generateTagNamesWithChunk = (): void => {
  // can't resolve @porsche-design-system/components-js without building it first, therefore we use relative path
  const componentsJsSourceDirectory = path.resolve('../components-js/projects/partials/scripts');

  const partialFileNames = globby.sync(`${componentsJsSourceDirectory}/*Partial.ts`);

  const partialNames = partialFileNames
    .map((fileName) => {
      const fileContent = fs.readFileSync(fileName, 'utf8');
      const [, partialName] = /export function ([A-Za-z]+)/g.exec(fileContent) || [];
      return partialName;
    })
    .sort();

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
