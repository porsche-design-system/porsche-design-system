'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const validateProps = require('./validateProps-3b506a0d.js');
const spacingStaticMedium = require('./spacingStaticMedium-b25f0b31.js');
const spacingStaticSmall = require('./spacingStaticSmall-267058b5.js');

const getDirectionJssStyle = (direction) => {
  const style = {
    column: {
      flexFlow: 'column nowrap',
      alignItems: 'stretch',
      marginRight: 0,
      marginLeft: 0,
    },
    row: {
      flexFlow: 'row wrap',
      alignItems: 'center',
      marginRight: `-${spacingStaticSmall.spacingStaticSmall}`,
      marginLeft: `-${spacingStaticSmall.spacingStaticSmall}`,
    },
  };
  return style[direction];
};
const getDirectionSlottedJssStyle = (direction) => {
  const style = {
    column: {
      marginRight: 0,
      marginLeft: 0,
    },
    row: {
      marginRight: spacingStaticSmall.spacingStaticSmall,
      marginLeft: spacingStaticSmall.spacingStaticSmall,
    },
  };
  return style[direction];
};
const getComponentCss = (direction) => {
  return validateProps.getCss({
    '@global': {
      ':host': {
        display: 'block',
      },
      div: Object.assign({ display: 'flex', marginTop: `-${spacingStaticMedium.spacingStaticMedium}` }, validateProps.buildResponsiveStyles(direction, getDirectionJssStyle)),
      '::slotted(*)': validateProps.addImportantToEachRule(Object.assign({ marginTop: spacingStaticMedium.spacingStaticMedium }, validateProps.buildResponsiveStyles(direction, getDirectionSlottedJssStyle))),
    },
  });
};

const BUTTON_GROUP_DIRECTIONS = ['row', 'column'];

const propTypes = {
  direction: validateProps.AllowedTypes.breakpoint(BUTTON_GROUP_DIRECTIONS),
};
const ButtonGroup = class {
  constructor(hostRef) {
    validateProps.registerInstance(this, hostRef);
    this.direction = { base: 'column', xs: 'row' };
  }
  render() {
    validateProps.validateProps(this, propTypes);
    validateProps.attachComponentCss(this.host, getComponentCss, this.direction);
    return (validateProps.h("div", { role: "group" }, validateProps.h("slot", null)));
  }
  get host() { return validateProps.getElement(this); }
};

exports.p_button_group = ButtonGroup;
