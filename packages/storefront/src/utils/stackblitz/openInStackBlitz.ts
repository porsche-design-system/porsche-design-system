import sdk from '@stackblitz/sdk';
import { getVanillaJsProjectAndOpenOptions } from '@/utils/stackblitz/vanillaJsBoilerplate';
import { getReactProjectAndOpenOptions } from '@/utils/stackblitz/reactBoilerplate';
import { getAngularProjectAndOpenOptions } from '@/utils/stackblitz/angularBoilerplate';
import {
  ExternalStackBlitzDependency,
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
  backgroundColorScheme: ColorScheme;
  externalStackBlitzDependencies?: ExternalStackBlitzDependency[];
};

export const openInStackBlitz = (opts: OpenInStackBlitzOpts): void => {
  const { markup, framework, theme, hasFrameworkMarkup, externalStackBlitzDependencies, backgroundColorScheme } = opts;

  // TODO: move into react
  const pdsComponents = getPdsComponents(markup);

  const openProps: StackBlitzFrameworkOpts = {
    markup,
    hasFrameworkMarkup,
    title: `Porsche Design System ${framework} sandbox`,
    description: 'Porsche Design System component example',
    globalStyles: `body { background: ${getBackgroundColor(theme, backgroundColorScheme)}; }`,
    pdsComponents,
    externalStackBlitzDependencies,
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
