import * as fs from 'fs';
import * as path from 'path';
import * as globby from 'globby';
import { paramCase } from 'change-case';
import { TAG_NAMES, TAG_NAMES_WITH_SKELETON, TagName } from '../src/lib/tagNames';

const glue = '\n\n';
// TODO: typing as component property string
type SkeletonRelevantProps = { propName: string; shouldAddValueToClassName: boolean }[];

/*
 * This array includes all properties that are relevant for the skeleton sizes,
 * it is used to add classes based on set properties in angular and react,
 * so that our skeleton style selectors can work and adjust
 * e.g. color based on the pds-skeleton--theme-dark class.
 */
const SKELETON_RELEVANT_PROPS: SkeletonRelevantProps = [
  { propName: 'compact', shouldAddValueToClassName: false },
  { propName: 'description', shouldAddValueToClassName: false },
  { propName: 'hideLabel', shouldAddValueToClassName: false },
  { propName: 'itemsPerPage ', shouldAddValueToClassName: true },
  { propName: 'label', shouldAddValueToClassName: false },
  { propName: 'labelSize', shouldAddValueToClassName: false },
  { propName: 'open', shouldAddValueToClassName: false },
  { propName: 'size', shouldAddValueToClassName: true },
  { propName: 'stretch', shouldAddValueToClassName: false },
  { propName: 'theme', shouldAddValueToClassName: true },
  { propName: 'totalItemsCount', shouldAddValueToClassName: false },
  { propName: 'variant', shouldAddValueToClassName: true },
];

/*
 * An array of all tagNames that should be used when running patchStencil.
 * These components will get a slot appended to, when Stencil attaches the shadowDOM
 * and get this slot removed when hydration is finished, to ensure skeleton visibility of child components inside them.
 */
const TAG_NAMES_TO_ADD_SLOT_TO: TagName[] = ['p-fieldset-wrapper', 'p-text-list', 'p-text-list-item'];

const generateComponentMeta = (): void => {
  // can't resolve @porsche-design-system/components without building it first, therefore we use relative path
  const sourceDirectory = path.resolve('../components/src/components');
  const componentFiles = globby.sync(`${sourceDirectory}/**/*.tsx`);

  const imports = `import type { TagName } from './tagNames'`;

  const types = [
    `export type ComponentMeta = {
  isDelegatingFocus: boolean;
  isThemeable: boolean;
  requiredParent?: TagName;
  requiredChild?: string;
  requiredProps?: {
    [propName: string]: string;
  }[];
  hasSlottedCss: boolean;
  hasSkeleton: boolean;
  shouldPatchSlot: boolean;
  skeletonProps: { propName: string; shouldAddValueToClassName: boolean }[];
  styling: 'jss' | 'scss' | 'hybrid';
};`,
    `type ComponentsMeta = { [key in TagName]: ComponentMeta };`,
  ].join(glue);

  type ComponentMeta = {
    isDelegatingFocus: boolean;
    isThemeable: boolean;
    requiredParent?: TagName;
    requiredChild?: string;
    requiredProps?: {
      [propName: string]: string;
    }[];
    hasSlottedCss: boolean;
    hasSkeleton: boolean;
    shouldPatchSlot: boolean;
    skeletonProps: { propName: string; shouldAddValueToClassName: boolean }[];
    styling: 'jss' | 'scss' | 'hybrid';
  };

  type ComponentsMeta = {
    [key in TagName]: ComponentMeta;
  };

  const componentSourceCode: { [key in TagName]: string } = componentFiles.reduce((result, filePath) => {
    const tagName: TagName = ('p-' + path.basename(filePath).replace('.tsx', '')) as TagName;

    // get rid of functional components like StateMessage
    if (TAG_NAMES.includes(tagName)) {
      result[tagName] = fs.readFileSync(filePath, 'utf8');
    }

    return result;
  }, {} as { [key in TagName]: string });

  const meta: ComponentsMeta = TAG_NAMES.reduce((result, tagName) => {
    const source = componentSourceCode[tagName];
    const isDelegatingFocus = source.includes('delegatesFocus: true');
    const isThemeable = source.includes('public theme?: Theme');
    const hasSlottedCss = source.includes('attachSlottedCss');
    const hasSkeleton = TAG_NAMES_WITH_SKELETON.includes(tagName);
    const shouldPatchSlot = TAG_NAMES_TO_ADD_SLOT_TO.includes(tagName);
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

    const skeletonProps: ComponentMeta['skeletonProps'] = [];
    if (hasSkeleton) {
      // extract all matching skeleton relevant props into an array
      SKELETON_RELEVANT_PROPS.forEach(({ propName, shouldAddValueToClassName }) => {
        const [match] = new RegExp(`@Prop\\(\\) public ${propName}\\?: .+;`).exec(source) ?? [];
        if (match) {
          skeletonProps.push({ propName, shouldAddValueToClassName });
        }
      });
    }

    result[tagName] = {
      isDelegatingFocus,
      isThemeable,
      requiredParent,
      requiredChild,
      requiredProps,
      hasSlottedCss,
      hasSkeleton,
      shouldPatchSlot,
      skeletonProps,
      styling,
    };
    return result;
  }, {} as ComponentsMeta);

  const functions = [
    `export const componentMeta: ComponentsMeta = ${JSON.stringify(meta)};`,
    `export const getComponentMeta = (component: TagName): ComponentMeta => componentMeta[component];`,
  ].join(glue);

  const content = [imports, types, functions].join(glue);

  const targetDirectory = path.normalize('./src/lib');
  fs.mkdirSync(path.resolve(targetDirectory), { recursive: true });

  const targetFileName = 'componentMeta.ts';
  const targetFile = path.resolve(targetDirectory, targetFileName);
  fs.writeFileSync(targetFile, content);

  console.log(`Generated ${targetFileName}`);
};

generateComponentMeta();
