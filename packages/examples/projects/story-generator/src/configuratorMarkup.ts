import type { Framework } from '@porsche-design-system/shared';

export type FrameworkConfiguratorMarkup = {
  [key in Framework]: {
    imports?: string;
    states?: string | undefined; // Can be useState, ref or const
    eventHandlers?: string | undefined; // Can be functions or eventListeners
    markup: string | undefined; // The actual markup
    style?: string | undefined; // The style tag (needs to be separate for vue)
  };
};
