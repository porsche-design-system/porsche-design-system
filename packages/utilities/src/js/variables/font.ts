import { pxToRem } from '../helper';

export const font = {
  family: `"Porsche Next", "Arial Narrow", Arial, sans-serif`,

  weight: {
    thin: 100,
    regular: 400,
    semibold: 600,
    bold: 700
  },

  size: {
    '12': `${pxToRem('12px')}`,
    '16': `${pxToRem('16px')}`,
    '18': `${pxToRem('18px')}`,
    '20': `${pxToRem('20px')}`,
    '22': `${pxToRem('22px')}`,
    '24': `${pxToRem('24px')}`,
    '28': `${pxToRem('28px')}`,
    '30': `${pxToRem('30px')}`,
    '32': `${pxToRem('32px')}`,
    '36': `${pxToRem('36px')}`,
    '42': `${pxToRem('42px')}`,
    '44': `${pxToRem('44px')}`,
    '48': `${pxToRem('48px')}`,
    '52': `${pxToRem('52px')}`,
    '60': `${pxToRem('60px')}`,
    '62': `${pxToRem('62px')}`,
    '72': `${pxToRem('72px')}`,
    '84': `${pxToRem('84px')}`,
    xSmall: `${pxToRem('12px')}`,
    small: `${pxToRem('16px')}`,
    medium: `${pxToRem('24px')}`,
    large: `${pxToRem('36px')}`,
    xLarge: `${pxToRem('52px')}`
  }
};
