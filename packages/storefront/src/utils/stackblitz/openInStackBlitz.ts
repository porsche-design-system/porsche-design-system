import sdk from '@stackblitz/sdk';
import { getVanillaJsProjectAndOpenOptions } from '@/utils/stackblitz/vanillaJsBoilerplate';
import { getReactProjectAndOpenOptions } from '@/utils/stackblitz/reactBoilerplate';
import { getAngularProjectAndOpenOptions } from '@/utils/stackblitz/angularBoilerplate';
import { getBackgroundColor, getPdsComponents } from '@/utils/stackblitz/helper';
import type { StackBlitzFrameworkOpts, FrameworksWithoutShared } from '@/utils/stackblitz/helper';
import type { Theme, ColorScheme } from '@/models';

export type OpenInStackBlitzOpts = {
  markup: string;
  framework: FrameworksWithoutShared;
  theme: Theme;
  hasFrameworkMarkup: boolean;
  colorScheme: ColorScheme;
  additionalDependencies?: string[];
};

export const openInStackBlitz = (props: OpenInStackBlitzOpts): void => {
  const { markup, framework, theme, hasFrameworkMarkup, additionalDependencies, colorScheme } = props;

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

  const getProjectAndOpenOptionsCallbackMap = {
    'vanilla-js': () => getVanillaJsProjectAndOpenOptions(openProps),
    angular: () => getAngularProjectAndOpenOptions(openProps),
    react: () => getReactProjectAndOpenOptions(openProps),
  };

  const { project, openOptions } = getProjectAndOpenOptionsCallbackMap[framework]();

  sdk.openProject(project, openOptions);
};
