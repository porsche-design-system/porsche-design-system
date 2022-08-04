import { version as pdsVersion } from '../../../../components-js/projects/components-wrapper/package.json';
import { dependencies } from '../../../package.json';
import type { DependenciesMap, StackBlitzFrameworkOpts } from '@/utils/stackblitz/helper';
import type { Project, OpenOptions } from '@stackblitz/sdk';
import {
  headBasic,
  dataBasic,
  headSorting,
  dataSorting,
  dataAdvanced,
  headAdvanced,
} from '@porsche-design-system/shared';
import { getAdditionalDependencies } from '@/utils/stackblitz/helper';
import { convertMarkup } from '@/utils';

const sharedImport = {
  headBasic,
  dataBasic,
  headSorting,
  dataSorting,
  dataAdvanced,
  headAdvanced,
};

const getIndexHtmlMarkup = (markup: string, sharedTableData?: string): string => {
  return sharedTableData
    ? extendMarkupWithSharedTableData(markup, sharedTableData)
    : convertMarkup(markup, 'vanilla-js');
};

const getIndexJsMarkup = (markup: string, additionalDependencies?: string[]): string => `import './style.css'
import * as porscheDesignSystem from '@porsche-design-system/components-js'
${
  additionalDependencies && additionalDependencies.filter((x) => x === 'IMask')
    ? `import IMask from 'imask';
IMask`
    : ''
}

porscheDesignSystem.load();
`;

const extendMarkupWithSharedTableData = (markup: string, sharedTableData: string): string => {
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

export const getVanillaJsProjectAndOpenOptions = (
  props: StackBlitzFrameworkOpts
): { project: Project; openOptions: OpenOptions } => {
  const { markup, description, title, bodyStyles, additionalDependencies } = props;
  const [, sharedTableData] = markup.match(/const { ((?:[A-z]+,* )+)} = await getHeadAndData\(\);/) ?? [];

  const dependenciesMap: DependenciesMap = {
    IMask: {
      imask: `${dependencies['imask']}`,
    },
  };

  const project: Project = {
    files: {
      'index.html': getIndexHtmlMarkup(markup, sharedTableData),
      'index.js': getIndexJsMarkup(markup, additionalDependencies),
      'style.css': bodyStyles,
    },
    template: 'javascript',
    title,
    description,
    dependencies: {
      '@porsche-design-system/components-js': `${pdsVersion}`,
      ...(additionalDependencies && getAdditionalDependencies(additionalDependencies, dependenciesMap)),
    },
  };

  const openOptions: OpenOptions = {
    openFile: 'index.html',
  };
  return { project, openOptions };
};
