import { getSlottedCss } from './link-pure-styles';

describe('getSlottedCss()', () => {
  it('should return correct css', () => {
    const host = document.createElement('p-link-pure');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });

  it('should return correct css with prefix', () => {
    const host = document.createElement('prefixed-p-link-pure');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });
});
