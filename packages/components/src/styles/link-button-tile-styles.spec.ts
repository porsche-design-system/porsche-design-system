import { getBaseLinkButtonTileStyles } from './link-button-tile-styles';
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

  it.each<Parameters<typeof getBaseLinkButtonTileStyles>>([
    [{ aspectRatio: '4:3', additionalGlobalStyles, additionalContentStyles }],
    [{ aspectRatio: '1:1', additionalGlobalStyles, additionalContentStyles }],
    [{ aspectRatio: '3:4', additionalGlobalStyles, additionalContentStyles }],
    [{ aspectRatio: '16:9', additionalGlobalStyles, additionalContentStyles }],
    [{ aspectRatio: '9:16', additionalGlobalStyles, additionalContentStyles }],
    [
      {
        aspectRatio: { base: '1:1', xs: '4:3', s: '3:4', m: '16:9', l: '9:16', xl: '1:1' },
        additionalGlobalStyles,
        additionalContentStyles,
      },
    ],
  ])('should return correct css for aspectRatio: %s', (...args) => {
    expect(getBaseLinkButtonTileStyles(...args)).toMatchSnapshot();
  });
});
