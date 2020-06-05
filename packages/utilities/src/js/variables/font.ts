import { pxToRem, typeScale } from '../helper';

export const font = {
  family: `"Porsche Next", "Arial Narrow", Arial, sans-serif`,

  weight: {
    thin: 100,
    regular: 400,
    semibold: 600,
    bold: 700
  },

  size: {
    '12': typeScale(pxToRem('12px')),
    '16': typeScale(pxToRem('16px')),
    '18': typeScale(pxToRem('18px')),
    '20': typeScale(pxToRem('20px')),
    '22': typeScale(pxToRem('22px')),
    '24': typeScale(pxToRem('24px')),
    '28': typeScale(pxToRem('28px')),
    '30': typeScale(pxToRem('30px')),
    '32': typeScale(pxToRem('32px')),
    '36': typeScale(pxToRem('36px')),
    '42': typeScale(pxToRem('42px')),
    '44': typeScale(pxToRem('44px')),
    '48': typeScale(pxToRem('48px')),
    '52': typeScale(pxToRem('52px')),
    '60': typeScale(pxToRem('60px')),
    '62': typeScale(pxToRem('62px')),
    '72': typeScale(pxToRem('72px')),
    '84': typeScale(pxToRem('84px')),
    xSmall: typeScale(pxToRem('12px')),
    small: typeScale(pxToRem('16px')),
    medium: typeScale(pxToRem('24px')),
    large: typeScale(pxToRem('36px')),
    xLarge: typeScale(pxToRem('52px'))
  }
};
