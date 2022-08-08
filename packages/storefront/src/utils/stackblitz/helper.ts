import * as sharedData from '@porsche-design-system/shared';
import {
  ColorScheme,
  Framework,
  StackBlitzProjectAndOpenOptions,
  StackblitzProjectDependencies,
  Theme,
} from '@/models';
import { themeDark, themeLight } from '@porsche-design-system/utilities-v2';
import { OpenInStackBlitzOpts } from '@/utils/stackblitz/openInStackBlitz';

export type FrameworksWithoutShared = Exclude<Framework, 'shared'>;

export type StackBlitzFrameworkOpts = Omit<OpenInStackBlitzOpts, 'framework' | 'theme' | 'colorScheme'> & {
  title: string;
  description: string;
  bodyStyles: string;
  pdsComponents: string[];
};

export const inlineSharedImports = (markup: string): string => {
  const sharedImportRegex = /import { ((?:[A-z]+,* )+)} from '@porsche-design-system\/shared';/;
  const [, sharedImports] = markup.match(sharedImportRegex) || [];
  const importVariables = sharedImports
    .replace(/\s/g, '')
    .split(',')
    .filter((x) => x[0] === x[0].toLowerCase());

  return markup.replace(
    sharedImportRegex,
    `
${importVariables.map((x) => `const ${x} = ${JSON.stringify(sharedData[x as keyof typeof sharedData])};`).join('\n')}`
  );
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
