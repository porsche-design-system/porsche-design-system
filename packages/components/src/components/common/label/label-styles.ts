import { spacingStaticXs, proseTextSmStyle } from '@porsche-design-system/emotion';
import type { JssStyle, Styles } from 'jss';
import { getDisabledBaseStyles, getHiddenTextJssStyle, getTransition } from '../../../styles';
import { colorContrastHigh, colorPrimary } from '../../../styles/css-variables';
import { buildResponsiveStyles } from '../../../utils';
import type { BreakpointCustomizable } from '../../../utils/breakpoint-customizable';
import { getFunctionalComponentRequiredStyles } from '../required/required-styles';
import { typescaleXs } from '@porsche-design-system/tokens';

export const getFunctionalComponentLabelAfterStyles = (): Styles => {
  return {
    'slot[name="label-after"]': {
      display: 'inline-block',
      verticalAlign: 'top',
      marginInlineStart: spacingStaticXs, // TODO: this produces always a margin because the slot is always rendered, even if no content is provided. It should be adapted if `:has-slotted` gets supported by all browsers: https://caniuse.com/?search=%3Ahas-slotted
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
      ...proseTextSmStyle,
      cursor: isDisabledOrLoading ? 'not-allowed' : 'pointer',
      color: colorPrimary,
      ...(isDisabledOrLoading && {
        pointerEvents: 'none', // prevents label interaction when disabled or loading
        ...getDisabledBaseStyles(),
      }),
      transition: getTransition('color'), // for smooth transitions between e.g. disabled state
      display: 'inline',
      '&:empty': {
        display: 'none', // prevents outer spacing caused by parents grid gap, in case no label value is defined (although it has to be set to be a11y compliant)
      },
      // styling for the description
      '&:is(span)': {
        cursor: 'unset',
        fontSize: typescaleXs,
        color: colorContrastHigh,
        ...buildResponsiveStyles(hideLabel, (isHidden: boolean) =>
          getHiddenTextJssStyle(isHidden, { marginTop: `-${spacingStaticXs}` })
        ),
        marginTop: `-${spacingStaticXs}`,
      },
      ...additionalDefaultJssStyle,
    },
    // .required
    ...getFunctionalComponentRequiredStyles(),
  };
};
