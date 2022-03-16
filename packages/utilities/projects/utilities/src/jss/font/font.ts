import type { FontSize, FontSizeLineHeight, FontWeight } from './font-shared';
import { fontFamily } from './font-family';
import { fontSize } from './font-size';
import { fontWeight } from './font-weight';

type Font = {
  family: string;
  weight: { [key in FontWeight]: number };
  size: { [key in FontSize]: FontSizeLineHeight };
};

const font: Font = {
  family: fontFamily,
  weight: fontWeight,
  size: fontSize,
};

export { font, fontFamily, fontSize, fontWeight, FontSize, FontSizeLineHeight, FontWeight };
