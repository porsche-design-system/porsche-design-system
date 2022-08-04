import {
  headBasic,
  dataBasic,
  headSorting,
  dataSorting,
  dataAdvanced,
  headAdvanced,
} from '@porsche-design-system/shared';
import { ColorScheme, Theme } from '@/models';
import { themeDark, themeLight } from '@porsche-design-system/utilities-v2';
import { OpenInStackBlitzOpts } from '@/utils/stackblitz/openInStackBlitz';

const sharedImport = {
  headBasic,
  dataBasic,
  headSorting,
  dataSorting,
  dataAdvanced,
  headAdvanced,
};

export type StackBlitzFrameworkOpts = Omit<OpenInStackBlitzOpts, 'framework' | 'theme' | 'colorScheme'> & {
  title: string;
  description: string;
  bodyStyles: string;
  pdsComponents: string[];
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

// TODO: unit test
export const getPdsComponents = (markup: string): string[] =>
  Array.from(markup.matchAll(/<([P|p-][\w-]*)/g) ?? [])
    .map(([, x]) => x)
    .filter((tagName, idx, arr) => arr.findIndex((t) => t === tagName) === idx);

export const getBackgroundColor = (theme: Theme, colorScheme: ColorScheme): string => {
  const backgroundBase = themeLight.background.base;
  const backgroundSurface = themeLight.background.surface;
  const darkBackgroundBase = themeDark.background.base;
  const darkBackgroundSurface = themeDark.background.surface;
  const isThemeDark = theme === 'dark';

  let backgroundColor;

  if (colorScheme === 'surface') {
    backgroundColor = isThemeDark ? darkBackgroundSurface : backgroundSurface;
  } else {
    backgroundColor = isThemeDark ? darkBackgroundBase : backgroundBase;
  }

  return backgroundColor;
};
