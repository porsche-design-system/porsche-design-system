'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const validateProps = require('./validateProps-3b506a0d.js');
const a11y = require('./a11y-4587e563.js');
const hasNamedSlot = require('./hasNamedSlot-c9552a6a.js');
const slottedStyles = require('./slotted-styles-a900b5d1.js');
const constants = require('./constants-6ecb3cbb.js');
const focusVisibleFallback = require('./focus-visible-fallback-8e9e55aa.js');
const headingMediumStyle = require('./headingMediumStyle-7468fe57.js');
const gridSafeZone = require('./gridSafeZone-17afec2f.js');
require('./removeAttribute-5be430c3.js');
require('./setAttribute-577f81e1.js');
require('./has-document-f0620e06.js');
require('./headingShared-3815cda4.js');
require('./fontVariant-54ee1e6c.js');
require('./fontSizeTextMedium-c20ab60d.js');

const unpackChildren = (el) => {
  return Array.from(el.children)
    .map((child) => (child.children ? [child].concat(unpackChildren(child)) : child))
    .flat()
    .map((child) => (child.shadowRoot ? [child].concat(unpackChildren(child.shadowRoot)) : child))
    .flat();
};
// TODO: could be extended by audio[controls], video[controls], [contenteditable]:not([contenteditable="false"]) or iframe
const isFocusableElement = (el) => {
  const { nodeName } = el;
  return (((nodeName === 'INPUT' && el.type !== 'hidden') ||
    nodeName === 'TEXTAREA' ||
    nodeName === 'SELECT' ||
    nodeName === 'BUTTON' ||
    (nodeName === 'A' && !!el.href)) &&
    el.tabIndex >= 0 &&
    !el.disabled);
};
const getFirstAndLastFocusableElement = (host, closeButton) => {
  const focusableElements = (closeButton ? [closeButton] : []).concat(unpackChildren(host).filter(isFocusableElement));
  return [focusableElements[0], focusableElements.pop()];
};
let documentKeydownListener;
const setScrollLock = (host, isOpen, closeBtn, // irrelevant for disconnectedCallback
closeModal // irrelevant for disconnectedCallback
) => {
  let focusableElements = [];
  document.body.style.overflow = isOpen ? 'hidden' : '';
  document.removeEventListener('keydown', documentKeydownListener);
  if (isOpen) {
    focusableElements = getFirstAndLastFocusableElement(host, closeBtn);
    documentKeydownListener = (e) => {
      var _a;
      const { key, shiftKey } = e;
      const { activeElement, firstElementChild } = host.shadowRoot;
      if (key === 'Escape') {
        closeModal();
      }
      else if (key === 'Tab') {
        if (shiftKey && activeElement === firstElementChild) {
          // when modal is opened initially, the dialog is focused and shift + tab would break out of cycle
          e.preventDefault();
          (_a = focusableElements[1]) === null || _a === void 0 ? void 0 : _a.focus();
        }
        else if (!focusableElements.filter((x) => x).length) {
          // if we don't have any focusableElements we need to prevent Tab here
          e.preventDefault();
        }
        // all other cases respect the natural tab order
        // the cycle itself is accomplished within setFirstAndLastFocusableElementKeydownListener
      }
    };
    document.addEventListener('keydown', documentKeydownListener);
  }
  setFirstAndLastFocusableElementKeydownListener(focusableElements);
};
/** cache of previous first and last focusable element so we are able to remove them again */
let FOCUSABLE_ELEMENT_CACHE = [];
/** cache of previous event handler pair so we are able to remove them again */
let KEYDOWN_EVENT_HANDLER_CACHE = [];
const setFirstAndLastFocusableElementKeydownListener = (focusableElements) => {
  // remove previous handlers if there are any
  if (FOCUSABLE_ELEMENT_CACHE.length) {
    FOCUSABLE_ELEMENT_CACHE.forEach((el, idx) => el.removeEventListener('keydown', KEYDOWN_EVENT_HANDLER_CACHE[idx]));
  }
  // create, apply and save new handlers for future removal
  if (focusableElements.filter((x) => x).length) {
    FOCUSABLE_ELEMENT_CACHE = [...focusableElements]; // prevent mutation
    KEYDOWN_EVENT_HANDLER_CACHE = focusableElements.map((el, idx) => {
      const handler = (e) => {
        if (e.key === 'Tab' && ((idx === 0 && e.shiftKey) || (idx === 1 && !e.shiftKey))) {
          e.preventDefault();
          focusableElements[idx === 0 ? 1 : 0].focus();
        }
      };
      el.addEventListener('keydown', handler);
      return handler;
    });
  }
};
const warnIfAriaAndHeadingPropsAreUndefined = (host, heading, aria) => {
  // TODO: slotted heading doesn't count?
  if (!heading && !aria) {
    console.warn(`Either heading or aria attributes on ${validateProps.getTagName(host)} have to be set in order to ensure accessibility.`);
  }
};
const MODAL_ARIA_ATTRIBUTES = ['aria-label'];

