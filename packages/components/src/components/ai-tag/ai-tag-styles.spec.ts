import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './ai-tag-styles';

describe('getComponentCss()', () => {
  it('should return correct css', () => {
    validateCssAndMatchSnapshot(getComponentCss());
  });
});
