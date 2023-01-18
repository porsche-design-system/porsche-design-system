'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const validateProps = require('./validateProps-3b506a0d.js');
const theme = require('./theme-25a5ded7.js');

const DIVIDER_COLORS = ['neutral-contrast-high', 'neutral-contrast-medium', 'neutral-contrast-low'];
const DIVIDER_ORIENTATIONS = ['vertical', 'horizontal'];

const getComponentCss = (color, orientation, theme) => {
  const { contrastLowColor, contrastMediumColor, contrastHighColor } = validateProps.getThemedColors(theme);
  const colorMap = {
    'neutral-contrast-low': contrastLowColor,
    'neutral-contrast-medium': contrastMediumColor,
    'neutral-contrast-high': contrastHighColor,
  };
  return validateProps.getCss({
    '@global': {
      ':host': {
        display: 'block',
      },
      hr: Object.assign({ margin: 0, padding: 0, border: 'none', textAlign: 'left', background: colorMap[color] }, validateProps.buildResponsiveStyles(orientation, (o) => o === 'horizontal' ? { height: '1px', width: '100%' } : { height: '100%', width: '1px' })),
    },
  });
};

const propTypes = {
  color: validateProps.AllowedTypes.oneOf(DIVIDER_COLORS),
  orientation: validateProps.AllowedTypes.breakpoint(DIVIDER_ORIENTATIONS),
  theme: validateProps.AllowedTypes.oneOf(theme.THEMES),
};
const Divider = class {
  constructor(hostRef) {
    validateProps.registerInstance(this, hostRef);
    this.color = 'neutral-contrast-low';
    this.orientation = 'horizontal';
    this.theme = 'light';
  }
  render() {
    validateProps.validateProps(this, propTypes);
    validateProps.attachComponentCss(this.host, getComponentCss, this.color, this.orientation, this.theme);
    return validateProps.h("hr", null);
  }
  get host() { return validateProps.getElement(this); }
};

exports.p_divider = Divider;
