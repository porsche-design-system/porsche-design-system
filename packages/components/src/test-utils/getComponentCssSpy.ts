import * as jssUtils from '../utils/jss';
import { getCssObject } from './getCssObject';

export const getComponentCssSpy = (): jest.SpyInstance => {
  // silence deprecation warnings
  jest.spyOn(console, 'warn').mockImplementation(() => {});

  // mock to get the result from getComponentCss() directly
  return jest
    .spyOn(jssUtils, 'attachComponentCss')
    .mockImplementation((_, getComponentCss, ...args) => getComponentCss(...args));
};

export const getComponentCssObject = (spy: jest.SpyInstance): object => {
  const [result] = spy.mock.results;
  const { type, value: cssString } = (result || {}) as jest.MockResultReturn<string>;

  return type === 'return' ? getCssObject(cssString) : null;
};
