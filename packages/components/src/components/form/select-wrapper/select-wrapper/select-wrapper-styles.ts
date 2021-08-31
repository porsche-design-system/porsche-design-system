import {
  addImportantToEachRule,
  addImportantToRule,
  attachCss,
  BreakpointCustomizable,
  buildGlobalStyles,
  buildHostStyles,
  buildResponsiveStyles,
  buildSlottedStyles,
  colorDarken,
  getBaseSlottedStyles,
  getCss,
  GetStylesFunction,
  getFormTextHiddenJssStyle,
  insertSlottedStyles,
  isDark,
  JssStyle,
  mergeDeep,
  pxToRemWithUnit,
  transitionDuration,
  transitionTimingFunction,
} from '../../../../utils';
import { FormState, Theme } from '../../../../types';
import { color, font } from '@porsche-design-system/utilities';

export const getLabelTextStyles: GetStylesFunction = (hideLabel: boolean): JssStyle => ({
  // eslint-disable-next-line camelcase
  label__text: getFormTextHiddenJssStyle(hideLabel),
});

const getBoxShadow = (colorValue: string): string => `${colorValue} 0 0 0 1px inset`;
const getStateBoxShadow = (colorValue: string): string => `${colorValue} 0 0 0 2px inset`;

export const getComponentCss = (state: FormState, hideLabel: BreakpointCustomizable<boolean>, theme: Theme): string => {
  const isDarkTheme = isDark(theme);
  const {
    default: textColor,
    background: { default: backgroundColor },
    neutralContrast: { medium: contrastMediumColor, high: contrastHighColor },
    state: { disabled: disabledColor },
    notification,
  } = isDarkTheme ? color.darkTheme : color;

  const stateColor = notification[state];
  const stateHoverColor = (isDarkTheme ? colorDarken.darkTheme : colorDarken).notification[state];

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
          height: pxToRemWithUnit(48),
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
          color: disabledColor,
          cursor: 'not-allowed',
          background: backgroundColor,
          boxShadow: `inset 0 0 0 1px ${disabledColor}`,
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
    label: {
      // display: 'block',
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
        '&+ $label__text--description': {
          marginTop: pxToRemWithUnit(-4),
          paddingBottom: pxToRemWithUnit(8),
        },
        '&:hover': {
          '& $filter': {
            color: contrastHighColor,
          },
          '& ~ ::slotted(select:not(:disabled))': {
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
        color: notification.error,
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
  attachCss(host, getComponentCss(state, hideLabel, theme));
};

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(buildSlottedStyles(host, getBaseSlottedStyles()));
};

export const addSlottedCss = (host: HTMLElement): void => {
  insertSlottedStyles(host, getSlottedCss(host));
};
