import type { ButtonTileAlign, ButtonTileAspectRatio, ButtonTileSize, ButtonTileWeight } from '../../utils';
import type { BreakpointCustomizable } from '../../utils/breakpoint-customizable';
import { getCss } from '../../utils';
import { getLinkButtonTileStyles } from '../../styles/link-button-tile-styles';

export const getComponentCss = (
  args: [
    BreakpointCustomizable<ButtonTileAspectRatio>,
    BreakpointCustomizable<ButtonTileSize>,
    BreakpointCustomizable<ButtonTileWeight>,
    ButtonTileAlign,
    BreakpointCustomizable<boolean>,
    boolean,
    boolean,
    boolean
  ]
): string => {
  return getCss(getLinkButtonTileStyles(...args));
};
