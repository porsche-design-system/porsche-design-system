import { getSlottedLinkCss } from './link-styles';

describe('getSlottedLinkCss()', () => {
  it('should return correct css', () => {
    const host = document.createElement('p-accordion');
    expect(getSlottedLinkCss(host)).toMatchSnapshot();
  });

  it('should return correct css with prefix', () => {
    const host = document.createElement('prefixed-p-accordion');
    expect(getSlottedLinkCss(host)).toMatchSnapshot();
  });
});
