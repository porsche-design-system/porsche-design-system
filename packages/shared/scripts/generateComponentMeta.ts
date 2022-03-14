import * as fs from 'fs';
import * as path from 'path';
import * as globby from 'globby';
import { paramCase } from 'change-case';
import { TAG_NAMES, TAG_NAMES_WITH_SKELETON, TagName } from '../src/lib/tagNames';
import { PAccordion } from '../../components-angular/dist/components-wrapper/lib/components/accordion.wrapper';
import { PButton } from '../../components-angular/dist/components-wrapper/lib/components/button.wrapper';
import { PButtonPure } from '../../components-angular/dist/components-wrapper/lib/components/button-pure.wrapper';
import { PCheckboxWrapper } from '../../components-angular/dist/components-wrapper/lib/components/checkbox-wrapper.wrapper';
import { PTabs } from '../../components-angular/dist/components-wrapper/lib/components/tabs.wrapper';
import { PLink } from '../../components-angular/dist/components-wrapper/lib/components/link.wrapper';
import { PSelectWrapper } from '../../components-angular/dist/components-wrapper/lib/components/select-wrapper.wrapper';
import { PHeadline } from '../../components-angular/dist/components-wrapper/lib/components/headline.wrapper';
import { PFieldsetWrapper } from '../../components-angular/dist/components-wrapper/lib/components/fieldset-wrapper.wrapper';
import { PPagination } from '../../components-angular/dist/components-wrapper/lib/components/pagination.wrapper';
import { PLinkPure } from '../../components-angular/dist/components-wrapper/lib/components/link-pure.wrapper';
import { PTabsBar } from '../../components-angular/dist/components-wrapper/lib/components/tabs-bar.wrapper';
import { PRadioButtonWrapper } from '../../components-angular/dist/components-wrapper/lib/components/radio-button-wrapper.wrapper';
import { PTextFieldWrapper } from '../../components-angular/dist/components-wrapper/lib/components/text-field-wrapper.wrapper';
import { PText } from '../../components-angular/dist/components-wrapper/lib/components/text.wrapper';
import { PLinkSocial } from '../../components-angular/dist/components-wrapper/lib/components/link-social.wrapper';
import { PMarque } from '../../components-angular/dist/components-wrapper/lib/components/marque.wrapper';
import { PSwitch } from '../../components-angular/dist/components-wrapper/lib/components/switch.wrapper';
import { PTextareaWrapper } from '../../components-angular/dist/components-wrapper/lib/components/textarea-wrapper.wrapper';

const glue = '\n\n';

type SkeletonRelevantProps = {
  propName:
    | Extract<keyof PAccordion, 'compact' | 'open' | 'size' | 'theme'>
    | Extract<keyof PButton, 'hideLabel' | 'theme'>
    | Extract<keyof PButtonPure, 'hideLabel' | 'size' | 'stretch' | 'theme'>
    | Extract<keyof PCheckboxWrapper, 'hideLabel'>
    | Extract<keyof PFieldsetWrapper, 'labelSize'>
    | Extract<keyof PLink, 'hideLabel' | 'theme'>
    | Extract<keyof PLinkPure, 'hideLabel' | 'size' | 'stretch' | 'theme'>
    | Extract<keyof PLinkSocial, 'hideLabel' | 'theme'>
    | Extract<keyof PMarque, 'size'>
    | Extract<keyof PPagination, 'itemsPerPage' | 'totalItemsCount' | 'theme'>
    | Extract<keyof PRadioButtonWrapper, 'hideLabel'>
    | Extract<keyof PSelectWrapper, 'description' | 'hideLabel' | 'label' | 'theme'>
    | Extract<keyof PSwitch, 'hideLabel' | 'stretch' | 'theme'>
    | Extract<keyof PTabs, 'size' | 'theme'>
    | Extract<keyof PTabsBar, 'size' | 'theme'>
    | Extract<keyof PTextFieldWrapper, 'description' | 'hideLabel' | 'label'>
    | Extract<keyof PTextareaWrapper, 'description' | 'hideLabel' | 'label'>
    | Extract<keyof PHeadline, 'variant' | 'theme'>
    | Extract<keyof PText, 'size' | 'theme'>;
  shouldStringifyValue: boolean;
}[];

const SKELETON_RELEVANT_PROPS: SkeletonRelevantProps = [
  { propName: 'compact', shouldStringifyValue: false },
  { propName: 'description', shouldStringifyValue: false },
  { propName: 'hideLabel', shouldStringifyValue: false },
  { propName: 'itemsPerPage', shouldStringifyValue: true },
  { propName: 'label', shouldStringifyValue: false },
  { propName: 'labelSize', shouldStringifyValue: false },
  { propName: 'open', shouldStringifyValue: false },
  { propName: 'size', shouldStringifyValue: true },
  { propName: 'stretch', shouldStringifyValue: false },
  { propName: 'theme', shouldStringifyValue: true },
  { propName: 'totalItemsCount', shouldStringifyValue: false },
  { propName: 'variant', shouldStringifyValue: true },
];

const tagNamesToAddSlotTo: TagName[] = ['p-fieldset-wrapper', 'p-text-list', 'p-text-list-item'];

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
  skeletonProps: { propName: string; shouldStringifyValue: boolean }[];
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
    skeletonProps: { propName: string; shouldStringifyValue: boolean }[];
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
    const shouldPatchSlot = tagNamesToAddSlotTo.includes(tagName);
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
      SKELETON_RELEVANT_PROPS.forEach(({ propName, shouldStringifyValue }) => {
        const [match] = new RegExp(`@Prop\\(\\) public ${propName}\\?: .+;`).exec(source) ?? [];
        if (match) {
          skeletonProps.push({ propName, shouldStringifyValue });
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
