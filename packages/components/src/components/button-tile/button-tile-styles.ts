import type { JssStyle } from 'jss';
import { getCss } from '../../utils';
import { getButtonLinkTileStyles } from '../../styles/tile/button-link-tile-styles';

export const getComponentCss = (
  isDisabledOrLoading: boolean,
  ...args: Parameters<typeof getButtonLinkTileStyles>
): string => {
  const buttonLinkTileStyles = getButtonLinkTileStyles(...args);

  return getCss({
    ...buttonLinkTileStyles,
    root: {
      ...(buttonLinkTileStyles.root as JssStyle),
      cursor: isDisabledOrLoading ? 'not-allowed' : 'pointer',
    },
  });
};
