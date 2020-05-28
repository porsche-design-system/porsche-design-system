import { pxToRem } from '../helper';

export const spacing = {
  '4': `${pxToRem('4px')}`,
  '8': `${pxToRem('8px')}`,
  '16': `${pxToRem('16px')}`,
  '24': `${pxToRem('24px')}`,
  '32': `${pxToRem('32px')}`,
  '40': `${pxToRem('40px')}`,
  '48': `${pxToRem('48px')}`,
  '56': `${pxToRem('56px')}`,
  '46': `${pxToRem('46px')}`,
  '72': `${pxToRem('72px')}`,
  '80': `${pxToRem('80px')}`
};

export const layout = {
  xSmall: spacing['4'],
  small: spacing['8'],
  medium: spacing['16'],
  large: spacing['32'],
  xLarge: spacing['48'],
  xxLarge: spacing['80']
};
