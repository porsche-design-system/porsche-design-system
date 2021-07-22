import { getSlottedCss } from './link-styles';

describe('getSlottedCss()', () => {
  it('should return correct css', () => {
    const host = document.createElement('p-link');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });

  it('should return correct css with prefix', () => {
    const host = document.createElement('prefixed-p-link');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });
});
