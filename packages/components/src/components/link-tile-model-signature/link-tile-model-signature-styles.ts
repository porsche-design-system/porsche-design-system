import {
  borderRadiusLarge,
  gradientToTopStyle,
  spacingFluidLarge,
  spacingFluidMedium,
  spacingFluidSmall,
  spacingStaticMedium,
  textLargeStyle,
  textSmallStyle,
} from '@porsche-design-system/styles';
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
import { getFontWeight } from '../../styles/font-weight-styles';
import { getGroupDirectionJssStyles } from '../../styles/group-direction-styles';
import { buildResponsiveStyles, getCss, type TileAspectRatio, type TileWeight } from '../../utils';
import type { BreakpointCustomizable } from '../../utils/breakpoint-customizable';
import type {
  LinkTileModelSignatureLinkDirection,
  LinkTileModelSignatureWeight,
} from './link-tile-model-signature-utils';

// CSS Variable defined in fontHyphenationStyle
/**
 * @css-variable {"name": "--p-hyphens", "description": "Sets the CSS `hyphens` property for text elements, controlling whether words can break and hyphenate automatically.", "defaultValue": "auto"}
 */
export const getComponentCss = (
  aspectRatio: BreakpointCustomizable<TileAspectRatio>,
  weight: BreakpointCustomizable<TileWeight>, // to get deprecated semibold typed
  direction?: BreakpointCustomizable<LinkTileModelSignatureLinkDirection>,
  hasDescription?: boolean
): string => {
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
        '&:not([name])': {
          display: 'block',
          width: '100%',
          height: '100%',
          transition: getTransition('transform', 'moderate'),
        },
        '&[name=primary]': {
          pointerEvents: 'auto',
        },
        '&[name=secondary]': {
          pointerEvents: 'auto',
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
      'h1,h2,h3,h4,h5,h6': {
        margin: 0,
        zIndex: 3,
        maxWidth: '34.375rem',
        ...textLargeStyle,
        hyphens: 'inherit',
        color: getThemedColors('dark').primaryColor,
        ...buildResponsiveStyles(weight, (w: LinkTileModelSignatureWeight) => ({ fontWeight: getFontWeight(w) })),
      },
      ...(hasDescription && {
        p: {
          margin: '-12px 0 0 ',
          zIndex: 3,
          maxWidth: '34.375rem',
          ...textSmallStyle,
          color: getThemedColors('dark').primaryColor,
          hyphens: 'inherit',
        },
      }),
    },
    root: {
      ...buildResponsiveStyles(aspectRatio, (aspectRatioValue: TileAspectRatio) => ({
        aspectRatio: aspectRatioValue.replace(':', '/'), // mapping of the deprecated aspect-ratio with ':'
      })),
      width: '100%', // necessary in case tile content overflows in grid or flex context
      // Safari workaround to scale the tile properly
      '@supports (-webkit-hyphens: auto)': {
        height: '100%',
      },
      display: 'grid',
      gridTemplate: `${spacingFluidMedium} auto minmax(0px, 1fr) auto ${spacingFluidMedium}/${spacingFluidMedium} minmax(0px, 1fr) ${spacingFluidMedium}`,
      '&::after': {
        content: '""',
        zIndex: 2,
        gridArea: '4/1/6/-1',
        ...gradientToTopStyle,
        marginTop: `calc(${spacingFluidLarge} * -1)`, // to increase the gradient area without reserving additional layout space
        borderEndStartRadius: borderRadiusLarge,
        borderEndEndRadius: borderRadiusLarge,
        ...forcedColorsMediaQuery({
          background: 'rgba(0,0,0,0.7)',
        }),
      },
      ...hoverMediaQuery({
        '&:hover slot:not([name])': {
          transform: 'scale3d(1.05,1.05,1.05)',
        },
      }),
    },
    header: {
      gridArea: '2/2',
      zIndex: 3,
      display: 'flex',
      flexDirection: 'column',
      gap: spacingFluidSmall,
    },
    media: {
      position: 'relative', // necessary if custom `position: absolute` style is added to media elements
      gridArea: '1/1/-1 /-1',
      zIndex: 1,
      overflow: 'hidden', // relevant for scaling of nested image
      borderRadius: borderRadiusLarge,
    },
    footer: {
      gridArea: '4/2',
      display: 'flex',
      gap: spacingStaticMedium,
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      flexDirection: 'column',
    },
    'link-group': {
      zIndex: 5,
      display: 'flex',
      width: '100%',
      pointerEvents: 'none',
      gap: spacingFluidSmall,
      ...buildResponsiveStyles(direction, getGroupDirectionJssStyles),
    },
  });
};
