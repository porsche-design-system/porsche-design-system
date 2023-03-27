import { getCss } from '../../utils';
import { getInsetJssStyle } from '../../styles';
import { getButtonLinkTileStyles } from '../../styles/tile/button-link-tile-styles';

export const getComponentCss = (...args: Parameters<typeof getButtonLinkTileStyles>): string => {
  return getCss({
    ...getButtonLinkTileStyles(...args),
    'link-overlay': {
      // covers entire tile, used for expanded click-area only
      position: 'fixed',
      ...getInsetJssStyle(),
    },
  });
};
