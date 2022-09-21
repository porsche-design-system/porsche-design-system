import { dependencies } from '../../../../components-js/package.json';
import {
  getExternalDependencies,
  getSharedImportConstants,
  isStableStorefrontRelease
} from './helper';
import type { StackblitzProjectDependencies } from '../../models';
import type { DependencyMap, ExternalDependency, GetStackblitzProjectAndOpenOptions, SharedImportKey } from './helper';

const externalDependencyToSrcMap: { [key in ExternalDependency]: string } = {
  imask: 'node_modules/imask/dist/imask.min.js',
};

export const replaceSharedAsyncFunctionWithConstants = (
  markup: string,
  sharedImportKeys: SharedImportKey[]
): string => {
  return markup.replace(/const { .* } = await [A-z]+\(\);/, getSharedImportConstants(sharedImportKeys));
};

export const getExtendedMarkupWithLoadFunction = (markup: string): string => {
  const loadFunction = 'porscheDesignSystem.load();';

  return /<script>/.test(markup)
    ? markup.replace(/<script>/, `<script>\n  ${loadFunction}\n\n`)
    : `${markup}\n\n<script>${loadFunction}</script>`;
};

export const getIndexHtml = (
  markup: string,
  globalStyles: string,
  externalDependencies: ExternalDependency[],
  sharedImportKeys: SharedImportKey[]
): string => {
  const porscheDesignSystemLoaderScript = `<script src="${isStableStorefrontRelease() ? 'node_modules' : '.' }/@porsche-design-system/components-js/index.js"></script>`;
  const externalScripts = externalDependencies
    .map((dependency) => `<script src="${externalDependencyToSrcMap[dependency]}"></script>`)
    .join('\n    ');

  const extendedMarkupWithLoadFunction = getExtendedMarkupWithLoadFunction(markup);

  // TODO: Improve alignment of inlined shared data (look into table)
  const bodyContent = replaceSharedAsyncFunctionWithConstants(extendedMarkupWithLoadFunction, sharedImportKeys).replace(
    /(\n)/g,
    '$1    '
  );

  return `<!DOCTYPE html>
<html dir="ltr" lang="en">
  <head>
    ${porscheDesignSystemLoaderScript}
    ${externalScripts}
    <style>
      ${globalStyles}
    </style>
  </head>
  <body>
    ${bodyContent}
  </body>
</html>`;
};

export const getIndexJs = (): string => isStableStorefrontRelease() ? '' : `import * as porscheDesignSystem from './@porsche-design-system/components-js';
window.porscheDesignSystem = porscheDesignSystem`;
};

export const dependencyMap: DependencyMap<typeof dependencies> = {
  imask: {
    imask: dependencies['imask'],
  },
};

export const getDependencies = (externalDependencies: ExternalDependency[]): StackblitzProjectDependencies => {
  return {
    ...isStableStorefrontRelease() && {
      '@porsche-design-system/components-js': dependencies['@porsche-design-system/components-js']
    },
    ...getExternalDependencies(externalDependencies, dependencyMap),
  };
};

export const getVanillaJsProjectAndOpenOptions: GetStackblitzProjectAndOpenOptions = (opts) => {
  const { markup, description, title, globalStyles, sharedImportKeys, externalDependencies, porscheDesignSystemBundle } = opts;

  return {
    files: {
      ...porscheDesignSystemBundle,
      'index.html': getIndexHtml(markup, globalStyles, externalDependencies, sharedImportKeys),
      'index.js': getIndexJs(),
    },
    template: 'javascript',
    title,
    description,
    dependencies: getDependencies(externalDependencies),
    openFile: 'index.html',
  };
};
