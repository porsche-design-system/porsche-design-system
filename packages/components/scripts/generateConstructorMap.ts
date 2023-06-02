import * as fs from 'fs';
import * as path from 'path';
import * as globby from 'globby';
import type { TagName } from '@porsche-design-system/shared';
import { TAG_NAMES } from '@porsche-design-system/shared';
import { pascalCase } from 'change-case';

const generateConstructorMap = (): void => {
  const sourceDirectory = path.resolve('./src/components');
  const componentFiles = globby.sync(`${sourceDirectory}/**/*.tsx`);

  const importsRaw: string[] = ["import type { TagName } from '@porsche-design-system/shared';"];

  const tagNamesConstructorMap: string = componentFiles
    .map((filePath) => {
      const tagName: TagName = ('p-' + path.basename(filePath).replace('.tsx', '')) as TagName;

      // get rid of functional components like StateMessage
      if (TAG_NAMES.includes(tagName)) {
        const className = pascalCase(tagName.replace('p-', ''));
        const relativePath = filePath.replace(sourceDirectory, '../components').replace('.tsx', '');
        importsRaw.push(`import { ${className} } from '${relativePath}';`);

        return `'${tagName}': ${className}`;
      }
    })
    .filter((x) => x)
    .sort()
    .join(',\n  ');

  const imports = importsRaw.sort().join('\n');

  const types = `export type ClassType = {
  host: HTMLElement;
  connectedCallback?: () => void;
  componentWillLoad?: () => void;
  componentWillRender?: () => void;
  disconnectedCallback?: () => void;
  componentShouldUpdate?: (newValue: unknown, oldValue: unknown, propName: string) => boolean;
  render: () => void;
};`;

  const functions = `export const TAG_NAMES_CONSTRUCTOR_MAP: { [key in TagName]: new () => ClassType } = {
  ${tagNamesConstructorMap},
};`;

  const content = ['/* Auto Generated File */', imports, types, functions].join('\n\n');

  const fileName = 'src/test-utils/tag-names-constructor-map.ts';
  const rootDirectory = path.resolve(__dirname, '..');
  const filePath = path.resolve(rootDirectory, fileName);

  fs.writeFileSync(filePath, content);
  console.log(`Wrote TAG_NAMES_CONSTRUCTOR_MAP into '${fileName}'`);
};

generateConstructorMap();
