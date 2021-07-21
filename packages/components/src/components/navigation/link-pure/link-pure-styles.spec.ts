import { getSlottedLinkPureCss } from './link-pure-styles';

describe('getSlottedLinkPureCss()', () => {
  it('should return correct css', () => {
    const host = document.createElement('p-accordion');
    expect(getSlottedLinkPureCss(host)).toMatchSnapshot();
  });

  it('should return correct css with prefix', () => {
    const host = document.createElement('prefixed-p-accordion');
    expect(getSlottedLinkPureCss(host)).toMatchSnapshot();
  });
});
