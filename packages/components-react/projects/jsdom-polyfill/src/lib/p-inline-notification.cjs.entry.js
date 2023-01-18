'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const validateProps = require('./validateProps-3b506a0d.js');
const hasNamedSlot = require('./hasNamedSlot-c9552a6a.js');
const slottedStyles = require('./slotted-styles-a900b5d1.js');
const theme = require('./theme-25a5ded7.js');
const inlineNotificationUtils = require('./inline-notification-utils-558334cf.js');
require('./headingSmallStyle-7dd8e6fb.js');
require('./headingShared-3815cda4.js');
require('./fontVariant-54ee1e6c.js');
require('./textSmallStyle-305ec8fc.js');
require('./textShared-cdf909c4.js');
require('./banner-utils-46a76adc.js');

const hasHeading = (element, heading) => {
  return !!heading || hasNamedSlot.hasNamedSlot(element, 'heading');
};

const propTypes = {
  heading: validateProps.AllowedTypes.string,
  description: validateProps.AllowedTypes.string,
  state: validateProps.AllowedTypes.oneOf(inlineNotificationUtils.INLINE_NOTIFICATION_STATES),
  persistent: validateProps.AllowedTypes.boolean,
  actionLabel: validateProps.AllowedTypes.string,
  actionLoading: validateProps.AllowedTypes.boolean,
  actionIcon: validateProps.AllowedTypes.string,
  theme: validateProps.AllowedTypes.oneOf(theme.THEMES),
};
const InlineNotification = class {
  constructor(hostRef) {
    validateProps.registerInstance(this, hostRef);
    this.dismiss = validateProps.createEvent(this, "dismiss", 3);
    this.action = validateProps.createEvent(this, "action", 3);
    this.heading = '';
    this.description = '';
    this.state = 'neutral';
    this.persistent = false;
    this.actionLabel = undefined;
    this.actionLoading = false;
    this.actionIcon = 'arrow-head-right';
    this.theme = 'light';
  }
  connectedCallback() {
    slottedStyles.attachSlottedCss(this.host, inlineNotificationUtils.getSlottedCss);
  }
  render() {
    validateProps.validateProps(this, propTypes);
    validateProps.attachComponentCss(this.host, inlineNotificationUtils.getComponentCss, this.state, !!this.actionLabel, !this.persistent, this.theme);
    const bannerId = 'banner';
    const labelId = 'label';
    const descriptionId = 'description';
    const PrefixedTagNames = validateProps.getPrefixedTagNames(this.host);
    return (validateProps.h(validateProps.Host, null, validateProps.h(PrefixedTagNames.pIcon, { class: "icon", name: inlineNotificationUtils.getInlineNotificationIconName(this.state), color: "inherit", "aria-hidden": "true" }), validateProps.h("div", Object.assign({ id: bannerId, class: "content" }, inlineNotificationUtils.getContentAriaAttributes(this.state, labelId, descriptionId)), hasHeading(this.host, this.heading) && validateProps.h("h5", { id: labelId }, this.heading || validateProps.h("slot", { name: "heading" })), validateProps.h("p", { id: descriptionId }, this.description || validateProps.h("slot", null))), this.actionLabel && (validateProps.h(PrefixedTagNames.pButtonPure, { class: "action", icon: this.actionIcon, loading: this.actionLoading, onClick: this.action.emit }, this.actionLabel)), !this.persistent && (validateProps.h(PrefixedTagNames.pButtonPure, { class: "close", type: "button", icon: "close", hideLabel: true, "aria-controls": bannerId, onClick: this.dismiss.emit }, "Close notification"))));
  }
  get host() { return validateProps.getElement(this); }
};

exports.p_inline_notification = InlineNotification;
