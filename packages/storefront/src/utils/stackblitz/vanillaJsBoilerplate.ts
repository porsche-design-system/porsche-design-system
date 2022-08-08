import { dependencies } from '../../../../components-js/package.json';
import {
  headBasic,
  dataBasic,
  headSorting,
  dataSorting,
  dataAdvanced,
  headAdvanced,
} from '@porsche-design-system/shared';
import { getExternalDependencies, hastIMaskDependency, isTable } from '@/utils/stackblitz/helper';
import type { ExternalStackBlitzDependency, GetStackblitzProjectAndOpenOptions } from '@/utils/stackblitz/helper';
import type { StackblitzProjectDependencies } from '@/models';
import type { StackBlitzDependencyMap } from '@/utils/stackblitz/helper';

const sharedImport = {
  headBasic,
  dataBasic,
  headSorting,
  dataSorting,
  dataAdvanced,
  headAdvanced,
};

// TODO: redundant calls
export const getIndexHtmlMarkup = (markup: string, isTable: boolean, bodyStyles: string, hasIMask: boolean): string => {
  return `<!DOCTYPE html>
<html dir="ltr" lang="en">
  <head>
    <script src="node_modules/@porsche-design-system/components-js/index.js"></script>${
      hasIMask
        ? `
    <script src="node_modules/imask/dist/imask.min.js"></script>`
        : ''
    }
    <style>
      ${bodyStyles}
    </style>
  </head>
  <body>
    <script>porscheDesignSystem.load()</script>
    ${(isTable ? extendMarkupWithSharedTableData(markup) : markup).replace(/(\n)+(\s*<?\/?[A-z})]+)/g, '$1    $2')}
  </body>
</html>`;
};

export const extendMarkupWithSharedTableData = (markup: string): string => {
  const [, sharedTableData] = markup.match(/const { ((?:[A-z]+,* )+)} = await getHeadAndData\(\);/) ?? [];
  const importVariables = sharedTableData.replace(/\s/g, '').split(',') as [
    'headBasic' | 'dataBasic' | 'headSorting' | 'dataSorting' | 'dataAdvanced' | 'headAdvanced'
  ];

  return markup.replace(
    /(<script>)/,
    `$1
const getHeadAndData = () => {

    ${importVariables.map((x) => `const ${x} = ${JSON.stringify(sharedImport[x])};`).join('\n    ')}

  return { ${sharedTableData} };
};`
  );
};

const dependenciesMap: StackBlitzDependencyMap = {
  imask: {
    imask: dependencies['imask'],
  },
};

export const getVanillaJsDependencies = (
  externalStackBlitzDependencies?: ExternalStackBlitzDependency[]
): StackblitzProjectDependencies => {
  return {
    '@porsche-design-system/components-js': dependencies['@porsche-design-system/components-js'],
    ...(externalStackBlitzDependencies && getExternalDependencies(externalStackBlitzDependencies, dependenciesMap)),
  };
};

export const getVanillaJsProjectAndOpenOptions: GetStackblitzProjectAndOpenOptions = (opts) => {
  const { markup, description, title, bodyStyles, pdsComponents, externalStackBlitzDependencies } = opts;

  const hasIMask = hastIMaskDependency(externalStackBlitzDependencies);

  return {
    files: {
      'index.html': getIndexHtmlMarkup(markup, isTable(pdsComponents), bodyStyles, hasIMask),
      'index.js': '',
    },
    template: 'javascript',
    title,
    description,
    dependencies: getVanillaJsDependencies(externalStackBlitzDependencies),
    openFile: 'index.html',
  };
};
