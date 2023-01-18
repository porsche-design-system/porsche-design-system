'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const validateProps = require('./validateProps-3b506a0d.js');
const getHTMLElements = require('./getHTMLElements-d3d6e3ec.js');
const setAttribute = require('./setAttribute-577f81e1.js');
const scrolling = require('./scrolling-9c4a1008.js');
const theme = require('./theme-25a5ded7.js');
const tabsBarUtils = require('./tabs-bar-utils-cc8e26c1.js');
const fontWeightStyles = require('./font-weight-styles-cee9f15d.js');
const textSmallStyle = require('./textSmallStyle-305ec8fc.js');
const fontSizeText = require('./fontSizeText-590db5cf.js');
require('./has-document-f0620e06.js');
require('./textShared-cdf909c4.js');
require('./fontVariant-54ee1e6c.js');
require('./fontSizeTextXSmall-ad009c6d.js');
require('./fontSizeTextMedium-c20ab60d.js');
require('./fontSizeTextXLarge-991527e3.js');

const isShadowRootParentOfKind = (element, tagName) => {
  const parentElement = element.getRootNode().host;
  return parentElement && validateProps.getTagName(parentElement) === validateProps.getPrefixedTagNames(element)[validateProps.paramCaseToCamelCase(tagName)];
};

const tabsTransitionDuration = '.4s';
const transformSelector = (selector) => ['a', 'button'].map((tag) => selector.replace(/\[role]/g, tag)).join();
const getComponentCss = (size, weight, theme) => {
  const { primaryColor, hoverColor, focusColor } = validateProps.getThemedColors(theme);
  return validateProps.getCss({
    '@global': Object.assign({ ':host': {
        display: 'block',
        position: validateProps.addImportantToRule('relative'),
      } }, validateProps.addImportantToEachRule(Object.assign(Object.assign({ 
      // would be nice to use shared selector like '::slotted([role])'
      // but this doesn't work reliably when rendering in browser
      [transformSelector('::slotted([role])')]: {
        display: 'inline-block',
        margin: `0 0 calc(.5em - ${validateProps.pxToRemWithUnit(4)}) 0`,
        padding: 0,
        verticalAlign: 'top',
        fontFamily: 'inherit',
        fontStyle: 'inherit',
        fontVariant: 'inherit',
        fontWeight: 'inherit',
        fontSize: 'inherit',
        lineHeight: 'inherit',
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        WebkitAppearance: 'none',
        appearance: 'none',
        outline: '1px solid transparent',
        outlineOffset: '1px',
        textDecoration: 'none',
        textAlign: 'left',
        border: 0,
        background: 'transparent',
        color: primaryColor,
        cursor: 'pointer',
        transition: validateProps.getTransition('color'),
      } }, validateProps.hoverMediaQuery({
      [transformSelector('::slotted([role]:hover)')]: {
        color: hoverColor,
      },
    })), { [transformSelector('::slotted([role]:active),::slotted([role][aria-selected="true"])')]: {
        color: primaryColor,
      }, 
      // TODO: combine link-social-styles with link-button-styles and tabs-bar-styles
      [transformSelector('::slotted([role]:focus)')]: {
        outlineColor: focusColor,
      }, [transformSelector('::slotted([role]:focus:not(:focus-visible))')]: {
        outlineColor: 'transparent',
      }, [transformSelector('::slotted([role]:not(:last-child))')]: {
        marginRight: '1em',
      } }))),
    scroller: Object.assign(Object.assign(Object.assign({}, textSmallStyle.textSmallStyle), { fontWeight: fontWeightStyles.getFontWeight(weight) }), validateProps.buildResponsiveStyles(size, (s) => ({ fontSize: fontSizeText.fontSizeText[s] }))),
    bar: {
      display: 'block',
      position: 'absolute',
      width: 0,
      height: weight === 'semibold' ? '.125em' : '.09375em',
      left: 0,
      bottom: `-${validateProps.pxToRemWithUnit(4)}`,
      background: primaryColor,
      '&--enable-transition': {
        willChange: 'width',
        transition: `transform ${tabsTransitionDuration},width ${tabsTransitionDuration}`,
      },
    },
  });
};

