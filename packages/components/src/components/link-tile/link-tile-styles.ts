import { getCss } from '../../utils';
import { getLinkButtonTileStyles } from '../../styles/link-button-tile-styles';
import { getInsetJssStyle } from '../../styles';

export const getComponentCss = (...args: Parameters<typeof getLinkButtonTileStyles>): string => {
  return getCss({
    ...getLinkButtonTileStyles(...args),
    // is used for expanded click-area only
    'link-overlay': {
      position: 'fixed',
      ...getInsetJssStyle(0),
      outline: 0,
    },
  });
};
