import * as fs from 'fs';
import * as path from 'path';
import * as globby from 'globby';
import { TAG_NAMES, TagName } from '../src/lib/tagNames';

const generateComponentMeta = (): void => {
  // can't resolve @porsche-design-system/components without building it first, therefore we use relative path
  const sourceDirectory = path.resolve('../components/src/components');
  const componentFiles = globby.sync(`${sourceDirectory}/**/*.tsx`);

  const imports = [`import type { TagName } from '..'`].join('\n');

  const types = [`type Meta = { isThemeable: boolean; };`, `type ComponentMeta = { [key in TagName]: Meta };`].join(
    '\n'
  );

  type Meta = { isThemeable: boolean };
  type ComponentMeta = { [key in TagName]: Meta };

  const componentSourceCode: { [key in TagName]: string } = componentFiles.reduce((result, filePath) => {
    const tagName: TagName = ('p-' + path.basename(filePath).replace('.tsx', '')) as TagName;
    result[tagName] = fs.readFileSync(filePath, 'utf8');
    return result;
  }, {} as { [key in TagName]: string });

  const meta: ComponentMeta = TAG_NAMES.reduce((result, tagName) => {
    const isThemeable = !!componentSourceCode[tagName].match(/public theme\?: Theme/);

    result[tagName] = { isThemeable };
    return result;
  }, {} as ComponentMeta);

  const functions = `export const getComponentMeta = (component: TagName): Meta => {
  const componentMeta: ComponentMeta = ${JSON.stringify(meta)};
  return componentMeta[component];
};`;

  const content = [imports, types, functions].join('\n\n');

  const targetDirectory = path.normalize('./src/lib');
  fs.mkdirSync(path.resolve(targetDirectory), { recursive: true });

  const targetFileName = 'componentMeta.ts';
  const targetFile = path.resolve(targetDirectory, targetFileName);
  fs.writeFileSync(targetFile, content);

  console.log(`Generated ${targetFileName}`);
};

generateComponentMeta();
