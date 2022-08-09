import sdk from '@stackblitz/sdk';
import { getVanillaJsProjectAndOpenOptions } from '@/utils/stackblitz/vanillaJsBoilerplate';
import { getReactProjectAndOpenOptions } from '@/utils/stackblitz/reactBoilerplate';
import { getAngularProjectAndOpenOptions } from '@/utils/stackblitz/angularBoilerplate';
import { getBackgroundColor } from '@/utils/stackblitz/helper';
import type {
  StackBlitzFrameworkOpts,
  FrameworksWithoutShared,
  GetStackblitzProjectAndOpenOptions,
  SharedImportKey,
  ExternalStackBlitzDependency,
} from '@/utils';
import type { Theme, ColorScheme, Framework } from '@/models';

// TODO: decide hasFrameworkMarkup in boilerplate
export type OpenInStackBlitzOpts = {
  markup: string;
  framework: FrameworksWithoutShared;
  theme: Theme;
  hasFrameworkMarkup: boolean;
  backgroundColorScheme: ColorScheme;
  externalStackBlitzDependencies: ExternalStackBlitzDependency[];
  sharedImportKeys: SharedImportKey[];
};

export const openInStackBlitz = (opts: OpenInStackBlitzOpts): void => {
  const { framework, theme, backgroundColorScheme, ...rest } = opts;

  const stackBlitzFrameworkOpts: StackBlitzFrameworkOpts = {
    ...rest,
    title: `Porsche Design System ${framework} sandbox`,
    description: 'Porsche Design System component example',
    globalStyles: `body { background: ${getBackgroundColor(theme, backgroundColorScheme)}; }`,
  };

  const getProjectAndOpenOptionsCallbackMap: {
    [key in Exclude<Framework, 'shared'>]: GetStackblitzProjectAndOpenOptions;
  } = {
    'vanilla-js': getVanillaJsProjectAndOpenOptions,
    angular: getAngularProjectAndOpenOptions,
    react: getReactProjectAndOpenOptions,
  };

  const { openFile, ...project } = getProjectAndOpenOptionsCallbackMap[framework](stackBlitzFrameworkOpts);

  sdk.openProject(project, { openFile });
};
