import { font } from '@porsche-design-system/utilities';

// map is prefilled with static values from utilities package
const lineHeightMap = new Map<number, number>(
  Object.entries(font.size)
    .map<[number, number]>(([key, val]) => [parseInt(key, 10), val.lineHeight as number])
    .filter(([key]) => !isNaN(key as any))
);

export const calculateLineHeight = (input: string): number => {
  const [, fontSizeValue, fontSizeUnit] = /^(\d+\.?\d*)(rem|px)$/.exec(input);
  const fontSize = fontSizeUnit === 'rem' ? parseFloat(fontSizeValue) * 16 : parseFloat(fontSizeValue);

  if (!lineHeightMap.has(fontSize)) {
    const exactLineHeightPx = fontSize * (0.911 / (2.97 + 0.005 * Math.pow(2.71828, 0.2 * fontSize)) + 1.2);
    let remainingPx = exactLineHeightPx % 4;

    if (remainingPx > 2) {
      remainingPx = remainingPx - 4;
    }

    const roundingFactor = 10000000000;
    const fittedLineHeightFactor = (exactLineHeightPx - remainingPx) / fontSize;

    lineHeightMap.set(fontSize, Math.round(fittedLineHeightFactor * roundingFactor) / roundingFactor);
  }

  return lineHeightMap.get(fontSize);
};

export const calcLineHeightForElement = (tag: HTMLElement): number => {
  const { fontSize } = getComputedStyle(tag);
  // fontSize is "" when element does no longer exist and would throw an exception in calculateLineHeight
  return fontSize && calculateLineHeight(fontSize);
};
