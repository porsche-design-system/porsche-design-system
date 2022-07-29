import { convertMarkup } from '@/utils/formatting';
import { themeDark, themeLight } from '@porsche-design-system/utilities-v2';
import { openVanillaJS } from '@/utils/stackblitz/openVanillaJs';
import { openReact } from '@/utils/stackblitz/openReact';
import { openAngular } from '@/utils/stackblitz/openAngular';
import { pascalCase } from 'change-case';
import type { Framework, Theme } from '@/models';

type ColorScheme = 'default' | 'surface';

type OpenInStackBlitzOpts = {
  markup: string;
  framework: Framework;
  theme: Theme;
  hasFrameworkMarkup: boolean;
  colorScheme: ColorScheme;
  additionalDependencies?: string[];
};

export type StackBlitzFrameworkOpts = Omit<OpenInStackBlitzOpts, 'framework' | 'theme' | 'colorScheme'> & {
  title: string;
  description: string;
  bodyStyles: string;
  reactComponentsToImport?: string;
};

// TODO: Unit test
export const getBackgroundColor = (theme: Theme, colorScheme: ColorScheme) => {
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

export const openInStackBlitz = (props: OpenInStackBlitzOpts): void => {
  const { markup, framework, theme, hasFrameworkMarkup, additionalDependencies, colorScheme } = props;
  const convertedMarkup = hasFrameworkMarkup ? markup : convertMarkup(markup, framework);

  // Extract to helper and unit test?
  const pdsComponents = Array.from(markup.matchAll(/<((?:\w|-)+)(?:.|\n)*?>/g) ?? [])
    .map(([, x]) => x)
    .filter((tagName, idx, arr) => arr.findIndex((t) => t.startsWith('p-') && t === tagName) === idx);
  const reactComponentsToImport = pdsComponents.map((x) => pascalCase(x)).join(', ');

  const openProps: StackBlitzFrameworkOpts = {
    markup: convertedMarkup,
    hasFrameworkMarkup,
    title: `Porsche Design System ${framework} sandbox`,
    description: `${pdsComponents[0]} component example`,
    bodyStyles: `body { background: ${getBackgroundColor(theme, colorScheme)}; }`,
    additionalDependencies,
  };

  switch (framework) {
    case 'angular':
      return openAngular(openProps);
    case 'react':
      return openReact({
        ...openProps,
        reactComponentsToImport,
      });
    default:
      return openVanillaJS(openProps);
  }
};

export type DependenciesMap = { [key: string]: { [key: string]: string } };

// TODO: unit test
export const getAdditionalDependencies = (
  additionalDependencies: string[] | undefined,
  dependenciesMap: DependenciesMap
) =>
  additionalDependencies
    ? additionalDependencies
        .map((dep) => dependenciesMap[dep])
        .reduce((result, current) => Object.assign(result, current), {})
    : {};
