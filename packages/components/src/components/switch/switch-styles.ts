import {
  colorContrastLow,
  colorFocus,
  colorFrostedSoft,
  colorPrimary,
  colorSuccess,
  colorSuccessFrostedSoft,
  colorSuccessLow,
  fontPorscheNext,
  fontWeightNormal,
  leadingNormal,
  radiusFull,
  ref,
  typescaleSm,
} from '@porsche-design-system/stylesheets';
import {
  alphaDisabled,
  forcedColorsMediaQueryCss,
  getTransition,
  hostHiddenStylesCss,
  hoverMediaQueryCss,
  preventFoucOfNestedElementsStylesCss,
} from '../../styles';
import type { AlignLabel, BreakpointCustomizable } from '../../types';
import { buildResponsiveStylesCss, css, isDisabledOrLoading } from '../../utils';

const cssVarInternalSwitchScaling = '--_p-switch-a';

const getColors = (
  checked: boolean,
  loading: boolean
): {
  buttonBorderColor: string;
  buttonBorderColorHover: string;
  buttonBackgroundColor: string;
  toggleBackgroundColor: string;
  textColor: string;
} => {
  return {
    buttonBorderColor: checked ? ref(colorSuccessLow) : ref(colorContrastLow),
    buttonBorderColorHover: checked ? ref(colorSuccess) : ref(colorPrimary),
    buttonBackgroundColor: checked ? ref(colorSuccessFrostedSoft) : ref(colorFrostedSoft),
    toggleBackgroundColor: loading ? 'transparent' : checked ? ref(colorSuccess) : ref(colorPrimary),
    textColor: ref(colorPrimary),
  };
};

const getHiddenTextCss = (isHidden: boolean, shownDeclarations = ''): string =>
  isHidden
    ? 'position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap;'
    : `position: static; width: auto; height: auto; padding: 0; margin: 0; overflow: visible; clip: auto; white-space: normal;${shownDeclarations ? ` ${shownDeclarations}` : ''}`;

