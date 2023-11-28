import { getCss, Theme } from '../../utils';
import {
  addImportantToEachRule,
  colorSchemeStyles,
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
  fontWeightRegular,
  fontWeightSemiBold,
  spacingFluidMedium,
  spacingFluidSmall,
  spacingFluidXSmall,
  textSmallStyle,
  textXSmallStyle,
  textXXSmallStyle,
} from '@porsche-design-system/utilities-v2';

export const getComponentCss = (theme: Theme): string => {
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
        }),
      },
      ...addImportantToEachRule({
        '::slotted': {
          '&(picture)': {
            display: 'block',
            overflow: 'hidden',
            aspectRatio: '8 / 9',
            objectFit: 'cover',
            width: '100%',
            borderRadius: borderRadiusLarge,
          },
          '&(img)': {
            aspectRatio: '8 / 9',
            objectFit: 'cover',
            width: '100%',
            borderRadius: borderRadiusLarge,
          },
        },
      }),
    },
    root: {
      display: 'block',
      textDecoration: 'none',
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
      display: 'flex',
      overflow: 'hidden',
      paddingRight: fontLineHeight, // Reserve space for like button
    },
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
    text: {
      textAlign: 'center',
      margin: 0,
      '&__heading-container': {
        height: `calc(${fontLineHeight} * 2)`,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        overflow: 'hidden',
      },
      '&__heading': {
        ...textSmallStyle,
        fontWeight: fontWeightSemiBold,
        maxHeight: `calc(${fontLineHeight} * 2)`,
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
      '&__price': {
        ...textXSmallStyle,
        fontWeight: fontWeightRegular,
      },
      '&__info': {
        ...textXXSmallStyle,
        fontWeight: fontWeightRegular,
        paddingBottom: spacingFluidXSmall,
        color: contrastHighColor,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          color: contrastHighColorDark,
        }),
      },
    },
    'image-container': {
      display: 'block',
      aspectRatio: '8 / 9',
      margin: `${spacingFluidSmall} ${spacingFluidMedium} ${spacingFluidXSmall} ${spacingFluidMedium} `,
      borderRadius: borderRadiusLarge,
      transition: getTransition('transform', 'moderate'),
    },
  });
};
