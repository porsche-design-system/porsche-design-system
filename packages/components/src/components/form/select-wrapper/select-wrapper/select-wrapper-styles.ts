import {
  addImportantToEachRule,
  addImportantToRule,
  buildGlobalStyles,
  buildHostStyles,
  buildResponsiveStyles,
  buildSlottedStyles,
  getBaseSlottedStyles,
  getCss,
  getFormTextHiddenJssStyle,
  getRequiredStyles,
  getStateMessageStyles,
  getThemedColors,
  getThemedFormStateColors,
  getTransition,
  isDark,
  pxToRemWithUnit,
} from '../../../../utils';
import type { BreakpointCustomizable, JssStyle } from '../../../../utils';
import type { FormState, Theme } from '../../../../types';
import { color, font } from '@porsche-design-system/utilities';

export const SELECT_HEIGHT = 48;
export const OPTION_HEIGHT = 32; // optgroups are higher and ignored

const getBoxShadow = (colorValue: string): string => `${colorValue} 0 0 0 1px inset`;
const getStateBoxShadow = (colorValue: string): string => `${colorValue} 0 0 0 2px inset`;

export const getComponentCss = (hideLabel: BreakpointCustomizable<boolean>, state: FormState, theme: Theme): string => {
  const isDarkTheme = isDark(theme);
  const { baseColor, backgroundColor, contrastMediumColor, contrastHighColor, disabledColor } = getThemedColors(theme);
  const { stateColor, stateHoverColor } = getThemedFormStateColors(theme, state);

  const [boxShadow, boxShadowHover] = stateColor
    ? [getStateBoxShadow(stateColor), getStateBoxShadow(stateHoverColor)]
    : [getBoxShadow(contrastMediumColor), getBoxShadow(contrastHighColor)];

  return getCss({
    ...buildHostStyles({
      display: 'block',
    }),
    ...buildGlobalStyles(
      addImportantToEachRule({
        '::slotted(select)': {
          position: 'static',
          display: 'block',
          width: '100%',
          height: pxToRemWithUnit(SELECT_HEIGHT),
          padding: `${pxToRemWithUnit(12)} ${pxToRemWithUnit(48)} ${pxToRemWithUnit(12)} ${pxToRemWithUnit(12)}`,
          '&@-moz-document url-prefix()': {
            // fix for 3px text-indention in FF
            paddingLeft: pxToRemWithUnit(8),
          },
          margin: 0,
          outline: '1px solid transparent',
          outlineOffset: '2px',
          appearance: 'none',
          WebkitAppearance: 'none', // iOS safari
          boxSizing: 'border-box',
          border: 'none',
          borderRadius: 0, // for safari
          background: backgroundColor,
          boxShadow,
          opacity: 1, // chrome applies 0.7 via :disabled
          fontFamily: font.family,
          fontWeight: font.weight.regular,
          ...font.size.small,
          color: 'inherit',
          textIndent: 0,
          cursor: 'pointer',
          transition:
            getTransition('box-shadow') + ',' + getTransition('background-color') + ',' + getTransition('color'),
        },
        '::slotted(select:hover:not(:disabled))': {
          boxShadow: boxShadowHover,
        },
        '::slotted(select:focus)': {
          outlineColor: stateColor || contrastMediumColor,
        },
        '::slotted(select:disabled)': {
          cursor: 'not-allowed',
          color: color.state.disabled, // 🤷
          background: isDarkTheme ? color.default : backgroundColor, // 🤷
          ...(state === 'none' && { boxShadow: `inset 0 0 0 1px ${disabledColor}` }),
        },
      })
    ),
    root: {
      display: 'block',
      position: 'relative',
      color: baseColor,
      '&--disabled': {
        '& $icon, & .label__text': {
          color: disabledColor,
        },
      },
    },
    label: {
      '&__text': {
        ...buildResponsiveStyles(hideLabel, (hide: boolean): JssStyle => getFormTextHiddenJssStyle(hide)),
        display: 'block',
        width: 'fit-content',
        transition: getTransition('color'),
        '&+&--description': {
          marginTop: pxToRemWithUnit(-4),
          paddingBottom: pxToRemWithUnit(8),
        },
        '&:hover': {
          '&~::slotted(select:not(:disabled))': {
            boxShadow: addImportantToRule(`inset 0 0 0 1px ${contrastHighColor}`),
          },
        },
        '&--description': {
          color: contrastMediumColor,
        },
      },
    },
    ...getRequiredStyles(theme),

    icon: {
      position: 'absolute',
      bottom: pxToRemWithUnit(12),
      right: pxToRemWithUnit(12),
      color: baseColor,
      pointerEvents: 'none', // let events through to select which is visually underneath
      transform: 'rotate3d(0,0,1,0.0001deg)', // needs to be a little bit more than 0 for correct direction in safari
      transition: getTransition('transform'),
      '&--open': {
        transform: 'rotate3d(0,0,1,180deg)',
      },
    },

    ...getStateMessageStyles(theme, state),
  });
};

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(buildSlottedStyles(host, getBaseSlottedStyles()));
};
