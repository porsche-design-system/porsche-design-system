import {
  addImportantToEachRule,
  addImportantToRule,
  attachCss,
  buildGlobalStyles,
  buildHostStyles,
  buildResponsiveStyles,
  buildSlottedStyles,
  getBaseSlottedStyles,
  getCss,
  getFormTextHiddenJssStyle,
  getThemedColors,
  getThemedStateColors,
  insertSlottedStyles,
  isDark,
  mergeDeep,
  pxToRemWithUnit,
  transitionDuration,
  transitionTimingFunction,
} from '../../../../utils';
import type { BreakpointCustomizable, GetStylesFunction, JssStyle } from '../../../../utils';
import type { FormState, Theme } from '../../../../types';
import { color, font } from '@porsche-design-system/utilities';

export const SELECT_HEIGHT = 48;
export const OPTION_HEIGHT = 24; // optgroups are higher and ignored

export const getLabelTextStyles: GetStylesFunction = (hideLabel: boolean): JssStyle => ({
  // eslint-disable-next-line camelcase
  label__text: getFormTextHiddenJssStyle(hideLabel),
});

const getBoxShadow = (colorValue: string): string => `${colorValue} 0 0 0 1px inset`;
const getStateBoxShadow = (colorValue: string): string => `${colorValue} 0 0 0 2px inset`;

export const getComponentCss = (hideLabel: BreakpointCustomizable<boolean>, state: FormState, theme: Theme): string => {
  const isDarkTheme = isDark(theme);
  const { textColor, backgroundColor, contrastMediumColor, contrastHighColor, disabledColor, errorColor } =
    getThemedColors(theme);
  const { stateColor, stateHoverColor } = getThemedStateColors(theme, state);

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
            `box-shadow ${transitionDuration} ${transitionTimingFunction},` +
            `background-color ${transitionDuration} ${transitionTimingFunction},` +
            `color ${transitionDuration} ${transitionTimingFunction}`,
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
      color: textColor,
      '&:hover $dropdown': {
        borderColor: contrastHighColor,
      },
    },
    'root--disabled': {
      '& $icon, & $label__text': {
        color: disabledColor,
      },
    },
    'label:hover': {
      '&+$filter': {
        color: contrastHighColor,
      },
    },
    dropdown: {
      marginTop: pxToRemWithUnit(-1),
    },
    ...mergeDeep(buildResponsiveStyles(hideLabel, getLabelTextStyles), {
      // eslint-disable-next-line camelcase
      label__text: {
        display: 'block',
        width: 'fit-content',
        transition: `color ${transitionDuration} ${transitionTimingFunction}`,
        '&+$label__text--description': {
          marginTop: pxToRemWithUnit(-4),
          paddingBottom: pxToRemWithUnit(8),
        },
        '&:hover': {
          '&~::slotted(select:not(:disabled))': {
            boxShadow: addImportantToRule(`inset 0 0 0 1px ${contrastHighColor}`),
          },
        },
      },
    }),
    'label__text--description': {
      color: contrastMediumColor,
    },
    // @mixin required() {
    required: {
      '&::after': {
        content: '" *"',
        color: errorColor,
      },
    },
    icon: {
      position: 'absolute',
      bottom: pxToRemWithUnit(12),
      right: pxToRemWithUnit(12),
      color: textColor,
      pointerEvents: 'none', // let events through to select which is visually underneath
      transform: 'rotate3d(0,0,1,0.0001deg)', // needs to be a little bit more than 0 for correct direction in safari
      transition: `transform ${transitionDuration} ${transitionTimingFunction}`,
    },
    'icon--open': {
      transform: 'rotate3d(0,0,1,180deg)',
    },
    // @mixin state-message() {
    message: {
      display: 'flex',
      marginTop: pxToRemWithUnit(4),
      color: stateColor,
      transition: `color ${transitionDuration} ${transitionTimingFunction}`,
    },
    // eslint-disable-next-line camelcase
    message__icon: {
      marginRight: pxToRemWithUnit(4),
    },
    // only for reference
    filter: {},
  });
};

export const addComponentCss = (
  host: HTMLElement,
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  theme: Theme
): void => {
  attachCss(host, getComponentCss(hideLabel, state, theme));
};

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(buildSlottedStyles(host, getBaseSlottedStyles()));
};

export const addSlottedCss = (host: HTMLElement): void => {
  insertSlottedStyles(host, getSlottedCss(host));
};
