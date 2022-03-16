import * as fs from 'fs';
import * as path from 'path';
import * as globby from 'globby';
import type { TagName } from '@porsche-design-system/shared';
import { TAG_NAMES } from '@porsche-design-system/shared';
import { pascalCase } from 'change-case';

const generateConstructorMap = (): void => {
  const sourceDirectory = path.resolve('./src/components');
  const componentFiles = globby.sync(`${sourceDirectory}/**/*.tsx`);

  const importsRaw: string[] = [];

  const tagNamesConstructorMap: string = componentFiles
    .map((filePath) => {
      const tagName: TagName = ('p-' + path.basename(filePath).replace('.tsx', '')) as TagName;

      // get rid of functional components like StateMessage
      if (TAG_NAMES.includes(tagName)) {
        const className = pascalCase(tagName.replace('p-', ''));
        const relativePath = filePath.replace(sourceDirectory, '.').replace('.tsx', '');
        importsRaw.push(`import { ${className} } from '${relativePath}';`);

        return `'${tagName}': ${className}`;
      }
    })
    .filter((x) => x)
    .join(',\n  ');

  const imports = importsRaw.join('\n');

  const types = `type ClassType = {
  host: HTMLElement;
  connectedCallback?: () => void;
  componentWillLoad?: () => void;
  componentWillRender?: () => void;
  render: () => void;
};`;

  const functions = `export const TAG_NAMES_CONSTRUCTOR_MAP: { [key in TagName]: new () => ClassType } = {
  ${tagNamesConstructorMap},
};`;

  const content = [imports, types, functions].join('\n\n');

  const fileName = 'src/components/lifecycleValidation.spec.ts';
  const rootDirectory = path.resolve(__dirname, '..');
  const filePath = path.resolve(rootDirectory, fileName);
  const fileContent = fs.readFileSync(filePath, 'utf8');

  const newFileContent = fileContent.replace(
    /(\/\* Auto Generated Start \*\/\s)(?:.|\s)*?(\s\/\* Auto Generated End \*\/)/,
    `$1${content}$2`
  );

  fs.writeFileSync(filePath, newFileContent);
  console.log(`Injected TAG_NAMES_CONSTRUCTOR_MAP into '${fileName}'`);
};

generateConstructorMap();
