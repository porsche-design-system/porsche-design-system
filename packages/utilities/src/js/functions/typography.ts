import { font, fontSizeArray } from '../variables';
import { mediaQuery } from './breakpoints';
import { typeScale } from '../helper';

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

const fontWeightObject: {[key: string]: number} = {
  'thin': font.weight.thin,
  'regular': font.weight.regular,
  'semibold': font.weight.semibold,
  'bold': font.weight.bold
};

export const text = (customSize?: string, customWeight?: string) => {
  if (!customSize && !customWeight) {
    return {
      ...font.size.small,
      fontFamily: font.family,
      fontWeight: font.weight.regular
    };
  }

  const fontSize = customSize && fontSizeArray.includes(customSize) ? typeScale(customSize) : font.size.small;
  const fontWeight = customWeight &&  customWeight in Object.keys(fontWeightObject) ? fontWeightObject?.[customWeight] : font.weight.regular;

  return {
    ...fontSize,
    fontFamily: font.family,
    fontWeight: fontWeight
  };
};
