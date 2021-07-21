import { getSlottedCss } from './checkbox-wrapper-styles';

describe('getSlottedCss()', () => {
  it('should return correct css', () => {
    const host = document.createElement('p-checkbox-wrapper');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });

  it('should return correct css with prefix', () => {
    const host = document.createElement('prefixed-p-checkbox-wrapper');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });
});
