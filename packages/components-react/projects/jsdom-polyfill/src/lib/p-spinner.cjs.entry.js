'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const validateProps = require('./validateProps-3b506a0d.js');
const a11y = require('./a11y-4587e563.js');
const theme = require('./theme-25a5ded7.js');
require('./removeAttribute-5be430c3.js');
require('./setAttribute-577f81e1.js');

const SPINNER_SIZES = ['small', 'medium', 'large', 'inherit'];
const SPINNER_ARIA_ATTRIBUTES = ['aria-label'];

const sizeSmall = validateProps.pxToRemWithUnit(48);
const sizeMedium = validateProps.pxToRemWithUnit(72);
const sizeLarge = validateProps.pxToRemWithUnit(104);
const sizeMap = {
  small: { height: sizeSmall, width: sizeSmall },
  medium: { height: sizeMedium, width: sizeMedium },
  large: { height: sizeLarge, width: sizeLarge },
  inherit: { height: 'inherit', width: 'inherit' },
};
const getComponentCss = (size, theme) => {
  const animationDuration = 'var(--p-animation-duration__spinner, 2s)';
  const { primaryColor, contrastMediumColor } = validateProps.getThemedColors(theme);
  return validateProps.getCss({
    '@global': {
      ':host': {
        display: 'inline-flex',
        verticalAlign: 'top',
      },
      svg: {
        display: 'block',
        position: 'relative',
        fill: 'none',
        transform: 'translate3d(0,0,0)',
      },
      circle: {
        '&:first-child': {
          stroke: contrastMediumColor,
        },
        '&:last-child': {
          transformOrigin: '0 0',
          animation: `$rotate ${animationDuration} linear infinite,$dash ${animationDuration} ease-in-out infinite`,
          stroke: primaryColor,
          strokeDasharray: '40, 200',
          strokeDashoffset: 0,
          strokeLinecap: 'round',
        },
      },
      '@keyframes rotate': {
        '100%': {
          transform: 'rotate(360deg)',
        },
      },
      '@keyframes dash': {
        '0%': {
          strokeDasharray: '3, 1000',
        },
        '50%': {
          strokeDasharray: '42, 1000',
        },
        '100%': {
          strokeDasharray: '30, 1000',
          strokeDashoffset: '-52',
        },
      },
    },
    root: Object.assign(Object.assign({ display: 'block' }, validateProps.buildResponsiveStyles(size, (s) => sizeMap[s])), { margin: 0, padding: 0, boxSizing: 'border-box', strokeWidth: 1 }),
    'sr-only': validateProps.getScreenReaderOnlyJssStyle(),
  });
};

const propTypes = {
  size: validateProps.AllowedTypes.breakpoint(SPINNER_SIZES),
  theme: validateProps.AllowedTypes.oneOf(theme.THEMES),
  aria: validateProps.AllowedTypes.aria(SPINNER_ARIA_ATTRIBUTES),
};
const Spinner = class {
  constructor(hostRef) {
    validateProps.registerInstance(this, hostRef);
    this.size = 'small';
    this.theme = 'light';
    this.aria = undefined;
  }
  render() {
    validateProps.validateProps(this, propTypes);
    validateProps.attachComponentCss(this.host, getComponentCss, this.size, this.theme);
    return (validateProps.h("span", Object.assign({ class: "root", role: "alert", "aria-live": "assertive" }, a11y.parseAndGetAriaAttributes(this.aria)), validateProps.h("span", { class: "sr-only" }, "\u00A0"), validateProps.h("svg", { viewBox: "-16 -16 32 32", width: "100%", height: "100%", focusable: "false", "aria-hidden": "true" }, validateProps.h("circle", { r: "9" }), validateProps.h("circle", { r: "9" }))));
  }
  get host() { return validateProps.getElement(this); }
};

exports.p_spinner = Spinner;
