import type { BreakpointCustomizable } from '../../types';
import type { LinkTileAspectRatio, LinkButtonTileAlign, LinkTileWeight, LinkTileSize } from '../../utils';
import { getCss, isDisabledOrLoading } from '../../utils';
import { getLinkButtonTileStyles } from '../../styles/link-button-tile-styles';

export const getComponentCss = (
  aspectRatio: BreakpointCustomizable<LinkTileAspectRatio>,
  size: BreakpointCustomizable<LinkTileSize>,
  weight: BreakpointCustomizable<LinkTileWeight>,
  align: LinkButtonTileAlign,
  compact: BreakpointCustomizable<boolean>,
  hasGradient: boolean,
  isDisabled: boolean,
  isLoading: boolean
): string => {
  const disabledOrLoading = isDisabledOrLoading(isDisabled, isLoading);

  return getCss({
    ...getLinkButtonTileStyles(aspectRatio, size, weight, align, compact, hasGradient, isDisabled, disabledOrLoading),
  });
};
