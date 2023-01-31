import { getFunctionalComponentRequiredStyles } from './required-styles';

describe('getFunctionalComponentRequiredStyles()', () => {
  it('should return correct styles', () => {
    expect(getFunctionalComponentRequiredStyles()).toMatchSnapshot();
  });
});
