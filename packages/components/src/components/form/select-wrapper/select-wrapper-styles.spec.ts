import { getSlottedCss } from './select-wrapper-styles';

describe('getSlottedCss()', () => {
  it('should return correct css', () => {
    const host = document.createElement('p-select-wrapper');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });

  it('should return correct css with prefix', () => {
    const host = document.createElement('prefixed-p-select-wrapper');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });
});
