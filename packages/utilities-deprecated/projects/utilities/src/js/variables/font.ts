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

const fontLineHeight = 'calc(6px + 2.125ex)';

// To boost performance, size is defined static.
const xSmall: FontSizeLineHeight = { fontSize: '0.75rem', lineHeight: fontLineHeight };
const small: FontSizeLineHeight = { fontSize: '1rem', lineHeight: fontLineHeight };
const medium: FontSizeLineHeight = { fontSize: '1.5rem', lineHeight: fontLineHeight };
const large: FontSizeLineHeight = { fontSize: '2.25rem', lineHeight: fontLineHeight };
const xLarge: FontSizeLineHeight = { fontSize: '3.25rem', lineHeight: fontLineHeight };

export const fontSize: { [key in FontSize]: FontSizeLineHeight } = {
  '12': xSmall,
  '16': small,
  '18': { fontSize: '1.125rem', lineHeight: fontLineHeight },
  '20': { fontSize: '1.25rem', lineHeight: fontLineHeight },
  '22': { fontSize: '1.375rem', lineHeight: fontLineHeight },
  '24': medium,
  '28': { fontSize: '1.75rem', lineHeight: fontLineHeight },
  '30': { fontSize: '1.875rem', lineHeight: fontLineHeight },
  '32': { fontSize: '2rem', lineHeight: fontLineHeight },
  '36': large,
  '42': { fontSize: '2.625rem', lineHeight: fontLineHeight },
  '44': { fontSize: '2.75rem', lineHeight: fontLineHeight },
  '48': { fontSize: '3rem', lineHeight: fontLineHeight },
  '52': xLarge,
  '60': { fontSize: '3.75rem', lineHeight: fontLineHeight },
  '62': { fontSize: '3.875rem', lineHeight: fontLineHeight },
  '72': { fontSize: '4.5rem', lineHeight: fontLineHeight },
  '84': { fontSize: '5.25rem', lineHeight: fontLineHeight },
  xSmall,
  small,
  medium,
  large,
  xLarge,
};

export const font: FontType = {
  family: fontFamily,
  weight: fontWeight,
  size: fontSize,
};

export const defaultFontFamilyAndWeight: Pick<Properties, 'fontFamily' | 'fontWeight'> = {
  fontFamily,
  fontWeight: 400,
};
