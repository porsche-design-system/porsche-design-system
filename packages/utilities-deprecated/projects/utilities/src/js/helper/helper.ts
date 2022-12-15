import { font } from '../variables';
import type { FontSizeLineHeight, FontWeight } from '../variables';
import type * as CSS from 'csstype';

const FONT_SIZE_REGEX = /^(\d+(?:\.\d+)?)(rem|px)$/;
const REM_BASE = 16;

export const pxToRem = (px: string): string => {
  const [, fontSizeValue, fontSizeUnit] = px?.match(FONT_SIZE_REGEX) ?? [];
  if (fontSizeUnit !== 'px' || fontSizeValue === '0') {
    throw new Error('function only accepts value in rem and not 0, e.g. 16px');
  } else {
    return `${parseFloat(`${fontSizeValue}`) / REM_BASE}rem`;
  }
};

export const remToPx = (rem: string): string => {
  const [, fontSizeValue, fontSizeUnit] = rem?.match(FONT_SIZE_REGEX) ?? [];
  if (fontSizeUnit !== 'rem' || fontSizeValue === '0') {
    throw new Error('function only accepts value in rem and not 0, e.g. 1.5rem');
  } else {
    return `${parseFloat(`${fontSizeValue}`) * REM_BASE}px`;
  }
};

export const generateFontDefinition = (
  fontSize: string,
  fontWeight: FontWeight
): Pick<CSS.Properties, 'fontFamily' | 'fontWeight' | 'fontSize' | 'lineHeight'> => {
  const { family, weight } = font;

  return Object.assign(
    {},
    {
      fontFamily: family,
      fontWeight: weight[fontWeight],
    },
    generateTypeScale(fontSize)
  );
};

export const generateTypeScale = (fontSize: string): FontSizeLineHeight => {
  const [, fontSizeValue, fontSizeUnit] = fontSize?.match(FONT_SIZE_REGEX) ?? [];
  if (fontSizeUnit === undefined) {
    throw new Error('getFontSizeRem() only accepts rem or px as parameter');
  } else if (fontSizeValue === undefined || fontSizeValue === '0') {
    throw new Error('fontSize value has to be a Number and not 0');
  }
  const convertedFontSize = fontSizeUnit === 'rem' ? fontSize : pxToRem(fontSize);

  return {
    fontSize: convertedFontSize,
    lineHeight: calculateLineHeight(fontSize),
  };
};

// keep unused parameter for backwards compatibility
export const calculateLineHeight = (fontSize: string): string => {
  const [, fontSizeValue, fontSizeUnit] = fontSize?.match(FONT_SIZE_REGEX) ?? [];
  if (fontSizeUnit === undefined || fontSizeValue === undefined || fontSizeValue === '0') {
    throw new Error(`font size needs to be value + px or rem and not 0, e.g. 15rem or 16px, received: '${fontSize}'`);
  }

  return 'calc(6px + 2.125ex)';
};

// Screen reader only styles to hide (text-)contents visually in the browser but grant access for screen readers
export const srOnly = (): CSS.Properties => {
  return {
    position: 'absolute',
    height: '1px',
    width: '1px',
    border: '0',
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(1px,1px,1px,1px)',
    clipPath: 'inset(50%)',
    whiteSpace: 'nowrap',
  };
};
