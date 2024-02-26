import { getCss } from '../../utils';
import { getButtonLinkTileStyles } from '../../styles/tile/button-link-tile-styles';

export const getComponentCss = (...args: Parameters<typeof getButtonLinkTileStyles>): string => {
  return getCss({
    ...getButtonLinkTileStyles(...args),
    'link-overlay': {
      // covers entire tile, used for expanded click-area only
      position: 'fixed',
      inset: 0,
    },
  });
};
