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
  getInset,
  getRequiredStyles,
  getStateMessageStyles,
  getThemedColors,
  getThemedFormStateColors,
  getTransition,
  mergeDeep,
  pxToRemWithUnit,
} from '../../../utils';
import type { Styles } from '../../../utils';
import type { FormState, Theme } from '../../../types';
import { color, font } from '@porsche-design-system/utilities';

export const getComponentCss = (hideLabel: BreakpointCustomizable<boolean>, state: FormState): string => {
  const theme: Theme = 'light';
  const { baseColor, backgroundColor, contrastMediumColor, disabledColor } = getThemedColors(theme);
  const { stateColor, stateHoverColor } = getThemedFormStateColors(theme, state);
  const hasVisibleState = ['success', 'error'].includes(state);

  return getCss({
    ...buildHostStyles({
      display: 'block',
    }),
    ...buildGlobalStyles(
      mergeDeep(
        addImportantToEachRule({
          '::slotted(textarea)': {
            display: 'block',
            position: 'relative',
            ...getInset(),
            width: '100%',
            margin: 0,
            outline: '1px solid transparent',
            outlineOffset: '2px',
            appearance: 'none',
            boxSizing: 'border-box',
            border: hasVisibleState ? `2px solid ${stateColor}` : `1px solid ${contrastMediumColor}`,
            borderRadius: 0,
            backgroundColor,
            opacity: 1,
            fontFamily: font.family,
            fontWeight: font.weight.regular,
            ...font.size.small,
            textIndent: 0,
            color: baseColor,
            transition:
              getTransition('color') + ',' + getTransition('border-color') + ',' + getTransition('background-color'),
            padding: pxToRemWithUnit(hasVisibleState ? 10 : 11),
            resize: 'vertical',
          },
          ...(state === 'success' || state === 'error'
            ? {
                '::slotted(textarea:focus)': {
                  outlineColor: stateColor,
                },

                '::slotted(textarea[readonly]:focus)': {
                  outlineColor: 'transparent',
                },
              }
            : {
                '::slotted(textarea:focus)': {
                  outlineColor: contrastMediumColor,
                },
              }),
          '::slotted(textarea:hover)': {
            borderColor: hasVisibleState ? stateHoverColor : baseColor,
          },
          '::slotted(textarea:disabled)': {
            cursor: 'not-allowed',
            color: color.state.disabled, // 🤷 ,
            borderColor: color.state.disabled,
            WebkitTextFillColor: color.state.disabled, // fix placeholder color bug in Safari
          },
          '::slotted(textarea[readonly])': {
            borderColor: '#ebebeb', // 🤷
            backgroundColor: '#ebebeb', // 🤷
          },
          '::slotted(textarea[readonly]:not(:disabled))': {
            color: contrastMediumColor,
          },
        }),
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
