import type { BreakpointCustomizable, Theme } from '../types';
import type { Styles } from 'jss';
import { buildResponsiveStyles, isDisabledOrLoading, isHighContrastMode } from '../utils';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  getHiddenTextJssStyle,
  getHighContrastColors,
  getInsetJssStyle,
  getThemedColors,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  prefersColorSchemeDarkMediaQuery,
} from '.';
import {
  borderWidthBase,
  fontFamily,
  fontLineHeight,
  spacingStaticSmall,
  textSmallStyle,
} from '@porsche-design-system/utilities-v2';
import type { FormState } from '../utils/form/form-state';
import { getThemedFormStateColors } from './form-state-color-styles';
import { getFunctionalComponentRequiredStyles } from '../components/common/required/required-styles';
import { getFunctionalComponentStateMessageStyles } from '../components/common/state-message/state-message-styles';

export const getCheckboxRadioJssStyle = (
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  isDisabled: boolean,
  isLoading: boolean,
  theme: Theme
): Styles => {
  const { primaryColor, contrastMediumColor, contrastHighColor, disabledColor, focusColor } = getThemedColors(theme);
  const {
    primaryColor: primaryColorDark,
    contrastMediumColor: contrastMediumColorDark,
    contrastHighColor: contrastHighColorDark,
    disabledColor: disabledColorDark,
    focusColor: focusColorDark,
  } = getThemedColors('dark');
  const { formStateColor, formStateHoverColor } = getThemedFormStateColors(theme, state);
  const { formStateColor: formStateColorDark, formStateHoverColor: formStateHoverColorDark } = getThemedFormStateColors(
    'dark',
    state
  );
  const { canvasTextColor } = getHighContrastColors();
  const disabledOrLoading = isDisabledOrLoading(isDisabled, isLoading);

  // TODO: needs to be extracted into a color function
  const uncheckedColor = disabledOrLoading ? disabledColor : formStateColor || contrastMediumColor;
  const uncheckedColorDark = disabledOrLoading ? disabledColorDark : formStateColorDark || contrastMediumColorDark;
  const uncheckedHoverColor = formStateHoverColor || primaryColor;
  const uncheckedHoverColorDark = formStateHoverColorDark || primaryColorDark;
  const checkedColor = isHighContrastMode
    ? canvasTextColor
    : disabledOrLoading
    ? disabledColor
    : formStateColor || primaryColor;
  const checkedColorDark = isHighContrastMode
    ? canvasTextColor
    : disabledOrLoading
    ? disabledColorDark
    : formStateColorDark || primaryColorDark;
  const checkedHoverColor = formStateHoverColor || contrastHighColor;
  const checkedHoverColorDark = formStateHoverColorDark || contrastHighColorDark;

  return {
    '@global': {
      ':host': addImportantToEachRule({
        ...colorSchemeStyles,
        ...hostHiddenStyles,
        display: 'block',
      }),
      '::slotted': addImportantToEachRule({
        '&(input)': {
          gridArea: '1 / 1',
          position: 'relative',
          width: fontLineHeight,
          height: fontLineHeight,
          fontFamily, // needed for correct width and height definition
          fontSize: '1rem', // needed for correct width and height definition
          flexShrink: 0,
          display: 'block',
          margin: 0,
          padding: 0,
          WebkitAppearance: 'none', // iOS safari
          appearance: 'none',
          boxSizing: 'content-box',
          background: `transparent 0% 0% / ${fontLineHeight}`,
          transition: `${getTransition('background-color', 'short', 'base')}, ${getTransition(
            'border-color',
            'short',
            'base'
          )}`,
          border: `2px solid ${uncheckedColor}`,
          ...prefersColorSchemeDarkMediaQuery(theme, {
            borderColor: uncheckedColorDark,
          }),
          outline: 0,
          ...(disabledOrLoading
            ? {
                cursor: 'not-allowed',
                pointerEvents: 'none',
              }
            : {
                cursor: 'pointer',
              }),
        },
        '&(input:checked)': {
          // background-image is merged in later
          borderColor: checkedColor,
          backgroundColor: checkedColor,
          ...prefersColorSchemeDarkMediaQuery(theme, {
            borderColor: checkedColorDark,
            backgroundColor: checkedColorDark,
          }),
        },
        ...(!disabledOrLoading && {
          ...(!isHighContrastMode &&
            hoverMediaQuery({
              '&(input:hover), .text:hover ~ &(input)': {
                transition: 'unset', // Fixes chrome bug where border-color is stuck on hover color
                borderColor: uncheckedHoverColor,
                ...prefersColorSchemeDarkMediaQuery(theme, {
                  borderColor: uncheckedHoverColorDark,
                }),
              },
              '&(input:checked:hover), .text:hover ~ &(input:checked)': {
                transition: 'unset', // Fixes chrome bug where border-color is stuck on hover color
                borderColor: checkedHoverColor,
                backgroundColor: checkedHoverColor,
                ...prefersColorSchemeDarkMediaQuery(theme, {
                  borderColor: checkedHoverColorDark,
                  backgroundColor: checkedHoverColorDark,
                }),
              },
            })),
          ...(!isDisabled && {
            '&(input:focus)::before': {
              content: '""',
              position: 'absolute',
              ...getInsetJssStyle(-6),
              border: `${borderWidthBase} solid ${focusColor}`,
              ...prefersColorSchemeDarkMediaQuery(theme, {
                borderColor: focusColorDark,
              }),
            },
            '&(input:focus:not(:focus-visible))::before': {
              borderColor: 'transparent',
            },
          }),
        }),
      }),
      label: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, auto)',
        justifyContent: 'flex-start',
      },
    },
    text: {
      gridArea: '1 / 2',
      cursor: disabledOrLoading ? 'default' : 'pointer',
      ...textSmallStyle,
      color: disabledOrLoading ? disabledColor : primaryColor,
      ...prefersColorSchemeDarkMediaQuery(theme, {
        color: disabledOrLoading ? disabledColorDark : primaryColorDark,
      }),
      transition: getTransition('color', 'short', 'base'), // for smooth transition between different states
      ...buildResponsiveStyles(hideLabel, (isHidden: boolean) =>
        getHiddenTextJssStyle(isHidden, {
          paddingTop: '2px',
          paddingInlineStart: spacingStaticSmall, // asymmetric padding used instead of gap to prevent unclickable area between label and input
        })
      ),
    },
    ...getFunctionalComponentRequiredStyles(),
    ...getFunctionalComponentStateMessageStyles(theme, state),
    ...(isLoading && {
      spinner: {
        position: 'relative',
        gridArea: '1 / 1',
        margin: borderWidthBase,
        justifySelf: 'center',
        height: fontLineHeight,
        width: fontLineHeight,
        fontFamily, // needed for correct width and height definition and for correct positioning
        fontSize: '1rem', // needed for correct width and height definition and for correct positioning
        cursor: 'not-allowed',
      },
    }),
  };
};
