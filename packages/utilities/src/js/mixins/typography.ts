import { font } from '../variables';
import { breakpoints, mediaQuery, whatever } from './breakpoints';
import { typeScale } from './helper';

export const title = {
  large:{
    ...typeScale(font.size['32']),
    fontFamily: font.family,
    fontWeight: font.weight.semibold,
    [mediaQuery('s', 'm')]: typeScale(font.size['42']),
    [mediaQuery('m', 'l')]: typeScale(font.size['52']),
    [mediaQuery('l', 'xl')]: typeScale(font.size['62']),
    [mediaQuery('xl')]: typeScale(font.size['72']),
  }
}

export const headline = {
  '1': {
    ...typeScale(font.size['28']),
    fontFamily: font.family,
    fontWeight: font.weight.semibold,
    [mediaQuery('s', 'm')]: typeScale(font.size['36']),
    [mediaQuery('m', 'l')]: typeScale(font.size['44']),
    [mediaQuery('l', 'xl')]: typeScale(font.size['52']),
    [mediaQuery('xl')]: typeScale(font.size['60']),
  },
  '2': {
    ...typeScale(font.size['24']),
    fontFamily: font.family,
    fontWeight: font.weight.semibold,
    [mediaQuery('s', 'm')]: typeScale(font.size['30']),
    [mediaQuery('m', 'l')]: typeScale(font.size['36']),
    [mediaQuery('l', 'xl')]: typeScale(font.size['42']),
    [mediaQuery('xl')]: typeScale(font.size['48']),
  },
  '3': {
    ...typeScale(font.size['20']),
    fontFamily: font.family,
    fontWeight: font.weight.semibold,
    [mediaQuery('s', 'm')]: typeScale(font.size['24']),
    [mediaQuery('m', 'l')]: typeScale(font.size['28']),
    [mediaQuery('l', 'xl')]: typeScale(font.size['32']),
    [mediaQuery('xl')]: typeScale(font.size['36']),
  },
  '4': {
    ...typeScale(font.size['16']),
    fontFamily: font.family,
    fontWeight: font.weight.semibold,
    [mediaQuery('s', 'm')]: typeScale(font.size['18']),
    [mediaQuery('m', 'l')]: typeScale(font.size['20']),
    [mediaQuery('l', 'xl')]: typeScale(font.size['22']),
    [mediaQuery('xl')]: typeScale(font.size['24']),
  },
  '5': {
    ...typeScale(font.size['16']),
    fontFamily: font.family,
    fontWeight: font.weight.semibold,
  }

};

