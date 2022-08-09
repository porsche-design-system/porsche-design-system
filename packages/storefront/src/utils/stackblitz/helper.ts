import * as sharedData from '@porsche-design-system/shared/data';
import type {
  ColorScheme,
  Framework,
  StackBlitzProjectAndOpenOptions,
  StackblitzProjectDependencies,
  Theme,
} from '@/models';
import { themeDark, themeLight } from '@porsche-design-system/utilities-v2';
import { OpenInStackBlitzOpts } from '@/utils/stackblitz/openInStackBlitz';

export type FrameworksWithoutShared = Exclude<Framework, 'shared'>;

export type StackBlitzFrameworkOpts = Omit<OpenInStackBlitzOpts, 'framework' | 'theme' | 'backgroundColorScheme'> & {
  title: string;
  description: string;
  globalStyles: string;
  pdsComponents: string[];
};

export type SharedImportKey = Exclude<keyof typeof sharedData, 'headVrt' | 'dataVrt'>;

export const removeSharedImport = (markup: string): string =>
  markup.replace(/import { .+ } from '@porsche-design-system\/shared';/, '');

export const inlineSharedImports = (sharedImportKeys: SharedImportKey[]): string =>
  sharedImportKeys.map((x) => `const ${x} = ${JSON.stringify(sharedData[x], null, 2)};`).join('\n');

export type ExternalStackBlitzDependency = 'imask';
export type StackBlitzDependencyMap = { [key in ExternalStackBlitzDependency]: StackblitzProjectDependencies };

// TODO: validate if typing works from md files, otherwise validate
export const getExternalDependencies = (
  additionalDependencies: ExternalStackBlitzDependency[],
  dependenciesMap: StackBlitzDependencyMap
): StackblitzProjectDependencies =>
  additionalDependencies.reduce(
    (result, current) => ({ ...result, ...dependenciesMap[current] }),
    {} as StackblitzProjectDependencies
  );

export const isTable = (components: string[]): boolean => !!components[0].match(/(?:P|p-)[Tt]able/);

export const getPdsComponents = (markup: string): string[] =>
  Array.from(markup.matchAll(/<((?:P|p-)[\w-]*)/g) || [])
    .map(([, x]) => x)
    .filter((tagName, idx, arr) => arr.findIndex((t) => t === tagName) === idx);

export const getBackgroundColor = (theme: Theme, colorScheme: ColorScheme): string => {
  const {
    background: { base, surface },
  } = theme === 'light' ? themeLight : themeDark;

  return colorScheme === 'surface' ? surface : base;
};

export type GetStackblitzProjectAndOpenOptions = (opts: StackBlitzFrameworkOpts) => StackBlitzProjectAndOpenOptions;

export const hastIMaskDependency = (getExternalDependencies?: ExternalStackBlitzDependency[]): boolean => {
  return getExternalDependencies ? getExternalDependencies.filter((x) => x === 'imask').length > 0 : false;
};
