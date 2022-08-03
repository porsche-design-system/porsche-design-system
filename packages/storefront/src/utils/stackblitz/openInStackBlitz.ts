import { convertMarkup } from '@/utils/formatting';
import { themeDark, themeLight } from '@porsche-design-system/utilities-v2';
import { openVanillaJS } from '@/utils/stackblitz/openVanillaJs';
import { openReact } from '@/utils/stackblitz/openReact';
import { openAngular } from '@/utils/stackblitz/openAngular';
import type { Framework, Theme, ColorScheme } from '@/models';

export type FrameworksWithoutShared = Exclude<Framework, 'shared'>;

export type StackBlitzFrameworkOpts = Omit<OpenInStackBlitzOpts, 'framework' | 'theme' | 'colorScheme'> & {
  title: string;
  description: string;
  bodyStyles: string;
  pdsComponents: string[];
};

type OpenInStackBlitzOpts = {
  markup: string;
  framework: FrameworksWithoutShared;
  theme: Theme;
  hasFrameworkMarkup: boolean;
  colorScheme: ColorScheme;
  additionalDependencies?: string[];
};

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

export const getStackBlitzMarkup = (
  hasFrameworkMarkup: boolean,
  markup: string,
  framework: FrameworksWithoutShared
): string => (hasFrameworkMarkup ? markup : convertMarkup(markup, framework));

// TODO: unit test
export const openInStackBlitz = (props: OpenInStackBlitzOpts): void => {
  const { markup, framework, theme, hasFrameworkMarkup, additionalDependencies, colorScheme } = props;

  // Extract to helper and unit test?
  const pdsComponents = Array.from(markup.matchAll(/<([P|p-][\w-]*)/g) ?? [])
    .map(([, x]) => x)
    .filter((tagName, idx, arr) => arr.findIndex((t) => t === tagName) === idx);

  const openProps: StackBlitzFrameworkOpts = {
    markup,
    hasFrameworkMarkup,
    title: `Porsche Design System ${framework} sandbox`,
    description: `${pdsComponents[0]} component example`,
    bodyStyles: `body { background: ${getBackgroundColor(theme, colorScheme)}; }`,
    pdsComponents,
    additionalDependencies,
  };

  switch (framework) {
    case 'angular':
      return openAngular(openProps);
    case 'react':
      return openReact(openProps);
    default:
      return openVanillaJS(openProps);
  }
};
