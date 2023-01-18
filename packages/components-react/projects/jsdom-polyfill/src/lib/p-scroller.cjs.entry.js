'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const validateProps = require('./validateProps-3b506a0d.js');
const getHTMLElements = require('./getHTMLElements-d3d6e3ec.js');
const scrolling = require('./scrolling-9c4a1008.js');
const theme = require('./theme-25a5ded7.js');
const borderWidthBase = require('./borderWidthBase-2a045646.js');
require('./has-document-f0620e06.js');

const themeLightStateFocus = '#0A0AFF';

const themeDarkStateFocus = '#0A0AFF';

const getFocusStyle = (opts) => {
    return {
        '&:focus': {
            outline: `${opts?.theme === 'dark' ? themeDarkStateFocus : themeLightStateFocus} solid ${borderWidthBase.borderWidthBase}`,
            outlineOffset: opts?.offset || '2px',
            // why? have a look at this article https://developer.paciellogroup.com/blog/2018/03/focus-visible-and-backwards-compatibility/
            '&:not(:focus-visible)': {
                outlineColor: 'transparent',
            },
        },
    };
};

const getComponentCss = (gradientColorScheme, isNextHidden, isPrevHidden, scrollIndicatorPosition, theme) => {
  const { backgroundColor, backgroundSurfaceColor } = validateProps.getThemedColors(theme);
  const gradientColor = gradientColorScheme === 'surface' ? backgroundSurfaceColor : backgroundColor;
  const gradientColorTransparent = gradientColor + (gradientColor.length === 4 ? '0' : '00');
  const actionPrevNextStyles = {
    position: 'relative',
    padding: `${validateProps.pxToRemWithUnit(4)} 0`,
    pointerEvents: 'none',
    display: 'flex',
    alignItems: scrollIndicatorPosition === 'center' ? 'center' : 'flex-start',
  };
  return validateProps.getCss({
    '@global': {
      ':host': {
        display: 'block',
        height: validateProps.addImportantToRule('inherit'),
      },
    },
    root: {
      display: 'grid',
      gridTemplateColumns: '2em minmax(0, 1fr) 2em',
      margin: `0 ${validateProps.pxToRemWithUnit(-4)}`,
      height: 'inherit',
    },
    'scroll-area': {
      minHeight: validateProps.pxToRemWithUnit(24),
      gridArea: '1 / 1 / 1 / -1',
      padding: validateProps.pxToRemWithUnit(4),
      overflow: 'scroll hidden',
      msOverflowStyle: 'none' /* IE and Edge */,
      scrollbarWidth: 'none' /* Firefox */,
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
    // Extra wrapper needed to compensate different offset parent calculation depending on browser.
    // Needed for position of status bar.
    'scroll-wrapper': Object.assign(Object.assign({}, getFocusStyle()), { position: 'relative', display: 'inline-flex', minWidth: '100%', verticalAlign: 'top' }),
    trigger: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      width: '1px',
      visibility: 'hidden',
      '&:first-of-type': {
        left: 0,
      },
      '&:last-of-type': {
        right: 0,
      },
    },
    'action-prev': Object.assign(Object.assign({}, actionPrevNextStyles), { marginLeft: '-1px', gridArea: '1 / 1 / 1 / 1', justifyContent: 'flex-start', background: `linear-gradient(90deg, ${gradientColor} 50%, ${gradientColorTransparent} 100%)`, visibility: isPrevHidden ? 'hidden' : 'visible', '& .button::before': {
        left: 0,
      } }),
    'action-next': Object.assign(Object.assign({}, actionPrevNextStyles), { marginRight: '-1px', gridArea: '1 / 3 / 1 / 3', justifyContent: 'flex-end', background: `linear-gradient(90deg, ${gradientColorTransparent} 0%, ${gradientColor} 50%)`, visibility: isNextHidden ? 'hidden' : 'visible', '& .button::before': {
        right: 0,
      } }),
    button: {
      pointerEvents: 'auto',
      position: 'static',
      // Pseudo-element to stretch the click-area to full height
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: 'max(2rem, 80%)',
      },
    },
  });
};

