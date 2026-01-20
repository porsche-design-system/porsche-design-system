import { fontSizeTextXSmall, spacingStaticXSmall, textSmallStyle } from '@porsche-design-system/emotion';
import type { JssStyle, Styles } from 'jss';
import { colors, getHiddenTextJssStyle, getTransition } from '../../../styles';
import { buildResponsiveStyles } from '../../../utils';
import type { BreakpointCustomizable } from '../../../utils/breakpoint-customizable';
import { getFunctionalComponentRequiredStyles } from '../required/required-styles';

const { primaryColor, contrastHighColor } = colors;

export const getFunctionalComponentLabelAfterStyles = (): Styles => {
  return {
    'slot[name="label-after"]': {
      display: 'inline-block',
      verticalAlign: 'top',
    },
  };
};

export const getFunctionalComponentLabelStyles = (
  isDisabledOrLoading: boolean,
  hideLabel: BreakpointCustomizable<boolean>,
  additionalDefaultJssStyle?: JssStyle,
  additionalIsShownJssStyle?: JssStyle
): Styles => {
  return {
    label: {
      ...textSmallStyle,
      cursor: isDisabledOrLoading ? 'not-allowed' : 'pointer',
      ...(isDisabledOrLoading && {
        pointerEvents: 'none', // prevents label interaction when disabled or loading
      }),
      justifySelf: 'flex-start', // ensures label is not getting stretched by flex or grid context of its parent
      color: primaryColor,
      transition: getTransition('color'), // for smooth transitions between e.g. disabled state
      ...buildResponsiveStyles(hideLabel, (isHidden: boolean) =>
        getHiddenTextJssStyle(isHidden, additionalIsShownJssStyle)
      ),
      '&:empty': {
        display: 'none', // prevents outer spacing caused by parents grid gap, in case no label value is defined (although it has to be set to be a11y compliant)
      },
      '&+&': {
        cursor: 'unset',
        marginTop: `-${spacingStaticXSmall}`,
        fontSize: fontSizeTextXSmall,
        color: contrastHighColor,
      },
      ...additionalDefaultJssStyle,
    },
    // .required
    ...getFunctionalComponentRequiredStyles(),
  };
};
