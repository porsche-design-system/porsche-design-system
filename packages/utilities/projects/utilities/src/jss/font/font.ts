import type { FontSize, FontSizeLineHeight, FontWeight } from './font-shared';
import { fontFamily } from './font-family';
import { fontSize } from './font-size';
import { fontWeight } from './font-weight';
import { fontStyle } from './font-style';
import { fontVariant } from './font-variant';

type Font = {
  family: string;
  weight: { [key in FontWeight]: number };
  size: { [key in FontSize]: FontSizeLineHeight };
  style: string;
  variant: string;
};

const font: Font = {
  family: fontFamily,
  weight: fontWeight,
  size: fontSize,
  style: fontStyle,
  variant: fontVariant,
};

export { font, fontFamily, fontSize, fontWeight, fontStyle, fontVariant, FontSize, FontSizeLineHeight, FontWeight };
