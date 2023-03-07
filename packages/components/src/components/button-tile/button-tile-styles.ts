import type { BreakpointCustomizable } from '../../types';
import type {
  LinkButtonTileAspectRatio,
  LinkButtonTileAlign,
  LinkButtonTileWeight,
  LinkButtonTileSize,
} from '../../utils';
import { getCss, isDisabledOrLoading } from '../../utils';
import { getLinkButtonTileStyles } from '../../styles/link-button-tile-styles';
import { getInsetJssStyle } from '../../styles';

export const getComponentCss = (
  aspectRatio: BreakpointCustomizable<LinkButtonTileAspectRatio>,
  size: BreakpointCustomizable<LinkButtonTileSize>,
  weight: BreakpointCustomizable<LinkButtonTileWeight>,
  align: LinkButtonTileAlign,
  compact: BreakpointCustomizable<boolean>,
  hasGradient: boolean,
  isDisabled: boolean,
  isLoading: boolean
): string => {
  const disabledOrLoading = isDisabledOrLoading(isDisabled, isLoading);

  return getCss({
    ...getLinkButtonTileStyles(aspectRatio, size, weight, align, compact, hasGradient, isDisabled),
    // is used for expanded click-area only
    'button-overlay': {
      position: 'fixed',
      ...getInsetJssStyle(0),
      outline: 0,
      background: 'transparent no-repeat',
      border: 'none',
      cursor: disabledOrLoading ? 'not-allowed' : 'pointer',
    },
  });
};
