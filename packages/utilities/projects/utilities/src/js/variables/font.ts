import * as CSS from 'csstype';

export type FontSize =
  | '12'
  | '16'
  | '18'
  | '20'
  | '22'
  | '24'
  | '28'
  | '30'
  | '32'
  | '36'
  | '42'
  | '44'
  | '48'
  | '52'
  | '60'
  | '62'
  | '72'
  | '84'
  | 'xSmall'
  | 'small'
  | 'medium'
  | 'large'
  | 'xLarge';

export type FontWeight = 'thin' | 'regular' | 'semibold' | 'bold';

export type FontSizeLineHeight = Pick<CSS.Properties, 'fontSize' | 'lineHeight'>;

type FontType = {
  family: string;
  weight: { [key in FontWeight]: number };
  size: { [key in FontSize]: FontSizeLineHeight };
};

export const font: FontType = {
  family: `"Porsche Next", "Arial Narrow", Arial, sans-serif`,

  weight: {
    thin: 100,
    regular: 400,
    semibold: 600,
    bold: 700
  },
// To boost performance, size is defined static.
  size: {
    '12': { fontSize: '0.75rem', lineHeight: 1.66667 },
    '16': { fontSize: '1rem', lineHeight: 1.5 },
    '18': { fontSize: '1.125rem', lineHeight: 1.55556 },
    '20': { fontSize: '1.25rem', lineHeight: 1.4 },
    '22': { fontSize: '1.375rem', lineHeight: 1.45455 },
    '24': { fontSize: '1.5rem', lineHeight: 1.5 },
    '28': { fontSize: '1.75rem', lineHeight: 1.42857 },
    '30': { fontSize: '1.875rem', lineHeight: 1.33333 },
    '32': { fontSize: '2rem', lineHeight: 1.375 },
    '36': { fontSize: '2.25rem', lineHeight: 1.33333 },
    '42': { fontSize: '2.625rem', lineHeight: 1.2381 },
    '44': { fontSize: '2.75rem', lineHeight: 1.18182 },
    '48': { fontSize: '3rem', lineHeight: 1.25 },
    '52': { fontSize: '3.25rem', lineHeight: 1.23077 },
    '60': { fontSize: '3.75rem', lineHeight: 1.2 },
    '62': { fontSize: '3.875rem', lineHeight: 1.22581 },
    '72': { fontSize: '4.5rem', lineHeight: 1.22222 },
    '84': { fontSize: '5.25rem', lineHeight: 1.19048 },
    xSmall: { fontSize: '0.75rem', lineHeight: 1.5 },
    small: { fontSize: '1rem', lineHeight: 1.66667 },
    medium: { fontSize: '1.5rem', lineHeight: 1.5 },
    large: { fontSize: '2.25rem', lineHeight: 1.33333 },
    xLarge: { fontSize: '3.25rem', lineHeight: 1.23077 }
  }
};
