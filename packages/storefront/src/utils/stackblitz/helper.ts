import {
  headBasic,
  dataBasic,
  headSorting,
  dataSorting,
  dataAdvanced,
  headAdvanced,
} from '@porsche-design-system/shared';

const sharedImport = {
  headBasic,
  dataBasic,
  headSorting,
  dataSorting,
  dataAdvanced,
  headAdvanced,
};

// TODO: unit test
export const replaceSharedTableImports = (markup: string): string => {
  const sharedImportRegex = /import { ((?:[A-z]+,* )+)} from '@porsche-design-system\/shared';/;
  const [, sharedImports] = markup.match(sharedImportRegex) ?? [];
  const importVariables = sharedImports
    .replace(/\s/g, '')
    .split(',')
    .filter((x) => x[0] === x[0].toLowerCase()) as [
    'headBasic' | 'dataBasic' | 'headSorting' | 'dataSorting' | 'dataAdvanced' | 'headAdvanced'
  ];

  return markup.replace(
    /import { (?:[A-z]+,* )+} from '@porsche-design-system\/shared';/,
    `
            ${importVariables.map((x) => `const ${x} = ${JSON.stringify(sharedImport[x])};`).join('\n')}
`
  );
};

export type DependenciesMap = { [key: string]: { [key: string]: string } };

export const getAdditionalDependencies = (
  additionalDependencies: string[],
  dependenciesMap: DependenciesMap
): { [key: string]: string } =>
  additionalDependencies
    .map((dep) => dependenciesMap[dep])
    .reduce((result, current) => Object.assign(result, current), {});

// TODO: unit test
export const isTable = (components: string[]): boolean => components[0].includes('table');
