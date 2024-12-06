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
  forcedColorsMediaQuery,
  getThemedColors,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  preventFoucOfNestedElementsStyles,
} from '../../styles';
import {
  borderRadiusLarge,
  gradientToBottomStyle,
  gradientToTopStyle,
  spacingFluidLarge,
  spacingFluidMedium,
  spacingStaticMedium,
  textMediumStyle,
} from '@porsche-design-system/styles';
import type { BreakpointCustomizable } from '../../utils/breakpoint-customizable';
import { getFontWeight } from '../../styles/font-weight-styles';
import { getFontSizeText } from '../../styles/font-size-text-styles';

export const getComponentCss = (
  isDisabledOrLoading: boolean,
  aspectRatio: BreakpointCustomizable<TileAspectRatio>,
  size: BreakpointCustomizable<TileSize>,
  weight: BreakpointCustomizable<TileWeight>,
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
        display: 'block', // `display: flex` would be more ideal, but doesn't work in Safari in all cases
        hyphens: 'auto', // TODO: shouldn't we expose a CSS variable instead?
        ...addImportantToEachRule({
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      ...preventFoucOfNestedElementsStyles,
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
      '::slotted(:is(img,picture,video))': addImportantToEachRule({
        display: 'block',
        width: '100%',
        height: '100%',
      }),
      '::slotted(:is(img,video))': addImportantToEachRule({
        objectFit: 'cover',
      }),
      a: {
        gridArea: '1/1/-1 /-1',
        zIndex: 4,
        outline: 0, // reset focus style since this element is used to improve mouse interaction only
      },
      p: {
        ...textMediumStyle,
        zIndex: 3,
        margin: 0, // reset ua-style
        maxWidth: '34.375rem',
        hyphens: 'inherit',
        ...mergeDeep(
          buildResponsiveStyles(size, (sizeValue: TileSize) => ({
            fontSize: getFontSizeText(sizeValue === 'default' ? 'medium' : sizeValue), // mapping of the deprecated size 'default'
          })),
          buildResponsiveStyles(weight, (weightValue: TileWeight) => ({
            fontWeight: getFontWeight(weightValue),
          })),
          buildResponsiveStyles(background, (backgroundValue: Theme) => ({
            color: getThemedColors(backgroundValue).primaryColor,
          }))
        ),
      },
    },
    root: {
      ...buildResponsiveStyles(aspectRatio, (aspectRatioValue: TileAspectRatio) => ({
        aspectRatio: aspectRatioValue.replace(':', '/'), // mapping of the deprecated aspect-ratio with ':'
      })),
      cursor: isDisabledOrLoading ? 'not-allowed' : 'pointer',
      width: '100%', // necessary in case tile content overflows in grid or flex context
      height: '100%', // necessary in case tile content overflows in grid or flex context
      display: 'grid',
      gridTemplate: `${spacingFluidMedium} auto minmax(0px, 1fr) auto ${spacingFluidMedium}/${spacingFluidMedium} minmax(0px, 1fr) ${spacingFluidMedium}`,
      ...(hasGradient &&
        isThemeDark(background) && {
          '&::after': {
            content: '""',
            zIndex: 2,
            ...(isTopAligned
              ? {
                  gridArea: '1/1/3/-1',
                  ...gradientToBottomStyle,
                  marginBottom: `calc(${spacingFluidLarge} * -1)`, // to increase the gradient area without reserving additional layout space
                  borderStartStartRadius: borderRadiusLarge,
                  borderStartEndRadius: borderRadiusLarge,
                }
              : {
                  gridArea: '4/1/6/-1',
                  ...gradientToTopStyle,
                  marginTop: `calc(${spacingFluidLarge} * -1)`, // to increase the gradient area without reserving additional layout space
                  borderEndStartRadius: borderRadiusLarge,
                  borderEndEndRadius: borderRadiusLarge,
                }),
            ...forcedColorsMediaQuery({
              background: 'rgba(0,0,0,0.7)',
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
      position: 'relative', // necessary if custom `position: absolute` style is added to media elements
      gridArea: '1/1/-1 /-1',
      zIndex: 1,
      overflow: 'hidden', // relevant for scaling of nested image
      borderRadius: borderRadiusLarge,
    },
    footer: {
      gridArea: `${isTopAligned ? 2 : 4}/2`,
      display: 'flex',
      gap: spacingStaticMedium,
      justifyContent: 'space-between',
      ...buildResponsiveStyles(compact, (compactValue: boolean) =>
        compactValue
          ? {
              alignItems: 'center',
              flexDirection: 'row',
            }
          : {
              alignItems: 'flex-start',
              flexDirection: 'column',
            }
      ),
    },
    'link-or-button-pure': {
      zIndex: 5,
      ...buildResponsiveStyles(compact, (compactValue: boolean) => ({
        display: compactValue ? 'inline-block' : 'none',
      })),
    },
    'link-or-button': {
      minHeight: '54px', // prevent content shift
      zIndex: 5,
      ...buildResponsiveStyles(compact, (compactValue: boolean) => ({
        display: compactValue ? 'none' : 'inline-block',
      })),
    },
  });
};
