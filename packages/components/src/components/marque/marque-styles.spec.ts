import { getComponentCss } from './marque-styles';
import type { MarqueSize } from './marque-size';
import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';

describe('getComponentCss()', () => {
  it.each<MarqueSize>(['responsive', 'small', 'medium'])('should return correct css for size: %s', (size) => {
    validateCssAndMatchSnapshot(getComponentCss(size));
  });
});
