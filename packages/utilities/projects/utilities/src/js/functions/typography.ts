import { font, FontWeight } from '../variables';
import { mediaQuery } from './media-query';
import { typeScale } from '../helper';

export const pdsFont = {
  xSmall: { fontFamily: font.family, fontWeight: font.weight.regular, ...font.size.xSmall },
  small: { fontFamily: font.family, fontWeight: font.weight.regular, ...font.size.small },
  medium: { fontFamily: font.family, fontWeight: font.weight.regular, ...font.size.medium },
  large: { fontFamily: font.family, fontWeight: font.weight.regular, ...font.size.large },
  xLarge: { fontFamily: font.family, fontWeight: font.weight.regular, ...font.size.xLarge }
};

export const title = {
  large: {
    ...font.size['32'],
    fontFamily: font.family,
    fontWeight: font.weight.semibold,
    [mediaQuery('s', 'm')]: font.size['42'],
    [mediaQuery('m', 'l')]: font.size['52'],
    [mediaQuery('l', 'xl')]: font.size['62'],
    [mediaQuery('xl')]: font.size['72']
  }
};

export const headline = {
  '1': {
    ...font.size['28'],
    fontFamily: font.family,
    fontWeight: font.weight.semibold,
    [mediaQuery('s', 'm')]: font.size['36'],
    [mediaQuery('m', 'l')]: font.size['44'],
    [mediaQuery('l', 'xl')]: font.size['52'],
    [mediaQuery('xl')]: font.size['60']
  },
  '2': {
    ...font.size['24'],
    fontFamily: font.family,
    fontWeight: font.weight.semibold,
    [mediaQuery('s', 'm')]: font.size['30'],
    [mediaQuery('m', 'l')]: font.size['36'],
    [mediaQuery('l', 'xl')]: font.size['42'],
    [mediaQuery('xl')]: font.size['48']
  },
  '3': {
    ...font.size['20'],
    fontFamily: font.family,
    fontWeight: font.weight.semibold,
    [mediaQuery('s', 'm')]: font.size['24'],
    [mediaQuery('m', 'l')]: font.size['28'],
    [mediaQuery('l', 'xl')]: font.size['32'],
    [mediaQuery('xl')]: font.size['36']
  },
  '4': {
    ...font.size['16'],
    fontFamily: font.family,
    fontWeight: font.weight.semibold,
    [mediaQuery('s', 'm')]: font.size['18'],
    [mediaQuery('m', 'l')]: font.size['20'],
    [mediaQuery('l', 'xl')]: font.size['22'],
    [mediaQuery('xl')]: font.size['24']
  },
  '5': {
    ...font.size['16'],
    fontFamily: font.family,
    fontWeight: font.weight.semibold
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
