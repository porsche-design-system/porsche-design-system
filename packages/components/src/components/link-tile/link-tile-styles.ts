import { getCss } from '../../utils';
import { getInsetJssStyle } from '../../styles';
import { getButtonLinkTileStyles } from '../../styles/tile/button-link-tile-styles';

export const getComponentCss = (...args: Parameters<typeof getButtonLinkTileStyles>): string => {
  return getCss({
    ...getButtonLinkTileStyles(...args),
    // is used for expanded click-area only
    'link-overlay': {
      position: 'fixed', // TODO: absolute
      ...getInsetJssStyle(),
      outline: 0,
    },
  });
};
