import { rem } from './helper';

export const spacing = {
  '4': `${rem(4)}`,
  '8': `${rem(8)}`,
  '16': `${rem(16)}`,
  '24': `${rem(24)}`,
  '32': `${rem(32)}`,
  '40': `${rem(40)}`,
  '48': `${rem(48)}`,
  '56': `${rem(56)}`,
  '46': `${rem(46)}`,
  '72': `${rem(72)}`,
  '80': `${rem(80)}`
};

export const layout = {
  xSmall: spacing['4'],
  small: spacing['8'],
  medium: spacing['16'],
  large: spacing['32'],
  xLarge: spacing['48'],
  xxLarge: spacing['80']
};
