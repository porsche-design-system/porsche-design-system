import { getSlottedCss } from './link-social-styles';

describe('getSlottedCss()', () => {
  it('should return correct css', () => {
    const host = document.createElement('p-link-social');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });

  it('should return correct css with prefix', () => {
    const host = document.createElement('prefixed-p-link-social');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });
});
