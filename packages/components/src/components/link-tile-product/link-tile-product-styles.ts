import { getCss, Theme } from '../../utils';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  getInsetJssStyle,
  getThemedColors,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  prefersColorSchemeDarkMediaQuery,
} from '../../styles';
import {
  borderRadiusLarge,
  borderRadiusMedium,
  borderWidthBase,
  fontLineHeight,
  fontSizeTextXSmall,
  fontWeightRegular,
  getFocusStyle,
  headingSmallStyle,
  spacingFluidMedium,
  spacingFluidSmall,
  spacingFluidXSmall,
  textXSmallStyle,
  textXXSmallStyle,
  themeLightStateFocus,
} from '@porsche-design-system/utilities-v2';
import { tagPaddingY } from '../tag/tag-styles';

const cssVariableMixBlendMode = '--p-link-tile-product-mix-blend-mode';

export const getComponentCss = (hasLikeButton: boolean, theme: Theme): string => {
  const { primaryColor, contrastHighColor, backgroundSurfaceColor } = getThemedColors(theme);
  const {
    primaryColor: primaryColorDark,
    contrastHighColor: contrastHighColorDark,
    backgroundSurfaceColor: backgroundSurfaceColorDark,
  } = getThemedColors('dark');
  return getCss({
    '@global': {
      ':host': {
        position: 'relative',
        ...addImportantToEachRule({
          ...colorSchemeStyles,
          ...hostHiddenStyles,
          ...hoverMediaQuery({
            '&(:hover) ::slotted(img), &(:hover) ::slotted(picture)': {
              transform: 'scale3d(1.05,1.05,1.05)',
            },
          }),
        }),
      },
      ...addImportantToEachRule({
        '::slotted': {
          '&(img), &(picture)': {
            display: 'block',
            width: '100%',
            height: '100%',
            borderRadius: borderRadiusLarge,
            objectFit: 'cover',
            overflow: 'hidden',
            aspectRatio: '8 / 9',
            transition: getTransition('transform', 'moderate'),
            mixBlendMode: `var(${cssVariableMixBlendMode})`,
          },
          '&(a)': {
            position: 'absolute',
            borderRadius: borderRadiusMedium,
            ...getInsetJssStyle(),
            zIndex: 1, // Necessary to be on top of img
          },
          // TODO: Refactor getFocusStyles to support slotted selector
          '&(a:focus)': {
            outline: `${borderWidthBase} solid ${themeLightStateFocus}`,
            outlineOffset: '2px',
          },
          '&(a:focus:not(:focus-visible))': {
            outlineColor: 'transparent',
          },
        },
      }),
    },
    'link-overlay': {
      position: 'absolute',
      ...getInsetJssStyle(),
      ...getFocusStyle({ borderRadius: 'medium' }),
    },
    root: {
      boxSizing: 'border-box',
      borderRadius: borderRadiusMedium,
      padding: spacingFluidSmall,
      color: primaryColor,
      backgroundColor: backgroundSurfaceColor,
      ...prefersColorSchemeDarkMediaQuery(theme, {
        color: primaryColorDark,
        backgroundColor: backgroundSurfaceColorDark,
      }),
    },
    header: {
      overflow: 'hidden',
      fontSize: fontSizeTextXSmall, // Use same font size and height as tag component
      height: `calc(${tagPaddingY} * 2 + ${fontLineHeight})`,
      ...(hasLikeButton && {
        paddingRight: fontLineHeight, // Reserve space for like button
      }),
    },
    ...(hasLikeButton && {
      'like-button': {
        position: 'absolute',
        zIndex: 2, // To be on top of link
        top: spacingFluidSmall,
        right: spacingFluidSmall,
        height: 'fit-content',
        ...hoverMediaQuery({
          '&:hover': {
            cursor: 'pointer',
          },
        }),
      },
    }),
    'heading-container': {
      height: `calc(${fontLineHeight} * 2)`,
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    text: {
      textAlign: 'center',
      margin: 0,
      '&__heading': {
        ...headingSmallStyle,
        maxHeight: `calc(${fontLineHeight} * 2)`,
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
      '&__price, &__info': {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        fontWeight: fontWeightRegular,
      },
      '&__price': {
        ...textXSmallStyle,
      },
      '&__info': {
        ...textXXSmallStyle,
        height: fontLineHeight,
        paddingBottom: spacingFluidXSmall,
        color: contrastHighColor,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          color: contrastHighColorDark,
        }),
      },
    },
    'image-container': {
      padding: `${spacingFluidSmall} ${spacingFluidMedium} ${spacingFluidXSmall} ${spacingFluidMedium} `,
    },
  });
};
