const FONT_SIZE_REGEX = /^(\d+\.?\d*)(rem|px)$/;

export const remBase = 16;

export const pxToRem = (fontSize: string): string => {
  const [, fontSizeValue, fontSizeUnit] = fontSize.match(FONT_SIZE_REGEX) ?? [];
  if (fontSizeUnit !== 'px' || fontSizeValue === '0') {
    throw new Error('function only accepts value in rem and not 0, e.g. 16px');
  } else {
    return `${parseFloat(`${fontSizeValue}`) / remBase}rem`;
  }
};

export const remToPx = (rem: string): string => {
  const [, fontSizeValue, fontSizeUnit] = rem.match(FONT_SIZE_REGEX) ?? [];
  if (fontSizeUnit !== 'rem' || fontSizeValue === '0') {
    throw new Error('function only accepts value in rem and not 0, e.g. 1.5rem');
  } else return `${parseFloat(`${fontSizeValue}`) * remBase}px`;
};

export const typeScale = (size: string) => ({
  fontSize: convertToRem(size),
  lineHeight: convertLineHeight(size)
});

export const convertToRem = (fontSize: string): string => {
  const [, fontSizeValue, fontSizeUnit] = fontSize.match(FONT_SIZE_REGEX) ?? [];
  if (fontSizeUnit === undefined) {
    throw new Error('getFontSizeRem() only accepts rem or px as parameter');
  } else if (fontSizeValue === undefined || fontSizeValue === '0') {
    throw new Error('fontSize value has to be a Number and not 0');
  }
  return fontSizeUnit === 'rem' ? fontSize : pxToRem(fontSize);
};

export const convertLineHeight = (fontSize: string): number => {
  const [, fontSizeValue, fontSizeUnit] = fontSize.match(FONT_SIZE_REGEX) ?? [];
  if (fontSizeUnit === undefined || fontSizeValue === undefined || fontSizeValue === '0') {
    throw new Error('font size needs to be value + px or rem and not 0, e.g. 15rem or 16px');
  }
  const fontSizePx = fontSizeUnit === 'rem' ? remToPx(fontSize) : fontSizeValue;

  const fontSizeLength = parseFloat(fontSizePx);

  const e = 2.71828;
  const exactLineHeightFactor = 0.911 / (2.97 + 0.005 * Math.pow(e, 0.2 * fontSizeLength)) + 1.2;
  const exactLineHeightPx = fontSizeLength * exactLineHeightFactor;
  let remainingPx = exactLineHeightPx % 4;

  if (remainingPx > 2) {
    remainingPx = remainingPx - 4;
  }

  const fittedLineHeightPx = exactLineHeightPx - remainingPx;
  const fittedLineHeightFactor = fittedLineHeightPx / fontSizeLength;
  return Math.round(fittedLineHeightFactor * 100000) / 100000;
};
