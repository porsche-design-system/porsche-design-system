import { getTileStyles } from './tile-styles';
import type { JssStyle, Styles } from 'jss';

describe('getTileStyles()', () => {
  const additionalGlobalStyles: Styles = {
    p: {
      background: 'black',
    },
  };
  const additionalHostStyles: JssStyle = { cursor: 'not-allowed' };
  const additionalContentStyles: JssStyle = {
    gridTemplateRows: 'auto auto',
    gridTemplateColumns: 'auto',
  };

  it.each<Parameters<typeof getTileStyles>>([
    [{ aspectRatio: '4:3', isDisabled: true, additionalHostStyles, additionalGlobalStyles, additionalContentStyles }],
    [{ aspectRatio: '1:1', isDisabled: false, additionalHostStyles, additionalGlobalStyles, additionalContentStyles }],
    [{ aspectRatio: '3:4', isDisabled: true, additionalHostStyles, additionalGlobalStyles, additionalContentStyles }],
    [{ aspectRatio: '16:9', isDisabled: false, additionalHostStyles, additionalGlobalStyles, additionalContentStyles }],
    [{ aspectRatio: '9:16', isDisabled: true, additionalHostStyles, additionalGlobalStyles, additionalContentStyles }],
    [
      {
        aspectRatio: { base: '1:1', xs: '4:3', s: '3:4', m: '16:9', l: '9:16', xl: '1:1' },
        isDisabled: false,
        additionalHostStyles,
        additionalGlobalStyles,
        additionalContentStyles,
      },
    ],
  ])('should return correct css for %o', (args) => {
    expect(getTileStyles(args)).toMatchSnapshot();
  });
});
