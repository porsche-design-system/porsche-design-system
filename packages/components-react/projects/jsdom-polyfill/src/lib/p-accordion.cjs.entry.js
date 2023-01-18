'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const validateProps = require('./validateProps-3b506a0d.js');
const theme = require('./theme-25a5ded7.js');
const headlineUtils = require('./headline-utils-15ac2664.js');
const textSmallStyle = require('./textSmallStyle-305ec8fc.js');
const fontSizeText = require('./fontSizeText-590db5cf.js');
const fontVariant = require('./fontVariant-54ee1e6c.js');
const spacingStaticSmall = require('./spacingStaticSmall-267058b5.js');
require('./textShared-cdf909c4.js');
require('./fontSizeTextXSmall-ad009c6d.js');
require('./fontSizeTextMedium-c20ab60d.js');
require('./fontSizeTextXLarge-991527e3.js');

const ACCORDION_SIZES = ['small', 'medium'];
const setCollapsibleElementHeight = (collapsibleElement, isOpen, contentWrapperHeight) => {
  if (collapsibleElement) {
    collapsibleElement.style.height = isOpen ? contentWrapperHeight : '0';
  }
};
const getContentHeight = ({ height }) => validateProps.pxToRemWithUnit(height);
const warnIfCompactAndSizeIsSet = (host, compact, size) => {
  if (compact && size !== 'small') {
    console.warn(`Property "size" of ${validateProps.getTagName(host)} is ignored when property "compact" is set to "true".`);
  }
};
const resizeMap = new Map();
const isResizeObserverDefined = () => validateProps.hasWindow && 'ResizeObserver' in window;
let useResizeObserverFallback = !isResizeObserverDefined();
const resizeObserver = isResizeObserverDefined() &&
  new ResizeObserver((entries) => {
    entries.forEach((resizeEntry) => { var _a; return (_a = resizeMap.get(resizeEntry.target)) === null || _a === void 0 ? void 0 : _a(resizeEntry); });
  });
// TODO: Move fallback logic here, to simplify usage in components
const observeResize = (node, callback, options) => {
  // node might not be defined in connectedCallback
  if (node) {
    resizeMap.set(node, callback);
    resizeObserver.observe(node, options);
  }
};
const unobserveResize = (node) => {
  // node might not be defined in disconnectedCallback
  if (node) {
    resizeMap.delete(node);
    resizeObserver.unobserve(node);
  }
};
const registeredElements = new Map();
const onWindowResize = () => {
  registeredElements.forEach((callback) => {
    callback();
  });
};
const observeWindowResize = (htmlElement, callback) => {
  if (!registeredElements.has(htmlElement)) {
    registeredElements.set(htmlElement, callback);
    window.addEventListener('resize', onWindowResize);
  }
};
const unobserveWindowResize = (htmlElement) => {
  registeredElements.delete(htmlElement);
  if (registeredElements.size === 0) {
    window.removeEventListener('resize', onWindowResize);
  }
};
const resizeObserverFallback = (htmlElement, callback, shouldObserveChildren) => {
  observeWindowResize(htmlElement, callback);
  if (shouldObserveChildren) {
    validateProps.observeChildren(htmlElement, callback);
  }
};
const removeResizeObserverFallback = (htmlElement, shouldUnobserveChildren) => {
  unobserveWindowResize(htmlElement);
  if (shouldUnobserveChildren) {
    validateProps.unobserveChildren(htmlElement);
  }
};

const getComponentCss = (size, compact, open, theme) => {
  const { primaryColor, hoverColor, focusColor, contrastLowColor } = validateProps.getThemedColors(theme);
  const border = `1px solid ${contrastLowColor}`;
  return validateProps.getCss(Object.assign(Object.assign({ '@global': {
      ':host': Object.assign({ display: 'block' }, (!compact && {
        '&(:first-of-type) .root': {
          borderTop: border,
        },
      })),
      button: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ display: 'flex', justifyContent: 'space-between', margin: `${validateProps.pxToRemWithUnit(4)} 0`, width: '100%', textDecoration: 'none', border: 0, background: 'transparent', cursor: 'pointer', transition: validateProps.getTransition('color'), overflow: 'hidden', textAlign: 'left', color: primaryColor }, textSmallStyle.textSmallStyle), { fontWeight: validateProps.fontWeight.semiBold }), (compact
        ? { padding: `${validateProps.pxToRemWithUnit(4)} 0` }
        : validateProps.buildResponsiveStyles(size, (s) => (Object.assign(Object.assign({}, fontSizeText.fontSizeText[s]), { padding: `${validateProps.pxToRemWithUnit(s === 'medium' ? 20 : 12)} 0` }))))), validateProps.getFocusJssStyle({ color: focusColor })), validateProps.hoverMediaQuery({
        '&:hover': {
          color: hoverColor,
        },
      })),
    } }, (!compact && {
    root: {
      borderBottom: border,
    },
  })), { heading: {
      margin: 0,
      padding: 0,
    }, icon: {
      width: fontVariant.fontLineHeight,
      height: fontVariant.fontLineHeight,
      marginLeft: '1.5rem',
      transformOrigin: '50% 50%',
      transform: open ? 'rotate3d(0,0,1,180deg)' : 'rotate3d(0,0,1,0.0001deg)',
      transition: validateProps.getTransition('transform'),
    }, collapsible: Object.assign({ padding: 0, overflow: 'hidden' }, (open
      ? {
        height: 'auto',
        paddingBottom: compact ? spacingStaticSmall.spacingStaticSmall : '2.5rem',
        visibility: 'visible',
        transition: validateProps.getTransition('height') + `,visibility ${validateProps.transitionDuration}`,
        animation: `$open ${validateProps.transitionDuration} ease forwards`,
      }
      : {
        height: 0,
        visibility: 'hidden',
        transition: validateProps.getTransition('height') + `,visibility ${validateProps.transitionDuration} linear ${validateProps.transitionDuration}`,
      })), 
    // TODO: this doesn't get shortened and results in `keyframes-open` for some unknown reason
    '@keyframes open': {
      '0%,99%': {
        overflow: 'hidden',
      },
      '100%': {
        overflow: 'visible',
      },
    } }));
};

