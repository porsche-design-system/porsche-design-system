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
        opacity: '0.4', // workaround: must be opacity because color tokens would not affect e.g. slotted `popover`
        ...additionalIsDisabledJssStyle,
      }),
    },
  };
};

export const getFunctionalComponentLabelStyles = (
  isDisabledOrLoading: boolean,
  hideLabel: BreakpointCustomizable<boolean>,
  theme: Theme,
  additionalDefaultJssStyle?: JssStyle,
  additionalLabelWrapperJssStyle?: JssStyle,
  additionalIsShownJssStyle?: JssStyle
): Styles => {
  const { primaryColor, disabledColor, contrastHighColor } = getThemedColors(theme);
  const {
    primaryColor: primaryColorDark,
    disabledColor: disabledColorDark,
    contrastHighColor: contrastHighColorDark,
  } = getThemedColors('dark');

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
      color: isDisabledOrLoading ? disabledColor : primaryColor,
      transition: getTransition('color'), // for smooth transitions between e.g. disabled state
      ...prefersColorSchemeDarkMediaQuery(theme, {
        color: isDisabledOrLoading ? disabledColorDark : primaryColorDark,
      }),
      display: 'inline',
      '&:empty': {
        display: 'none', // prevents outer spacing caused by parents grid gap, in case no label value is defined (although it has to be set to be a11y compliant)
      },
      '&:is(span)': {
        cursor: 'unset',
        fontSize: fontSizeTextXSmall,
        ...(!isDisabledOrLoading && {
          color: contrastHighColor,
          ...prefersColorSchemeDarkMediaQuery(theme, {
            color: contrastHighColorDark,
          }),
        }),
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
