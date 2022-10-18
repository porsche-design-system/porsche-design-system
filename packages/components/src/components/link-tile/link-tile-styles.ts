import { addImportantToEachRule, pxToRemWithUnit, getInsetJssStyle, getTransition } from '../../styles';
import { getFontWeight } from '../../styles/font-weight-styles';
import { getThemedTextColor } from '../../styles/text-icon-styles';
import { hoverMediaQuery } from '../../styles/hover-media-query';
import type { BreakpointCustomizable, TextSize } from '../../types';
import { fontSize, textSmall } from '@porsche-design-system/utilities-v2';
import type { LinkTileAspectRatio, LinkTileAlign, LinkTileWeight } from './link-tile-utils';
import { buildResponsiveStyles, getCss } from '../../utils';

const aspectRatioPaddingTop: { [key in LinkTileAspectRatio]: { paddingTop: string } } = {
  '1:1': { paddingTop: '100%' },
  '4:3': { paddingTop: '75%' },
  '3:4': { paddingTop: '133.33%' },
  '16:9': { paddingTop: '56.25%' },
  '9:16': { paddingTop: '177.75%' },
};

const getGradientBackground = (isCompact: boolean, isTopAligned: boolean): string => {
  const gradient =
    'rgba(31, 31, 31, 0.9) 0%, ' +
    'rgba(31, 31, 31, 0.9) 20%, ' +
    'rgba(31, 31, 31, 0.852589) 26.67%, ' +
    'rgba(32, 32, 32, 0.768225) 33.33%, ' +
    'rgba(33, 33, 33, 0.668116) 40%, ' +
    'rgba(34, 34, 34, 0.557309) 46.67%, ' +
    'rgba(35, 35, 35, 0.442691) 53.33% ,' +
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

export const getComponentCss = (
  aspectRatio: BreakpointCustomizable<LinkTileAspectRatio>,
  size: TextSize,
  weight: LinkTileWeight,
  align: LinkTileAlign,
  isCompact: boolean,
  hasGradient: boolean
): string => {
  const isTopAligned = align === 'top' && isCompact;
  const containerSizeStyles = {
    height: 0,
    ...buildResponsiveStyles(aspectRatio, (ratio: LinkTileAspectRatio) => aspectRatioPaddingTop[ratio]),
    position: 'relative',
  };

  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        display: 'block',
        height: 'fit-content',
      }),
      '::slotted(*)': {
        position: 'absolute',
        ...getInsetJssStyle(),
        height: '100%',
        width: '100%',
        objectFit: 'cover',
      },
      p: {
        color: getThemedTextColor('dark', 'default'),
        ...textSmall,
        ...buildResponsiveStyles(size, (s: TextSize) => fontSize[s]),
        fontWeight: getFontWeight(weight),
        maxWidth: pxToRemWithUnit(550),
        margin: 0,
      },
    },
    root: {
      ...containerSizeStyles,
      transform: 'translate3d(0,0,0)', // needed for hover effect??
      ...hoverMediaQuery({
        '&:hover': {
          '& $image': {
            transform: 'scale3d(1.05, 1.05, 1.05)',
          },
        },
      }),
    },
    'image-position-container': {
      position: 'absolute',
      ...getInsetJssStyle(),
    },
    'image-overflow-container': {
      ...containerSizeStyles,
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
          ? `${pxToRemWithUnit(64)} ${pxToRemWithUnit(24)} ${pxToRemWithUnit(24)}`
          : `${pxToRemWithUnit(24)} ${pxToRemWithUnit(24)} ${pxToRemWithUnit(64)}`,
      gap: pxToRemWithUnit(24),
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
