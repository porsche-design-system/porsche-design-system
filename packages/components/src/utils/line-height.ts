import type { FontSizeLineHeight } from '@porsche-design-system/utilities-v2';

/* Auto Generated Start */
// prettier-ignore
const STATIC_VALUES: [number, number][] = [[12,1.6666666667],[16,1.5],[24,1.5],[36,1.3333333333],[52,1.2307692308]];
/* Auto Generated End */

// map is prefilled with static values from utilities package
export const lineHeightMap = new Map<number, number>(STATIC_VALUES);

export const calculateLineHeight = (fontSize: number): number => {
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
  return fontSize && calculateLineHeight(parseFloat(fontSize));
};

export const generateTypeScale = (fontSizeWithRem: string): FontSizeLineHeight => {
  return {
    fontSize: fontSizeWithRem,
    lineHeight: calculateLineHeight(parseFloat(fontSizeWithRem) * 16),
  };
};
