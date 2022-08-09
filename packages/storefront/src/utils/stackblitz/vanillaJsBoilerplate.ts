import { dependencies } from '../../../../components-js/package.json';
import { getExternalDependencies, getSharedImportConstants } from '@/utils/stackblitz/helper';
import type { StackblitzProjectDependencies } from '@/models';
import type {
  StackBlitzDependencyMap,
  SharedImportKey,
  ExternalStackBlitzDependency,
  GetStackblitzProjectAndOpenOptions,
} from '@/utils';

const externalStackBlitzDependencyToSrcMap: { [key in ExternalStackBlitzDependency]: string } = {
  imask: 'node_modules/imask/dist/imask.min.js',
};

// TODO: move load() into script of framework examples
export const getIndexHtmlMarkup = (
  markup: string,
  bodyStyles: string,
  externalStackBlitzDependencies: ExternalStackBlitzDependency[],
  sharedImportKeys?: SharedImportKey[]
): string => {
  const scriptWithExternalDependency = externalStackBlitzDependencies.map(
    (dependency) => `\n<script src="${externalStackBlitzDependencyToSrcMap[dependency]}"></script>\n`
  );

  return `<!DOCTYPE html>
<html dir="ltr" lang="en">
  <head>
    <script src="node_modules/@porsche-design-system/components-js/index.js"></script>${scriptWithExternalDependency}

    <style>
      ${bodyStyles}
    </style>
  </head>
  <body>
    ${sharedImportKeys ? inlineSharedData(markup, sharedImportKeys) : markup}
    <script>porscheDesignSystem.load();</script>
  </body>
</html>`;
};

export const inlineSharedData = (markup: string, sharedImportKeys: SharedImportKey[]): string => {
  return markup.replace(/const { .* } = await [A-z]+\(\);/, getSharedImportConstants(sharedImportKeys));
};

const dependencyMap: StackBlitzDependencyMap = {
  imask: {
    imask: dependencies['imask'],
  },
};

export const getVanillaJsDependencies = (
  externalStackBlitzDependencies: ExternalStackBlitzDependency[]
): StackblitzProjectDependencies => {
  return {
    '@porsche-design-system/components-js': dependencies['@porsche-design-system/components-js'],
    ...getExternalDependencies(externalStackBlitzDependencies, dependencyMap),
  };
};

export const getVanillaJsProjectAndOpenOptions: GetStackblitzProjectAndOpenOptions = (opts) => {
  const { markup, description, title, globalStyles, sharedImportKeys, externalStackBlitzDependencies } = opts;

  return {
    files: {
      'index.html': getIndexHtmlMarkup(markup, globalStyles, externalStackBlitzDependencies, sharedImportKeys),
      'index.js': '',
    },
    template: 'javascript',
    title,
    description,
    dependencies: getVanillaJsDependencies(externalStackBlitzDependencies),
    openFile: 'index.html',
  };
};
