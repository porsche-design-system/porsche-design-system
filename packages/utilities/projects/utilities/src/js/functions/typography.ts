import { font, FontWeight } from '../variables';
import { mediaQuery } from './media-query';
import { typeScale } from '../helper';

const { family, size, weight } = font;

const fontBase = {
  fontFamily: family,
  fontWeight: weight.semibold
};

export const title = {
  large: {
    ...fontBase,
    ...size['32'],
    [mediaQuery('s', 'm')]: size['42'],
    [mediaQuery('m', 'l')]: size['52'],
    [mediaQuery('l', 'xl')]: size['62'],
    [mediaQuery('xl')]: size['72']
  }
};

export const headline = {
  '1': {
    ...fontBase,
    ...size['28'],
    [mediaQuery('s', 'm')]: size['36'],
    [mediaQuery('m', 'l')]: size['44'],
    [mediaQuery('l', 'xl')]: size['52'],
    [mediaQuery('xl')]: size['60']
  },
  '2': {
    ...fontBase,
    ...size['24'],
    [mediaQuery('s', 'm')]: size['30'],
    [mediaQuery('m', 'l')]: size['36'],
    [mediaQuery('l', 'xl')]: size['42'],
    [mediaQuery('xl')]: size['48']
  },
  '3': {
    ...fontBase,
    ...size['20'],
    [mediaQuery('s', 'm')]: size['24'],
    [mediaQuery('m', 'l')]: size['28'],
    [mediaQuery('l', 'xl')]: size['32'],
    [mediaQuery('xl')]: size['36']
  },
  '4': {
    ...fontBase,
    ...size['16'],
    [mediaQuery('s', 'm')]: size['18'],
    [mediaQuery('m', 'l')]: size['20'],
    [mediaQuery('l', 'xl')]: size['22'],
    [mediaQuery('xl')]: size['24']
  },
  '5': {
    ...fontBase,
    ...size['16']
  }
};

export const text = (fontSize?: string, fontWeight?: FontWeight) => {
  const { family, size, weight } = font;
  const fontSizeAndLineHeight = fontSize ? typeScale(fontSize) : size.small;

  return {
    fontFamily: family,
    ...fontSizeAndLineHeight,
    weight: weight[fontWeight ?? 'regular']
  };
};
