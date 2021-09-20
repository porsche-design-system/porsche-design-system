import { getComponentCss } from './marque-styles';
import type { MarqueSize } from './marque-utils';

describe('getComponentCss()', () => {
  it.each([['responsive'], ['small'], ['medium']])('should return correct css for size: %s', (size: MarqueSize) => {
    expect(getComponentCss(size)).toMatchSnapshot();
  });
});
