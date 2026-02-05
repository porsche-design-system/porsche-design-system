import { fontSizeTextXSmall, spacingStaticXSmall, textSmallStyle } from '@porsche-design-system/emotion';
import type { JssStyle, Styles } from 'jss';
import { getHiddenTextJssStyle, getTransition } from '../../../styles';
import { colorContrastHigh, colorPrimary } from '../../../styles/css-variables';
import { buildResponsiveStyles } from '../../../utils';
import type { BreakpointCustomizable } from '../../../utils/breakpoint-customizable';
import { getFunctionalComponentRequiredStyles } from '../required/required-styles';

export const getFunctionalComponentLabelAfterStyles = (
  isDisabledOrLoading: boolean,
  additionalIsDisabledJssStyle?: JssStyle
): Styles => {
  return {
    'slot[name="label-after"]': {
      display: 'inline-block',
      verticalAlign: 'top',
      ...(isDisabledOrLoading && {
        pointerEvents: 'none',
        ...additionalIsDisabledJssStyle,
      }),
    },
  };
};

export const getFunctionalComponentLabelStyles = (
  isDisabledOrLoading: boolean,
  hideLabel: BreakpointCustomizable<boolean>,
  additionalDefaultJssStyle?: JssStyle,
  additionalLabelWrapperJssStyle?: JssStyle,
  additionalIsShownJssStyle?: JssStyle
): Styles => {
  return {
    'label-wrapper': {
      ...buildResponsiveStyles(hideLabel, (isHidden: boolean) => ({
        ...(!isHidden && { minWidth: 'fit-content' }), // ensures label contents don't shrink to zero in grid containers
        ...getHiddenTextJssStyle(isHidden, additionalIsShownJssStyle),
      })),
      ...additionalLabelWrapperJssStyle,
    },
    label: {
      ...textSmallStyle,
      cursor: isDisabledOrLoading ? 'not-allowed' : 'pointer',
      ...(isDisabledOrLoading && {
        pointerEvents: 'none', // prevents label interaction when disabled or loading
      }),
      color: colorPrimary,
      transition: getTransition('color'), // for smooth transitions between e.g. disabled state
      display: 'inline',
      '&:empty': {
        display: 'none', // prevents outer spacing caused by parents grid gap, in case no label value is defined (although it has to be set to be a11y compliant)
      },
      // styling for the description
      '&:is(span)': {
        cursor: 'unset',
        fontSize: fontSizeTextXSmall,
        color: colorContrastHigh,
        ...buildResponsiveStyles(hideLabel, (isHidden: boolean) =>
          getHiddenTextJssStyle(isHidden, { marginTop: `-${spacingStaticXSmall}` })
        ),
        marginTop: `-${spacingStaticXSmall}`,
      },
      ...additionalDefaultJssStyle,
    },
    // .required
    ...getFunctionalComponentRequiredStyles(),
  };
};
