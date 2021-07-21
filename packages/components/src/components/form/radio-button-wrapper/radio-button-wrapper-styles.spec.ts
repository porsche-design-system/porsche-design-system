import { getSlottedCss } from './radio-button-wrapper-styles';

describe('getSlottedCss()', () => {
  it('should return correct css', () => {
    const host = document.createElement('p-radio-button-wrapper');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });

  it('should return correct css with prefix', () => {
    const host = document.createElement('prefixed-p-radio-button-wrapper');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });
});
