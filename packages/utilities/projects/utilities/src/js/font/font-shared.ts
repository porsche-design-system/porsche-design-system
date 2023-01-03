export type FontSize = 'xSmall' | 'small' | 'medium' | 'large' | 'xLarge';
export type FontWeight = 'thin' | 'regular' | 'semiBold' | 'bold';
export type FontSizeLineHeight = { fontSize: string; lineHeight: string };
export type FontBehavior = {
  WebkitTextSizeAdjust: 'none';
  textSizeAdjust: 'none';
};
export type FontHyphenation = {
  overflowWrap: 'break-word';
  hyphens: 'auto';
};