const mediaQueryM = validateProps.getMediaQueryMin('m');
const mediaQueryXl = validateProps.getMediaQueryMin('xl');
const mediaQueryXxl = validateProps.getMediaQueryMin('xxl');
const { backgroundColor: lightThemeBackgroundColor } = validateProps.getThemedColors('light');
const { backgroundColor: darkThemeBackgroundColor } = validateProps.getThemedColors('dark');
const transitionTimingFunction = 'cubic-bezier(.16,1,.3,1)';
const stretchToFullModalWidthClassName = 'stretch-to-full-modal-width';
const getFullscreenJssStyles = (fullscreen) => {
  return fullscreen
    ? {
      minWidth: '100%',
      maxWidth: 'none',
      minHeight: '100%',
      margin: 0,
    }
    : {
      minWidth: validateProps.pxToRemWithUnit(275.2),
      maxWidth: validateProps.pxToRemWithUnit(1536),
      minHeight: 'auto',
      margin: `max(1rem, 7vh) ${gridSafeZone.gridSafeZone}`,
    };
};
const isFullscreenForXl = (fullscreen) => {
  const fullscreenParsed = validateProps.parseJSON(fullscreen);
  if (typeof fullscreenParsed === 'boolean') {
    return fullscreenParsed;
  }
  else {
    const entries = Object.entries(fullscreenParsed);
    const [lastTrueBreakpoint] = entries.filter(([, val]) => val).pop() || [];
    const [lastFalseBreakpoint] = entries.filter(([, val]) => !val).pop() || [];
    return validateProps.BREAKPOINTS.indexOf(lastTrueBreakpoint) > validateProps.BREAKPOINTS.indexOf(lastFalseBreakpoint);
  }
};
const getSlottedJssStyle = (marginValue, hasHeader) => {
  const marginRem = validateProps.pxToRemWithUnit(-marginValue);
  return Object.assign(Object.assign({ [`&(.${stretchToFullModalWidthClassName})`]: {
      width: `calc(100% + ${validateProps.pxToRemWithUnit(marginValue * 2)})`,
      margin: `0 ${marginRem}`,
    } }, (!hasHeader && {
    [`&(.${stretchToFullModalWidthClassName}:first-child)`]: {
      marginTop: marginRem,
    },
  })), { [`&(.${stretchToFullModalWidthClassName}:last-child)`]: {
      marginBottom: marginRem,
    } });
};
const getComponentCss = (open, fullscreen, disableCloseButton, hasHeader) => {
  const isFullscreenForXlAndXxl = isFullscreenForXl(fullscreen);
  return validateProps.getCss(Object.assign(Object.assign({ '@global': {
      ':host': Object.assign(Object.assign({}, validateProps.addImportantToEachRule(Object.assign(Object.assign(Object.assign(Object.assign({ position: 'fixed' }, validateProps.getInsetJssStyle()), { zIndex: constants.MODAL_Z_INDEX, display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }), (open
        ? {
          transition: `opacity .6s ${transitionTimingFunction}`,
          opacity: 1,
          visibility: 'inherit',
        }
        : {
          transition: `opacity .2s ${transitionTimingFunction},visibility 0s linear .2s`,
          opacity: 0,
          visibility: 'hidden',
        })), { 
        // workaround via pseudo element to fix stacking (black) background in safari
        '&::before': Object.assign(Object.assign({ content: '""', position: 'fixed' }, validateProps.getInsetJssStyle()), { background: `${darkThemeBackgroundColor}e6` }) }))), { overflowY: 'auto' }),
      '::slotted': validateProps.addImportantToEachRule(Object.assign(Object.assign({}, getSlottedJssStyle(32, hasHeader)), { [mediaQueryM]: getSlottedJssStyle(40, hasHeader), [mediaQueryXxl]: getSlottedJssStyle(64, hasHeader) })),
      h1: Object.assign(Object.assign({}, headingMediumStyle.headingMediumStyle), { margin: 0, color: validateProps.getThemedColors('light').primaryColor }),
    }, root: validateProps.mergeDeep(Object.assign(Object.assign({ position: 'relative', boxSizing: 'border-box', transition: `transform .6s ${transitionTimingFunction}`, transform: open ? 'scale3d(1,1,1)' : 'scale3d(.9,.9,1)', padding: validateProps.pxToRemWithUnit(32), backgroundColor: lightThemeBackgroundColor }, focusVisibleFallback.getFocusVisibleFallback(validateProps.getFocusJssStyle({ color: lightThemeBackgroundColor }))), { [mediaQueryM]: {
        padding: validateProps.pxToRemWithUnit(40),
      }, [mediaQueryXl]: {
        margin: isFullscreenForXlAndXxl ? 0 : `min(12rem, 10vh) ${gridSafeZone.gridSafeZone}`,
      }, [mediaQueryXxl]: {
        padding: validateProps.pxToRemWithUnit(64),
      } }), validateProps.buildResponsiveStyles(fullscreen, getFullscreenJssStyles)) }, (hasHeader && {
    header: Object.assign(Object.assign({ padding: `0 0 ${validateProps.pxToRemWithUnit(16)}` }, (!disableCloseButton && { margin: `0 ${validateProps.pxToRemWithUnit(32)} 0 0` })), { [mediaQueryM]: {
        padding: `0 0 ${validateProps.pxToRemWithUnit(24)}`,
      }, [mediaQueryXxl]: Object.assign({ padding: `0 0 ${validateProps.pxToRemWithUnit(32)}` }, (!disableCloseButton && { margin: 0 })) }),
  })), { close: {
      position: 'absolute',
      top: 0,
      right: 0,
      padding: validateProps.pxToRemWithUnit(8),
      border: `${validateProps.pxToRemWithUnit(6)} solid ${lightThemeBackgroundColor}`,
      background: lightThemeBackgroundColor,
    } }));
};
const getSlottedCss = (host) => {
  return validateProps.getCss(validateProps.buildSlottedStyles(host, validateProps.getBaseSlottedStyles()));
};

