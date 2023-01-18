'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const validateProps = require('./validateProps-3b506a0d.js');
const theme = require('./theme-25a5ded7.js');
const getClickedItem = require('./getClickedItem-5fad2472.js');
const textSmallStyle = require('./textSmallStyle-305ec8fc.js');
const textXSmallStyle = require('./textXSmallStyle-0148b295.js');
const hasDocument = require('./has-document-f0620e06.js');
const fontVariant = require('./fontVariant-54ee1e6c.js');
const throwIfParentIsNotOfKind = require('./throwIfParentIsNotOfKind-d2c71eef.js');
const a11y = require('./a11y-4587e563.js');
const getButtonBaseAriaAttributes = require('./get-button-base-aria-attributes-ba97ac40.js');
require('./textShared-cdf909c4.js');
require('./fontSizeTextXSmall-ad009c6d.js');
require('./isParentOfKind-9c1048fd.js');
require('./removeAttribute-5be430c3.js');
require('./setAttribute-577f81e1.js');

const throwIfPropIsUndefined = (element, propName, value) => {
  if (value === undefined) {
    throw new Error(`The required property '${propName}' is undefined on ${validateProps.getTagName(element)}`);
  }
};

const MIN_ITEM_WIDTH = 46;
const MAX_ITEM_WIDTH = 220;
const getComponentCss$1 = (maxWidth) => {
  maxWidth = (maxWidth > MAX_ITEM_WIDTH && MAX_ITEM_WIDTH) || (maxWidth < MIN_ITEM_WIDTH && MIN_ITEM_WIDTH) || maxWidth;
  return validateProps.getCss({
    '@global': {
      ':host': validateProps.addImportantToEachRule({
        display: 'grid',
        gridAutoRows: '1fr',
        gridTemplateColumns: `repeat(auto-fit, ${maxWidth}px)`,
        gap: '4px',
      }),
    },
  });
};

const ITEM_PADDING = validateProps.pxToRemWithUnit(16);
const { font: BUTTON_FONT } = textSmallStyle.textSmallStyle;
const { font: LABEL_FONT } = textXSmallStyle.textXSmallStyle;
const ICON_SIZE = validateProps.pxToRemWithUnit(24);
const ICON_MARGIN = validateProps.pxToRemWithUnit(4);
const getColors = (isDisabled, isSelected, bgColor, theme) => {
  const themedColors = validateProps.getThemedColors(theme);
  const { primaryColor, contrastMediumColor } = isSelected ? validateProps.getInvertedThemedColors(theme) : themedColors;
  const backgroundColor = themedColors[isSelected ? 'contrastHighColor' : bgColor === 'background-surface' ? 'backgroundColor' : 'backgroundSurfaceColor'];
  return isDisabled
    ? {
      backgroundColor,
      buttonColor: themedColors.disabledColor,
      labelColor: themedColors.disabledColor,
    }
    : {
      backgroundColor,
      buttonColor: primaryColor,
      labelColor: contrastMediumColor,
    };
};
const getComponentCss = (isDisabled, isSelected, bgColor, theme) => {
  const { primaryColor, contrastLowColor } = validateProps.getThemedColors(theme);
  const { backgroundColor, buttonColor, labelColor } = getColors(isDisabled, isSelected, bgColor, theme);
  return validateProps.getCss({
    '@global': {
      ':host': validateProps.addImportantToEachRule({
        display: 'block',
        outline: 0,
      }),
      button: Object.assign(Object.assign(Object.assign({ display: 'block', height: '100%', width: '100%', padding: `${validateProps.pxToRemWithUnit(12)} ${ITEM_PADDING}`, margin: 0, border: 0, background: backgroundColor, color: buttonColor }, textSmallStyle.textSmallStyle), validateProps.getFocusJssStyle({ color: primaryColor })), (isDisabled
        ? {
          cursor: 'not-allowed',
        }
        : Object.assign({ cursor: 'pointer' }, (!isSelected &&
          validateProps.hoverMediaQuery({
            transition: validateProps.getTransition('background-color'),
            '&:hover': {
              background: contrastLowColor,
            },
          }))))),
      // label
      span: Object.assign(Object.assign({ display: 'block' }, textXSmallStyle.textXSmallStyle), { color: labelColor }),
    },
    icon: {
      height: ICON_SIZE,
      width: ICON_SIZE,
      marginRight: ICON_MARGIN,
    },
  });
};

const SEGMENTED_CONTROL_BACKGROUND_COLORS = ['background-surface', 'background-default'];
// wide font for safety buffer, Porsche Next might not be available or not used and cause wrong calculation
const tempFont = 'sans-serif';
// temporary dom node to measure max-width of children content
const tempDiv = hasDocument.hasDocument ? document.createElement('div') : undefined;
if (tempDiv) {
  tempDiv.style.position = 'absolute';
  tempDiv.style.visibility = 'hidden';
  tempDiv.style.padding = `0 ${ITEM_PADDING}`;
  tempDiv.style.boxSizing = 'border-box';
  tempDiv.style.font = BUTTON_FONT.replace(fontVariant.fontFamily, tempFont);
}
const tempLabel = hasDocument.hasDocument ? document.createElement('div') : undefined;
if (tempLabel) {
  tempLabel.style.font = LABEL_FONT.replace(fontVariant.fontFamily, tempFont);
}
const tempIcon = hasDocument.hasDocument ? document.createElement('div') : undefined;
if (tempIcon) {
  tempIcon.style.display = 'inline-block';
  tempIcon.style.width = ICON_SIZE;
  tempIcon.style.marginRight = ICON_MARGIN;
}
const getItemMaxWidth = (host) => {
  tempDiv.innerHTML = '';
  host.shadowRoot.append(tempDiv);
  const widths = Array.from(host.children).map((item) => {
    tempDiv.innerHTML = item.innerHTML;
    if (item.icon || item.iconSource) {
      tempDiv.prepend(tempIcon);
    }
    if (item.label) {
      tempLabel.innerHTML = item.label;
      tempDiv.prepend(tempLabel);
    }
    return parseFloat(getComputedStyle(tempDiv).width);
  });
  tempDiv.remove();
  return Math.max(...widths);
};
const syncSegmentedControlItemsProps = (host, value, backgroundColor, theme) => {
  Array.from(host.children).forEach((item) => {
    item.selected = item.value === value;
    item.backgroundColor = backgroundColor;
    item.theme = theme;
    validateProps.forceUpdate(item);
  });
};

