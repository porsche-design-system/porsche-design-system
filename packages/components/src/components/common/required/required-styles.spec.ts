import { getFunctionalComponentRequiredStyles } from './required-styles';
import { getCss } from '../../../utils';
import { validateCssAndMatchSnapshot } from '../../../../tests/unit/helpers';

describe('getFunctionalComponentRequiredStyles()', () => {
  it('should return correct styles', () => {
    validateCssAndMatchSnapshot(getCss(getFunctionalComponentRequiredStyles()), true);
  });
});
