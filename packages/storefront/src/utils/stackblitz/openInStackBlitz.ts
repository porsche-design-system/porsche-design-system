import sdk from '@stackblitz/sdk';
import { getBackgroundColor, transformImgAndSourceTags } from './helper';
import { getVanillaJsProjectAndOpenOptions } from './getVanillaJsProjectAndOpenOptions';
import { getAngularProjectAndOpenOptions } from './getAngularProjectAndOpenOptions';
import { getReactProjectAndOpenOptions } from './getReactProjectAndOpenOptions';
import type {
  StackBlitzFrameworkOpts,
  GetStackblitzProjectAndOpenOptions,
  SharedImportKey,
  ExternalDependency,
} from '../../utils';
import type { Theme, ColorScheme, Framework } from '../../models';
import type { PorscheDesignSystemBundle } from '@/utils/stackblitz/types';

export type OpenInStackBlitzOpts = {
  porscheDesignSystemBundle: PorscheDesignSystemBundle;
  markup: string;
  framework: Exclude<Framework, 'shared'>;
  theme: Theme;
  backgroundColorScheme: ColorScheme;
  externalDependencies: ExternalDependency[];
  sharedImportKeys: SharedImportKey[];
};

export const openInStackBlitz = (opts: OpenInStackBlitzOpts): void => {
  const { markup, framework, theme, backgroundColorScheme, ...rest } = opts;

  const stackBlitzFrameworkOpts: StackBlitzFrameworkOpts = {
    ...rest,
    markup: transformImgAndSourceTags(markup),
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