const propTypes$1 = {
  backgroundColor: validateProps.AllowedTypes.oneOf(SEGMENTED_CONTROL_BACKGROUND_COLORS),
  theme: validateProps.AllowedTypes.oneOf(theme.THEMES),
  value: validateProps.AllowedTypes.oneOf([validateProps.AllowedTypes.string, validateProps.AllowedTypes.number]),
};
const SegmentedControl = class {
  constructor(hostRef) {
    validateProps.registerInstance(this, hostRef);
    this.segmentedControlChange = validateProps.createEvent(this, "segmentedControlChange", 3);
    this.updateValue = (item) => {
      if (item) {
        this.value = item.value; // causes rerender
        this.segmentedControlChange.emit({ value: this.value });
        item.focus();
      }
    };
    this.backgroundColor = 'background-default';
    this.theme = 'light';
    this.value = undefined;
  }
  connectedCallback() {
    getClickedItem.throwIfChildrenAreNotOfKind(this.host, 'p-segmented-control-item');
    // child property changes to label or icon are detected via prop watchers within child
    // here we take care of dom changes like adding/removing a child or changing its content
    validateProps.observeChildren(this.host, () => {
      getClickedItem.throwIfChildrenAreNotOfKind(this.host, 'p-segmented-control-item');
      validateProps.forceUpdate(this.host);
    });
  }
  componentDidLoad() {
    this.host.addEventListener('click', (e) => this.updateValue(getClickedItem.getClickedItem(this.host, 'p-segmented-control-item', e.composedPath())));
  }
  disconnectedCallback() {
    validateProps.unobserveChildren(this.host);
  }
  render() {
    validateProps.validateProps(this, propTypes$1);
    validateProps.attachComponentCss(this.host, getComponentCss$1, getItemMaxWidth(this.host));
    syncSegmentedControlItemsProps(this.host, this.value, this.backgroundColor, this.theme);
    return (validateProps.h(validateProps.Host, { role: "group" }, validateProps.h("slot", null)));
  }
  get host() { return validateProps.getElement(this); }
};

const getButtonAttributes = (isSelected, isDisabled) => (Object.assign(Object.assign({}, getButtonBaseAriaAttributes.getButtonBaseAriaAttributes(isDisabled, false)), a11y.parseAndGetAriaAttributes({ 'aria-pressed': isSelected })));

const propTypes = {
  value: validateProps.AllowedTypes.oneOf([validateProps.AllowedTypes.string, validateProps.AllowedTypes.number]),
  disabled: validateProps.AllowedTypes.boolean,
  label: validateProps.AllowedTypes.string,
  icon: validateProps.AllowedTypes.string,
  iconSource: validateProps.AllowedTypes.string,
};
const SegmentedControlItem = class {
  constructor(hostRef) {
    validateProps.registerInstance(this, hostRef);
    this.value = undefined;
    this.disabled = false;
    this.label = undefined;
    this.icon = undefined;
    this.iconSource = undefined;
  }
  handleLabelChange() {
    // when these props change, we inform the parent to recalculate the max width for all items
    getClickedItem.updateParent(this.host);
  }
  onClick(e) {
    if (this.disabled || this.host.selected) {
      e.stopPropagation();
    }
  }
  connectedCallback() {
    throwIfParentIsNotOfKind.throwIfParentIsNotOfKind(this.host, 'p-segmented-control');
  }
  render() {
    validateProps.validateProps(this, propTypes);
    // this additional validation is still needed because undefined is allowed with current propTypes
    throwIfPropIsUndefined(this.host, 'value', this.value);
    validateProps.attachComponentCss(this.host, getComponentCss, this.disabled, this.host.selected, this.host.backgroundColor || 'background-default', // default as fallback
    this.host.theme || 'light' // default as fallback
    );
    const PrefixedTagNames = validateProps.getPrefixedTagNames(this.host);
    return (validateProps.h("button", Object.assign({ type: "button" }, getButtonAttributes(this.host.selected, this.disabled)), this.label && validateProps.h("span", null, this.label), (this.icon || this.iconSource) && (validateProps.h(PrefixedTagNames.pIcon, { class: "icon", size: "inherit", name: this.icon, source: this.iconSource, color: "inherit", theme: this.host.theme || 'light', "aria-hidden": "true" })), validateProps.h("slot", null)));
  }
  static get delegatesFocus() { return true; }
  get host() { return validateProps.getElement(this); }
  static get watchers() { return {
    "label": ["handleLabelChange"],
    "icon": ["handleLabelChange"],
    "iconSource": ["handleLabelChange"]
  }; }
};

exports.p_segmented_control = SegmentedControl;
exports.p_segmented_control_item = SegmentedControlItem;
