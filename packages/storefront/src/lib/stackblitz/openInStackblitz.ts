import sdk from '@stackblitz/sdk';
import { dependencies } from '../../../../components-js/package.json';

export const openInStackblitz = (markup: string) => {
  sdk.openProject(
    {
      files: {
        'index.html': markup,
        'index.js': '',
      },
      template: 'javascript',
      title: 'Porsche Design System',
      description: 'Porsche Design System component example',
      dependencies: {
        '@porsche-design-system/components-js': dependencies['@porsche-design-system/components-js'],
      },
    },
    {
      openFile: 'index.html',
    }
  );
};
