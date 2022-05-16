import type { FontBehavior } from './font-shared';

export const fontBehavior: FontBehavior = {
  textSizeAdjust: 'none',
  WebkitTextSizeAdjust: 'none', // stop iOS safari from adjusting font size when screen rotation is changing
};
