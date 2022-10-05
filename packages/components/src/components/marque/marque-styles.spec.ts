import { getComponentCss } from './marque-styles';
import type { MarqueSize } from './marque-utils';

describe('getComponentCss()', () => {
  it.each<MarqueSize>(['responsive', 'small', 'medium'])('should return correct css for size: %s', (size) => {
    expect(getComponentCss(size)).toMatchSnapshot();
  });
});
