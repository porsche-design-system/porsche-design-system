import * as fs from 'fs';
import * as path from 'path';
import * as globby from 'globby';
import { camelCase } from 'change-case';

const INTERNAL_TAG_NAMES = ['p-select-wrapper-dropdown', 'p-toast-item'];

const generateTagNames = (): void => {
  // can't resolve @porsche-design-system/components without building it first, therefore we use relative path
  const sourceDirectory = path.resolve('../components/src/components');

  const componentFiles = globby.sync(`${sourceDirectory}/**/*.tsx`);
  const tags = componentFiles
    .filter((file) => !file.includes('-utils')) // skip utils files that have tsx extension
    .map((file) => {
      const fileContent = fs.readFileSync(file, 'utf8');
      const [, tag] = /tag: '([a-z-]*)'/.exec(fileContent) || []; // functional components don't match here
      return tag;
    })
    .filter((x) => x) // filter out undefined values
    .sort();

  const content = `export const TAG_NAMES = [${tags.map((x) => `'${x}'`).join(', ')}] as const;
export type TagName = typeof TAG_NAMES[number];

// TODO: replace with generic in TS4.1: https://stackoverflow.com/questions/57807009/typescript-generic-to-turn-underscore-object-to-camel-case
export type TagNameCamelCase = ${tags.map((x) => `'${camelCase(x)}'`).join(' | ')};

export const INTERNAL_TAG_NAMES: TagName[] = [${INTERNAL_TAG_NAMES.map((x) => `'${x}'`).join(', ')}];`;

  const targetDirectory = path.normalize('./src/lib');
  fs.mkdirSync(path.resolve(targetDirectory), { recursive: true });

  const targetFileName = 'tagNames.ts';
  const targetFile = path.resolve(targetDirectory, targetFileName);
  fs.writeFileSync(targetFile, content);

  console.log(['INTERNAL_TAG_NAMES:', ...INTERNAL_TAG_NAMES.map((x) => `– ${x}`)].join('\n'));
  console.log(`Generated ${targetFileName} for ${tags.length} tags`);
};

generateTagNames();
