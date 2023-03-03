import type { BreakpointCustomizable } from '../../types';
import type {
  LinkButtonTileAspectRatio,
  LinkButtonTileAlign,
  LinkButtonTileWeight,
  LinkButtonTileSize,
} from '../../utils';
import { getCss, mergeDeep } from '../../utils';
import { getLinkButtonTileStyles } from '../../styles/link-button-tile-styles';
import { getInsetJssStyle } from '../../styles';

export const getComponentCss = (
  aspectRatio: BreakpointCustomizable<LinkButtonTileAspectRatio>,
  size: BreakpointCustomizable<LinkButtonTileSize>,
  weight: BreakpointCustomizable<LinkButtonTileWeight>,
  align: LinkButtonTileAlign,
  compact: BreakpointCustomizable<boolean>,
  hasGradient: boolean
): string => {
  return getCss(
    mergeDeep(getLinkButtonTileStyles(aspectRatio, size, weight, align, compact, hasGradient), {
      // is used for expanded click-area only
      'link-overlay': {
        position: 'fixed',
        ...getInsetJssStyle(0),
        outline: 0,
      },
    })
  );
};
