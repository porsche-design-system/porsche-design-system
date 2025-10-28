import { fontSizeTextXSmall, spacingStaticXSmall, textSmallStyle } from '@porsche-design-system/styles';
import type { JssStyle, Styles } from 'jss';
import {
  getHiddenTextJssStyle,
  getThemedColors,
  getTransition,
  prefersColorSchemeDarkMediaQuery,
} from '../../../styles';
import { buildResponsiveStyles, type Theme } from '../../../utils';
import type { BreakpointCustomizable } from '../../../utils/breakpoint-customizable';
import { getFunctionalComponentRequiredStyles } from '../required/required-styles';

export const getFunctionalComponentLabelStyles = (
  isDisabledOrLoading: boolean,
  hideLabel: BreakpointCustomizable<boolean>,
  theme: Theme,
  additionalDefaultJssStyle?: JssStyle,
  additionalIsShownJssStyle?: JssStyle
): Styles => {
  const { primaryColor, contrast40Color, contrast80Color } = getThemedColors(theme);
  const {
    primaryColor: primaryColorDark,
    contrast40Color: contrast40ColorDark,
    contrast80Color: contrast80ColorDark,
  } = getThemedColors('dark');

  return {
    label: {
      ...textSmallStyle,
      cursor: isDisabledOrLoading ? 'not-allowed' : 'pointer',
      justifySelf: 'flex-start', // ensures label is not getting stretched by flex or grid context of its parent
      color: isDisabledOrLoading ? contrast40Color : primaryColor,
      transition: getTransition('color'), // for smooth transitions between e.g. disabled state
      ...buildResponsiveStyles(hideLabel, (isHidden: boolean) =>
        getHiddenTextJssStyle(isHidden, additionalIsShownJssStyle)
      ),
      ...prefersColorSchemeDarkMediaQuery(theme, {
        color: isDisabledOrLoading ? contrast40ColorDark : primaryColorDark,
      }),
      '&:empty': {
        display: 'none', // prevents outer spacing caused by parents grid gap, in case no label value is defined (although it has to be set to be a11y compliant)
      },
      '&+&': {
        cursor: 'unset',
        marginTop: `-${spacingStaticXSmall}`,
        fontSize: fontSizeTextXSmall,
        ...(!isDisabledOrLoading && {
          color: contrast80Color,
          ...prefersColorSchemeDarkMediaQuery(theme, {
            color: contrast80ColorDark,
          }),
        }),
      },
      ...additionalDefaultJssStyle,
    },
    // .required
    ...getFunctionalComponentRequiredStyles(),
  };
};
