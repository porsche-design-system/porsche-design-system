import { convertMarkup } from '@/utils/formatting';
import { themeDark } from '@porsche-design-system/utilities-v2';
import { openVanillaJS } from '@/utils/stackblitz/openVanillaJs';
import { openReact } from '@/utils/stackblitz/openReact';
import { openAngular } from '@/utils/stackblitz/openAngular';
import { pascalCase } from 'change-case';
import type { Framework, Theme } from '@/models';

type OpenInStackBlitzOpts = {
  markup: string;
  framework: Framework;
  theme: Theme;
  hasFrameworkMarkup: boolean;
  additionalDependencies?: string[];
};

export type StackBlitzFrameworkOpts = Omit<OpenInStackBlitzOpts, 'framework' | 'theme'> & {
  title: string;
  description: string;
  isThemeDark: boolean;
  bodyStyles: string;
  reactComponentsToImport?: string;
};

export const themeDarkBodyStyles = `body { background: ${themeDark.background.base}; }`;

export const openInStackBlitz = (props: OpenInStackBlitzOpts): void => {
  const { markup, framework, theme, hasFrameworkMarkup, additionalDependencies } = props;
  const convertedMarkup = hasFrameworkMarkup ? markup : convertMarkup(markup, framework);

  const pdsComponents = Array.from(markup.matchAll(/<((?:\w|-)+)(?:.|\n)*?>/g) ?? [])
    .map(([, x]) => x)
    .filter((tagName, idx, arr) => arr.findIndex((t) => t.startsWith('p-') && t === tagName) === idx);
  const reactComponentsToImport = pdsComponents.map((x) => pascalCase(x)).join(', ');
  const isThemeDark = theme === 'dark';

  const openProps: StackBlitzFrameworkOpts = {
    markup: convertedMarkup,
    hasFrameworkMarkup,
    title: `Porsche Design System ${framework} sandbox`,
    description: `${pdsComponents[0]} component example`,
    isThemeDark,
    bodyStyles: `body { background: ${themeDark.background.base}; }`,
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
