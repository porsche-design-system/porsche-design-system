import type { BreakpointCustomizable } from '../../types';
import type { LinkTileAspectRatio, LinkTileAlign, LinkTileWeight, LinkTileSize } from '../../utils';
import { getCss } from '../../utils';
import { getLinkButtonTileStyles } from '../../styles/link-button-tile-styles';
import { getInsetJssStyle } from '../../styles';

export const getComponentCss = (props: {
  aspectRatio: BreakpointCustomizable<LinkTileAspectRatio>;
  size: BreakpointCustomizable<LinkTileSize>;
  weight: BreakpointCustomizable<LinkTileWeight>;
  align: LinkTileAlign;
  compact: BreakpointCustomizable<boolean>;
  hasGradient: boolean;
}): string => {
  return getCss({
    ...getLinkButtonTileStyles(props),
    // is used for expanded click-area only
    'link-overlay': {
      position: 'fixed',
      ...getInsetJssStyle(0),
      outline: 0,
    },
  });
};