const propTypes = {
  size: validateProps.AllowedTypes.breakpoint(ACCORDION_SIZES),
  theme: validateProps.AllowedTypes.oneOf(theme.THEMES),
  heading: validateProps.AllowedTypes.string,
  tag: validateProps.AllowedTypes.oneOf(headlineUtils.HEADLINE_TAGS),
  open: validateProps.AllowedTypes.boolean,
  compact: validateProps.AllowedTypes.boolean,
};
const Accordion = class {
  constructor(hostRef) {
    validateProps.registerInstance(this, hostRef);
    this.accordionChange = validateProps.createEvent(this, "accordionChange", 3);
    this.onButtonClick = () => {
      this.accordionChange.emit({ open: !this.open });
    };
    this.setContentHeight = () => {
      if (this.content) {
        this.contentHeight = getContentHeight(this.content.getBoundingClientRect());
        this.setCollapsibleElementHeight();
      }
    };
    this.size = 'small';
    this.theme = 'light';
    this.heading = undefined;
    this.tag = 'h2';
    this.open = undefined;
    this.compact = undefined;
  }
  openChangeHandler() {
    this.setCollapsibleElementHeight();
  }
  connectedCallback() {
    if (useResizeObserverFallback) {
      resizeObserverFallback(this.host, this.setContentHeight, true);
    }
  }
  componentWillLoad() {
    warnIfCompactAndSizeIsSet(this.host, this.compact, this.size);
  }
  componentDidLoad() {
    if (!useResizeObserverFallback) {
      observeResize(this.content, ({ contentRect }) => {
        this.contentHeight = getContentHeight(contentRect);
        this.setCollapsibleElementHeight();
      }, { box: 'border-box' });
    }
  }
  componentDidRender() {
    if (useResizeObserverFallback) {
      this.contentHeight = getContentHeight(this.content.getBoundingClientRect());
    }
  }
  disconnectedCallback() {
    if (useResizeObserverFallback) {
      removeResizeObserverFallback(this.host, true);
    }
    else {
      unobserveResize(this.content);
    }
  }
  render() {
    validateProps.validateProps(this, propTypes);
    validateProps.attachComponentCss(this.host, getComponentCss, this.size, this.compact, this.open, this.theme);
    const buttonId = 'accordion-control';
    const contentId = 'accordion-panel';
    const PrefixedTagNames = validateProps.getPrefixedTagNames(this.host);
    const Heading = this.tag;
    return (validateProps.h("div", { class: "root" }, validateProps.h(Heading, { class: "heading" }, validateProps.h("button", { id: buttonId, type: "button", "aria-expanded": this.open ? 'true' : 'false', "aria-controls": contentId, onClick: this.onButtonClick }, this.heading || validateProps.h("slot", { name: "heading" }), validateProps.h(PrefixedTagNames.pIcon, { class: "icon", color: "inherit", name: "arrow-head-down", theme: this.theme, size: "inherit", "aria-hidden": "true" }))), validateProps.h("div", { id: contentId, class: "collapsible", role: "region", "aria-labelledby": buttonId, ref: (el) => (this.collapsibleElement = el) }, validateProps.h("div", { ref: (el) => (this.content = el) }, validateProps.h("slot", null)))));
  }
  setCollapsibleElementHeight() {
    setCollapsibleElementHeight(this.collapsibleElement, this.open, this.contentHeight);
  }
  get host() { return validateProps.getElement(this); }
  static get watchers() { return {
    "open": ["openChangeHandler"]
  }; }
};

exports.p_accordion = Accordion;