export const getComponentCss = (
  alignLabel: BreakpointCustomizable<AlignLabel>,
  hideLabel: BreakpointCustomizable<boolean>,
  isStretched: BreakpointCustomizable<boolean>,
  isChecked: boolean,
  isDisabled: boolean,
  isLoading: boolean,
  isCompact: boolean
): string => {
  const { buttonBorderColor, buttonBorderColorHover, buttonBackgroundColor, toggleBackgroundColor, textColor } =
    getColors(isChecked, isLoading);
  const disabledOrLoading = isDisabledOrLoading(isDisabled, isLoading);
  const gap = `calc(11.2px * (${ref(cssVarInternalSwitchScaling)} - 0.64285714) + 4px)`;
  const buttonBorderWidth = '1px';
  const buttonWidth = `calc(${ref(cssVarInternalSwitchScaling)} * 3rem)`;
  const buttonHeight = `calc(${ref(cssVarInternalSwitchScaling)} * 1.75rem)`;
  const buttonMarginBlock = `max(0px, calc((${ref(leadingNormal)} - ${buttonHeight}) / 2))`; // Vertically centers the switch label relative to the switch size (depending on which is smaller).
  const buttonTouchInset = `calc(-${buttonBorderWidth} - max(0px, calc(24px - ${buttonHeight}) / 2))`; // Positions the switch ::before pseudo-element with a negative offset to align it with the touch target.
  const labelPaddingTop = `max(0px, calc((${buttonHeight} - ${ref(leadingNormal)}) / 2))`; // Vertically centers the switch label relative to the switch size (depending on which is smaller).
  const toggleDimension = `calc(${ref(cssVarInternalSwitchScaling)} * 1.25rem)`;
  const toggleTranslateX = `calc(${ref(cssVarInternalSwitchScaling)} * .1875rem)`;
  const toggleTransform = isChecked
    ? `calc(${buttonWidth} - ${buttonBorderWidth} * 2 - 100% - ${toggleTranslateX})`
    : toggleTranslateX;

  // Responsive (BreakpointCustomizable) props: each returns base declarations (inlined in the selector below) plus
  // @media blocks (appended at the end of the sheet).
  // NOTE: hostDisplay's @media blocks are intentionally NOT emitted — the JSS version lost them to an object-spread
  // key collision with hostStretch, so responsive `display` never applied. Preserved for a behavior-neutral migration.
  const hostDisplay = buildResponsiveStylesCss(
    ':host',
    isStretched,
    (stretched: boolean) => `display: ${stretched ? 'flex' : 'inline-flex'};`
  );
  const hostStretch = buildResponsiveStylesCss(
    ':host',
    isStretched,
    (stretched: boolean) =>
      `justify-content: ${stretched ? 'space-between' : 'flex-start'} !important; width: ${stretched ? '100%' : 'auto'} !important; ${stretched ? '' : ' vertical-align: top !important;'}`
  );
  const labelOrder = buildResponsiveStylesCss(
    'label',
    alignLabel,
    (align: AlignLabel) => `order: ${align === 'start' ? -1 : 0};`
  );
  const labelHiddenText = buildResponsiveStylesCss('label', hideLabel, (isHidden: boolean) =>
    getHiddenTextCss(isHidden, `padding-top: ${labelPaddingTop};`)
  );

  return css`
    :host {
      ${cssVarInternalSwitchScaling}: ${isCompact ? 0.64285714 : 1};
      ${hostDisplay.base}
      ${isDisabled ? `opacity: ${alphaDisabled} !important;` : ''}
      outline: 0 !important; /* custom element is able to delegate the focus */
      font: ${ref(typescaleSm)} ${ref(fontPorscheNext)} !important; /* needed for correct gap definition based on ex-unit */
      gap: ${gap} !important;
      ${hostStretch.base}
    }

    ${hostHiddenStylesCss}

    ${preventFoucOfNestedElementsStylesCss}

    button {
      all: unset;
      position: relative; /* ensures relative positioning for ::before pseudo element */
      display: flex;
      align-items: center;
      flex-shrink: 0;
      box-sizing: border-box;
      width: ${buttonWidth};
      height: ${buttonHeight};
      margin-block: ${buttonMarginBlock};
      font: ${ref(typescaleSm)} ${ref(fontPorscheNext)}; /* needed for correct width and height definition based on ex-unit */
      border: ${buttonBorderWidth} solid ${buttonBorderColor};
      border-radius: ${ref(radiusFull)};
      background: ${buttonBackgroundColor};
      cursor: ${disabledOrLoading ? 'not-allowed' : 'pointer'};
      transition: ${getTransition('background-color')}, ${getTransition('border-color')};
    }

    button:focus-visible {
      outline: 2px solid ${ref(colorFocus)};
      outline-offset: 2px;
    }

    button::before {
      /* Ensures the touch target is at least 24px, even if the switch is smaller than the minimum touch target size.
         This pseudo-element expands the clickable area without affecting the visual size of the switch itself. */
      content: '';
      position: absolute;
      inset: ${buttonTouchInset};
    }

    label {
      font: ${ref(fontWeightNormal)} ${ref(typescaleSm)} / ${ref(leadingNormal)} ${ref(fontPorscheNext)};
      min-width: 0; /* prevents flex child to overflow max available parent size */
      min-height: 0; /* prevents flex child to overflow max available parent size */
      cursor: ${disabledOrLoading ? 'not-allowed' : 'pointer'};
      color: ${textColor};
      ${labelOrder.base}
      ${labelHiddenText.base}
    }

    .toggle {
      display: flex;
      place-items: center;
      place-content: center;
      width: ${toggleDimension};
      height: ${toggleDimension};
      border-radius: ${ref(radiusFull)};
      background: ${toggleBackgroundColor};
      transition: ${getTransition('transform')};
      transform: translate3d(${toggleTransform}, 0, 0);
    }

    .toggle:dir(rtl) {
      transform: translate3d(calc(${toggleTransform} * -1), 0, 0);
    }

    ${isLoading ? `.spinner {\n  --p-spinner-size: ${buttonHeight};\n}` : ''}
    .loading {
      ${getHiddenTextCss(true)}
    }

    ${
      disabledOrLoading
        ? ''
        : hoverMediaQueryCss(css`
            button:hover {
              border-color: ${buttonBorderColorHover};
            }
          `)
    }

    ${forcedColorsMediaQueryCss(css`
      button:focus-visible {
        outline-color: Highlight;
      }
    `)}

    ${forcedColorsMediaQueryCss(css`
      .toggle {
        background: CanvasText;
      }
    `)}

    ${
      disabledOrLoading
        ? forcedColorsMediaQueryCss(css`
            button {
              border-color: GrayText;
            }
          `)
        : ''
    }

    ${
      isDisabled
        ? forcedColorsMediaQueryCss(css`
            :host {
              opacity: 1 !important;
              color: GrayText !important;
            }
          `)
        : ''
    }

    ${
      disabledOrLoading
        ? forcedColorsMediaQueryCss(css`
            label {
              color: GrayText;
            }
          `)
        : ''
    }

    ${hostStretch.mediaQueries}

    ${labelOrder.mediaQueries}

    ${labelHiddenText.mediaQueries}
  `.trim();
};
