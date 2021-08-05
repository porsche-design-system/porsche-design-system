import { getSlottedCss } from './text-styles';

describe('getSlottedCss()', () => {
  it('should return correct css', () => {
    const host = document.createElement('p-text');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });

  it('should return correct css with prefix', () => {
    const host = document.createElement('prefixed-p-text');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });
});
