import {
  pxToRemWithUnit,
  getTransition,
  addImportantToEachRule,
  getBackfaceVisibilityJssStyle,
  hostHiddenStyles,
  hoverMediaQuery,
  getInsetJssStyle,
} from '../../styles';
import { getFontWeight } from '../../styles/font-weight-styles';
import { getThemedTypographyColor } from '../../styles/text-icon-styles';
import type { BreakpointCustomizable } from '../../types';
import type { LinkTileAspectRatio, LinkTileAlign, LinkTileWeight, LinkTileSize } from './link-tile-utils';
import { buildResponsiveStyles, buildSlottedStyles, getCss, mergeDeep } from '../../utils';
import {
  textLargeStyle,
  fontSizeTextLarge,
  spacingFluidMedium,
  spacingFluidLarge,
  borderRadiusMedium,
} from '@porsche-design-system/utilities-v2';

const aspectRatioPaddingTop: Record<LinkTileAspectRatio, string> = {
  '1:1': '100%',
  '4:3': '75%',
  '3:4': '133.33%',
  '16:9': '56.25%',
  '9:16': '177.75%',
};

const getGradientBackground = (isCompact: BreakpointCustomizable<boolean>, isTopAligned: boolean): string => {
  const gradient =
    'rgba(31,31,31,0.9) 0%,' +
    'rgba(31,31,31,0.9) 20%,' +
    'rgba(31,31,31,0.852589) 26.67%,' +
    'rgba(32,32,32,0.768225) 33.33%,' +
    'rgba(33,33,33,0.668116) 40%,' +
    'rgba(34,34,34,0.557309) 46.67%,' +
    'rgba(35,35,35,0.442691) 53.33%,' +
    'rgba(36,36,36,0.331884) 60%,' +
    'rgba(37,37,37,0.231775) 66.67%,' +
    'rgba(38,38,38,0.147411) 73.33%,' +
    'rgba(39,39,39,0.0816599) 80%,' +
    'rgba(39,39,39,0.03551) 86.67%,' +
    'rgba(39,39,39,0.0086472) 93.33%,' +
    'rgba(39,39,39,0)';

  return isCompact && isTopAligned
    ? `linear-gradient(${gradient} 100%);`
    : `linear-gradient(to top, ${gradient} 100%);`;
};

const sizeMap: {
  inherit: { fontSize: string };
  default: { fontSize: string };
} = {
  inherit: {
    fontSize: 'inherit',
  },
  default: { fontSize: fontSizeTextLarge },
};

export const getComponentCss = (
  aspectRatio: BreakpointCustomizable<LinkTileAspectRatio>,
  size: BreakpointCustomizable<LinkTileSize>,
  weight: BreakpointCustomizable<LinkTileWeight>,
  align: LinkTileAlign,
  compact: BreakpointCustomizable<boolean>,
  hasGradient: boolean
): string => {
  const isTopAligned = align === 'top';
  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        height: 'fit-content',
        ...addImportantToEachRule({
          ...hostHiddenStyles,
        }),
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
          buildResponsiveStyles(size, (s: LinkTileSize) => sizeMap[s]),
          buildResponsiveStyles(weight, (w: LinkTileWeight) => ({ fontWeight: getFontWeight(w) }))
        ),
      },
    },
    root: {
      display: 'block',
      height: 0,
      position: 'relative',
      transform: 'translate3d(0,0,0)', // Change stacking context for position fixed
      borderRadius: borderRadiusMedium,
      ...hoverMediaQuery({
        '&:hover': {
          '& ::slotted(picture),::slotted(img)': addImportantToEachRule({
            transform: 'scale3d(1.05, 1.05, 1.05)',
          }),
        },
      }),
      ...buildResponsiveStyles(aspectRatio, (ratio: LinkTileAspectRatio) => ({
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

      gap: spacingFluidMedium,
      ...mergeDeep(
        hasGradient &&
          buildResponsiveStyles(compact, (isCompact: boolean) => ({
            background: getGradientBackground(isCompact, isTopAligned),
          })),
        buildResponsiveStyles(compact, (isCompact: boolean) =>
          isCompact
            ? {
                alignItems: 'center',
                gridTemplateColumns: `auto ${pxToRemWithUnit(24)}`,
                gridTemplateRows: 'auto',
                ...(isTopAligned ? { top: 0 } : { bottom: 0 }),
              }
            : { gridTemplateRows: 'auto auto', gridTemplateColumns: 'auto' }
        )
      ),
    },
    'link-pure': buildResponsiveStyles(compact, (isCompact: boolean) => ({
      display: isCompact ? 'inline-block' : 'none',
    })),
    link: {
      minHeight: '54px', // prevent content shift
      ...buildResponsiveStyles(compact, (isCompact: boolean) => ({ display: isCompact ? 'none' : 'inline-block' })),
    },
    'link-overlay': {
      position: 'fixed',
      ...getInsetJssStyle(0),
      outline: 0,
    },
  });
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
