import { vi } from 'vitest';
import * as cssUtils from '../utils/css';
import { getCssObject } from './getCssObject';

export const getComponentCssSpy = (): ReturnType<typeof vi.spyOn> => {
  // silence deprecation warnings
  vi.spyOn(console, 'warn').mockImplementation(() => null);

  // mock to get the result from getComponentCss() directly
  return vi
    .spyOn(cssUtils, 'attachComponentCss')
    .mockImplementation((_, getComponentCss, ...args) => getComponentCss(...args)); // eslint-disable-line @typescript-eslint/no-unsafe-argument
};

export const getComponentCssObject = (spy: ReturnType<typeof vi.spyOn>): object | null => {
  const [result] = spy.mock.results;
  if (result?.type !== 'return') return null;
  return getCssObject(String(result.value));
};
