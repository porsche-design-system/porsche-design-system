'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const validateProps = require('./validateProps-3b506a0d.js');
const removeAttribute = require('./removeAttribute-5be430c3.js');
const setAttribute = require('./setAttribute-577f81e1.js');
const propertyObserver = require('./property-observer-51888ca1.js');
const scrolling = require('./scrolling-9c4a1008.js');
const theme = require('./theme-25a5ded7.js');
const tabsBarUtils = require('./tabs-bar-utils-cc8e26c1.js');
const throwIfParentIsNotOfKind = require('./throwIfParentIsNotOfKind-d2c71eef.js');
const focusVisibleFallback = require('./focus-visible-fallback-8e9e55aa.js');
require('./getHTMLElements-d3d6e3ec.js');
require('./has-document-f0620e06.js');
require('./isParentOfKind-9c1048fd.js');

const getComponentCss$1 = () => {
  return validateProps.getCss({
    '@global': {
      ':host': {
        display: 'block',
      },
    },
    root: {
      marginBottom: validateProps.pxToRemWithUnit(8),
    },
  });
};

const syncTabsItemsProps = (host, theme) => {
  Array.from(host.children).forEach((item) => {
    item.theme = theme;
    validateProps.forceUpdate(item);
  });
};

const propTypes$1 = {
  size: validateProps.AllowedTypes.breakpoint(tabsBarUtils.TAB_SIZES),
  weight: validateProps.AllowedTypes.oneOf(tabsBarUtils.TAB_WEIGHTS),
  theme: validateProps.AllowedTypes.oneOf(theme.THEMES),
  gradientColorScheme: validateProps.AllowedTypes.oneOf(scrolling.GRADIENT_COLOR_THEMES),
  activeTabIndex: validateProps.AllowedTypes.number,
};
const Tabs = class {
  constructor(hostRef) {
    validateProps.registerInstance(this, hostRef);
    this.tabChange = validateProps.createEvent(this, "tabChange", 3);
    this.defineTabsItemElements = () => {
      // TODO: validation? this could be any kind of dom node
      this.tabsItemElements = Array.from(this.host.children);
    };
    this.setAccessibilityAttributes = () => {
      for (const [index, tab] of Object.entries(this.tabsItemElements)) {
        const attrs = {
          role: 'tabpanel',
          'aria-label': tab.label,
        };
        for (const [key, value] of Object.entries(attrs)) {
          setAttribute.setAttribute(tab, key, value);
        }
        if (+index === this.activeTabIndex) {
          removeAttribute.removeAttribute(tab, 'hidden');
          setAttribute.setAttribute(tab, 'tabindex', '0');
        }
        else {
          setAttribute.setAttribute(tab, 'hidden');
          removeAttribute.removeAttribute(tab, 'tabindex');
        }
      }
    };
    this.observeProperties = () => {
      this.tabsItemElements.forEach((el) => propertyObserver.observeProperties(el, ['label'], () => validateProps.forceUpdate(this.host)));
    };
    this.onTabChange = (e) => {
      e.stopPropagation(); // prevent double event emission because of identical name
      this.activeTabIndex = e.detail.activeTabIndex;
    };
    this.size = 'small';
    this.weight = 'regular';
    this.theme = 'light';
    this.gradientColorScheme = 'default';
    this.activeTabIndex = 0;
    this.tabsItemElements = [];
  }
  activeTabHandler(newValue) {
    this.setAccessibilityAttributes();
    this.tabChange.emit({ activeTabIndex: newValue });
  }
  connectedCallback() {
    this.defineTabsItemElements();
    validateProps.observeChildren(this.host, () => {
      this.defineTabsItemElements();
      this.observeProperties(); // since attribute won't be there when used with angular or react wrapper
    });
    this.observeProperties();
  }
  componentDidLoad() {
    this.setAccessibilityAttributes();
  }
  componentDidUpdate() {
    this.setAccessibilityAttributes();
  }
  disconnectedCallback() {
    validateProps.unobserveChildren(this.host);
  }
  render() {
    validateProps.validateProps(this, propTypes$1);
    validateProps.attachComponentCss(this.host, getComponentCss$1);
    syncTabsItemsProps(this.host, this.theme);
    const PrefixedTagNames = validateProps.getPrefixedTagNames(this.host);
    return (validateProps.h(validateProps.Host, null, validateProps.h(PrefixedTagNames.pTabsBar, { class: "root", size: this.size, weight: this.weight, theme: this.theme, gradientColorScheme: this.gradientColorScheme, activeTabIndex: this.activeTabIndex, onTabChange: this.onTabChange }, this.tabsItemElements.map((tab, index) => (validateProps.h("button", { key: index, type: "button" }, tab.label)))), validateProps.h("slot", null)));
  }
  get host() { return validateProps.getElement(this); }
  static get watchers() { return {
    "activeTabIndex": ["activeTabHandler"]
  }; }
};

const getComponentCss = (theme) => {
  return validateProps.getCss({
    '@global': {
      ':host': validateProps.addImportantToEachRule(Object.assign({ display: 'block', '&([hidden])': {
          display: 'none',
        } }, focusVisibleFallback.getFocusVisibleFallback(Object.entries(validateProps.getFocusJssStyle({ color: validateProps.getThemedColors(theme).primaryColor })).reduce((result, [key, val]) => {
        result[key.startsWith('&') ? `&(${key.slice(1)})` : key] = val;
        return result;
      }, {})))),
    },
  });
};

const propTypes = {
  label: validateProps.AllowedTypes.string,
};
const TabsItem = class {
  constructor(hostRef) {
    validateProps.registerInstance(this, hostRef);
    this.label = undefined;
  }
  connectedCallback() {
    throwIfParentIsNotOfKind.throwIfParentIsNotOfKind(this.host, 'p-tabs');
  }
  render() {
    validateProps.validateProps(this, propTypes);
    validateProps.attachComponentCss(this.host, getComponentCss, this.host.theme || 'light' // default as fallback
    );
    return validateProps.h("slot", null);
  }
  get host() { return validateProps.getElement(this); }
};

exports.p_tabs = Tabs;
exports.p_tabs_item = TabsItem;
