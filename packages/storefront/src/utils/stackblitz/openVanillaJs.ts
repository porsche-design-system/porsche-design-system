import { version as pdsVersion } from '../../../../components-js/projects/components-wrapper/package.json';
import type { StackBlitzFrameworkOpts, DependenciesMap } from '@/utils/stackblitz/openInStackBlitz';
import sdk from '@stackblitz/sdk';
import { getAdditionalDependencies } from '@/utils/stackblitz/openInStackBlitz';
import { dependencies as storefrontDependencies } from '../../../package.json';

export const openVanillaJS = (props: StackBlitzFrameworkOpts): void => {
  const { markup, description, title, isThemeDark, bodyStyles, additionalDependencies } = props;

  const dependenciesMap: DependenciesMap = {
    IMask: {
      imask: `${storefrontDependencies['imask']}`,
    },
  };

  sdk.openProject(
    {
      files: {
        'index.html': `${markup}`,
        'index.js': `import './style.css'
import * as porscheDesignSystem from '@porsche-design-system/components-js'
${
  additionalDependencies?.filter((x) => x === 'IMask')
    ? `import IMask from 'imask';
IMask`
    : ''
}

porscheDesignSystem.load();
`,
        'style.css': isThemeDark ? bodyStyles : '',
      },
      template: 'javascript',
      title,
      description,
      dependencies: {
        '@porsche-design-system/components-js': `${pdsVersion}`,
        ...getAdditionalDependencies(additionalDependencies, dependenciesMap),
      },
    },
    {
      openFile: 'index.html',
    }
  );
};
