import { buildResponsiveStyles, getCss } from '../../utils';
import {
  addImportantToEachRule,
  getBackfaceVisibilityJssStyle,
  getInsetJssStyle,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  pxToRemWithUnit,
} from '../../styles';
import { getThemedTypographyColor } from '../../styles/text-icon-styles';
import type { LinkTileWeight } from '../link-tile/link-tile-utils';
import type { BreakpointCustomizable } from '../../types';
import type { LinkTileModelAspectRatio } from './link-tile-model-utils';
import { getFontWeight } from '../../styles/font-weight-styles';
import {
  borderRadiusMedium,
  gradientToTopStyle,
  spacingFluidLarge,
  spacingFluidMedium,
  spacingFluidSmall,
  spacingStaticMedium,
  spacingStaticXSmall,
  textLargeStyle,
  textSmallStyle,
} from '@porsche-design-system/utilities-v2';
import type { ButtonLinkGroupDirection } from '../../styles/direction-jss-style';
import { getDirectionJssStyle } from '../../styles/direction-jss-style';

// TODO: share this with link tile
const aspectRatioPaddingTop: Record<LinkTileModelAspectRatio, string> = {
  '4:3': '75%',
  '3:4': '133.33%',
  '9:16': '177.75%',
};

// TODO: Make styles also optional if elements are not rendered?
export const getComponentCss = (
  aspectRatio: BreakpointCustomizable<LinkTileModelAspectRatio>,
  weight: BreakpointCustomizable<LinkTileWeight>,
  direction: BreakpointCustomizable<ButtonLinkGroupDirection>
): string => {
  return getCss({
    // TODO: share this with link tile / button tile
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule(hostHiddenStyles),
      },
      ...addImportantToEachRule({
        '::slotted(picture),::slotted(img)': {
          transition: getTransition('transform'),
          ...getBackfaceVisibilityJssStyle(),
        },
        '::slotted(picture)': {
          position: 'absolute',
          ...getInsetJssStyle(0),
        },
        '::slotted(img)': {
          height: '100%',
          width: '100%',
          objectFit: 'cover',
        },
      }),
    },
    // TODO: share this with link tile / button tile
    root: {
      height: 0,
      position: 'relative',
      transform: 'translate3d(0,0,0)', // Change stacking context for position fixed
      ...hoverMediaQuery({
        '&:hover': {
          '& ::slotted(picture),::slotted(img)': addImportantToEachRule({
            transform: 'scale3d(1.05, 1.05, 1.05)',
          }),
        },
      }),
      ...buildResponsiveStyles(aspectRatio, (ratio: LinkTileModelAspectRatio) => ({
        paddingTop: aspectRatioPaddingTop[ratio],
      })),
    },
    signature: {
      position: 'absolute',
      top: spacingFluidMedium,
      left: spacingFluidMedium,
    },
    'image-container': {
      position: 'absolute',
      overflow: 'hidden',
      borderRadius: borderRadiusMedium,
      ...getInsetJssStyle(0),
    },
    content: {
      position: 'absolute',
      display: 'grid',
      bottom: 0,
      left: 0,
      right: 0,
      justifyItems: 'start',
      borderRadius: borderRadiusMedium,
      padding: `${spacingFluidLarge} ${spacingFluidMedium} ${spacingFluidMedium}`,
      gap: spacingStaticMedium,
      gridTemplateRows: 'auto auto',
      gridTemplateColumns: 'auto',
      '@media (forced-colors: active)': {
        background: 'rgba(0,0,0,0.7)',
      },
      ...gradientToTopStyle,
    },
    'description-group': {
      gap: spacingStaticXSmall,
    },
    description: {
      color: getThemedTypographyColor('dark', 'primary'),
      maxWidth: pxToRemWithUnit(550), // in this case rem unit makes sense to scale up available space
      margin: 0,
      ...textLargeStyle,
      ...buildResponsiveStyles(weight, (w: LinkTileWeight) => ({ fontWeight: getFontWeight(w) })),
    },
    'sub-description': {
      color: getThemedTypographyColor('dark', 'primary'),
      maxWidth: pxToRemWithUnit(550), // in this case rem unit makes sense to scale up available space
      margin: 0,
      ...textSmallStyle,
    },
    link: {
      minHeight: '54px', // prevent content shift
    },
    // is used for expanded click-area only
    'link-overlay': {
      position: 'fixed',
      ...getInsetJssStyle(0),
      outline: 0,
    },
    'link-group': {
      display: 'flex',
      width: '100%',
      gap: spacingFluidSmall,
      ...buildResponsiveStyles(direction, getDirectionJssStyle),
    },
  });
};
