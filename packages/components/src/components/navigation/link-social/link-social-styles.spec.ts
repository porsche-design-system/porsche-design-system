import { getSlottedLinkSocialCss } from './link-social-styles';

describe('getSlottedLinkSocialCss()', () => {
  it('should return correct css', () => {
    const host = document.createElement('p-accordion');
    expect(getSlottedLinkSocialCss(host)).toMatchSnapshot();
  });

  it('should return correct css with prefix', () => {
    const host = document.createElement('prefixed-p-accordion');
    expect(getSlottedLinkSocialCss(host)).toMatchSnapshot();
  });
});
