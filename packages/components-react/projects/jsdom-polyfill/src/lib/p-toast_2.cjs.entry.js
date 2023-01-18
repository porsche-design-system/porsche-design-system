'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const validateProps = require('./validateProps-3b506a0d.js');
const bannerStyles = require('./banner-styles-9af5b287.js');
const constants = require('./constants-6ecb3cbb.js');
const gridSafeZone = require('./gridSafeZone-17afec2f.js');
const theme = require('./theme-25a5ded7.js');
const throwIfRootNodeIsNotOneOfKind = require('./throwIfRootNodeIsNotOneOfKind-c4787f12.js');
const inlineNotificationUtils = require('./inline-notification-utils-558334cf.js');
const textSmallStyle = require('./textSmallStyle-305ec8fc.js');
require('./headingSmallStyle-7dd8e6fb.js');
require('./headingShared-3815cda4.js');
require('./fontVariant-54ee1e6c.js');
require('./banner-utils-46a76adc.js');
require('./textShared-cdf909c4.js');

const TOAST_DEFAULT_TIMEOUT = 6000;
// css variable names for overriding behaviour in tests
const TOAST_CSS_SKIP_TIMEOUT_VAR = '--p-override-toast-skip-timeout';
const TOAST_CSS_TIMEOUT_OVERRIDE_VAR = '--p-override-toast-timeout';
const TOAST_ANIMATION_DURATION_VAR = '--p-override-toast-animation-duration';
class ToastManagerClass {
  constructor() {
    this.messages = [];
    this.dismissToastItem = () => {
      this.removeTimeout();
      this.messages.shift();
      this.onDismissCallback();
      setTimeout(() => validateProps.forceUpdate(this.toastEl), 
      // respect --p-override-toast-animation-duration css variable to override timeout during e2e and vrt tests
      parseInt(getComputedStyle(this.toastEl).getPropertyValue(TOAST_ANIMATION_DURATION_VAR), 10) ||
          bannerStyles.ANIMATION_DURATION);
    };
  }
  register(toastElement, onDismiss) {
    if (this.toastEl) {
      throw new Error('<p-toast> was rendered multiple times.');
    }
    this.toastEl = toastElement;
    this.onDismissCallback = onDismiss;
  }
  unregister() {
    this.toastEl = null;
    this.messages = [];
    this.removeTimeout();
  }
  addMessage(message) {
    if (!this.toastEl) {
      throw new Error('Missing <p-toast> element.');
    }
    if (!message.text) {
      throw new Error('Empty text provided to addMessage.');
    }
    const msg = Object.assign({ state: 'neutral' }, message); // neutral is our default state
    const { length } = this.messages;
    this.messages.push(msg);
    if (!length) {
      validateProps.forceUpdate(this.toastEl);
    }
  }
  getToast() {
    this.startTimeout();
    return this.messages[0];
  }
  startTimeout() {
    var _a;
    if (this.messages.length) {
      {
        // skip setting timeout if --p-override-toast-skip-timeout css variable is set in dev build
        if (((_a = getComputedStyle(this.toastEl).getPropertyValue(TOAST_CSS_SKIP_TIMEOUT_VAR)) === null || _a === void 0 ? void 0 : _a.trim()) !== 'true') {
          this.timeout = setTimeout(this.dismissToastItem, 
          // override timeout if --p-override-toast-timeout css variable is set
          parseInt(getComputedStyle(this.toastEl).getPropertyValue(TOAST_CSS_TIMEOUT_OVERRIDE_VAR), 10) ||
            TOAST_DEFAULT_TIMEOUT);
        }
      }
    }
  }
  removeTimeout() {
    clearTimeout(this.timeout);
    this.timeout = null;
  }
}
const toastManager = new ToastManagerClass();

const toastPositionBottomVarPublic = '--p-toast-position-bottom'; // CSS custom property exposed as public interface
const toastPositionBottomVarInternal = `${toastPositionBottomVarPublic}-internal`;
const toastCloseClassName = 'close';
const getComponentCss$1 = () => {
  return validateProps.getCss({
    '@global': {
      ':host': validateProps.addImportantToEachRule({
        position: 'fixed',
        left: gridSafeZone.gridSafeZone,
        right: gridSafeZone.gridSafeZone,
        // Needs a not overwritable internal css variable to cover default position depending on viewport size and to handle animation properly.
        // In addition, a public css variable can be passed to overwrite the default position.
        [toastPositionBottomVarInternal]: `var(${toastPositionBottomVarPublic}, ${validateProps.pxToRemWithUnit(56)})`,
        bottom: `var(${toastPositionBottomVarInternal})`,
        maxWidth: '42rem',
        zIndex: constants.TOAST_Z_INDEX,
        [validateProps.getMediaQueryMin('s')]: {
          left: validateProps.pxToRemWithUnit(64),
          right: 'auto',
          [toastPositionBottomVarInternal]: `var(${toastPositionBottomVarPublic}, ${validateProps.pxToRemWithUnit(64)})`,
          bottom: `var(${toastPositionBottomVarInternal})`,
        },
      }),
      '@keyframes in': bannerStyles.getKeyframesMobile('in', toastPositionBottomVarInternal),
      '@keyframes out': bannerStyles.getKeyframesMobile('out', toastPositionBottomVarInternal),
    },
    hydrated: bannerStyles.getAnimationIn('in', TOAST_ANIMATION_DURATION_VAR),
    [toastCloseClassName]: bannerStyles.getAnimationOut('out'),
  });
};

