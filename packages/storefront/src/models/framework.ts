import type { Framework } from '@porsche-design-system/shared';

export type FrameworkConfiguratorMarkup = {
  [key in Framework]: {
    imports?: string;
    states?: string | undefined; // Can be useState, ref or const
    eventHandlers?: string | undefined; // Can be functions or eventListeners
    markup: string | undefined; // The actual markup
  };
};

export const frameworkNameMap: Record<Framework, string> = {
  'vanilla-js': 'Vanilla JS',
  angular: 'Angular',
  react: 'React',
  vue: 'Vue',
};
