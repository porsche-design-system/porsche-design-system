import * as fs from 'fs';
import * as path from 'path';
import * as globby from 'globby';
import { paramCase } from 'change-case';
import { TAG_NAMES, INTERNAL_TAG_NAMES, SKELETON_TAG_NAMES, TagName } from '../src/lib/tagNames';

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
  isInternal: boolean;
  isThemeable: boolean;
  requiredParent?: TagName; // typically components with an \`-item\` suffix need the right parent in order to work
  requiredRootNode?: TagName[]; // components, that use this internal component within their shadow DOM
  requiredChild?: string; // direct and only child of kind
  requiredChildSelector?: string; // might contain multiple selectors separated by comma
  props?: {
    [propName: string]: boolean | number | string; // value is the prop's default value
  }[];
  requiredProps?: string[]; // array of props that are mandatory
  hasSlot: boolean;
  hasSlottedCss: boolean;
  hasAriaProp: boolean;
  hasObserveAttributes: boolean;
  observedAttributes?: string[];
  hasObserveChildren: boolean;
  hasSkeleton: boolean;
  shouldPatchSlot: boolean;
  skeletonProps?: { propName: string; shouldAddValueToClassName: boolean }[];
  styling: 'jss' | 'scss' | 'hybrid';
};`,
    `type ComponentsMeta = { [key in TagName]: ComponentMeta };`,
  ].join(glue);

  type ComponentMeta = {
    isDelegatingFocus: boolean;
    isInternal: boolean;
    isThemeable: boolean;
    requiredParent?: TagName; // typically components with an `-item` suffix need the right parent in order to work
    requiredRootNode?: TagName[]; // components, that use this internal component within their shadow DOM
    requiredChild?: string; // direct and only child of kind
    requiredChildSelector?: string; // might contain multiple selectors separated by comma
    props?: {
      [propName: string]: boolean | number | string; // value is the prop's default value
    }[];
    requiredProps?: string[]; // array of props that are mandatory
    hasSlot: boolean;
    hasSlottedCss: boolean;
    hasAriaProp: boolean;
    hasObserveAttributes: boolean;
    observedAttributes?: string[];
    hasObserveChildren: boolean;
    hasSkeleton: boolean;
    shouldPatchSlot: boolean;
    skeletonProps?: { propName: string; shouldAddValueToClassName: boolean }[];
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
    const isInternal = INTERNAL_TAG_NAMES.includes(tagName);
    const isThemeable = source.includes('public theme?: Theme');
    const hasSlot = source.includes('<slot');
    const hasSlottedCss = source.includes('attachSlottedCss');
    const hasAriaProp = source.includes('public aria?: SelectedAriaAttributes');
    const hasObserveAttributes = source.includes('observeAttributes(this.'); // this should be safe enough, but would miss a local variable as first parameter
    const hasObserveChildren = source.includes('observeChildren(this.'); // this should be safe enough, but would miss a local variable as first parameter
    const hasSkeleton = SKELETON_TAG_NAMES.includes(tagName as any);
    const shouldPatchSlot = TAG_NAMES_TO_ADD_SLOT_TO.includes(tagName);
    const usesScss = source.includes('styleUrl:');
    const usesJss = source.includes('attachComponentCss');
    const styling = usesScss && usesJss ? 'hybrid' : usesJss ? 'jss' : 'scss';

    // required parent
    const [, requiredParentCamelCase] = /throwIfParentIsNotOfKind\(.+'(\w+)'\)/.exec(source) || [];
    const requiredParent = requiredParentCamelCase ? (paramCase(requiredParentCamelCase) as TagName) : undefined;

    // required root node
    const [, requiredRootNodesCamelCase] = /throwIfRootNodeIsNotOneOfKind\(.+\[([\w,\s']+)\]\)/.exec(source) || [];
    const requiredRootNodes = requiredRootNodesCamelCase
      ? (requiredRootNodesCamelCase
          .replace(/['\s]/g, '')
          .split(',')
          .map((rootNode) => paramCase(rootNode)) as TagName[])
      : [];

    // required child
    let [, requiredChild] = /getOnlyChildOfKindHTMLElementOrThrow\(\s*this\.host,((?:.|\s)+?)\);/.exec(source) || [];
    requiredChild = requiredChild?.trim();
    let requiredChildSelector: string;

    if (requiredChild) {
      const cleanSelector = (markup: string): string =>
        markup
          .replace(/\[/g, ' ') // replace opening bracket of attribute selector
          .replace(/]/g, ''); // replace closing bracket of attribute selector

      if (requiredChild.startsWith("'") && requiredChild.endsWith("'")) {
        // it's a simple string
        requiredChild = requiredChild.slice(1, -1);
        requiredChildSelector = requiredChild;
        requiredChild = cleanSelector(requiredChild);
      } else {
        // it's a variable or some dynamic value
        const [, valueRaw] = new RegExp(`const ${requiredChild} = ((?:.|\\s)*?;)`).exec(source) || [];
        const value = eval(valueRaw || requiredChild);
        requiredChild = value.split(',')[0];
        requiredChild = cleanSelector(requiredChild);
        requiredChildSelector = value;
      }
    }

    // props
    const props: ComponentMeta['props'] = Array.from(
      // regex can handle value on same line and next line only
      source.matchAll(/@Prop\(.*\) public ([A-z]+)\??(?:: (.+?))?(?:=[^>]\s*(.+))?;/g)
    ).map(([, propName, propType, propValue]) => {
      const cleanedValue =
        propValue === 'true'
          ? true
          : propValue === 'false'
          ? false
          : // undefined values get lost in JSON.stringify, but null is allowed
            propValue?.replace(/'/g, '') || null;

      return {
        [propName]: cleanedValue,
      };
    });

    // required props
    const requiredProps: ComponentMeta['requiredProps'] = Array.from(
      // same regex as above without optional ? modifier
      source.matchAll(/@Prop\(.*\) public ([A-z]+)(?:: (.+?))?(?:= (.+))?;/g)
    ).map(([, propName]) => propName);

    const [, invalidLinkUsageProp] = /throwIfInvalidLink(?:Pure)?Usage\(this\.host, this\.(\w+)\);/.exec(source) || [];
    if (invalidLinkUsageProp) {
      // const [, propType] = new RegExp(`@Prop\\(\\) public ${invalidLinkUsageProp}\\?: (.+);`).exec(source) || [];
      requiredProps.push(invalidLinkUsageProp);
    }

    // observed attributes
    let observedAttributes: ComponentMeta['observedAttributes'] = [];
    const [, rawObservedAttributes] = /observeAttributes\([A-z.]+, (\[.+\]),.+?\);/.exec(source) || [];
    if (rawObservedAttributes) {
      observedAttributes = eval(rawObservedAttributes);
    }

    // skeleton props
    const skeletonProps: ComponentMeta['skeletonProps'] = hasSkeleton
      ? SKELETON_RELEVANT_PROPS.filter(({ propName, shouldAddValueToClassName }) => {
          // extract all matching skeleton relevant props
          const [match] = new RegExp(`@Prop\\(\\) public ${propName}\\?: .+;`).exec(source) || [];
          return match;
        })
      : [];

    result[tagName] = {
      isDelegatingFocus,
      isInternal,
      isThemeable,
      requiredParent,
      ...(requiredRootNodes.length && { requiredRootNode: requiredRootNodes }),
      requiredChild,
      requiredChildSelector,
      ...(props.length && { props: props }),
      ...(requiredProps.length && { requiredProps: requiredProps }),
      hasSlot,
      hasSlottedCss,
      hasAriaProp,
      hasObserveAttributes,
      ...(observedAttributes.length && { observedAttributes: observedAttributes }),
      hasObserveChildren,
      hasSkeleton,
      shouldPatchSlot,
      ...(skeletonProps.length && { skeletonProps: skeletonProps }),
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
