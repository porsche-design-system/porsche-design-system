import sdk from '@stackblitz/sdk';
import { getBackgroundColor, transformSrcAndSrcsetOfImgAndSourceTags } from './helper';
import { getVanillaJsProjectAndOpenOptions } from './getVanillaJsProjectAndOpenOptions';
import { getAngularProjectAndOpenOptions } from './getAngularProjectAndOpenOptions';
import { getReactProjectAndOpenOptions } from './getReactProjectAndOpenOptions';
import { getVueProjectAndOpenOptions } from './getVueProjectAndOpenOptions';
import type {
  StackBlitzFrameworkOpts,
  GetStackBlitzProjectAndOpenOptions,
  SharedImportKey,
  ExternalDependency,
} from '@/utils';
import type { PlaygroundTheme, BackgroundColor, Framework, PlaygroundDir } from '@/models';
import type { PorscheDesignSystemBundle } from '@/utils/stackblitz/types';

export type OpenInStackBlitzOpts = {
  porscheDesignSystemBundle: PorscheDesignSystemBundle;
  markup: string;
  dir: PlaygroundDir;
  framework: Exclude<Framework, 'shared' | 'next'>;
  theme: PlaygroundTheme;
  backgroundColor: BackgroundColor;
  externalDependencies: ExternalDependency[];
  sharedImportKeys: SharedImportKey[];
  pdsVersion: string;
  embedElement?: string | HTMLElement;
};

export const openInStackBlitz = (opts: OpenInStackBlitzOpts): void => {
  const { markup, framework, theme, backgroundColor, embedElement, ...rest } = opts;

  const stackBlitzFrameworkOpts: StackBlitzFrameworkOpts = {
    ...rest,
    markup: transformSrcAndSrcsetOfImgAndSourceTags(markup),
    title: `Porsche Design System ${framework} sandbox`,
    description: 'Porsche Design System component example',
    globalStyles:
      theme === 'auto'
        ? `body { background: ${getBackgroundColor('light', backgroundColor)}; }
      @media (prefers-color-scheme: dark) {
        body { background: ${getBackgroundColor('dark', backgroundColor)}; }
      }`
        : `body { background: ${getBackgroundColor(theme, backgroundColor)}; }`,
  };

  const getProjectAndOpenOptionsMap: Record<
    Exclude<Framework, 'shared' | 'next'>,
    GetStackBlitzProjectAndOpenOptions
  > = {
    'vanilla-js': getVanillaJsProjectAndOpenOptions,
    angular: getAngularProjectAndOpenOptions,
    react: getReactProjectAndOpenOptions,
    vue: getVueProjectAndOpenOptions,
  };

  const { openFile, ...project } = getProjectAndOpenOptionsMap[framework](stackBlitzFrameworkOpts);

  if (embedElement) {
    sdk.embedProject(embedElement, project, {
      openFile,
      height: '500px',
      view: 'preview',
      hideDevTools: true,
      hideExplorer: true,
      hideNavigation: true,
    });
  } else {
    sdk.openProject(project, { openFile });
  }
};
