import type { Framework, FrameworkMarkup } from '@porsche-design-system/shared';

export type FrameworkConfiguratorMarkup = {
  [key in Framework]: {
    imports?: string;
    states?: string | undefined; // Can be useState, ref or const
    eventHandlers?: string | undefined; // Can be functions or eventListeners
    markup: string | undefined; // The actual markup
  };
};

export type FrameworkWithNext = Framework | 'next';

export const frameworkNameMap: Record<FrameworkWithNext, string> = {
  'vanilla-js': 'Vanilla JS',
  angular: 'Angular',
  react: 'React',
  vue: 'Vue',
  next: 'Next',
};
