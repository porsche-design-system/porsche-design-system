export type FontSize = 'xSmall' | 'small' | 'medium' | 'large' | 'xLarge';
export type FontWeight = 'thin' | 'regular' | 'semibold' | 'bold';
export type FontSizeLineHeight = { fontSize: string; lineHeight: number };
type Font = {
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
  xSmall: {
    fontSize: '0.75rem',
    lineHeight: 1.6666666667,
  },
  small: {
    fontSize: '1rem',
    lineHeight: 1.5,
  },
  medium: {
    fontSize: '1.5rem',
    lineHeight: 1.5,
  },
  large: {
    fontSize: '2.25rem',
    lineHeight: 1.3333333333,
  },
  xLarge: {
    fontSize: '3.25rem',
    lineHeight: 1.2307692308,
  },
};

export const font: Font = {
  family: fontFamily,
  weight: fontWeight,
  size: fontSize,
};
