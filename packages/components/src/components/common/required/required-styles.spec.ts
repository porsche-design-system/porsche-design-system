import { getFunctionalComponentRequiredStyles } from './required-styles';
import { getCss } from '../../../utils';

describe('getFunctionalComponentRequiredStyles()', () => {
  it('should return correct styles', () => {
    expect(getCss(getFunctionalComponentRequiredStyles())).toMatchSnapshot();
  });
});