const propTypes$1 = {
  theme: validateProps.AllowedTypes.oneOf(theme.THEMES),
};
const Toast = class {
  constructor(hostRef) {
    validateProps.registerInstance(this, hostRef);
    this.theme = 'light';
  }
  addMessage(message) {
    toastManager.addMessage(message);
  }
  connectedCallback() {
    toastManager.register(this.host, () => this.toastItemElement.classList.add(toastCloseClassName));
  }
  componentDidLoad() {
    this.host.addEventListener('dismiss', (e) => {
      e.stopPropagation();
      toastManager.dismissToastItem();
    });
  }
  componentShouldUpdate(_, __, propertyName) {
    return propertyName !== 'theme';
  }
  disconnectedCallback() {
    toastManager.unregister();
  }
  render() {
    var _a;
    validateProps.validateProps(this, propTypes$1);
    validateProps.attachComponentCss(this.host, getComponentCss$1);
    (_a = this.toastItemElement) === null || _a === void 0 ? void 0 : _a.classList.remove(toastCloseClassName);
    const PrefixedTagNames = validateProps.getPrefixedTagNames(this.host);
    const toast = toastManager.getToast();
    return (validateProps.h(validateProps.Host, null, toast && (validateProps.h(PrefixedTagNames.pToastItem, Object.assign({}, toast, { theme: this.theme, ref: (el) => (this.toastItemElement = el) })))));
  }
  get host() { return validateProps.getElement(this); }
};

const TOAST_STATES = ['neutral', 'success'];

const getComponentCss = (state, theme) => {
  const textColor = validateProps.getThemedColors('light').primaryColor;
  return validateProps.getCss({
    '@global': {
      ':host': Object.assign(Object.assign({}, inlineNotificationUtils.getNotificationRootJssStyle(state, theme)), bannerStyles.getBoxShadow()),
      p: Object.assign(Object.assign({}, textSmallStyle.textSmallStyle), { margin: 0, color: textColor }),
    },
    icon: inlineNotificationUtils.getNotificationIconJssStyle(state),
    content: inlineNotificationUtils.getNotificationContentJssStyle(),
    close: inlineNotificationUtils.getCloseIconJssStyle(),
  });
};

const propTypes = {
  text: validateProps.AllowedTypes.string,
  state: validateProps.AllowedTypes.oneOf(TOAST_STATES),
  theme: validateProps.AllowedTypes.oneOf(theme.THEMES),
};
const ToastItem = class {
  constructor(hostRef) {
    validateProps.registerInstance(this, hostRef);
    this.dismiss = validateProps.createEvent(this, "dismiss", 7);
    this.text = '';
    this.state = 'neutral';
    this.theme = 'light';
  }
  connectedCallback() {
    throwIfRootNodeIsNotOneOfKind.throwIfRootNodeIsNotOneOfKind(this.host, ['p-toast']);
  }
  render() {
    validateProps.validateProps(this, propTypes);
    validateProps.attachComponentCss(this.host, getComponentCss, this.state, this.theme);
    const toastId = 'toast';
    const PrefixedTagNames = validateProps.getPrefixedTagNames(this.host);
    return (validateProps.h(validateProps.Host, null, validateProps.h(PrefixedTagNames.pIcon, { class: "icon", name: inlineNotificationUtils.getInlineNotificationIconName(this.state), color: "inherit", "aria-hidden": "true" }), validateProps.h("p", { id: toastId, class: "content", role: "status", "aria-live": "polite" }, this.text), validateProps.h(PrefixedTagNames.pButtonPure, { class: "close", type: "button", icon: "close", hideLabel: true, "aria-controls": toastId, onClick: this.dismiss.emit }, "Close notification message")));
  }
  get host() { return validateProps.getElement(this); }
};

exports.p_toast = Toast;
exports.p_toast_item = ToastItem;
