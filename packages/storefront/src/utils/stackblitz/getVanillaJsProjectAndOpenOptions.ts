import { dependencies } from '../../../../components-js/package.json';
import {
  getExternalDependencies,
  getSharedImportConstants,
  isStableStorefrontReleaseOrForcedPdsVersion,
} from './helper';
import type { StackBlitzProjectDependencies } from '../../models';
import type { DependencyMap, ExternalDependency, GetStackBlitzProjectAndOpenOptions, SharedImportKey } from './helper';
import { initialStyles } from '@/lib/partialResults';

// TODO: this entire puzzle should be refactored into an object-oriented way so that there is a clear and clean structure
// as well as code flow, similar to our WrapperGenerator

const externalDependencyToSrcMap: Partial<Record<ExternalDependency, string>> = {
  imask: 'node_modules/imask/dist/imask.min.js',
};

export const replaceSharedAsyncFunctionWithConstants = (
  markup: string,
  sharedImportKeys: SharedImportKey[]
): string => {
  return markup.replace(/const { .* } = await [a-zA-Z]+\(\);/, getSharedImportConstants(sharedImportKeys));
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
  sharedImportKeys: SharedImportKey[],
  pdsVersion: string
): string => {
  const basePath = isStableStorefrontReleaseOrForcedPdsVersion(pdsVersion) ? 'node_modules' : '.';
  const porscheDesignSystemScript = `<script src="${basePath}/@porsche-design-system/components-js/esm/index.mjs"></script>`;
  const externalScripts = externalDependencies
    .map((dependency) => `<script src="${externalDependencyToSrcMap[dependency]}"></script>`)
    .join('\n    ');
  const scripts = [porscheDesignSystemScript, ...externalScripts].join('\n    ');

  const extendedMarkupWithLoadFunction = getExtendedMarkupWithLoadFunction(markup);

  // TODO: Improve alignment of inlined shared data (look into table)
  const bodyContent = replaceSharedAsyncFunctionWithConstants(extendedMarkupWithLoadFunction, sharedImportKeys).replace(
    /(\n)/g,
    '$1    '
  );

  return `<!doctype html>
<html dir="ltr" lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Porsche Design System - Vanilla JS</title>
    ${scripts}

    <!-- prettier-ignore -->
    ${initialStyles}

    <style>
      html, body { margin: 0; padding: 0; }
      ${globalStyles}
    </style>
  </head>
  <body>
    ${bodyContent}
  </body>
</html>`;
};

export const getIndexJs = (pdsVersion: string): string => {
  // workaround to initialize local package
  return isStableStorefrontReleaseOrForcedPdsVersion(pdsVersion)
    ? ''
    : `import * as porscheDesignSystem from './@porsche-design-system/components-js';
window.porscheDesignSystem = porscheDesignSystem;`; // appears to be using cjs build
};

export const dependencyMap: Partial<DependencyMap<typeof dependencies>> = {
  imask: {
    imask: dependencies['imask'],
  },
};

export const getDependencies = (
  externalDependencies: ExternalDependency[],
  pdsVersion: string
): StackBlitzProjectDependencies => {
  return {
    ...(isStableStorefrontReleaseOrForcedPdsVersion(pdsVersion) && {
      '@porsche-design-system/components-js': pdsVersion || dependencies['@porsche-design-system/components-js'],
    }),
    ...getExternalDependencies(externalDependencies, dependencyMap),
  };
};

export const getVanillaJsProjectAndOpenOptions: GetStackBlitzProjectAndOpenOptions = (opts) => {
  const {
    markup,
    description,
    title,
    globalStyles,
    sharedImportKeys,
    externalDependencies,
    porscheDesignSystemBundle,
    pdsVersion,
  } = opts;

  return {
    files: {
      ...porscheDesignSystemBundle,
      'index.html': getIndexHtml(markup, globalStyles, externalDependencies, sharedImportKeys, pdsVersion),
      'index.js': getIndexJs(pdsVersion),
    },
    template: 'javascript',
    title,
    description,
    dependencies: getDependencies(externalDependencies, pdsVersion),
    openFile: 'index.html',
  };
};
