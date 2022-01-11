import type { Properties } from 'csstype';

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

export type FontSizeLineHeight = Pick<Properties, 'fontSize' | 'lineHeight'>;

type FontType = {
  family: string;
  weight: { [key in FontWeight]: number };
  size: { [key in FontSize]: FontSizeLineHeight };
};

export const fontFamily = "'Porsche Next','Arial Narrow',Arial,'Heiti SC',SimHei,sans-serif";
export const fontWeight: { [key in FontWeight]: number } = {
  thin: 100,
  regular: 400,
  semibold: 600,
  bold: 700,
};
export const fontSize: { [key in FontSize]: FontSizeLineHeight } = {
  '12': { fontSize: '0.75rem', lineHeight: 1.6666666667 },
  '16': { fontSize: '1rem', lineHeight: 1.5 },
  '18': { fontSize: '1.125rem', lineHeight: 1.5555555556 },
  '20': { fontSize: '1.25rem', lineHeight: 1.4 },
  '22': { fontSize: '1.375rem', lineHeight: 1.4545454545 },
  '24': { fontSize: '1.5rem', lineHeight: 1.5 },
  '28': { fontSize: '1.75rem', lineHeight: 1.4285714286 },
  '30': { fontSize: '1.875rem', lineHeight: 1.3333333333 },
  '32': { fontSize: '2rem', lineHeight: 1.375 },
  '36': { fontSize: '2.25rem', lineHeight: 1.3333333333 },
  '42': { fontSize: '2.625rem', lineHeight: 1.2380952381 },
  '44': { fontSize: '2.75rem', lineHeight: 1.1818181818 },
  '48': { fontSize: '3rem', lineHeight: 1.25 },
  '52': { fontSize: '3.25rem', lineHeight: 1.2307692308 },
  '60': { fontSize: '3.75rem', lineHeight: 1.2 },
  '62': { fontSize: '3.875rem', lineHeight: 1.2258064516 },
  '72': { fontSize: '4.5rem', lineHeight: 1.2222222222 },
  '84': { fontSize: '5.25rem', lineHeight: 1.1904761905 },
  xSmall: { fontSize: '0.75rem', lineHeight: 1.6666666667 },
  small: { fontSize: '1rem', lineHeight: 1.5 },
  medium: { fontSize: '1.5rem', lineHeight: 1.5 },
  large: { fontSize: '2.25rem', lineHeight: 1.3333333333 },
  xLarge: { fontSize: '3.25rem', lineHeight: 1.2307692308 },
};

export const font: FontType = {
  family: fontFamily,
  weight: fontWeight,
  // To boost performance, size is defined static.
  size: fontSize,
};

export const defaultFontFamilyAndWeight: Pick<Properties, 'fontFamily' | 'fontWeight'> = {
  fontFamily,
  fontWeight: fontWeight.regular,
};
