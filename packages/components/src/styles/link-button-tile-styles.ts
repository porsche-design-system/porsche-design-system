import type { Styles, JssStyle } from 'jss';
import type { BreakpointCustomizable } from '../types';
import type {
  LinkButtonTileAspectRatio,
  LinkButtonTileAlign,
  LinkButtonTileWeight,
  LinkButtonTileSize,
} from '../utils';
import {
  pxToRemWithUnit,
  getTransition,
  addImportantToEachRule,
  getBackfaceVisibilityJssStyle,
  hostHiddenStyles,
  hoverMediaQuery,
  getInsetJssStyle,
} from './';
import { getFontWeight } from './font-weight-styles';
import { getThemedTypographyColor } from './text-icon-styles';
import { buildResponsiveStyles, buildSlottedStyles, getCss, mergeDeep } from '../utils';
import {
  textLargeStyle,
  fontSizeTextMedium,
  spacingFluidMedium,
  spacingStaticMedium,
  spacingFluidLarge,
  borderRadiusMedium,
  gradientToBottomStyle,
  gradientToTopStyle,
} from '@porsche-design-system/utilities-v2';

const aspectRatioPaddingTop: Record<LinkButtonTileAspectRatio, string> = {
  '1:1': '100%',
  '4:3': '75%',
  '3:4': '133.33%',
  '16:9': '56.25%',
  '9:16': '177.75%',
};

const getGradientBackground = (isCompact: BreakpointCustomizable<boolean>, isTopAligned: boolean): JssStyle => {
  return isCompact && isTopAligned ? gradientToBottomStyle : gradientToTopStyle;
};

const sizeMap: {
  inherit: { fontSize: string };
  default: { fontSize: string };
} = {
  inherit: {
    fontSize: 'inherit',
  },
  default: { fontSize: fontSizeTextMedium },
};

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(
    buildSlottedStyles(host, {
      '& picture > img': {
        height: '100%',
        width: '100%',
        objectFit: 'cover',
      },
    })
  );
};

export const getLinkButtonTileStyles = (
  aspectRatio: BreakpointCustomizable<LinkButtonTileAspectRatio>,
  size: BreakpointCustomizable<LinkButtonTileSize>,
  weight: BreakpointCustomizable<LinkButtonTileWeight>,
  align: LinkButtonTileAlign,
  compact: BreakpointCustomizable<boolean>,
  hasGradient: boolean
): Styles => {
  const isTopAligned = align === 'top';
  return {
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
      ...buildResponsiveStyles(aspectRatio, (ratio: LinkButtonTileAspectRatio) => ({
        paddingTop: aspectRatioPaddingTop[ratio],
      })),
    },
    'image-container': {
      position: 'absolute',
      overflow: 'hidden',
      borderRadius: borderRadiusMedium,
      ...getInsetJssStyle(0),
    },
    content: {
      position: 'absolute',
      ...(isTopAligned ? { top: 0 } : { bottom: 0 }),
      left: 0,
      right: 0,
      display: 'grid',
      justifyItems: 'start',
      borderRadius: borderRadiusMedium,
      padding:
        align === 'bottom'
          ? `${spacingFluidLarge} ${spacingFluidMedium} ${spacingFluidMedium}`
          : `${spacingFluidMedium} ${spacingFluidMedium} ${spacingFluidLarge}`,

      gap: spacingStaticMedium,
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
      '@media (forced-colors: active)': {
        background: 'rgba(0,0,0,0.7)',
      },
    },
    'link-or-button-pure': buildResponsiveStyles(compact, (isCompact: boolean) => ({
      display: isCompact ? 'inline-block' : 'none',
    })),
    'link-or-button': {
      minHeight: '54px', // prevent content shift
      ...buildResponsiveStyles(compact, (isCompact: boolean) => ({ display: isCompact ? 'none' : 'inline-block' })),
    },
  };
};
