import { color, FontColor, FontSizeLineHeight, Theme } from '../variables';

const FONT_SIZE_REGEX = /^(\d+\.?\d*)(rem|px)$/;

export const remBase = 16;

export const pxToRem = (px: string): string => {
  const [, fontSizeValue, fontSizeUnit] = px?.match(FONT_SIZE_REGEX) ?? [];
  if (fontSizeUnit !== 'px' || fontSizeValue === '0') {
    throw new Error('function only accepts value in rem and not 0, e.g. 16px');
  } else {
    return `${parseFloat(`${fontSizeValue}`) / remBase}rem`;
  }
};

export const remToPx = (rem: string): string => {
  const [, fontSizeValue, fontSizeUnit] = rem?.match(FONT_SIZE_REGEX) ?? [];
  if (fontSizeUnit !== 'rem' || fontSizeValue === '0') {
    throw new Error('function only accepts value in rem and not 0, e.g. 1.5rem');
  } else {
    return `${parseFloat(`${fontSizeValue}`) * remBase}px`;
  }
};

export const typeScale = (fontSize: string): FontSizeLineHeight => {
  const [, fontSizeValue, fontSizeUnit] = fontSize?.match(FONT_SIZE_REGEX) ?? [];
  if (fontSizeUnit === undefined) {
    throw new Error('getFontSizeRem() only accepts rem or px as parameter');
  } else if (fontSizeValue === undefined || fontSizeValue === '0') {
    throw new Error('fontSize value has to be a Number and not 0');
  }
  const convertedFontSize = fontSizeUnit === 'rem' ? fontSize : pxToRem(fontSize);

  return {
    fontSize: convertedFontSize,
    lineHeight: convertLineHeight(fontSize)
  };
};

export const convertLineHeight = (fontSize: string): number => {
  const [, fontSizeValue, fontSizeUnit] = fontSize?.match(FONT_SIZE_REGEX) ?? [];
  if (fontSizeUnit === undefined || fontSizeValue === undefined || fontSizeValue === '0') {
    throw new Error(`font size needs to be value + px or rem and not 0, e.g. 15rem or 16px, received: '${fontSize}'`);
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

  const roundingFactor = 100000;
  const fittedLineHeightPx = exactLineHeightPx - remainingPx;
  const fittedLineHeightFactor = fittedLineHeightPx / fontSizeLength;
  return Math.round(fittedLineHeightFactor * roundingFactor) / roundingFactor;
};

type AllColor = Omit<FontColor, 'darkTheme'>;
type RootColorKey = keyof Omit<AllColor, 'state' | 'notification' | 'neutralContrast' | 'external'>;
type ChildrenColorKey = keyof Pick<AllColor, 'state' | 'notification' | 'neutralContrast'>;
type ExternalColorKey = keyof Pick<AllColor, 'external'>;

export function getColorHexCode(fontColor: RootColorKey, theme?: Theme): string;
export function getColorHexCode<K extends ChildrenColorKey, L extends keyof AllColor[K]>(
  fontColor: K,
  specification: L,
  theme?: Theme
): string;
export function getColorHexCode<K extends ExternalColorKey, L extends keyof AllColor[K]>(
  fontColor: K,
  specification: L
): string;

export function getColorHexCode(
  fontColor: RootColorKey | ChildrenColorKey,
  specificationOrTheme: any | Theme = 'light',
  theme: Theme = 'light'
): string {
  let hexCode: string;
  console.log('#1', fontColor, specificationOrTheme, theme);
  if (specificationOrTheme !== 'light' && specificationOrTheme !== 'dark') {
    console.log('#2', fontColor, specificationOrTheme, theme);
    hexCode = color[fontColor][specificationOrTheme as keyof AllColor[ChildrenColorKey]];
    if (theme === 'dark') {
      console.log('#3');
      hexCode = color.darkTheme[fontColor][specificationOrTheme as keyof AllColor[ChildrenColorKey]];
    }
  } else {
    console.log('#4');
    if (specificationOrTheme === 'dark') {
      console.log('#5');
      hexCode = color.darkTheme[fontColor as RootColorKey];
    } else {
      console.log('#6');
      hexCode = color[fontColor as RootColorKey];
    }
  }

  return hexCode;
}
/*
getColorHexCode('brand');
getColorHexCode('external', 'facebook');
getColorHexCode('brand', 'dark');
getColorHexCode('notification', 'success', 'dark');*/
