import { validateCssAndMatchSnapshot } from '../../../../tests/unit/helpers';
import { getComponentCss } from './tabs-styles';

describe('getComponentCss()', () => {
  it('should return correct css', () => {
    validateCssAndMatchSnapshot(getComponentCss());
  });
});
