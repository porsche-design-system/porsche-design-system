import * as sharedData from '@porsche-design-system/shared/data';
import { themeDark, themeLight } from '@porsche-design-system/components-js/styles';
import type {
  BackgroundColor,
  Framework,
  StackBlitzProjectAndOpenOptions,
  StackBlitzProjectDependencies,
  PlaygroundTheme,
  PlaygroundDir,
} from '@/models';
import type { OpenInStackBlitzOpts } from './openInStackBlitz';

export type StackBlitzFrameworkOpts = Omit<OpenInStackBlitzOpts, 'framework' | 'theme' | 'backgroundColor'> & {
  title: string;
  dir: PlaygroundDir;
  description: string;
  globalStyles: string;
};

export type SharedImportKey = Exclude<keyof typeof sharedData, 'headVrt' | 'dataVrt'>;

export const removeSharedImport = (markup: string): string =>
  markup.replace(/\s*import { .+ } from '@porsche-design-system\/shared';/, '');

export const getSharedImportConstants = (sharedImportKeys: SharedImportKey[]): string => {
  const sharedImportConstants = sharedImportKeys
    .map((x) => `const ${x} = ${JSON.stringify(sharedData[x], null, 2)};`)
    .join('\n\n');

  return sharedImportConstants ? `${sharedImportConstants}\n\n` : '';
};

export const EXTERNAL_DEPENDENCIES = [
  'imask',
  'styled-components',
  'ag-grid-community',
  'ag-grid-angular',
  'ag-grid-react',
  'ag-grid-vue3',
] as const;
export type ExternalDependency = (typeof EXTERNAL_DEPENDENCIES)[number];

export type DependencyMap<T> = Record<ExternalDependency, { [K in keyof T]?: T[K] }>;

export const getExternalDependencies = <T>(
  additionalDependencies: ExternalDependency[],
  dependencyMap: Partial<DependencyMap<T>>
): StackBlitzProjectDependencies =>
  additionalDependencies.reduce(
    (result, current) => ({ ...result, ...dependencyMap[current] }),
    {} as StackBlitzProjectDependencies
  );

export const getBackgroundColor = (theme: PlaygroundTheme, backgroundColor: BackgroundColor): string => {
  const { base, surface } = (theme === 'light' ? themeLight : themeDark).background;

  return backgroundColor === 'background-surface' ? surface : base;
};

export type GetStackBlitzProjectAndOpenOptions = (opts: StackBlitzFrameworkOpts) => StackBlitzProjectAndOpenOptions;

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

export const isStableStorefrontRelease = (): boolean => /^\/v\d+\//.test(location.pathname);

export const convertImportPaths = (markup: string, framework: Framework, pdsVersion: string): string => {
  const relativeDirectory = framework === 'angular' ? '../../' : framework === 'vue' ? '../' : '';
  return isStableStorefrontReleaseOrForcedPdsVersion(pdsVersion)
    ? markup
    : markup.replace(
        new RegExp(`@porsche-design-system\\/components-${framework.replace(/^vanilla-/, '')}`, 'g'),
        `./${relativeDirectory}@porsche-design-system/components-${framework}`
      );
};

export const transformSrcAndSrcsetOfImgAndSourceTags = (markup: string): string => {
  const originUrl = document.location.origin;
  const baseHref = document.querySelector('base')?.getAttribute('href') || '/';

  return markup.replace(/(<(?:img|source).*?(?:src|srcset)=")([^http|.)].*")/g, `$1${originUrl + baseHref}$2`);
};

export const isStableStorefrontReleaseOrForcedPdsVersion = (pdsVersion: string): boolean =>
  !!pdsVersion || isStableStorefrontRelease();
