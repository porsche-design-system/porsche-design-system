import type { FontBehavior } from './font-shared';

export const fontBehavior: FontBehavior = {
  hyphens: 'auto',
  overflowWrap: 'break-word',
  textSizeAdjust: 'none',
  WebkitTextSizeAdjust: 'none', // stop iOS safari from adjusting font size when screen rotation is changing
};