const propTypes = {
  theme: validateProps.AllowedTypes.oneOf(theme.THEMES),
  gradientColorScheme: validateProps.AllowedTypes.oneOf(scrolling.GRADIENT_COLOR_THEMES),
  scrollToPosition: validateProps.AllowedTypes.shape({
    scrollPosition: validateProps.AllowedTypes.number,
    isSmooth: validateProps.AllowedTypes.boolean,
  }),
  scrollIndicatorPosition: validateProps.AllowedTypes.oneOf(scrolling.SCROLL_INDICATOR_POSITIONS),
};
const Scroller = class {
  constructor(hostRef) {
    validateProps.registerInstance(this, hostRef);
    this.initIntersectionObserver = () => {
      const [firstTrigger, lastTrigger] = getHTMLElements.getHTMLElements(this.host.shadowRoot, '.trigger');
      this.intersectionObserver = new IntersectionObserver((entries) => {
        for (const { target, isIntersecting } of entries) {
          if (target === firstTrigger) {
            this.isPrevHidden = isIntersecting;
          }
          else if (target === lastTrigger) {
            this.isNextHidden = isIntersecting;
          }
        }
      }, {
        root: this.scrollAreaElement,
        // Defines the percentage of how much of the target (trigger) is visible within the element specified (this.host).
        // In this case 0.9px of the trigger have to be hidden to show the gradient
        threshold: 0.1,
      });
      this.intersectionObserver.observe(firstTrigger);
      this.intersectionObserver.observe(lastTrigger);
    };
    this.scrollOnPrevNextClick = (direction) => {
      const scrollPosition = scrolling.getScrollPositionAfterPrevNextClick(this.scrollAreaElement, direction);
      scrolling.scrollElementTo(this.scrollAreaElement, scrollPosition);
    };
    this.theme = 'light';
    this.gradientColorScheme = 'default';
    this.scrollToPosition = undefined;
    this.scrollIndicatorPosition = 'center';
    this.isPrevHidden = true;
    this.isNextHidden = true;
  }
  scrollToPositionHandler() {
    this.scrollToPosition = validateProps.parseJSONAttribute(this.scrollToPosition);
    // watcher might trigger before ref is defined with ssr
    if (this.scrollAreaElement) {
      const { scrollPosition, isSmooth } = this.scrollToPosition;
      if (isSmooth) {
        scrolling.scrollElementTo(this.scrollAreaElement, scrollPosition);
      }
      else {
        this.scrollAreaElement.scrollLeft = scrollPosition;
      }
    }
  }
  connectedCallback() {
    if (this.scrollAreaElement) {
      this.scrollToPosition = validateProps.parseJSONAttribute(this.scrollToPosition);
    }
  }
  componentDidLoad() {
    this.initIntersectionObserver();
    if (this.scrollToPosition) {
      this.scrollToPositionHandler();
    }
  }
  // should only update if scrollable
  componentShouldUpdate(_newVal, _oldVal, propName) {
    return !(propName === 'scrollToPosition' && !scrolling.isScrollable(this.isNextHidden, this.isPrevHidden));
  }
  render() {
    validateProps.validateProps(this, propTypes);
    validateProps.attachComponentCss(this.host, getComponentCss, this.gradientColorScheme, this.isNextHidden, this.isPrevHidden, this.scrollIndicatorPosition, this.theme);
    const renderPrevNextButton = (direction) => {
      const PrefixedTagNames = validateProps.getPrefixedTagNames(this.host);
      return (validateProps.h("div", { key: direction, class: direction === 'next' ? 'action-next' : 'action-prev' }, validateProps.h(PrefixedTagNames.pButtonPure, { class: "button", type: "button", tabIndex: -1, hideLabel: true, size: "inherit", icon: direction === 'next' ? 'arrow-head-right' : 'arrow-head-left', onClick: () => this.scrollOnPrevNextClick(direction), theme: this.theme, "aria-hidden": "true" }, direction)));
    };
    return (validateProps.h("div", { class: "root" }, validateProps.h("div", { class: "scroll-area", ref: (el) => (this.scrollAreaElement = el) }, validateProps.h("div", { class: "scroll-wrapper", tabIndex: scrolling.isScrollable(this.isPrevHidden, this.isNextHidden) ? 0 : null }, validateProps.h("slot", null), validateProps.h("div", { class: "trigger" }), validateProps.h("div", { class: "trigger" }))), ['prev', 'next'].map(renderPrevNextButton)));
  }
  get host() { return validateProps.getElement(this); }
  static get watchers() { return {
    "scrollToPosition": ["scrollToPositionHandler"]
  }; }
};

exports.p_scroller = Scroller;
