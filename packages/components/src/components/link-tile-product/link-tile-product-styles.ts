import { getCss, Theme } from '../../utils';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  getThemedColors,
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
  const css = getCss({
    '@global': {
      ':host': {
        display: 'block',
        hyphens: 'auto',
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
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    tags: {
      display: 'flex',
      overflow: 'hidden',
    },
    'like-button': {
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
      '&__heading': {
        ...textSmallStyle,
        fontWeight: fontWeightSemiBold,
        height: `calc(${fontLineHeight} * 2)`,
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
    },
  });
  console.log(css);
  return css;
};
