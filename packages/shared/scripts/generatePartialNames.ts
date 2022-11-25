import path from 'path';
import fs from 'fs';
import * as globby from 'globby';

const generateTagNamesWithChunk = (): void => {
  // can't resolve @porsche-design-system/components-js without building it first, therefore we use relative path
  const componentsJsSourceDirectory = path.resolve('../components-js/projects/partials/scripts');

  const partialsFile = globby.sync(`${componentsJsSourceDirectory}/*.ts`);

  const partials = partialsFile
    .filter((file) => !file.includes('utils' || 'buildPartials')) // skip utils files and buildPartial file
    .map((file) => {
      const fileContent = fs.readFileSync(file, 'utf8');
      const [, partialName] = /export function ([A-z]+)/g.exec(fileContent) || [];
      return partialName;
    })
    .filter((x) => x) // filter out undefined values;
    .sort();

  const content = `export const PARTIAL_NAMES = [${partials.map((x) => `'${x}'`).join(', ')}] as const;
export type PartialName = typeof PARTIAL_NAMES[number];`;

  const targetDirectory = path.normalize('./src/lib');
  fs.mkdirSync(path.resolve(targetDirectory), { recursive: true });

  const targetFileName = 'partialNames.ts';
  const targetFile = path.resolve(targetDirectory, targetFileName);
  fs.writeFileSync(targetFile, content);

  console.log(`Generated ${targetFileName} for ${partials.length} tags`);
};

generateTagNamesWithChunk();
