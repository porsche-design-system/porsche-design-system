import { buildResponsiveStyles, getCss, type TileAspectRatio, type TileWeight } from '../../utils';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  forcedColorsMediaQuery,
  getThemedColors,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
} from '../../styles';
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
import { type BreakpointCustomizable } from '../../utils/breakpoint-customizable';
import { getFontWeight } from '../../styles/font-weight-styles';
import {
  type LinkTileModelSignatureLinkDirection,
  type LinkTileModelSignatureWeight,
} from './link-tile-model-signature-utils';
import { getGroupDirectionJssStyles } from '../../styles/group-direction-styles';

export const getComponentCss = (
  aspectRatio: BreakpointCustomizable<TileAspectRatio>,
  weight: BreakpointCustomizable<TileWeight>, // to get deprecated semibold typed
  direction?: BreakpointCustomizable<LinkTileModelSignatureLinkDirection>,
  hasDescription?: boolean
): string => {
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
      '::slotted(:is(img,picture))': addImportantToEachRule({
        display: 'block',
        width: '100%',
        height: '100%',
      }),
      '::slotted(img)': addImportantToEachRule({
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
      height: '100%', // necessary in case tile content overflows in grid or flex context
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
