import { vi } from 'vitest';
import * as jssUtils from '../utils/jss';
import { getCssObject } from './getCssObject';

export const getComponentCssSpy = (): ReturnType<typeof vi.spyOn> => {
  // silence deprecation warnings
  vi.spyOn(console, 'warn').mockImplementation(() => null);

  // mock to get the result from getComponentCss() directly
  return vi
    .spyOn(jssUtils, 'attachComponentCss')
    .mockImplementation((_, getComponentCss, ...args) => getComponentCss(...args)); // eslint-disable-line @typescript-eslint/no-unsafe-argument
};

export const getComponentCssObject = (spy: ReturnType<typeof vi.spyOn>): object | null => {
  const [result] = spy.mock.results;
  if (!result || result.value !== 'return') return null;
  return getCssObject(result.value);
};
