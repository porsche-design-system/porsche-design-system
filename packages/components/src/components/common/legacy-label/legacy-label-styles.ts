import { fontSizeTextXSmall, spacingStaticXSmall, textSmallStyle } from '@porsche-design-system/styles';
import type { JssStyle, Styles } from 'jss';
import {
  getHiddenTextJssStyle,
  getThemedColors,
  getTransition,
  prefersColorSchemeDarkMediaQuery,
} from '../../../styles';
import { type Theme, buildResponsiveStyles } from '../../../utils';
import type { BreakpointCustomizable } from '../../../utils/breakpoint-customizable';
import { getFunctionalComponentRequiredStyles } from '../required/required-styles';

export const getFunctionalComponentLegacyLabelStyles = (
  isDisabledOrLoading: boolean,
  hideLabel: BreakpointCustomizable<boolean>,
  theme: Theme,
  additionalDefaultJssStyle?: JssStyle,
  additionalIsShownJssStyle?: JssStyle
): Styles => {
  const { primaryColor, disabledColor, contrastHighColor } = getThemedColors(theme);
  const {
    primaryColor: primaryColorDark,
    disabledColor: disabledColorDark,
    contrastHighColor: contrastHighColorDark,
  } = getThemedColors('dark');

  return {
    label: {
      ...textSmallStyle,
      cursor: isDisabledOrLoading ? 'not-allowed' : 'pointer',
      justifySelf: 'flex-start', // ensures label is not getting stretched by flex or grid context of its parent
      color: isDisabledOrLoading ? disabledColor : primaryColor,
      transition: getTransition('color'), // for smooth transitions between e.g. disabled state
      ...buildResponsiveStyles(hideLabel, (isHidden: boolean) =>
        getHiddenTextJssStyle(isHidden, additionalIsShownJssStyle)
      ),
      ...prefersColorSchemeDarkMediaQuery(theme, {
        color: isDisabledOrLoading ? disabledColorDark : primaryColorDark,
      }),
      '&:empty': {
        display: 'none', // prevents outer spacing caused by parents grid gap, in case no label value is defined (although it has to be set to be a11y compliant)
      },
      '&+&': {
        cursor: 'unset',
        marginTop: `-${spacingStaticXSmall}`,
        fontSize: fontSizeTextXSmall,
        ...(!isDisabledOrLoading && {
          color: contrastHighColor,
          ...prefersColorSchemeDarkMediaQuery(theme, {
            color: contrastHighColorDark,
          }),
        }),
      },
      ...additionalDefaultJssStyle,
    },
    // .required
    ...getFunctionalComponentRequiredStyles(),
  };
};
