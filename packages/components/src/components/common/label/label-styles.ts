import {
  colorContrastHigh,
  colorPrimary,
  fontPorscheNext,
  fontWeightNormal,
  leadingNormal,
  ref,
  spacingStaticXs,
  typescaleSm,
  typescaleXs,
} from '@porsche-design-system/stylesheets';
import type { JssStyle, Styles } from '../../../utils/emotionCss';
import { addImportantToEachRule, getDisabledBaseStyles, getHiddenTextJssStyle, getTransition } from '../../../styles';
import { buildResponsiveStyles } from '../../../utils';
import type { BreakpointCustomizable } from '../../../utils/breakpoint-customizable';
import { getFunctionalComponentRequiredStyles } from '../required/required-styles';

export const getFunctionalComponentLabelAfterStyles = (): Styles => {
  const labelAfterStyles: JssStyle = {
    display: 'inline-block',
    verticalAlign: 'top',
    '&::slotted(*)': {
      ...addImportantToEachRule({
        marginInlineStart: ref(spacingStaticXs),
      }),
    },
  };

  return {
    'slot[name="label-after"]': labelAfterStyles,
    '.label-after': {
      display: labelAfterStyles.display,
      verticalAlign: labelAfterStyles.verticalAlign,
    },
  };
};

export const getFunctionalComponentLabelStyles = (
  isDisabled: boolean,
  isLoading: boolean,
  hideLabel: BreakpointCustomizable<boolean>,
  additionalDefaultJssStyle?: JssStyle,
  additionalLabelWrapperJssStyle?: JssStyle,
  additionalIsShownJssStyle?: JssStyle
): Styles => {
  const isDisabledOrLoading = isDisabled || isLoading;
  return {
    'label-wrapper': {
      ...buildResponsiveStyles(hideLabel, (isHidden: boolean) => ({
        ...(!isHidden && { minWidth: 'fit-content' }), // ensures label contents don't shrink to zero in grid containers
        ...getHiddenTextJssStyle(isHidden, additionalIsShownJssStyle),
      })),
      ...additionalLabelWrapperJssStyle,
    },
    label: {
      font: `${ref(fontWeightNormal)} ${ref(typescaleSm)} / ${ref(leadingNormal)} ${ref(fontPorscheNext)}`,
      cursor: isDisabledOrLoading ? 'not-allowed' : 'pointer',
      color: ref(colorPrimary),
      ...(isDisabledOrLoading && {
        pointerEvents: 'none', // prevents label interaction when disabled or loading
      }),
      ...(isDisabled && {
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
        fontSize: ref(typescaleXs),
        color: ref(colorContrastHigh),
        ...buildResponsiveStyles(hideLabel, (isHidden: boolean) =>
          getHiddenTextJssStyle(isHidden, { marginTop: `calc(-1 * ${ref(spacingStaticXs)})` })
        ),
        marginTop: `calc(-1 * ${ref(spacingStaticXs)})`,
      },
      '& > slot[name="label"]::slotted(*)': {
        ...addImportantToEachRule({
          display: 'inline',
        }),
      },
      ...additionalDefaultJssStyle,
    },
    // .required
    ...getFunctionalComponentRequiredStyles(),
  };
};
