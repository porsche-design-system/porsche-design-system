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
} from '@porsche-design-system/utilities-v2';
import { tagPaddingY } from '../tag/tag-styles';

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
        display: 'block',
        position: 'relative',
        ...addImportantToEachRule({
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      ...addImportantToEachRule({
        '::slotted': {
          '&(img)': {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          },
          '&(a)': {
            position: 'absolute',
            ...getInsetJssStyle(),
            ...getFocusStyle({ borderRadius: 'medium' }),
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
      borderRadius: borderRadiusMedium,
      padding: spacingFluidSmall,
      color: primaryColor,
      backgroundColor: backgroundSurfaceColor,
      ...prefersColorSchemeDarkMediaQuery(theme, {
        color: primaryColorDark,
        backgroundColor: backgroundSurfaceColorDark,
      }),
      ...hoverMediaQuery({
        '&:hover .image-container': {
          transform: 'scale3d(1.05,1.05,1.05)',
        },
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
      aspectRatio: '8 / 9',
      overflow: 'hidden',
      margin: `${spacingFluidSmall} ${spacingFluidMedium} ${spacingFluidXSmall} ${spacingFluidMedium} `,
      borderRadius: borderRadiusLarge,
      transition: getTransition('transform', 'moderate'),
    },
  });
};
