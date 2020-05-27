export const remBase = 16;
export const rem = (pixel: number) => {
  return `${pixel / remBase}rem`
};

export const typeScale = (size: string) => ({
  fontSize: getFontSizeRem(size),
  lineHeight: convertLineHeight(size)
});

export const getFontSizeRem = (fontSize: string): string => {
  if (fontSize.endsWith('rem')) {
    return fontSize
  } else if (fontSize.endsWith('px')) {
    const fontSizeLength = getFontSizeLength(fontSize);
    if (fontSizeLength != -1) {
      return rem(fontSizeLength)
    } else {return 'FontSize has to be a length and number, e.g. 12px'}
  }
  return 'fontSize() only accepts rem or px as parameter'
};

export const convertLineHeight = (fontSize: string): number | string => {
  let fontSizePx = '';
  if (fontSize.endsWith('rem')) {
    fontSizePx = remToPx(fontSize);
  } else if (fontSize.endsWith('px')) {
    fontSizePx = fontSize;
  } else {return 'font size needs to be px or rem'}

  const fontSizeLength = stripUnit(fontSizePx);
  const e = 2.71828;
  const exactLineHeightFactor = 0.911 / (2.97 + 0.005 * Math.pow(e, 0.2 * fontSizeLength)) + 1.2;
  const exactLineHeightPx = fontSizeLength * exactLineHeightFactor;
  let remainingPx = exactLineHeightFactor % 4;

  if (remainingPx > 2) {
    remainingPx = remainingPx - 4;
  }

  const fittedLineHeightPx = exactLineHeightPx - remainingPx;
  return fittedLineHeightPx / fontSizeLength
};

const getFontSizeLength = (fontSize: string): number => {
  let fontSizeLengthStr = '';
  if (fontSize.endsWith('rem')) {
    fontSizeLengthStr = fontSize.slice(0, -3);
  } else if (fontSize.endsWith('px')) {
    fontSizeLengthStr = fontSize.slice(0, -2);
  }

  const fontSizeLength = parseFloat(fontSizeLengthStr);
  if (isNaN(fontSizeLength)) {
    return fontSizeLength
  } else return -1
};

const remToPx = (fontSize: string): string => {
  if (fontSize.endsWith('rem')) {
    const size = stripUnit(fontSize);
    const pxFontSize = size * remBase;
    return pxFontSize.toString() + 'px'
  }
  return 'function only accepts value in rem for param $rem, e.g. 1.5rem'
};

const stripUnit = (fontSize: string): number => {
  let strippedFonzSize = '';
  if (fontSize.endsWith('rem')) {
    strippedFonzSize = fontSize.slice(0, -3);
    const fontSizeLength = parseFloat(strippedFonzSize);
    if (isNaN(fontSizeLength)) {
      return fontSizeLength
    } else return -1
  } else if (fontSize.endsWith('px')) {
    strippedFonzSize = fontSize.slice(0, -2);
    const fontSizeLength = parseFloat(strippedFonzSize);
    if (isNaN(fontSizeLength)) {
      return fontSizeLength
    } else return -1
  }
  return -1
};
