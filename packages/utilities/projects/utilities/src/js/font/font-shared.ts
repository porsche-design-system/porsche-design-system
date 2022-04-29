export type FontSize = 'xSmall' | 'small' | 'medium' | 'large' | 'xLarge';
export type FontWeight = 'thin' | 'regular' | 'semiBold' | 'bold';
export type FontSizeLineHeight = { fontSize: string; lineHeight: number };
export type FontBehavior = {
  WebkitTextSizeAdjust: 'none';
  textSizeAdjust: 'none';
};
export type FontHyphenation = {
  overflowWrap: 'break-word';
  hyphens: 'auto';
};
