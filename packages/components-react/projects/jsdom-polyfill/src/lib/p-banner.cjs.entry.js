'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const validateProps = require('./validateProps-3b506a0d.js');
const hasNamedSlot = require('./hasNamedSlot-c9552a6a.js');
const slottedStyles = require('./slotted-styles-a900b5d1.js');
const theme = require('./theme-25a5ded7.js');
const bannerStyles = require('./banner-styles-9af5b287.js');
const bannerUtils = require('./banner-utils-46a76adc.js');
require('./constants-6ecb3cbb.js');

const propTypes = {
  state: validateProps.AllowedTypes.oneOf(bannerUtils.BANNER_STATES),
  persistent: validateProps.AllowedTypes.boolean,
  width: validateProps.AllowedTypes.oneOf(bannerUtils.BANNER_WIDTHS),
  theme: validateProps.AllowedTypes.oneOf(theme.THEMES),
};
const Banner = class {
  constructor(hostRef) {
    validateProps.registerInstance(this, hostRef);
    this.dismiss = validateProps.createEvent(this, "dismiss", 3);
    this.onKeyboardEvent = (e) => {
      if (e.key === 'Escape') {
        this.removeBanner();
      }
    };
    this.removeBanner = (e) => {
      e === null || e === void 0 ? void 0 : e.stopPropagation(); // prevent double event emission because of identical name
      this.dismiss.emit();
      this.host.classList.add('banner--close');
      setTimeout(() => {
        this.host.remove();
      }, 600); // duration of animation
    };
    this.state = 'neutral';
    this.persistent = false;
    this.width = 'basic';
    this.theme = 'light';
  }
  connectedCallback() {
    slottedStyles.attachSlottedCss(this.host, bannerStyles.getSlottedCss);
    if (!this.persistent) {
      document.addEventListener('keydown', this.onKeyboardEvent);
    }
  }
  componentDidLoad() {
    var _a;
    if (!this.persistent) {
      // messy… optional chaining is needed in case child component is unmounted too early
      (_a = validateProps.getShadowRootHTMLElement(this.inlineNotificationElement, '.close')) === null || _a === void 0 ? void 0 : _a.focus();
    }
  }
  disconnectedCallback() {
    if (!this.persistent) {
      document.removeEventListener('keydown', this.onKeyboardEvent);
    }
  }
  render() {
    validateProps.validateProps(this, propTypes);
    validateProps.attachComponentCss(this.host, bannerStyles.getComponentCss);
    const PrefixedTagNames = validateProps.getPrefixedTagNames(this.host);
    return (validateProps.h(PrefixedTagNames.pContentWrapper, { width: this.width }, validateProps.h(PrefixedTagNames.pInlineNotification, { ref: (el) => (this.inlineNotificationElement = el), class: "root", state: this.state, persistent: this.persistent, theme: this.theme, onDismiss: this.removeBanner }, hasNamedSlot.hasNamedSlot(this.host, 'title') && validateProps.h("slot", { name: "title", slot: "heading" }), hasNamedSlot.hasNamedSlot(this.host, 'description') && validateProps.h("slot", { name: "description" }))));
  }
  get host() { return validateProps.getElement(this); }
};

exports.p_banner = Banner;
