'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const validateProps = require('./validateProps-3b506a0d.js');
const constants = require('./constants-6ecb3cbb.js');
const textSmallStyle = require('./textSmallStyle-305ec8fc.js');
const a11y = require('./a11y-4587e563.js');
const slottedStyles = require('./slotted-styles-a900b5d1.js');
require('./textShared-cdf909c4.js');
require('./fontVariant-54ee1e6c.js');
require('./removeAttribute-5be430c3.js');
require('./setAttribute-577f81e1.js');

const { backgroundColor, primaryColor } = validateProps.getThemedColors('light');
const mediaQueryXS = validateProps.getMediaQueryMin('xs');
const mediaQueryForcedColors = '@media (forced-colors: active)';
const directionPositionMap = {
  top: {
    bottom: '100%',
    left: '50%',
    transform: 'translate3d(-50%, 0, 0)', // translate3d used to fix Safari shadow bug
  },
  right: {
    top: '50%',
    left: '100%',
    transform: 'translate3d(0, -50%, 0)',
  },
  bottom: {
    top: '100%',
    left: '50%',
    transform: 'translate3d(-50%, 0, 0)',
  },
  left: {
    top: '50%',
    right: '100%',
    transform: 'translate3d(0, -50%, 0)',
  },
};
const borderWidth = '.75rem';
const transparentColor = 'transparent';
const canvas = 'canvas';
const canvasText = 'canvastext';
const join = (...arr) => arr.join(' ');
const directionArrowMap = {
  top: {
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    borderWidth: join(borderWidth, borderWidth, 0),
    borderColor: join(backgroundColor, transparentColor, transparentColor),
    [mediaQueryForcedColors]: {
      borderColor: join(canvasText, canvas, canvas),
    },
  },
  right: {
    top: '50%',
    right: 0,
    transform: 'translateY(-50%)',
    borderWidth: join(borderWidth, borderWidth, borderWidth, 0),
    borderColor: join(transparentColor, backgroundColor, transparentColor, transparentColor),
    [mediaQueryForcedColors]: {
      borderColor: join(canvas, canvasText, canvas, canvas),
    },
  },
  bottom: {
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    borderWidth: join(0, borderWidth, borderWidth),
    borderColor: join(transparentColor, transparentColor, backgroundColor),
    [mediaQueryForcedColors]: {
      borderColor: join(canvas, canvas, canvasText),
    },
  },
  left: {
    top: '50%',
    left: 0,
    transform: 'translateY(-50%)',
    borderWidth: join(borderWidth, 0, borderWidth, borderWidth),
    borderColor: join(transparentColor, transparentColor, transparentColor, backgroundColor),
    [mediaQueryForcedColors]: {
      borderColor: join(canvas, canvas, canvas, canvasText),
    },
  },
};
const getComponentCss = (direction) => {
  const spacerBox = '-1rem';
  return validateProps.getCss({
    '@global': {
      ':host': Object.assign(Object.assign({}, validateProps.addImportantToEachRule({
        position: 'relative',
        display: 'inline-block',
        width: '1.5rem',
        height: '1.5rem', // height of icon (to improve ssr support)
      })), { verticalAlign: 'top' }),
      p: Object.assign(Object.assign({}, textSmallStyle.textSmallStyle), { margin: 0 }),
    },
    spacer: {
      position: 'absolute',
      zIndex: constants.POPOVER_Z_INDEX,
      top: spacerBox,
      left: spacerBox,
      right: spacerBox,
      bottom: spacerBox,
      filter: 'drop-shadow(0 0 1rem rgba(0,0,0,.3))',
      backdropFilter: 'drop-shadow(0px 0px 0px transparent)',
      pointerEvents: 'none',
      animation: 'var(--p-override-popover-animation-duration, 240ms) $fadeIn ease forwards',
      '&::before': Object.assign({ content: '""', position: 'absolute', borderStyle: 'solid' }, directionArrowMap[direction]),
    },
    popover: Object.assign(Object.assign(Object.assign({ position: 'absolute', maxWidth: '90vw', width: 'max-content', boxSizing: 'border-box', background: backgroundColor, padding: '.5rem 1rem', pointerEvents: 'auto' }, directionPositionMap[direction]), textSmallStyle.textSmallStyle), { listStyleType: 'none', color: primaryColor, whiteSpace: 'inherit', [mediaQueryXS]: {
        maxWidth: validateProps.pxToRemWithUnit(432),
      }, [mediaQueryForcedColors]: {
        outline: `1px solid ${canvasText}`,
      } }),
    '@keyframes fadeIn': {
      from: {
        opacity: 0,
      },
      to: {
        opacity: 1,
      },
    },
  });
};
const getSlottedCss = (host) => {
  return validateProps.getCss(validateProps.buildSlottedStyles(host, validateProps.getBaseSlottedStyles()));
};

