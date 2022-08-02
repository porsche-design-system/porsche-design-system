import sdk from '@stackblitz/sdk';
import { version as pdsVersion } from '../../../../components-js/projects/components-wrapper/package.json';
import { dependencies as storefrontDependencies } from '../../../package.json';
import { getAdditionalDependencies, transformSharedTableMarkup } from '@/utils/stackblitz/openInStackBlitz';
import type { StackBlitzFrameworkOpts, DependenciesMap } from '@/utils/stackblitz/openInStackBlitz';

export const openVanillaJS = (props: StackBlitzFrameworkOpts): void => {
  const { markup, description, title, bodyStyles, sharedTableMarkup, additionalDependencies } = props;

  const dependenciesMap: DependenciesMap = {
    IMask: {
      imask: `${storefrontDependencies['imask']}`,
    },
  };

  sdk.openProject(
    {
      files: {
        'index.html': `${
          sharedTableMarkup
            ? markup.replace(
                /(<script>)/,
                `$1
const getHeadAndData = () => {
  ${transformSharedTableMarkup(sharedTableMarkup)}

  return { ${Object.keys(sharedTableMarkup)
    .map((key, index) => ` ${index === 0 ? 'head' : 'data'}: ${key}`)
    .join(', ')} };
};
`
              )
            : markup
        }`,
        'index.js': `import './style.css'
import * as porscheDesignSystem from '@porsche-design-system/components-js'
${
  additionalDependencies && additionalDependencies.filter((x) => x === 'IMask')
    ? `import IMask from 'imask';
IMask`
    : ''
}

porscheDesignSystem.load();
`,
        'style.css': bodyStyles,
      },
      template: 'javascript',
      title,
      description,
      dependencies: {
        '@porsche-design-system/components-js': `${pdsVersion}`,
        ...(additionalDependencies && getAdditionalDependencies(additionalDependencies, dependenciesMap)),
      },
    },
    {
      openFile: 'index.html',
    }
  );
};
