import * as fs from 'fs';
import * as path from 'path';
import { camelCase } from 'change-case';
import { TAG_NAMES, TagName, TagNameCamelCase } from '../src/lib/tagNames';
import { globbySync } from 'globby';

const generateComponentMeta = (): void => {
  // can't resolve @porsche-design-system/components without building it first, therefore we use relative path
  const sourceDirectory = path.resolve('../components/src/components');
  const componentFiles = globbySync(`${sourceDirectory}/**/*.tsx`);

  const imports = [`import type { TagName, TagNameCamelCase } from './tagNames'`].join('\n');

  const types = [
    `type Meta = { isFocusable: boolean; isThemeable: boolean; };`,
    `type ComponentMeta = { [key in TagName]: Meta };`,
  ].join('\n');

  type Meta = {
    isFocusable: boolean;
    isThemeable: boolean;
  };

  type ComponentMeta = {
    [key in TagName]: Meta;
  };

  const componentSourceCode: { [key in TagName]: string } = componentFiles.reduce((result, filePath) => {
    const tagName: TagName = ('p-' + path.basename(filePath).replace('.tsx', '')) as TagName;
    result[tagName] = fs.readFileSync(filePath, 'utf8');
    return result;
  }, {} as { [key in TagName]: string });

  // simple (mostly atomic) focusable components are identified here
  const atomicFocusableTagNames: TagName[] = TAG_NAMES.filter(
    (tagName) =>
      componentSourceCode[tagName].includes('improveFocusHandlingForCustomElement(') ||
      componentSourceCode[tagName].includes('<button')
  );

  const meta: ComponentMeta = TAG_NAMES.reduce((result, tagName) => {
    // a component is focusable if it was identified as an atomic focusable before
    // or if it contains another atomic focusable prefixed component
    const isFocusable =
      atomicFocusableTagNames.includes(tagName) ||
      atomicFocusableTagNames.some((x) => componentSourceCode[tagName].includes(`PrefixedTagNames.${camelCase(x)}`));
    const isThemeable = componentSourceCode[tagName].includes('public theme?: Theme');

    result[tagName] = { isFocusable, isThemeable };
    return result;
  }, {} as ComponentMeta);

  const focusableTagNames: TagNameCamelCase[] = Object.entries(meta)
    .filter(([_, value]) => value.isFocusable)
    .map(([key]) => camelCase(key) as TagNameCamelCase);

  const functions = `export const getComponentMeta = (component: TagName): Meta => {
  const componentMeta: ComponentMeta = ${JSON.stringify(meta)};
  return componentMeta[component];
};

export const FOCUSABLE_TAG_NAMES_CAMEL_CASE: TagNameCamelCase[] = ${JSON.stringify(focusableTagNames)};`;

  const content = [imports, types, functions].join('\n\n');

  const targetDirectory = path.normalize('./src/lib');
  fs.mkdirSync(path.resolve(targetDirectory), { recursive: true });

  const targetFileName = 'componentMeta.ts';
  const targetFile = path.resolve(targetDirectory, targetFileName);
  fs.writeFileSync(targetFile, content);

  console.log(`Generated ${targetFileName}`);
};

generateComponentMeta();
