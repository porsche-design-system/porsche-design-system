import {
  gradientToBottomStyle,
  gradientToTopStyle,
  spacingFluidLarge,
  spacingFluidMedium,
  spacingStaticMedium,
  textMediumStyle,
} from '@porsche-design-system/styles';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  colors,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  preventFoucOfNestedElementsStyles,
} from '../../styles';
import { legacyRadiusLarge, radius4Xl } from '../../styles/css-variables';
import { getFontSizeText } from '../../styles/font-size-text-styles';
import { getFontWeight } from '../../styles/font-weight-styles';
import {
  buildResponsiveStyles,
  getCss,
  mergeDeep,
  type TileAlign,
  type TileAspectRatio,
  type TileSize,
  type TileWeight,
} from '../../utils';
import type { BreakpointCustomizable } from '../../utils/breakpoint-customizable';

// CSS Variable defined in fontHyphenationStyle
/**
 * @css-variable {"name": "--p-hyphens", "description": "Sets the CSS `hyphens` property for text elements, controlling whether words can break and hyphenate automatically.", "defaultValue": "auto"}
 */

const { canvasColor, primaryColor } = colors;

export const getComponentCss = (
  isDisabledOrLoading: boolean,
  aspectRatio: BreakpointCustomizable<TileAspectRatio>,
  size: BreakpointCustomizable<TileSize>,
  weight: BreakpointCustomizable<TileWeight>,
  align: TileAlign,
  compact: BreakpointCustomizable<boolean>,
  hasGradient: boolean,
  hasFooterSlot: boolean,
  isDisabled?: boolean
): string => {
  const isTopAligned = align === 'top';

  return getCss({
    '@global': {
      ':host': {
        display: 'flex',
        alignItems: 'stretch',
        // Safari workaround to scale the tile properly
        '@supports (-webkit-hyphens: auto)': {
          alignItems: 'baseline',
        },
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
        '&[name="footer"]': {
          gridRow: 2,
          zIndex: 3,
        },
      },
      '::slotted(:is(img,video,picture))': addImportantToEachRule({
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
        all: 'unset',
        zIndex: 3,
        maxWidth: '34.375rem',
        ...textMediumStyle,
        color: primaryColor,
        hyphens: 'inherit',
        ...mergeDeep(
          buildResponsiveStyles(size, (sizeValue: TileSize) => ({
            fontSize: getFontSizeText(sizeValue),
          })),
          buildResponsiveStyles(weight, (weightValue: TileWeight) => ({
            fontWeight: getFontWeight(weightValue),
          }))
        ),
      },
    },
    root: {
      display: 'grid',
      gridTemplate: `${spacingFluidMedium} auto minmax(0px, 1fr) auto ${spacingFluidMedium}/${spacingFluidMedium} minmax(0px, 1fr) ${spacingFluidMedium}`,
      width: '100%', // necessary in case tile content overflows in grid or flex context
      // Safari workaround to scale the tile properly
      '@supports (-webkit-hyphens: auto)': {
        height: '100%',
      },
      borderRadius: `var(${legacyRadiusLarge}, ${radius4Xl})`,
      ...buildResponsiveStyles(aspectRatio, (aspectRatioValue: TileAspectRatio) => ({
        aspectRatio: aspectRatioValue,
      })),
      cursor: isDisabledOrLoading ? 'not-allowed' : 'pointer',
      ...(hasGradient && {
        '&::after': {
          content: '""',
          zIndex: 2,
          ...(isTopAligned
            ? {
                gridArea: '1/1/3/-1',
                background: gradientToBottomStyle.background.replaceAll('0,0%,0%,', `from ${canvasColor} h s l / `),
                marginBottom: `calc(${spacingFluidLarge} * -1)`, // to increase the gradient area without reserving additional layout space
                borderStartStartRadius: 'inherit',
                borderStartEndRadius: 'inherit',
              }
            : {
                gridArea: '4/1/6/-1',
                background: gradientToTopStyle.background.replaceAll('0,0%,0%,', `from ${canvasColor} h s l / `),
                marginTop: `calc(${spacingFluidLarge} * -1)`, // to increase the gradient area without reserving additional layout space
                borderEndStartRadius: 'inherit',
                borderEndEndRadius: 'inherit',
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
      borderRadius: 'inherit',
    },
    footer: {
      gridArea: `${isTopAligned ? 2 : 4}/2`,
      ...buildResponsiveStyles(compact, (compactValue: boolean) =>
        compactValue
          ? {
              display: 'grid',
              gridTemplateColumns: 'minmax(0,1fr) auto',
              columnGap: spacingStaticMedium,
            }
          : {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
            }
      ),
    },
    'link-or-button-pure': {
      zIndex: 5,
      gridColumn: 2,
      gridRow: `1/${hasFooterSlot ? 3 : 2}`,
      alignSelf: isTopAligned ? 'flex-start' : 'flex-end',
      ...buildResponsiveStyles(compact, (compactValue: boolean) => ({
        display: compactValue ? 'inline-block' : 'none',
      })),
    },
    'link-or-button': {
      minHeight: '54px', // prevent content shift
      zIndex: 5,
      marginTop: spacingStaticMedium,
      ...buildResponsiveStyles(compact, (compactValue: boolean) => ({
        display: compactValue ? 'none' : 'inline-block',
      })),
    },
  });
};
