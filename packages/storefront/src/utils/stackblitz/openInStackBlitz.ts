import sdk from '@stackblitz/sdk';
import { getBackgroundColor, transformSrcAndSrcsetOfImgAndSourceTags } from './helper';
import { getVanillaJsProjectAndOpenOptions } from './getVanillaJsProjectAndOpenOptions';
import { getAngularProjectAndOpenOptions } from './getAngularProjectAndOpenOptions';
import { getReactProjectAndOpenOptions } from './getReactProjectAndOpenOptions';
import type {
  StackBlitzFrameworkOpts,
  GetStackBlitzProjectAndOpenOptions,
  SharedImportKey,
  ExternalDependency,
} from '@/utils';
import type { Theme, BackgroundColor, Framework } from '@/models';
import type { PorscheDesignSystemBundle } from '@/utils/stackblitz/types';

export type OpenInStackBlitzOpts = {
  porscheDesignSystemBundle: PorscheDesignSystemBundle;
  markup: string;
  framework: Exclude<Framework, 'vue' | 'shared'>;
  theme: Theme;
  backgroundColor: BackgroundColor;
  externalDependencies: ExternalDependency[];
  sharedImportKeys: SharedImportKey[];
  pdsVersion: string;
};

export const openInStackBlitz = (opts: OpenInStackBlitzOpts): void => {
  const { markup, framework, theme, backgroundColor, ...rest } = opts;

  const stackBlitzFrameworkOpts: StackBlitzFrameworkOpts = {
    ...rest,
    markup: transformSrcAndSrcsetOfImgAndSourceTags(markup),
    title: `Porsche Design System ${framework} sandbox`,
    description: 'Porsche Design System component example',
    globalStyles: `body { background: ${getBackgroundColor(theme, backgroundColor)}; }`,
  };

  const getProjectAndOpenOptionsMap: Record<
    Exclude<Framework, 'vue' | 'shared'>,
    GetStackBlitzProjectAndOpenOptions
  > = {
    'vanilla-js': getVanillaJsProjectAndOpenOptions,
    angular: getAngularProjectAndOpenOptions,
    react: getReactProjectAndOpenOptions,
  };

  const { openFile, ...project } = getProjectAndOpenOptionsMap[framework](stackBlitzFrameworkOpts);

  sdk.openProject(project, { openFile });
};
