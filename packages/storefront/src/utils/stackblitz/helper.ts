import * as sharedData from '@porsche-design-system/shared/data';
import type {
  ColorScheme,
  Framework,
  StackBlitzProjectAndOpenOptions,
  StackblitzProjectDependencies,
  Theme,
} from '@/models';
import { themeDark, themeLight } from '@porsche-design-system/utilities-v2';
import type { OpenInStackBlitzOpts } from '@/utils/stackblitz/openInStackBlitz';

export type FrameworksWithoutShared = Exclude<Framework, 'shared'>;

export type StackBlitzFrameworkOpts = Omit<OpenInStackBlitzOpts, 'framework' | 'theme' | 'backgroundColorScheme'> & {
  title: string;
  description: string;
  globalStyles: string;
};

export type SharedImportKey = Exclude<keyof typeof sharedData, 'headVrt' | 'dataVrt'>;

export const removeSharedImport = (markup: string): string =>
  markup.replace(/import { .+ } from '@porsche-design-system\/shared';/, '');

export const getSharedImportConstants = (sharedImportKeys: SharedImportKey[]): string => {
  const sharedImportConstants = sharedImportKeys
    .map((x) => `const ${x} = ${JSON.stringify(sharedData[x], null, 2)};`)
    .join('\n\n');

  return sharedImportConstants ? `${sharedImportConstants}\n\n` : '';
};
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

export const getBackgroundColor = (theme: Theme, colorScheme: ColorScheme): string => {
  const {
    background: { base, surface },
  } = theme === 'light' ? themeLight : themeDark;

  return colorScheme === 'surface' ? surface : base;
};

export type GetStackblitzProjectAndOpenOptions = (opts: StackBlitzFrameworkOpts) => StackBlitzProjectAndOpenOptions;
