'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const validateProps = require('./validateProps-3b506a0d.js');
const required = require('./required-2c3ad64c.js');
const spacingStaticMedium = require('./spacingStaticMedium-b25f0b31.js');
const textXSmallStyle = require('./textXSmallStyle-0148b295.js');
const headingSmallStyle = require('./headingSmallStyle-7dd8e6fb.js');
require('./hasNamedSlot-c9552a6a.js');
require('./spacingStaticXSmall-0918e28c.js');
require('./textSmallStyle-305ec8fc.js');
require('./textShared-cdf909c4.js');
require('./fontVariant-54ee1e6c.js');
require('./fontSizeTextXSmall-ad009c6d.js');
require('./headingShared-3815cda4.js');

const getComponentCss = (state, labelSize, hasLabel) => {
  const theme = 'light';
  return validateProps.getCss(Object.assign(Object.assign({ '@global': Object.assign({ ':host': {
        display: validateProps.addImportantToRule('block'),
      }, fieldset: {
        margin: 0,
        padding: 0,
        border: 'none',
      } }, (hasLabel && {
      legend: Object.assign({ margin: `0 0 ${spacingStaticMedium.spacingStaticMedium}`, padding: 0, color: validateProps.getThemedColors(theme).primaryColor }, (labelSize === 'small' ? textXSmallStyle.textXSmallStyle : headingSmallStyle.headingSmallStyle)),
    })) }, required.getFunctionalComponentRequiredStyles(theme)), validateProps.mergeDeep(required.getFunctionalComponentStateMessageStyles(theme, state), {
    message: {
      marginTop: spacingStaticMedium.spacingStaticMedium,
    },
  })));
};

const FIELDSET_WRAPPER_LABEL_SIZES = ['small', 'medium'];

const propTypes = {
  label: validateProps.AllowedTypes.string,
  labelSize: validateProps.AllowedTypes.oneOf(FIELDSET_WRAPPER_LABEL_SIZES),
  required: validateProps.AllowedTypes.boolean,
  state: validateProps.AllowedTypes.oneOf(required.FORM_STATES),
  message: validateProps.AllowedTypes.string,
};
const FieldsetWrapper = class {
  constructor(hostRef) {
    validateProps.registerInstance(this, hostRef);
    this.label = '';
    this.labelSize = 'medium';
    this.required = false;
    this.state = 'none';
    this.message = '';
  }
  render() {
    validateProps.validateProps(this, propTypes);
    validateProps.attachComponentCss(this.host, getComponentCss, this.state, this.labelSize, required.hasLabel(this.host, this.label));
    const messageId = 'message';
    const hasMessageValue = required.hasMessage(this.host, this.message, this.state);
    return (validateProps.h("fieldset", { "aria-describedby": hasMessageValue ? messageId : null }, required.hasLabel(this.host, this.label) && (validateProps.h("legend", null, this.label || validateProps.h("slot", { name: "label" }), this.required && validateProps.h(required.Required, null))), validateProps.h("slot", null), hasMessageValue && validateProps.h(required.StateMessage, { id: messageId, state: this.state, message: this.message, host: this.host })));
  }
  get host() { return validateProps.getElement(this); }
};

exports.p_fieldset_wrapper = FieldsetWrapper;
