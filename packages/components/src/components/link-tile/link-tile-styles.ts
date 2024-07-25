import {
  buildResponsiveStyles,
  getCss,
  isThemeDark,
  mergeDeep,
  type Theme,
  type TileAlign,
  type TileAspectRatio,
  type TileBackground,
  type TileSize,
  type TileWeight,
} from '../../utils';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  getThemedColors,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
} from '../../styles';
import {
  borderRadiusLarge,
  fontSizeTextLarge,
  fontSizeTextMedium,
  gradientToBottomStyle,
  gradientToTopStyle,
  spacingFluidLarge,
  spacingFluidMedium,
  spacingStaticMedium,
  textMediumStyle,
} from '@porsche-design-system/styles';
import { type BreakpointCustomizable } from '../../utils/breakpoint-customizable';
import { type LinkTileWeight } from './link-tile-utils';
import { getFontWeight } from '../../styles/font-weight-styles';
import { getThemedTypographyColor } from '../../styles/text-icon-styles';

const sizeMap: Record<TileSize, string> = {
  inherit: 'inherit',
  default: fontSizeTextMedium,
  medium: fontSizeTextMedium,
  large: fontSizeTextLarge,
};

export const getComponentCss = (
  aspectRatio: BreakpointCustomizable<TileAspectRatio>,
  size: BreakpointCustomizable<TileSize>,
  weight: BreakpointCustomizable<TileWeight | LinkTileWeight>, // to get deprecated semibold typed
  background: TileBackground,
  align: TileAlign,
  compact: BreakpointCustomizable<boolean>,
  hasGradient: boolean,
  isDisabled?: boolean
): string => {
  const isTopAligned = align === 'top';

  return getCss({
    '@global': {
      ':host': {
        display: 'flex', // stretches the tile when used in grid or flex context in case tile content overflows the available size which results through aspect ratio
        hyphens: 'auto', // TODO: should we expose a CSS variable instead?
        ...addImportantToEachRule({
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      slot: {
        display: 'block',
        '&:not([name])': {
          width: '100%',
          height: '100%',
          transition: getTransition('transform', 'moderate'),
        },
        '&[name="header"]': {
          gridArea: `${isTopAligned ? 4 : 2}/2`,
          zIndex: 3,
        },
      },
      '::slotted': addImportantToEachRule({
        '&(picture)': {
          all: 'unset',
          display: 'block',
          width: '100%',
          height: '100%',
        },
        '&(img)': {
          all: 'unset',
          display: 'block',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        },
      }),
      a: {
        gridArea: '1/1/-1 /-1',
        zIndex: 4,
      },
      p: {
        ...textMediumStyle,
        zIndex: 3,
        margin: 0, // reset ua-style
        maxWidth: '34.375rem',
        hyphens: 'inherit',
        ...mergeDeep(
          buildResponsiveStyles(size, (sizeValue: TileSize) => ({
            fontSize: sizeMap[sizeValue], // mapping of the deprecated size 'default'
          })),
          buildResponsiveStyles(weight, (weightValue: TileWeight | LinkTileWeight) => ({
            fontWeight: getFontWeight(weightValue === 'semibold' ? 'semi-bold' : weightValue), // mapping of the deprecated weight 'semibold'
          })),
          buildResponsiveStyles(background, (backgroundValue: Theme) => ({
            color: getThemedColors(backgroundValue).primaryColor,
          }))
        ),
      },
    },
    root: {
      position: 'relative',
      ...buildResponsiveStyles(aspectRatio, (aspectRatioValue: TileAspectRatio) => ({
        aspectRatio: aspectRatioValue.replace(':', '/'), // mapping of the deprecated aspect-ratio with ':'
      })),
      width: '100%', // necessary for Chrome in case tile content overflows in grid or flex context
      display: 'grid',
      gridTemplate: `${spacingFluidMedium} auto minmax(0px, 1fr) auto ${spacingFluidMedium}/${spacingFluidMedium} auto ${spacingFluidMedium}`,
      color: getThemedTypographyColor('dark', 'primary'), // TODO: why?
      ...(hasGradient &&
        isThemeDark(background) && {
          '&::after': {
            content: '""',
            zIndex: 2,
            ...(isTopAligned
              ? {
                  gridArea: '1/1/3/-1',
                  ...gradientToBottomStyle,
                  borderStartStartRadius: borderRadiusLarge,
                  borderStartEndRadius: borderRadiusLarge,
                }
              : {
                  gridArea: '4/1/6/-1',
                  ...gradientToTopStyle,
                  borderEndStartRadius: borderRadiusLarge,
                  borderEndEndRadius: borderRadiusLarge,
                }),
          },
        }),
      ...(!isDisabled &&
        hoverMediaQuery({
          '&:hover slot:not([name])': {
            transform: 'scale3d(1.05,1.05,1.05)',
          },
        })),
    },
    media: {
      gridArea: '1/1/-1 /-1',
      zIndex: 1,
      overflow: 'hidden',
      borderRadius: borderRadiusLarge,
    },
    footer: {
      gridArea: `${isTopAligned ? 2 : 4}/2`,
      [isTopAligned ? 'marginBottom' : 'marginTop']: spacingFluidLarge,
      display: 'flex',
      gap: spacingStaticMedium,
      ...buildResponsiveStyles(compact, (compactValue: boolean) =>
        compactValue
          ? {
              alignItems: 'center',
              justifyContent: 'space-between',
            }
          : {
              alignItems: 'flex-start',
              flexDirection: 'column',
            }
      ),
    },
    // TODO: maybe we can solve this in a smarter way?
    'link-or-button-pure': buildResponsiveStyles(compact, (compactValue: boolean) => ({
      display: compactValue ? 'inline-block' : 'none',
      zIndex: 5,
    })),
    'link-or-button': {
      minHeight: '54px', // prevent content shift
      zIndex: 5,
      ...buildResponsiveStyles(compact, (isCompact: boolean) => ({
        display: isCompact ? 'none' : 'inline-block',
      })),
    },
  });
};
