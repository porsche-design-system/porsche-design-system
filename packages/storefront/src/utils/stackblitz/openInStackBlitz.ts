import { convertMarkup } from '@/utils/formatting';
import { openVanillaJS } from '@/utils/stackblitz/openVanillaJs';
import { openReact } from '@/utils/stackblitz/openReact';
import { openAngular } from '@/utils/stackblitz/openAngular';
import { getBackgroundColor, getPdsComponents } from '@/utils/stackblitz/helper';
import type { StackBlitzFrameworkOpts } from '@/utils/stackblitz/helper';
import type { Framework, Theme, ColorScheme } from '@/models';

type FrameworksWithoutShared = Exclude<Framework, 'shared'>;

export type OpenInStackBlitzOpts = {
  markup: string;
  framework: FrameworksWithoutShared;
  theme: Theme;
  hasFrameworkMarkup: boolean;
  colorScheme: ColorScheme;
  additionalDependencies?: string[];
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
  const pdsComponents = getPdsComponents(markup);

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
