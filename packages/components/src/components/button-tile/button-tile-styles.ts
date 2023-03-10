import type { BreakpointCustomizable } from '../../types';
import type { LinkTileAspectRatio, ButtonTileAlign, LinkTileWeight, LinkTileSize } from '../../utils';
import { getCss } from '../../utils';
import { getLinkButtonTileStyles } from '../../styles/link-button-tile-styles';

export const getComponentCss = (props: {
  aspectRatio: BreakpointCustomizable<LinkTileAspectRatio>;
  size: BreakpointCustomizable<LinkTileSize>;
  weight: BreakpointCustomizable<LinkTileWeight>;
  align: ButtonTileAlign;
  compact: BreakpointCustomizable<boolean>;
  hasGradient: boolean;
  isDisabled: boolean;
  disabledOrLoading: boolean;
}): string => {
  return getCss(getLinkButtonTileStyles(props));
};
