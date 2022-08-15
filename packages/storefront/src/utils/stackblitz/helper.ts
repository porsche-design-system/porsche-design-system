import * as sharedData from '@porsche-design-system/shared/data';
import { themeDark, themeLight } from '@porsche-design-system/utilities-v2';
import type { ColorScheme, StackBlitzProjectAndOpenOptions, StackblitzProjectDependencies, Theme } from '../../models';
import type { OpenInStackBlitzOpts } from './openInStackBlitz';

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
    .map((x) => `const ${x} = ${JSON.stringify(sharedData[x], null, 1)};`)
    .join('\n\n');

  return sharedImportConstants ? `${sharedImportConstants}\n\n` : '';
};

export const EXTERNAL_DEPENDENCIES = ['imask'] as const;
export type ExternalDependency = typeof EXTERNAL_DEPENDENCIES[number];

export type DependencyMap<T> = { [key in ExternalDependency]: { [K in keyof T]?: T[K] } };

export const getExternalDependencies = <T>(
  additionalDependencies: ExternalDependency[],
  dependenciesMap: DependencyMap<T>
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

export const getExternalDependenciesOrThrow = (externalDependencies: ExternalDependency[]): ExternalDependency[] => {
  if (externalDependencies.some((x) => !EXTERNAL_DEPENDENCIES.includes(x))) {
    throw new Error(
      `Passed 'externalStackBlitzDependencies[]' contains invalid value. Allowed are '${EXTERNAL_DEPENDENCIES.join(
        ', '
      )}'.`
    );
  }
  return externalDependencies;
};
