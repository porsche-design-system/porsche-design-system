import { dependencies } from '../../../../components-js/package.json';
import {
  headBasic,
  dataBasic,
  headSorting,
  dataSorting,
  dataAdvanced,
  headAdvanced,
} from '@porsche-design-system/shared';
import { getAdditionalDependencies, isTable } from '@/utils/stackblitz/helper';
import type { AdditionalStackBlitzDependency, GetStackblitzProjectAndOpenOptions } from '@/utils/stackblitz/helper';
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
export const getFrameworkMarkup = (markup: string, isTable: boolean) =>
  isTable ? extendMarkupWithSharedTableData(markup) : markup;

export const getIndexHtmlMarkup = (markup: string, hasFrameworkMarkup: boolean, isTable: boolean): string => {
  return hasFrameworkMarkup ? getFrameworkMarkup(markup, isTable) : markup;
};

export const getIndexJsMarkup = (additionalStackBlitzDependencies?: string[]): string => `import './style.css'
import * as porscheDesignSystem from '@porsche-design-system/components-js'
${
  additionalStackBlitzDependencies && additionalStackBlitzDependencies.filter((x) => x === 'IMask')
    ? `import IMask from 'imask';
IMask`
    : ''
}

porscheDesignSystem.load();
`;

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
  additionalStackBlitzDependencies?: AdditionalStackBlitzDependency[]
): StackblitzProjectDependencies => {
  return {
    '@porsche-design-system/components-js': dependencies['@porsche-design-system/components-js'],
    ...(additionalStackBlitzDependencies &&
      getAdditionalDependencies(additionalStackBlitzDependencies, dependenciesMap)),
  };
};

export const getVanillaJsProjectAndOpenOptions: GetStackblitzProjectAndOpenOptions = (opts) => {
  const {
    markup,
    description,
    title,
    bodyStyles,
    hasFrameworkMarkup,
    pdsComponents,
    additionalStackBlitzDependencies,
  } = opts;

  return {
    files: {
      'index.html': getIndexHtmlMarkup(markup, hasFrameworkMarkup, isTable(pdsComponents)),
      'index.js': getIndexJsMarkup(additionalStackBlitzDependencies),
      'style.css': bodyStyles,
    },
    template: 'javascript',
    title,
    description,
    dependencies: getVanillaJsDependencies(additionalStackBlitzDependencies),
    openFile: 'index.html',
  };
};
