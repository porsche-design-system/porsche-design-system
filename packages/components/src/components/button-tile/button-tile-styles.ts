import { getCss } from '../../utils';
import { getLinkButtonTileStyles } from '../../styles/link-button-tile-styles';

export const getComponentCss = (...args: Parameters<typeof getLinkButtonTileStyles>): string => {
  return getCss(getLinkButtonTileStyles(...args));
};
