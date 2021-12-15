import {
  addImportantToEachRule,
  BreakpointCustomizable,
  buildGlobalStyles,
  buildHostStyles,
  buildResponsiveStyles,
  buildSlottedStyles,
  colorDarken,
  getBaseSlottedStyles,
  getCss,
  getFormTextHiddenJssStyle,
  getRequiredStyles,
  getStateMessageStyles,
  getThemedColors,
  getTransition,
  mergeDeep,
  pxToRemWithUnit,
} from '../../../utils';
import type { Styles } from '../../../utils';
import type { FormState, Theme } from '../../../types';
import { getBaseChildStyles, isVisibleState } from '../form-styles';

export const getComponentCss = (hideLabel: BreakpointCustomizable<boolean>, state: FormState): string => {
  const theme: Theme = 'light';
  const { baseColor, contrastMediumColor, disabledColor } = getThemedColors(theme);
  const hasVisibleState = isVisibleState(state);

  return getCss({
    ...buildHostStyles({
      display: 'block',
    }),
    ...buildGlobalStyles(
      mergeDeep(
        addImportantToEachRule(
          mergeDeep(getBaseChildStyles('textarea', state), {
            '::slotted(textarea)': {
              padding: pxToRemWithUnit(hasVisibleState ? 10 : 11),
              resize: 'vertical',
            },
          })
        ),
        {
          '::slotted(textarea)': {
            minHeight: pxToRemWithUnit(192), // min-height should be overridable
          },
        } as Styles
      )
    ),
    label: {
      display: 'block',
      position: 'relative',
      '&--disabled': {
        '& .label__text': {
          color: disabledColor,
        },
      },
      '&__text': {
        ...buildResponsiveStyles(hideLabel, getFormTextHiddenJssStyle),
        display: 'block',
        width: 'fit-content',
        transition: getTransition('color'),
        '&+&--description': {
          marginTop: pxToRemWithUnit(-4),
          paddingBottom: pxToRemWithUnit(8),
        },
        '&--description': {
          color: contrastMediumColor,
        },
        '&:hover': addImportantToEachRule({
          '&~::slotted(textarea:not(:disabled):not([readonly]))': {
            borderColor: baseColor,
          },
          ...((state === 'success' || state === 'error') && {
            '&~::slotted(textarea:not(:disabled):not([readonly])), ::slotted(textarea:hover:not(:disabled):not([readonly]))':
              {
                borderColor: colorDarken.notification[state],
              },
          }),
        }),
      },
    },
    ...getRequiredStyles(theme),
    ...getStateMessageStyles(theme, state),
  });
};

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(buildSlottedStyles(host, getBaseSlottedStyles()));
};
