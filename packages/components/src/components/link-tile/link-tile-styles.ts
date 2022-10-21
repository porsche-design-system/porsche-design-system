import { pxToRemWithUnit, getInsetJssStyle, getTransition, addImportantToRule } from '../../styles';
import { getFontWeight } from '../../styles/font-weight-styles';
import { getThemedTextColor } from '../../styles/text-icon-styles';
import { hoverMediaQuery } from '../../styles/hover-media-query';
import type { BreakpointCustomizable } from '../../types';
import type { LinkTileAspectRatio, LinkTileAlign, LinkTileWeight, LinkTileSize } from './link-tile-utils';
import { buildResponsiveStyles, buildSlottedStyles, getCss, mergeDeep } from '../../utils';
import { mediaQueryMin, textSmall } from '@porsche-design-system/utilities-v2';
import type { JssStyle } from 'jss';

const aspectRatioPaddingTop: { [key in LinkTileAspectRatio]: string } = {
  '1:1': '100%',
  '4:3': '75%',
  '3:4': '133.33%',
  '16:9': '56.25%',
  '9:16': '177.75%',
};

const getGradientBackground = (isCompact: boolean, isTopAligned: boolean): string => {
  const gradient =
    'rgba(31, 31, 31, 0.9) 0%,' +
    'rgba(31, 31, 31, 0.9) 20%,' +
    'rgba(31, 31, 31, 0.852589) 26.67%,' +
    'rgba(32, 32, 32, 0.768225) 33.33%,' +
    'rgba(33, 33, 33, 0.668116) 40%,' +
    'rgba(34, 34, 34, 0.557309) 46.67%,' +
    'rgba(35, 35, 35, 0.442691) 53.33%,' +
    'rgba(36, 36, 36, 0.331884) 60%,' +
    'rgba(37, 37, 37, 0.231775) 66.67%,' +
    'rgba(38, 38, 38, 0.147411) 73.33%,' +
    'rgba(39, 39, 39, 0.0816599) 80%,' +
    'rgba(39, 39, 39, 0.03551) 86.67%,' +
    'rgba(39, 39, 39, 0.0086472) 93.33%,' +
    'rgba(39, 39, 39, 0)';

  return isCompact && isTopAligned
    ? `linear-gradient(${gradient} 100%);`
    : `linear-gradient(to top, ${gradient} 100%);`;
};

const sizeMap: {
  inherit: { lineHeight: string; fontSize: string };
  default: { lineHeight: number; fontSize: string };
} = {
  inherit: {
    lineHeight: 'inherit',
    fontSize: 'inherit',
  },
  default: { fontSize: '1.25rem', lineHeight: 1.5555555556 },
};

const paddingSizeXS = pxToRemWithUnit(24);
const gradientPadding = pxToRemWithUnit(72);

const getPaddingStyles = (paddingSize: string, align: LinkTileAlign): JssStyle => ({
  paddingLeft: paddingSize,
  paddingRight: paddingSize,
  ...(align === 'bottom' ? { paddingBottom: paddingSize } : { paddingTop: paddingSize }),
});

export const getComponentCss = (
  aspectRatio: BreakpointCustomizable<LinkTileAspectRatio>,
  size: BreakpointCustomizable<LinkTileSize>,
  weight: BreakpointCustomizable<LinkTileWeight>,
  align: LinkTileAlign,
  isCompact: boolean,
  hasGradient: boolean
): string => {
  const isTopAligned = align === 'top' && isCompact;

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        height: addImportantToRule('fit-content'),
      },
      p: {
        color: getThemedTextColor('dark', 'default'),
        ...textSmall,
        ...mergeDeep(
          buildResponsiveStyles(size, (s: LinkTileSize) => sizeMap[s]),
          buildResponsiveStyles(weight, (w: LinkTileWeight) => ({ fontWeight: getFontWeight(w) }))
        ),
        maxWidth: pxToRemWithUnit(550),
        margin: 0,
      },
    },
    root: {
      height: 0,
      ...buildResponsiveStyles(aspectRatio, (ratio: LinkTileAspectRatio) => ({
        paddingTop: aspectRatioPaddingTop[ratio],
      })),
      position: 'relative',
      transform: 'translate3d(0,0,0)', // Change stacking context for position fixed
      ...hoverMediaQuery({
        '&:hover': {
          '& $image': {
            transform: 'scale3d(1.05, 1.05, 1.05)',
          },
        },
      }),
    },
    'image-overflow-container': {
      position: 'absolute',
      ...getInsetJssStyle(),
      overflow: 'hidden',
    },
    image: {
      position: 'absolute',
      ...getInsetJssStyle(),
      transition: getTransition('transform'),
      backfaceVisibility: 'hidden',
    },
    content: {
      position: 'absolute',
      ...(isTopAligned ? { top: 0 } : { bottom: 0 }),
      left: 0,
      right: 0,
      display: 'grid',
      maxHeight: '100%',
      justifyItems: 'start',
      padding:
        align === 'bottom'
          ? `${gradientPadding} ${paddingSizeXS} ${paddingSizeXS}`
          : `${paddingSizeXS} ${paddingSizeXS} ${gradientPadding}`,

      gap: pxToRemWithUnit(24),
      [mediaQueryMin('s')]: getPaddingStyles(pxToRemWithUnit(32), align),
      ...(hasGradient && { background: getGradientBackground(isCompact, isTopAligned) }),
      ...(isCompact
        ? {
            alignItems: 'center',
            gridTemplateColumns: `auto ${pxToRemWithUnit(24)}`,
          }
        : {
            gridTemplateRows: 'auto auto',
          }),
    },
    anchor: {
      '&::after': {
        content: '""',
        position: 'fixed',
        ...getInsetJssStyle(),
      },
    },
  });
};

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(
    buildSlottedStyles(host, {
      '& img': {
        position: 'absolute',
        ...getInsetJssStyle(),
        height: '100%',
        width: '100%',
        objectFit: 'cover',
      },
    })
  );
};
