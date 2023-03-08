import { getBaseLinkButtonTileStyles, getSlottedCss } from './link-button-tile-styles';
import type { JssStyle } from 'jss';

describe('getBaseLinkButtonTileStyles()', () => {
  const additionalGlobalStyles: JssStyle = {
    p: {
      background: 'black',
    },
  };
  const additionalContentStyles: JssStyle = {
    gridTemplateRows: 'auto auto',
    gridTemplateColumns: 'auto',
  };
  const additionalLinkStyles: JssStyle = {
    maxWidth: '400px',
  };

  it.each<Parameters<typeof getBaseLinkButtonTileStyles>>([
    [{ aspectRatio: '4:3', additionalGlobalStyles, additionalContentStyles, additionalLinkStyles }],
    [{ aspectRatio: '1:1', additionalGlobalStyles, additionalContentStyles, additionalLinkStyles }],
    [{ aspectRatio: '3:4', additionalGlobalStyles, additionalContentStyles, additionalLinkStyles }],
    [{ aspectRatio: '16:9', additionalGlobalStyles, additionalContentStyles, additionalLinkStyles }],
    [{ aspectRatio: '9:16', additionalGlobalStyles, additionalContentStyles, additionalLinkStyles }],
    [
      {
        aspectRatio: { base: '1:1', xs: '4:3', s: '3:4', m: '16:9', l: '9:16', xl: '1:1' },
        additionalGlobalStyles,
        additionalContentStyles,
        additionalLinkStyles,
      },
    ],
  ])('should return correct css for aspectRatio: %s', (...args) => {
    expect(getBaseLinkButtonTileStyles(...args)).toMatchSnapshot();
  });
});

describe('getSlottedCss()', () => {
  it('should return correct css', () => {
    const host = document.createElement('p-link-tile');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });

  it('should return correct css with prefix', () => {
    const host = document.createElement('prefixed-p-link-tile');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });
});