const propTypes = {
  size: validateProps.AllowedTypes.breakpoint(tabsBarUtils.TAB_SIZES),
  weight: validateProps.AllowedTypes.oneOf(tabsBarUtils.TAB_WEIGHTS),
  theme: validateProps.AllowedTypes.oneOf(theme.THEMES),
  gradientColorScheme: validateProps.AllowedTypes.oneOf(scrolling.GRADIENT_COLOR_THEMES),
  activeTabIndex: validateProps.AllowedTypes.number,
};
const TabsBar = class {
  constructor(hostRef) {
    validateProps.registerInstance(this, hostRef);
    this.tabChange = validateProps.createEvent(this, "tabChange", 3);
    this.direction = 'next';
    this.setAccessibilityAttributes = () => {
      this.tabElements.forEach((tab, index) => {
        const tabIndex = this.activeTabIndex || 0;
        const isFocusable = tabIndex === +index;
        const isSelected = this.activeTabIndex === +index;
        const attrs = {
          role: 'tab',
          tabindex: isFocusable ? '0' : '-1',
          'aria-selected': isSelected ? 'true' : 'false',
        };
        /* eslint-disable-next-line guard-for-in */
        for (const key in attrs) {
          setAttribute.setAttribute(tab, key, attrs[key]);
        }
      });
    };
    this.setTabElements = () => {
      this.tabElements = getHTMLElements.getHTMLElements(this.host, 'a,button');
    };
    this.addEventListeners = () => {
      this.scrollerElement.addEventListener('click', (e) => {
        const newTabIndex = this.tabElements.indexOf(e.target);
        if (newTabIndex >= 0) {
          this.onTabClick(newTabIndex);
        }
      });
      this.scrollerElement.addEventListener('keydown', this.onKeydown);
    };
    this.onTabClick = (newTabIndex) => {
      this.tabChange.emit({ activeTabIndex: newTabIndex });
    };
    this.onKeydown = (e) => {
      let upcomingFocusedTabIndex;
      const focusedTabIndex = this.hasPTabsParent ? this.activeTabIndex || 0 : tabsBarUtils.getFocusedTabIndex(this.tabElements);
      switch (e.key) {
        case 'ArrowLeft':
        case 'Left':
          upcomingFocusedTabIndex = tabsBarUtils.getPrevNextTabIndex('prev', this.tabElements.length, focusedTabIndex);
          break;
        case 'ArrowRight':
        case 'Right':
          upcomingFocusedTabIndex = tabsBarUtils.getPrevNextTabIndex('next', this.tabElements.length, focusedTabIndex);
          break;
        case 'Home':
          upcomingFocusedTabIndex = 0;
          break;
        case 'End':
          upcomingFocusedTabIndex = this.tabElements.length - 1;
          break;
        case 'Enter':
          this.onTabClick(focusedTabIndex);
          return;
        default:
          return;
      }
      if (this.hasPTabsParent) {
        this.onTabClick(upcomingFocusedTabIndex);
      }
      this.tabElements[upcomingFocusedTabIndex].focus();
      e.preventDefault();
    };
    this.scrollActiveTabIntoView = (isSmooth = true) => {
      // scrollAreaElement might be undefined in certain scenarios with framework routing involved
      // where the watcher triggers this function way before componentDidLoad calls defineHTMLElements
      if (this.scrollerElement) {
        const scrollActivePosition = scrolling.getScrollActivePosition(this.tabElements, this.direction, this.activeTabIndex, this.scrollerElement);
        this.scrollerElement.scrollToPosition = {
          scrollPosition: scrollActivePosition,
          isSmooth,
        };
      }
    };
    this.setBarStyle = () => {
      tabsBarUtils.setBarStyle(this.tabElements, this.activeTabIndex, this.barElement, this.prevActiveTabIndex);
    };
    this.observeBreakpointChange = () => {
      if (typeof validateProps.parseJSON(this.size) === 'object') {
        validateProps.observeBreakpointChange(this.host, () => {
          this.setBarStyle();
          this.scrollActiveTabIntoView(false);
        });
      }
    };
    this.size = 'small';
    this.weight = 'regular';
    this.theme = 'light';
    this.gradientColorScheme = 'default';
    this.activeTabIndex = undefined;
    this.tabElements = [];
  }
  activeTabHandler(newValue, oldValue) {
    // can be null if removeAttribute() is used
    if (newValue === null) {
      this.activeTabIndex = undefined;
    }
    this.prevActiveTabIndex = oldValue;
    this.direction = newValue > oldValue || oldValue === undefined ? 'next' : 'prev';
    this.scrollActiveTabIntoView();
  }
  connectedCallback() {
    this.hasPTabsParent = isShadowRootParentOfKind(this.host, 'p-tabs');
    this.setTabElements();
    // TODO: wouldn't a slot change listener be good enough? https://developer.mozilla.org/en-US/docs/Web/API/HTMLSlotElement/slotchange_event
    validateProps.observeChildren(this.host, () => {
      this.setTabElements();
      this.activeTabIndex = tabsBarUtils.sanitizeActiveTabIndex(this.activeTabIndex, this.tabElements.length);
      this.prevActiveTabIndex = this.activeTabIndex;
      this.setBarStyle();
      this.setAccessibilityAttributes();
    });
    this.observeBreakpointChange();
  }
  componentDidLoad() {
    // TODO: validation of active element index inside of tabs bar!
    this.activeTabIndex = tabsBarUtils.sanitizeActiveTabIndex(this.activeTabIndex, this.tabElements.length); // since watcher doesn't trigger on first render
    if (!(this.direction === 'next' && this.activeTabIndex === undefined)) {
      // skip scrolling on first render when no activeElementIndex is set
      this.scrollActiveTabIntoView(false);
    }
    this.addEventListeners();
    this.observeBreakpointChange();
    // setBarStyle() is needed when intersection observer does not trigger because all tabs are visible
    // and first call in componentDidRender() is skipped because elements are not defined, yet
    this.setBarStyle();
  }
  componentDidRender() {
    // needs to happen after render in order to have status bar defined and proper calculation
    this.setBarStyle();
    this.setAccessibilityAttributes();
  }
  disconnectedCallback() {
    validateProps.unobserveBreakpointChange(this.host);
    validateProps.unobserveChildren(this.host);
  }
  render() {
    validateProps.validateProps(this, propTypes);
    validateProps.attachComponentCss(this.host, getComponentCss, this.size, this.weight, this.theme);
    const PrefixedTagNames = validateProps.getPrefixedTagNames(this.host);
    return (validateProps.h(PrefixedTagNames.pScroller, { class: "scroller", role: "tablist", theme: this.theme, gradientColorScheme: this.gradientColorScheme, scrollIndicatorPosition: "top", ref: (el) => (this.scrollerElement = el) }, validateProps.h("slot", null), validateProps.h("span", { class: "bar", ref: (el) => (this.barElement = el) })));
  }
  get host() { return validateProps.getElement(this); }
  static get watchers() { return {
    "activeTabIndex": ["activeTabHandler"]
  }; }
};

exports.p_tabs_bar = TabsBar;
