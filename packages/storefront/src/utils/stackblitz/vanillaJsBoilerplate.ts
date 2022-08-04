import { version as pdsVersion } from '../../../../components-js/projects/components-wrapper/package.json';
import { dependencies } from '../../../package.json';
import type { DependenciesMap, StackBlitzFrameworkOpts } from '@/utils/stackblitz/helper';
import type { Project, OpenOptions, ProjectDependencies } from '@stackblitz/sdk';
import {
  headBasic,
  dataBasic,
  headSorting,
  dataSorting,
  dataAdvanced,
  headAdvanced,
} from '@porsche-design-system/shared';
import { getAdditionalDependencies, isTable } from '@/utils/stackblitz/helper';
import { convertMarkup } from '@/utils/formatting';

const sharedImport = {
  headBasic,
  dataBasic,
  headSorting,
  dataSorting,
  dataAdvanced,
  headAdvanced,
};

export const getFrameworkMarkup = (markup: string, isTable: boolean) =>
  isTable ? extendMarkupWithSharedTableData(markup) : markup;

export const getIndexHtmlMarkup = (markup: string, hasFrameworkMarkup: boolean, isTable: boolean): string => {
  return hasFrameworkMarkup ? getFrameworkMarkup(markup, isTable) : convertMarkup(markup, 'vanilla-js');
};

export const getIndexJsMarkup = (additionalDependencies?: string[]): string => `import './style.css'
import * as porscheDesignSystem from '@porsche-design-system/components-js'
${
  additionalDependencies && additionalDependencies.filter((x) => x === 'IMask')
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

export const getVanillaJsDependencies = (additionalDependencies?: string[]): ProjectDependencies => {
  const dependenciesMap: DependenciesMap = {
    IMask: {
      imask: `${dependencies['imask']}`,
    },
  };

  return {
    '@porsche-design-system/components-js': `${pdsVersion}`,
    ...(additionalDependencies && getAdditionalDependencies(additionalDependencies, dependenciesMap)),
  };
};

export const getVanillaJsProjectAndOpenOptions = (
  props: StackBlitzFrameworkOpts
): { project: Project; openOptions: OpenOptions } => {
  const { markup, description, title, bodyStyles, hasFrameworkMarkup, pdsComponents, additionalDependencies } = props;

  const project: Project = {
    files: {
      'index.html': getIndexHtmlMarkup(markup, hasFrameworkMarkup, isTable(pdsComponents)),
      'index.js': getIndexJsMarkup(additionalDependencies),
      'style.css': bodyStyles,
    },
    template: 'javascript',
    title,
    description,
    dependencies: getVanillaJsDependencies(additionalDependencies),
  };

  const openOptions: OpenOptions = {
    openFile: 'index.html',
  };
  return { project, openOptions };
};
