import type { FontBehavior } from './font-shared';

export const fontBehavior: FontBehavior = {
  overflowWrap: 'break-word',
  WebkitTextSizeAdjust: 'none', // stop iOS safari from adjusting font size when screen rotation is changing
  textSizeAdjust: 'none',
};
