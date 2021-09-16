import { font } from '@porsche-design-system/utilities';

// map is prefilled with static values from utilities package
const FONT_SIZE_MAP = new Map<number, number>(
  Object.entries(font.size)
    .map<[number, number]>(([key, val]) => [parseInt(key, 10), val.lineHeight as number])
    .filter(([key]) => !isNaN(key as any))
);
const FONT_SIZE_REGEX = /^(\d+\.?\d*)(rem|px)$/;

export const calculateLineHeight = (input: string): number => {
  const [, fontSizeValue, fontSizeUnit] = FONT_SIZE_REGEX.exec(input);
  const fontSize = fontSizeUnit === 'rem' ? parseFloat(fontSizeValue) * 16 : parseFloat(fontSizeValue);

  if (!FONT_SIZE_MAP.has(fontSize)) {
    const exactLineHeightPx = fontSize * (0.911 / (2.97 + 0.005 * Math.pow(2.71828, 0.2 * fontSize)) + 1.2);
    let remainingPx = exactLineHeightPx % 4;

    if (remainingPx > 2) {
      remainingPx = remainingPx - 4;
    }

    const roundingFactor = 10000000000;
    const fittedLineHeightFactor = (exactLineHeightPx - remainingPx) / fontSize;

    FONT_SIZE_MAP.set(fontSize, Math.round(fittedLineHeightFactor * roundingFactor) / roundingFactor);
  }

  return FONT_SIZE_MAP.get(fontSize);
};

export const calcLineHeightForElement = (tag: HTMLElement): number => {
  const { fontSize } = getComputedStyle(tag);
  // fontSize is "" when element does no longer exist and would throw an exception in calculateLineHeight
  return fontSize && calculateLineHeight(fontSize);
};
