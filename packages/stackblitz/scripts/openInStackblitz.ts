import sdk from '@stackblitz/sdk';
import { vanillaJsBundle } from '../generated/bundle';

export const openInStackblitz2 = (markup: string) => {
  sdk.openProject({
    files: {
      ...vanillaJsBundle,
      'index.html': markup,
    },
    template: 'node',
    title: 'Porsche Design System vanilla-js sandbox',
    description: 'Porsche Design System component example',
  });
};
