import * as fs from 'fs';
import * as path from 'path';
import * as globby from 'globby';
import { camelCase, paramCase } from 'change-case';
import { TAG_NAMES, TagName, TagNameCamelCase } from '../src/lib/tagNames';

const generateComponentMeta = (): void => {
  // can't resolve @porsche-design-system/components without building it first, therefore we use relative path
  const sourceDirectory = path.resolve('../components/src/components');
  const componentFiles = globby.sync(`${sourceDirectory}/**/*.tsx`);

  const imports = [`import type { TagName, TagNameCamelCase } from './tagNames'`].join('\n');

  const types = [
    `export type ComponentMeta = {
  isDelegatingFocus: boolean;
  isFocusable: boolean;
  isThemeable: boolean;
  requiredParent?: TagName;
  requiredChild?: string;
  requiredProps?: {
    [propName: string]: string;
  }[];
  hasSlottedCss: boolean;
  styling: 'jss' | 'scss' | 'hybrid';
};`,
    `type ComponentsMeta = { [key in TagName]: ComponentMeta };`,
  ].join('\n');

  type ComponentMeta = {
    isDelegatingFocus: boolean;
    isFocusable: boolean;
    isThemeable: boolean;
    requiredParent?: TagName;
    requiredChild?: string;
    requiredProps?: {
      [propName: string]: string;
    }[];
    hasSlottedCss: boolean;
    styling: 'jss' | 'scss' | 'hybrid';
  };

  type ComponentsMeta = {
    [key in TagName]: ComponentMeta;
  };

  const componentSourceCode: { [key in TagName]: string } = componentFiles.reduce((result, filePath) => {
    const tagName: TagName = ('p-' + path.basename(filePath).replace('.tsx', '')) as TagName;
    result[tagName] = fs.readFileSync(filePath, 'utf8');
    return result;
  }, {} as { [key in TagName]: string });

  const delegatesFocus = (tagName): boolean => componentSourceCode[tagName].includes('delegatesFocus: true');

  // simple (mostly atomic) focusable components are identified here
  const atomicFocusableTagNames: TagName[] = TAG_NAMES.filter(
    (tagName) => delegatesFocus(tagName) || componentSourceCode[tagName].includes('<button')
  );

  const meta: ComponentsMeta = TAG_NAMES.reduce((result, tagName) => {
    const source = componentSourceCode[tagName];
    const isDelegatingFocus = delegatesFocus(tagName);
    // a component is focusable if it was identified as an atomic focusable before
    // or if it contains another atomic focusable prefixed component
    const isFocusable =
      atomicFocusableTagNames.includes(tagName) ||
      atomicFocusableTagNames.some((x) => source.includes(`PrefixedTagNames.${camelCase(x)}`));
    const isThemeable = source.includes('public theme?: Theme');
    const hasSlottedCss = source.includes('attachSlottedCss');
    const usesScss = source.includes('styleUrl:');
    const usesJss = source.includes('attachComponentCss');
    const styling = usesScss && usesJss ? 'hybrid' : usesJss ? 'jss' : 'scss';

    const [, requiredParentCamelCase] = /throwIfParentIsNotOfKind\(.+'(\w+)'\)/.exec(source) ?? [];
    const requiredParent = requiredParentCamelCase ? (paramCase(requiredParentCamelCase) as TagName) : undefined;

    let [, requiredChild] = /getHTMLElementAndThrowIfUndefined\(\s*this\.host,((?:.|\s)+?)\);/.exec(source) ?? [];
    requiredChild = requiredChild?.trim();

    if (requiredChild) {
      const cleanSelector = (markup: string): string =>
        markup
          .replace(/\[/g, ' ') // replace opening bracket of attribute selector
          .replace(/]/g, ''); // replace closing bracket of attribute selector

      if (requiredChild.startsWith("'") && requiredChild.endsWith("'")) {
        requiredChild = cleanSelector(requiredChild);
        requiredChild = requiredChild.slice(1, -1);
      } else {
        const [, valueRaw] = new RegExp(`const ${requiredChild} = ((?:.|\\s)*?;)`).exec(source) ?? [];
        const value = eval(`${valueRaw || requiredChild}`);
        requiredChild = value.split(',')[0];
        requiredChild = cleanSelector(requiredChild);
      }
    }

    const [, requiredProp] = /throwIfInvalidLinkUsage\(this\.host, this\.(\w+)\);/.exec(source) ?? [];

    let requiredProps: ComponentMeta['requiredProps'];
    if (requiredProp) {
      const [, propType] = new RegExp(`@Prop\\(\\) public ${requiredProp}\\?: (.+);`).exec(source) ?? [];
      requiredProps = [{ [requiredProp]: propType }];
    }

    result[tagName] = {
      isDelegatingFocus,
      isFocusable,
      isThemeable,
      requiredParent,
      requiredChild,
      requiredProps,
      hasSlottedCss,
      styling,
    };
    return result;
  }, {} as ComponentsMeta);

  // loop again to check if focusable components are used inside other components
  const entries = Object.entries(meta);
  for (const [tagName] of entries) {
    const source = componentSourceCode[tagName];

    if (entries.some(([tag, data]) => data.isFocusable && source.includes(`PrefixedTagNames.${camelCase(tag)}`))) {
      meta[tagName].isFocusable = true;
    }
  }

  const focusableTagNames: TagNameCamelCase[] = Object.entries(meta)
    .filter(([_, value]) => value.isFocusable)
    .map(([key]) => camelCase(key) as TagNameCamelCase)
    .sort();

  const functions = `export const componentMeta: ComponentsMeta = ${JSON.stringify(meta)};

export const getComponentMeta = (component: TagName): ComponentMeta => {
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