const POPOVER_DIRECTIONS = ['top', 'right', 'bottom', 'left'];
const safeZonePx = 16;
const updatePopoverStyles = (host, spacer, popover, direction) => {
  // Reset margin so that it can be recalculated correctly
  popover.style.margin = '0';
  if (!isElementWithinViewport(spacer, popover, direction)) {
    direction = getAutoDirection(spacer, popover);
    validateProps.attachComponentCss(host, getComponentCss, direction);
  }
  // Set margin via inline style to make attachComponentCss cacheable
  popover.style.margin = getPopoverMargin(spacer, popover, direction);
};
const getDocumentHeightWidthWithoutSafeZone = () => {
  const { clientWidth, clientHeight } = document.documentElement;
  return { clientWidth: clientWidth - safeZonePx, clientHeight: clientHeight - safeZonePx };
};
const isElementWithinViewport = (spacer, popover, direction) => {
  const { clientWidth, clientHeight } = getDocumentHeightWidthWithoutSafeZone();
  const spacerRect = spacer.getBoundingClientRect();
  const popoverRect = popover.getBoundingClientRect();
  const isWithinXAxis = spacerRect.left >= safeZonePx && spacerRect.right <= clientWidth;
  const isWithinYAxis = spacerRect.top >= safeZonePx && spacerRect.bottom <= clientHeight;
  switch (direction) {
    case 'top':
      return isWithinXAxis && popoverRect.top >= safeZonePx;
    case 'right':
      return isWithinYAxis && popoverRect.right <= clientWidth;
    case 'bottom':
      return isWithinXAxis && popoverRect.bottom <= clientHeight;
    case 'left':
      return isWithinYAxis && popoverRect.left >= safeZonePx;
  }
};
const calcSpaceForDirections = (spacer, popover) => {
  const { clientWidth, clientHeight } = document.documentElement;
  const spacerRect = spacer.getBoundingClientRect();
  const popoverRect = popover.getBoundingClientRect();
  // determine the **theoretically** maximum available space in all directions within viewport
  return {
    top: spacerRect.top - popoverRect.height,
    right: clientWidth - (spacerRect.right + popoverRect.width),
    bottom: clientHeight - (spacerRect.bottom + popoverRect.height),
    left: spacerRect.left - popoverRect.width,
  };
};
const getAutoDirection = (spacer, popover) => {
  const directionSpaces = calcSpaceForDirections(spacer, popover);
  // Find direction with the most space
  return Object.keys(directionSpaces).reduce((resultDirection, currentDirection) => directionSpaces[resultDirection] >= directionSpaces[currentDirection] ? resultDirection : currentDirection, 'bottom');
};
const getPopoverMargin = (spacer, popover, direction) => {
  const { clientWidth, clientHeight } = getDocumentHeightWidthWithoutSafeZone();
  const spacerRect = spacer.getBoundingClientRect();
  const popoverRect = popover.getBoundingClientRect();
  // check x-axis offset is relevant for popover
  if (['top', 'bottom'].includes(direction) && popoverRect.width > spacerRect.width) {
    // check if popover exceeds left side of viewport
    if (popoverRect.left < safeZonePx) {
      return `0 0 0 ${Math.min(safeZonePx - popoverRect.left, spacerRect.left - popoverRect.left)}px`;
    }
    // check if popover exceeds right side of viewport
    else if (popoverRect.right > clientWidth) {
      return `0 0 0 ${Math.max(clientWidth - popoverRect.right, spacerRect.right - popoverRect.right)}px`;
    }
  }
  // check y-axis offset is relevant for popover
  else if (['left', 'right'].includes(direction) && popoverRect.height > spacerRect.height) {
    // check if popover exceeds top side of viewport
    if (popoverRect.top < safeZonePx) {
      return `${Math.min(safeZonePx - popoverRect.top, spacerRect.top - popoverRect.top)}px 0 0 0`;
    }
    // check if popover exceeds bottom side of viewport
    else if (popoverRect.bottom > clientHeight) {
      return `${Math.max(clientHeight - popoverRect.bottom, spacerRect.bottom - popoverRect.bottom)}px 0 0 0`;
    }
  }
  else {
    return '0';
  }
};
const registeredPopovers = [];
const addDocumentEventListener = (popover) => {
  if (!registeredPopovers.includes(popover)) {
    registeredPopovers.push(popover);
    document.addEventListener('mousedown', onDocumentMousedown);
    document.addEventListener('keydown', onDocumentKeydown);
  }
};
const removeDocumentEventListener = (popover) => {
  const index = registeredPopovers.indexOf(popover);
  if (index > -1) {
    registeredPopovers.splice(index, 1);
  }
  if (registeredPopovers.length === 0) {
    document.removeEventListener('mousedown', onDocumentMousedown);
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};
const onDocumentMousedown = (e) => {
  const popover = registeredPopovers.find(
  // eslint-disable-next-line dot-notation
  (popoverElement) => popoverElement['open'] && !e.composedPath().includes(popoverElement.host));
  if (popover) {
    // eslint-disable-next-line dot-notation
    popover['open'] = false;
  }
};
const onDocumentKeydown = (e) => {
  const { key } = e;
  const isEscape = key === 'Escape';
  if (isEscape || ['SpaceBar', 'Enter', ' '].includes(key)) {
    const popover = registeredPopovers.find(
    // eslint-disable-next-line dot-notation
    (popoverElement) => popoverElement['open'] && (isEscape || !e.composedPath().includes(popoverElement.host)));
    if (popover) {
      // eslint-disable-next-line dot-notation
      popover['open'] = false;
    }
  }
};

const propTypes = {
  direction: validateProps.AllowedTypes.oneOf(POPOVER_DIRECTIONS),
  description: validateProps.AllowedTypes.string,
  aria: validateProps.AllowedTypes.aria(['aria-label']),
};
const Popover = class {
  constructor(hostRef) {
    validateProps.registerInstance(this, hostRef);
    this.onKeydown = (e) => {
      if (e.key === 'Escape') {
        this.button.focus();
      }
    };
    this.direction = 'bottom';
    this.description = undefined;
    this.aria = undefined;
    this.open = false;
  }
  connectedCallback() {
    slottedStyles.attachSlottedCss(this.host, getSlottedCss);
    addDocumentEventListener(this);
  }
  componentDidRender() {
    if (this.open) {
      // calculate / update position only possible after render
      updatePopoverStyles(this.host, this.spacer, this.popover, this.direction);
    }
  }
  disconnectedCallback() {
    removeDocumentEventListener(this);
  }
  render() {
    validateProps.validateProps(this, propTypes);
    validateProps.attachComponentCss(this.host, getComponentCss, this.direction);
    const PrefixedTagNames = validateProps.getPrefixedTagNames(this.host);
    return (validateProps.h(validateProps.Host, { onKeydown: this.onKeydown }, validateProps.h(PrefixedTagNames.pButtonPure, { type: "button", icon: "information", hideLabel: true, onClick: () => (this.open = !this.open),
      // pass string to avoid another update on p-button on each render because of new object reference
      aria: JSON.stringify(Object.assign({ 'aria-expanded': this.open }, a11y.parseAndGetAriaAttributes(this.aria))), ref: (el) => (this.button = el) }, "More information"), this.open && (validateProps.h("div", { class: "spacer", ref: (el) => (this.spacer = el) }, validateProps.h("div", { class: "popover", ref: (el) => (this.popover = el) }, this.description ? validateProps.h("p", null, this.description) : validateProps.h("slot", null))))));
  }
  get host() { return validateProps.getElement(this); }
};

exports.p_popover = Popover;
