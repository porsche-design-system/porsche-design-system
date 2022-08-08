import sdk from '@stackblitz/sdk';
import { getVanillaJsProjectAndOpenOptions } from '@/utils/stackblitz/vanillaJsBoilerplate';
import { getReactProjectAndOpenOptions } from '@/utils/stackblitz/reactBoilerplate';
import { getAngularProjectAndOpenOptions } from '@/utils/stackblitz/angularBoilerplate';
import {
  AdditionalStackBlitzDependency,
  getBackgroundColor,
  getPdsComponents,
  GetStackblitzProjectAndOpenOptions,
} from '@/utils/stackblitz/helper';
import type { StackBlitzFrameworkOpts, FrameworksWithoutShared } from '@/utils/stackblitz/helper';
import type { Theme, ColorScheme, Framework } from '@/models';

// TODO: decide hasFrameworkMarkup in boilerplate
export type OpenInStackBlitzOpts = {
  markup: string;
  framework: FrameworksWithoutShared;
  theme: Theme;
  hasFrameworkMarkup: boolean;
  colorScheme: ColorScheme;
  additionalStackBlitzDependencies?: AdditionalStackBlitzDependency[];
};

export const openInStackBlitz = (opts: OpenInStackBlitzOpts): void => {
  const { markup, framework, theme, hasFrameworkMarkup, additionalStackBlitzDependencies, colorScheme } = opts;

  // TODO: move into react
  const pdsComponents = getPdsComponents(markup);

  const openProps: StackBlitzFrameworkOpts = {
    markup,
    hasFrameworkMarkup,
    title: `Porsche Design System ${framework} sandbox`,
    description: 'Porsche Design System component example',
    bodyStyles: `body { background: ${getBackgroundColor(theme, colorScheme)}; }`,
    pdsComponents,
    additionalStackBlitzDependencies,
  };

  const getProjectAndOpenOptionsCallbackMap: {
    [key in Exclude<Framework, 'shared'>]: GetStackblitzProjectAndOpenOptions;
  } = {
    'vanilla-js': getVanillaJsProjectAndOpenOptions,
    angular: getAngularProjectAndOpenOptions,
    react: getReactProjectAndOpenOptions,
  };

  const { openFile, ...project } = getProjectAndOpenOptionsCallbackMap[framework](openProps);

  sdk.openProject(project, { openFile });
};
