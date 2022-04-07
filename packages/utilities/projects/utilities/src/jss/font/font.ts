import type { FontBehavior, FontHyphenation, FontSize, FontSizeLineHeight, FontWeight } from './font-shared';
import { fontBehavior } from './font-behavior';
import { fontFamily } from './font-family';
import { fontSize } from './font-size';
import { fontWeight } from './font-weight';
import { fontStyle } from './font-style';
import { fontVariant } from './font-variant';
import { fontHyphenation } from './font-hyphenation';

type Font = {
  family: string;
  weight: { [key in FontWeight]: number };
  size: { [key in FontSize]: FontSizeLineHeight };
  style: string;
  variant: string;
  behavior: FontBehavior;
  hyphenation: FontHyphenation;
};

const font: Font = {
  family: fontFamily,
  weight: fontWeight,
  size: fontSize,
  style: fontStyle,
  variant: fontVariant,
  behavior: fontBehavior,
  hyphenation: fontHyphenation,
};

export { font, fontFamily, fontSize, fontWeight, fontStyle, fontVariant, fontBehavior, fontHyphenation };
