import { version as pdsVersion } from '../../../../components-js/projects/components-wrapper/package.json';
import type { StackBlitzFrameworkOpts } from '@/utils/stackblitz/openInStackBlitz';
import sdk from '@stackblitz/sdk';

export const openVanillaJS = (props: StackBlitzFrameworkOpts): void => {
  const { markup, description, title, isThemeDark, bodyStyles, additionalJavaScriptLogic } = props;

  sdk.openProject(
    {
      files: {
        'index.html': `${markup}`,
        'index.js': `import './style.css'
import * as porscheDesignSystem from '@porsche-design-system/components-js'
porscheDesignSystem.load();

${additionalJavaScriptLogic}
`,
        'style.css': isThemeDark ? bodyStyles : '',
      },
      template: 'javascript',
      title,
      description,
      dependencies: {
        '@porsche-design-system/components-js': `${pdsVersion}`,
      },
    },
    {
      openFile: 'index.html',
    }
  );
};
