import { JssStyle } from 'jss';
import type { BreakpointCustomizable } from '../../types';
import type { LinkTileAlign } from './link-tile-utils';
import { buildResponsiveStyles, getCss, mergeDeep } from '../../utils';
import {
  spacingFluidMedium,
  spacingFluidLarge,
  gradientToBottomStyle,
  gradientToTopStyle,
  textLargeStyle,
  fontSizeTextMedium,
} from '@porsche-design-system/utilities-v2';
import type {
  LinkButtonTileAspectRatio,
  LinkButtonTileSize,
  LinkButtonTileWeight,
} from '../../styles/link-button-tile-styles';
import { getBaseLinkButtonTileStyles } from '../../styles/link-button-tile-styles';
import { getThemedTypographyColor } from '../../styles/text-icon-styles';
import { pxToRemWithUnit } from '../../styles';
import { getFontWeight } from '../../styles/font-weight-styles';

const sizeMap: {
  inherit: { fontSize: string };
  default: { fontSize: string };
} = {
  inherit: {
    fontSize: 'inherit',
  },
  default: { fontSize: fontSizeTextMedium },
};

const getGradientBackground = (isCompact: BreakpointCustomizable<boolean>, isTopAligned: boolean): JssStyle => {
  return isCompact && isTopAligned ? gradientToBottomStyle : gradientToTopStyle;
};

export const getComponentCss = (
  aspectRatio: BreakpointCustomizable<LinkButtonTileAspectRatio>,
  size: BreakpointCustomizable<LinkButtonTileSize>,
  weight: BreakpointCustomizable<LinkButtonTileWeight>,
  align: LinkTileAlign,
  compact: BreakpointCustomizable<boolean>,
  hasGradient: boolean
): string => {
  const isTopAligned = align === 'top';
  return getCss({
    ...getBaseLinkButtonTileStyles({
      aspectRatio,
      additionalGlobalStyles: {
        p: {
          color: getThemedTypographyColor('dark', 'primary'),
          maxWidth: pxToRemWithUnit(550), // in this case rem unit makes sense to scale up available space
          margin: 0,
          ...textLargeStyle,
          ...mergeDeep(
            buildResponsiveStyles(size, (s: LinkButtonTileSize) => sizeMap[s]),
            buildResponsiveStyles(weight, (w: LinkButtonTileWeight) => ({ fontWeight: getFontWeight(w) }))
          ),
        },
      },
      additionalContentStyles: {
        ...(isTopAligned ? { top: 0 } : { bottom: 0 }),
        padding:
          align === 'bottom'
            ? `${spacingFluidLarge} ${spacingFluidMedium} ${spacingFluidMedium}`
            : `${spacingFluidMedium} ${spacingFluidMedium} ${spacingFluidLarge}`,
        ...mergeDeep(
          hasGradient &&
            buildResponsiveStyles(compact, (isCompact: boolean) => getGradientBackground(isCompact, isTopAligned)),
          buildResponsiveStyles(compact, (isCompact: boolean) =>
            isCompact
              ? {
                  alignItems: 'center',
                  gridTemplateColumns: 'auto 24px',
                  gridTemplateRows: 'auto',
                  ...(isTopAligned ? { top: 0 } : { bottom: 0 }),
                }
              : { gridTemplateRows: 'auto auto', gridTemplateColumns: 'auto' }
          )
        ),
      },
      additionalLinkStyles: {
        ...buildResponsiveStyles(compact, (isCompact: boolean) => ({ display: isCompact ? 'none' : 'inline-block' })),
      },
    }),
    'link-pure': buildResponsiveStyles(compact, (isCompact: boolean) => ({
      display: isCompact ? 'inline-block' : 'none',
    })),
  });
};
