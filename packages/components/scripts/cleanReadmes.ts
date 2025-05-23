import * as fs from 'fs';
import * as path from 'path';
import type { TagName } from '@porsche-design-system/shared';
import { capitalCase } from 'change-case';
import { globbySync } from 'globby';

const removeBuiltWith = (str: string): string =>
  str.replace(/\s+----------------------------------------------\s+\*Built with.*/, '');

const removeAutoGeneratedBelow = (str: string): string => str.replace(/\s+<!-- Auto Generated Below -->\s/, '');

const adjustHeadlines = (str: string): string => {
  let [, tagName, pTagName] = (str.match(/(# (.*))/) as [string, string, TagName]) || [];
  const cleanedTagName = tagName.replace(/^#\sp-/, '');
  const componentHeadline = capitalCase(cleanedTagName);

  // replacements for multi prop pages where the h1 is not the component but rather the whole multi prop category
  const h1Replacements: { [key in TagName]?: string } = {
    'p-flex': 'Flex',
    'p-drilldown': 'Drilldown',
    'p-grid': 'Grid',
    'p-multi-select': 'Multi Select',
    'p-segmented-control': 'Segmented Control',
    'p-stepper-horizontal': 'Stepper Horizontal',
    'p-table': 'Table',
    'p-tabs': 'Tabs',
  };

  // all component names on multi prop pages
  const multiPropReplacements: TagName[] = [
    ...(Object.keys(h1Replacements) as TagName[]),
    'p-flex-item',
    'p-drilldown-item',
    'p-drilldown-link',
    'p-grid-item',
    'p-multi-select-option',
    'p-segmented-control-item',
    'p-select-option',
    'p-stepper-horizontal-item',
    'p-table-cell',
    'p-table-head-cell',
    'p-tabs-item',
  ];

  // append # to component names on multi prop pages to restore hierarchy
  if (multiPropReplacements.includes(pTagName)) {
    str = str.replace(/(#+)\s/g, '$1# ');
  }

  let headline: string;
  // depends on the order of components passed in the storefront.config.ts
  // extend the multi prop page by the multi prop category
  if (h1Replacements[pTagName]) {
    headline = `<ComponentHeading name="${h1Replacements[pTagName]}"></ComponentHeading>\n\n## ${componentHeadline}`;
    tagName = '#' + tagName;
  } else {
    headline = multiPropReplacements.includes(pTagName)
      ? `# ${componentHeadline}`
      : `<ComponentHeading name="${componentHeadline}"></ComponentHeading>`;
  }

  return str.replace(tagName, headline);
};

const fixMethods = (str: string): string =>
  str
    .replace(/(#+\s)`/g, '`') // remove headline hashes before code
    .replace(/#+\sReturns[\s\S]*?`\n/g, ''); // remove return types

const fixParameterHeading = (str: string): string => str.replace(/(#### Parameters)/, '### Parameters'); // remove headline hash to fix hierarchy

const replacePropsTable =
  (componentName: string): ((str: string) => string) =>
  (str: string): string =>
    str.replace(
      /(## Properties\n+)(?:\|.+\n)+\n?/,
      `$1<MetaTable component="p-${componentName}" type="props"></MetaTable>\n`
    );

const replaceEventsTable =
  (componentName: string): ((str: string) => string) =>
  (str: string): string =>
    str.replace(
      /(## Events\n+)(?:\|.+\n)+\n?/,
      `$1<MetaTable component="p-${componentName}" type="events"></MetaTable>\n`
    );

// TODO: Add slots API
const replaceSlotsTable =
  (componentName: string): ((str: string) => string) =>
  (str: string): string =>
    str.replace(/(###? Slots\n+)(?:\|.+\n)+\n?/, '');

const cleanReadmes = (): void => {
  const files = globbySync('./src/components/**/readme.md');
  for (const file of files) {
    const sourceFile = path.normalize(file);
    const sourceDirectory = path.dirname(sourceFile);
    const componentName = path.basename(sourceDirectory);
    const sourceFileContent = fs.readFileSync(sourceFile, 'utf8');

    const content = [
      removeAutoGeneratedBelow,
      removeBuiltWith,
      fixMethods, // only relevant for toast
      fixParameterHeading,
      adjustHeadlines,
      replacePropsTable(componentName), // vue component visualizing componentMeta
      replaceEventsTable(componentName), // vue component visualizing componentMeta
      replaceSlotsTable(componentName),
    ].reduce((previousResult, fn) => fn(previousResult), sourceFileContent);

    // use this for easy debugging
    // fs.writeFileSync(path.normalize(`${sourceDirectory}/${componentName}.props.md`), content);

    fs.writeFileSync(sourceFile, content);
    fs.renameSync(sourceFile, path.normalize(`${sourceDirectory}/${componentName}.props.md`));
  }
};

cleanReadmes();