const propTypes = {
  open: validateProps.AllowedTypes.boolean,
  disableCloseButton: validateProps.AllowedTypes.boolean,
  disableBackdropClick: validateProps.AllowedTypes.boolean,
  heading: validateProps.AllowedTypes.string,
  fullscreen: validateProps.AllowedTypes.breakpoint('boolean'),
  aria: validateProps.AllowedTypes.aria(MODAL_ARIA_ATTRIBUTES),
};
const Modal = class {
  constructor(hostRef) {
    validateProps.registerInstance(this, hostRef);
    this.close = validateProps.createEvent(this, "close", 3);
    this.onMouseDown = (e) => {
      if (e.composedPath()[0] === this.host) {
        this.closeModal();
      }
    };
    this.closeModal = () => {
      if (!this.disableCloseButton) {
        this.close.emit();
      }
    };
    this.open = false;
    this.disableCloseButton = false;
    this.disableBackdropClick = false;
    this.heading = undefined;
    this.fullscreen = false;
    this.aria = undefined;
  }
  openChangeHandler(isOpen) {
    var _a;
    this.updateScrollLock(isOpen);
    if (isOpen) {
      this.focusedElBeforeOpen = document.activeElement;
    }
    else {
      (_a = this.focusedElBeforeOpen) === null || _a === void 0 ? void 0 : _a.focus();
    }
  }
  connectedCallback() {
    slottedStyles.attachSlottedCss(this.host, getSlottedCss);
  }
  componentDidLoad() {
    // in case modal is rendered with open prop
    if (this.open) {
      this.updateScrollLock(true);
    }
    validateProps.getShadowRootHTMLElement(this.host, 'slot').addEventListener('slotchange', () => {
      if (this.open) {
        // 1 tick delay is needed so that web components can be bootstrapped
        setTimeout(() => {
          this.updateScrollLock(true);
          this.dialog.focus(); // set initial focus
        });
      }
    });
  }
  componentDidRender() {
    if (this.open) {
      // reset scroll top to zero in case content is longer than viewport height, - some timeout is needed although it shouldn't
      for (let i = 0; i < 4; i++) {
        setTimeout(() => (this.host.scrollTop = 0), i * 5);
      }
      this.dialog.focus(); // needs to happen after render
    }
  }
  disconnectedCallback() {
    setScrollLock(this.host, false);
  }
  render() {
    validateProps.validateProps(this, propTypes);
    if (this.open) {
      warnIfAriaAndHeadingPropsAreUndefined(this.host, this.heading, this.aria);
    }
    this.hasHeader = !!this.heading || hasNamedSlot.hasNamedSlot(this.host, 'heading');
    validateProps.attachComponentCss(this.host, getComponentCss, this.open, this.fullscreen, this.disableCloseButton, this.hasHeader);
    const PrefixedTagNames = validateProps.getPrefixedTagNames(this.host);
    return (validateProps.h(validateProps.Host, { onMouseDown: !this.disableBackdropClick && this.onMouseDown }, validateProps.h("div", Object.assign({ class: "root", role: "dialog", "aria-modal": "true" }, Object.assign({ 'aria-label': this.heading }, a11y.parseAndGetAriaAttributes(this.aria)), { "aria-hidden": !this.open ? 'true' : 'false', tabIndex: -1, ref: (el) => (this.dialog = el) }), !this.disableCloseButton && (validateProps.h(PrefixedTagNames.pButtonPure, { class: "close", type: "button", ref: (el) => (this.closeBtn = el), hideLabel: true, icon: "close", onClick: this.closeModal }, "Close modal")), this.hasHeader && (validateProps.h("div", { class: "header" }, this.heading ? validateProps.h("h1", null, this.heading) : validateProps.h("slot", { name: "heading" }))), validateProps.h("slot", null))));
  }
  updateScrollLock(isOpen) {
    setScrollLock(this.host, isOpen, !this.disableCloseButton && this.closeBtn, this.closeModal);
  }
  get host() { return validateProps.getElement(this); }
  static get watchers() { return {
    "open": ["openChangeHandler"]
  }; }
};

exports.p_modal = Modal;
