'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const validateProps = require('./validateProps-3b506a0d.js');
const theme = require('./theme-25a5ded7.js');
const gridWidthMax = require('./gridWidthMax-2e26b255.js');
const gridSafeZone = require('./gridSafeZone-17afec2f.js');

const widthMap = {
  basic: {
    maxWidth: gridWidthMax.gridWidthMax,
    boxSizing: 'border-box',
    padding: `0 ${gridSafeZone.gridSafeZone}`,
  },
  extended: {
    maxWidth: gridWidthMax.gridWidthMax,
  },
};
const getComponentCss = (width, backgroundColor, theme) => {
  return validateProps.getCss({
    '@global': {
      ':host': {
        display: 'flex',
      },
    },
    root: Object.assign(Object.assign({ margin: '0 auto', width: '100%', minWidth: 0 }, widthMap[width]), { backgroundColor: backgroundColor === 'default' ? validateProps.getThemedColors(theme).backgroundColor : 'transparent' }),
  });
};

const CONTENT_WRAPPER_BACKGROUND_COLORS = ['transparent', 'default'];
const CONTENT_WRAPPER_WIDTHS = ['basic', 'extended', 'fluid'];

const propTypes = {
  width: validateProps.AllowedTypes.oneOf(CONTENT_WRAPPER_WIDTHS),
  backgroundColor: validateProps.AllowedTypes.oneOf(CONTENT_WRAPPER_BACKGROUND_COLORS),
  theme: validateProps.AllowedTypes.oneOf(theme.THEMES),
};
const ContentWrapper = class {
  constructor(hostRef) {
    validateProps.registerInstance(this, hostRef);
    this.width = 'basic';
    this.backgroundColor = 'transparent';
    this.theme = 'light';
  }
  render() {
    validateProps.validateProps(this, propTypes);
    validateProps.attachComponentCss(this.host, getComponentCss, this.width, this.backgroundColor, this.theme);
    return (validateProps.h("div", { class: "root" }, validateProps.h("slot", null)));
  }
  get host() { return validateProps.getElement(this); }
};

exports.p_content_wrapper = ContentWrapper;
