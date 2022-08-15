import { dependencies } from '../../../../components-js/package.json';
import { getExternalDependencies, getSharedImportConstants } from './helper';
import type { StackblitzProjectDependencies } from '../../models';
import type { DependencyMap, SharedImportKey, ExternalDependency, GetStackblitzProjectAndOpenOptions } from './helper';

const externalDependencyToSrcMap: { [key in ExternalDependency]: string } = {
  imask: 'node_modules/imask/dist/imask.min.js',
};

// TODO: Use getLoader partial to inject core chunk to enable issue branches on stackblitz

export const getIndexHtmlMarkup = (
  markup: string,
  globalStyles: string,
  externalDependencies: ExternalDependency[],
  sharedImportKeys: SharedImportKey[]
): string => {
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
    <script src="node_modules/@porsche-design-system/components-js/index.js"></script>
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

export const getExtendedMarkupWithLoadFunction = (markup: string): string => {
  const loadFunction = 'porscheDesignSystem.load();';
  const hasScriptTag = !!markup.match(/<script>/);
  return hasScriptTag
    ? markup.replace(/<script>/, `<script>\n  ${loadFunction}\n\n`)
    : markup + `\n\n<script>${loadFunction}</script>`;
};

export const replaceSharedAsyncFunctionWithConstants = (
  markup: string,
  sharedImportKeys: SharedImportKey[]
): string => {
  return markup.replace(/const { .* } = await [A-z]+\(\);/, getSharedImportConstants(sharedImportKeys));
};

export const dependencyMap: DependencyMap<typeof dependencies> = {
  imask: {
    imask: dependencies['imask'],
  },
};

export const getVanillaJsDependencies = (externalDependencies: ExternalDependency[]): StackblitzProjectDependencies => {
  return {
    '@porsche-design-system/components-js': 'latest',
    ...getExternalDependencies(externalDependencies, dependencyMap),
  };
};

export const getVanillaJsProjectAndOpenOptions: GetStackblitzProjectAndOpenOptions = (opts) => {
  const { markup, description, title, globalStyles, sharedImportKeys, externalDependencies } = opts;

  return {
    files: {
      'index.html': getIndexHtmlMarkup(markup, globalStyles, externalDependencies, sharedImportKeys),
      'index.js': '', // StackBlitz javascript template requires a index.js file
    },
    template: 'javascript',
    title,
    description,
    dependencies: getVanillaJsDependencies(externalDependencies),
    openFile: 'index.html',
  };
};
