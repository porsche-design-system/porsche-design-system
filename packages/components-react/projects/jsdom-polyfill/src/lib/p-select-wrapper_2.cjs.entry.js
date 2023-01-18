'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const validateProps = require('./validateProps-3b506a0d.js');
const a11y = require('./a11y-4587e563.js');
const getSlotTextContent = require('./getSlotTextContent-ce64fc20.js');
const setAttribute = require('./setAttribute-577f81e1.js');
const required = require('./required-2c3ad64c.js');
const hasDescription = require('./hasDescription-b1e1f402.js');
const isVisibleFormState = require('./isVisibleFormState-024f87c3.js');
const slottedStyles = require('./slotted-styles-a900b5d1.js');
const getDataThemeDarkAttribute = require('./getDataThemeDarkAttribute-3ea7a73c.js');
const theme = require('./theme-25a5ded7.js');
const getOnlyChildOfKindHTMLElementOrThrow = require('./getOnlyChildOfKindHTMLElementOrThrow-65ea732e.js');
const formStyles = require('./form-styles-e5f9c86c.js');
const propertyObserver = require('./property-observer-51888ca1.js');
const throwIfRootNodeIsNotOneOfKind = require('./throwIfRootNodeIsNotOneOfKind-c4787f12.js');
const getHTMLElements = require('./getHTMLElements-d3d6e3ec.js');
const hasAttribute = require('./hasAttribute-cffeb74d.js');
const textSmallStyle = require('./textSmallStyle-305ec8fc.js');
require('./removeAttribute-5be430c3.js');
require('./hasNamedSlot-c9552a6a.js');
require('./spacingStaticXSmall-0918e28c.js');
require('./isParentOfKind-9c1048fd.js');
require('./transformSelectorToDirectChildSelector-f570e779.js');
require('./textXSmallStyle-0148b295.js');
require('./textShared-cdf909c4.js');
require('./fontVariant-54ee1e6c.js');
require('./fontSizeTextXSmall-ad009c6d.js');

const isTouchDevice = () => {
  if (!validateProps.hasWindow) {
    return;
  }
  return !!('ontouchstart' in window || window.navigator.maxTouchPoints > 0);
};

const DROPDOWN_DIRECTIONS_INTERNAL = ['down', 'up'];
const DROPDOWN_DIRECTIONS = [...DROPDOWN_DIRECTIONS_INTERNAL, 'auto'];
const isCustomDropdown = (filter, native) => {
  if (filter) {
    return true;
  }
  else if (native) {
    return false;
  }
  else {
    return !isTouchDevice();
  }
};

const { primaryColor: themeLightBaseColor$1 } = validateProps.getThemedColors('light');
const OPTION_HEIGHT = 32; // optgroups are higher and ignored
const getComponentCss$1 = (isDisabled, hideLabel, state, theme) => {
  const isDarkTheme = validateProps.isThemeDark(theme);
  const { primaryColor, backgroundColor } = validateProps.getThemedColors(theme);
  const defaultPadding = validateProps.pxToRemWithUnit(isVisibleFormState.isVisibleFormState(state) ? 10 : 11);
  return validateProps.getCss(Object.assign(Object.assign(Object.assign({ '@global': Object.assign({ ':host': {
        display: 'block',
      } }, validateProps.addImportantToEachRule(validateProps.mergeDeep(formStyles.getBaseChildStyles('select', state, theme, {
      position: 'static',
      cursor: 'pointer',
      padding: [defaultPadding, validateProps.pxToRemWithUnit(47), defaultPadding, defaultPadding].join(' '),
      '&@-moz-document url-prefix()': {
        // fix for 3px text-indention in FF
        paddingLeft: validateProps.pxToRemWithUnit(8),
      },
    }), {
      '::slotted(select:disabled)': {
        background: isDarkTheme ? themeLightBaseColor$1 : backgroundColor, // 🤷
      },
    }))), root: {
      display: 'block',
      position: 'relative',
    } }, formStyles.getLabelStyles('select', isDisabled, hideLabel, state, theme, {
    icon: {
      position: 'absolute',
      bottom: validateProps.pxToRemWithUnit(12),
      right: validateProps.pxToRemWithUnit(12),
      color: primaryColor,
      pointerEvents: 'none',
      transform: 'rotate3d(0,0,1,0.0001deg)',
      transition: validateProps.getTransition('transform'),
      '&--open': {
        transform: 'rotate3d(0,0,1,180deg)',
      },
    },
  })), required.getFunctionalComponentRequiredStyles(theme)), required.getFunctionalComponentStateMessageStyles(theme, state)));
};
const getSlottedCss = (host) => {
  return validateProps.getCss(validateProps.buildSlottedStyles(host, validateProps.getBaseSlottedStyles({ withDarkTheme: true })));
};

const propTypes = {
  label: validateProps.AllowedTypes.string,
  description: validateProps.AllowedTypes.string,
  state: validateProps.AllowedTypes.oneOf(required.FORM_STATES),
  message: validateProps.AllowedTypes.string,
  hideLabel: validateProps.AllowedTypes.breakpoint('boolean'),
  filter: validateProps.AllowedTypes.boolean,
  theme: validateProps.AllowedTypes.oneOf(theme.THEMES),
  dropdownDirection: validateProps.AllowedTypes.oneOf(DROPDOWN_DIRECTIONS),
  native: validateProps.AllowedTypes.boolean,
};
const SelectWrapper = class {
  constructor(hostRef) {
    validateProps.registerInstance(this, hostRef);
    this.label = '';
    this.description = '';
    this.state = 'none';
    this.message = '';
    this.hideLabel = false;
    this.filter = false;
    this.theme = 'light';
    this.dropdownDirection = 'auto';
    this.native = false;
  }
  connectedCallback() {
    slottedStyles.attachSlottedCss(this.host, getSlottedCss);
    this.observeAttributes(); // on every reconnect
  }
  componentWillLoad() {
    this.select = getOnlyChildOfKindHTMLElementOrThrow.getOnlyChildOfKindHTMLElementOrThrow(this.host, 'select');
    this.observeAttributes(); // once initially
    this.hasCustomDropdown = isCustomDropdown(this.filter, this.native);
    if (this.hasCustomDropdown) {
      setAttribute.setAttribute(this.select, 'tabindex', '-1');
      setAttribute.setAttribute(this.select, 'aria-hidden', 'true');
    }
  }
  componentDidRender() {
    /*
     * This is a workaround to improve accessibility because the select and the label/description/message text are placed in different DOM.
     * Referencing ID's from outside the component is impossible because the web component’s DOM is separate.
     * We have to wait for full support of the Accessibility Object Model (AOM) to provide the relationship between shadow DOM and slots.
     */
    if (!this.hasCustomDropdown) {
      a11y.setAriaAttributes(this.select, {
        label: this.label,
        message: this.message || this.description,
        state: this.state,
      });
    }
  }
  disconnectedCallback() {
    validateProps.unobserveAttributes(this.select);
  }
  render() {
    validateProps.validateProps(this, propTypes);
    const { disabled } = this.select;
    validateProps.attachComponentCss(this.host, getComponentCss$1, disabled, this.hideLabel, this.state, this.theme);
    const labelProps = disabled
      ? {}
      : {
        onClick: () => (this.hasCustomDropdown
          ? this.dropdownElement.shadowRoot.children[0]
          : this.select).focus(),
      };
    const PrefixedTagNames = validateProps.getPrefixedTagNames(this.host);
    return (validateProps.h(validateProps.Host, Object.assign({}, getDataThemeDarkAttribute.getDataThemeDarkAttribute(this.theme)), validateProps.h("div", { class: "root" }, validateProps.h("label", { class: "label" }, required.hasLabel(this.host, this.label) && (validateProps.h("span", Object.assign({ class: "label__text" }, labelProps), this.label || validateProps.h("slot", { name: "label" }), isVisibleFormState.isRequiredAndParentNotRequired(this.host, this.select) && validateProps.h(required.Required, null))), hasDescription.hasDescription(this.host, this.description) && (validateProps.h("span", Object.assign({ class: "label__text label__text--description" }, labelProps), this.description || validateProps.h("slot", { name: "description" }))), validateProps.h(PrefixedTagNames.pIcon, { class: "icon", name: "arrow-head-down", color: "inherit", "aria-hidden": "true", ref: (el) => (this.iconElement = el) }), validateProps.h("slot", null)), this.hasCustomDropdown && (validateProps.h(PrefixedTagNames.pSelectWrapperDropdown, { ref: (el) => (this.dropdownElement = el), selectRef: this.select, label: this.label || getSlotTextContent.getSlotTextContent(this.host, 'label'), message: this.message || getSlotTextContent.getSlotTextContent(this.host, 'message'), description: this.description || getSlotTextContent.getSlotTextContent(this.host, 'description'), state: this.state, direction: this.dropdownDirection, filter: this.filter, theme: this.theme, required: isVisibleFormState.isRequiredAndParentNotRequired(this.host, this.select), disabled: disabled, onOpenChange: (isOpen) => this.iconElement.classList[isOpen ? 'add' : 'remove']('icon--open') }))), required.hasMessage(this.host, this.message, this.state) && (validateProps.h(required.StateMessage, { state: this.state, message: this.message, host: this.host }))));
  }
  observeAttributes() {
    validateProps.observeAttributes(this.select, ['disabled', 'required'], () => validateProps.forceUpdate(this.host));
  }
  get host() { return validateProps.getElement(this); }
};

const MAX_CHILDREN = 10;
const getSelectWrapperDropdownButtonAriaAttributes = (isOpen, labelId, descriptionId, dropdownId, activeDescendantId) => {
  return Object.assign({ 'aria-labelledby': labelId, 'aria-describedby': descriptionId || null, 'aria-haspopup': 'listbox', 'aria-expanded': isOpen ? 'true' : 'false', 'aria-controls': dropdownId }, (isOpen && {
    'aria-activedescendant': `option-${activeDescendantId}`,
  }));
};
const getFilterInputAriaAttributes = (isOpen, isRequired, labelId, descriptionId, dropdownId, activeDescendantId) => {
  return Object.assign(Object.assign({ 'aria-labelledby': labelId, 'aria-describedby': descriptionId || null, 'aria-haspopup': 'listbox', 'aria-expanded': isOpen ? 'true' : 'false', 'aria-autocomplete': 'list', 'aria-controls': dropdownId }, (isOpen && {
    'aria-activedescendant': `option-${activeDescendantId}`,
  })), (isRequired && {
    'aria-required': 'true',
  }));
};
const getListAriaAttributes = (label, isRequired, hasFilter, isOpen) => {
  return Object.assign(Object.assign({ 'aria-label': label }, (isRequired &&
    !hasFilter && {
    'aria-required': 'true',
  })), (!isOpen && {
    'aria-hidden': 'true'
  }));
};
const getOptionAriaAttributes = (option) => ({
  'aria-selected': option.selected ? 'true' : 'false',
  'aria-disabled': option.disabled ? 'true' : null,
  'aria-hidden': option.hidden || option.initiallyHidden ? 'true' : null,
  'aria-label': option.value ? null : 'Empty value',
});
const determineDirection = (host) => {
  const { length } = getHTMLElements.getHTMLElements(host.shadowRoot, '.option:not([aria-hidden="true"])');
  const { top } = host.getBoundingClientRect();
  const listHeight = length >= MAX_CHILDREN ? OPTION_HEIGHT * MAX_CHILDREN : OPTION_HEIGHT * length;
  const spaceBottom = window.innerHeight - top - formStyles.INPUT_HEIGHT;
  return spaceBottom <= listHeight && top >= listHeight ? 'up' : 'down';
};
const handleScroll = (host, highlightedIndex) => {
  const hostElementHeightThreshold = 276; // based on 10 * OPTION_HEIGHT with some buffer
  const { scrollHeight, scrollTop } = host;
  if (scrollHeight > hostElementHeightThreshold) {
    const highlightedNode = getHTMLElements.getHTMLElements(host, 'li')[highlightedIndex];
    if (highlightedNode) {
      const { offsetTop, offsetHeight } = highlightedNode; // offsetHeight is usually 32px but can be more if multiline
      const scrollBottom = hostElementHeightThreshold + scrollTop;
      const elementBottom = offsetTop + offsetHeight;
      if (elementBottom > scrollBottom) {
        host.scrollTop = elementBottom - hostElementHeightThreshold;
      }
      else if (offsetTop - OPTION_HEIGHT < scrollTop) {
        host.scrollTop = offsetTop - OPTION_HEIGHT;
      }
    }
  }
};
const getOptionsElements = (select) => Array.from(select.options);
const getOptionMaps = (options) => options.map((item) => {
  const { selected, parentElement, previousElementSibling } = item;
  const option = Object.assign({ value: item.text, disabled: hasAttribute.hasAttribute(item, 'disabled'), hidden: false, initiallyHidden: hasAttribute.hasAttribute(item, 'hidden'), selected, highlighted: selected }, (validateProps.getTagName(parentElement) === 'optgroup' &&
    previousElementSibling === null && { title: parentElement.label }));
  return option;
});
const setSelectedOptionMaps = (options, newIndex) => options.map((item, idx) => (Object.assign(Object.assign({}, item), { selected: idx === newIndex, highlighted: idx === newIndex, hidden: false })));
const setHighlightedOptionMaps = (options, newIndex) => options.map((item, idx) => (Object.assign(Object.assign({}, item), { highlighted: idx === newIndex })));
const resetHighlightedToSelectedOptionMaps = (options) => options.map((item) => (Object.assign(Object.assign({}, item), { highlighted: item.selected })));
const setFirstHighlightedOptionMaps = (options) => setHighlightedOptionMaps(options, 0);
const setLastHighlightedOptionMaps = (options) => setHighlightedOptionMaps(options, options.length - 1);
const getHighlightedOptionMapIndex = (arr) => arr.findIndex((item) => item.highlighted);
const getSelectedOptionMap = (arr) => arr.find((item) => item.selected);
const getValidOptions = (options) => options.filter((item) => !item.hidden && !item.initiallyHidden && !item.disabled);
const getMatchingOptionMaps = (options, searchString) => {
  const lowerCaseSearchString = searchString.toLowerCase();
  return lowerCaseSearchString && options.filter((item) => item.value.toLowerCase() === lowerCaseSearchString);
};
const getFirstMatchingOptionMapIndex = (options, key) => {
  // TODO: what about other characters?
  if ([...'abcdefghijklmnopqrstuvwxyzäöüß1234567890'].includes(key)) {
    const lowerCaseSearchString = key.toLowerCase();
    const firstMatchingIndex = lowerCaseSearchString && options.findIndex((item) => item.value.toLowerCase().startsWith(lowerCaseSearchString));
    // jump to last item if no match is found
    return firstMatchingIndex >= 0 ? firstMatchingIndex : options.length - 1;
  }
};
const setHighlightedFirstMatchingOptionMaps = (options, key) => {
  const targetIndex = getFirstMatchingOptionMapIndex(options, key);
  return targetIndex >= 0 ? options.map((item, idx) => (Object.assign(Object.assign({}, item), { highlighted: idx === targetIndex }))) : options;
};
const setFilteredOptionMaps = (options, searchString) => {
  const lowerCaseSearchString = searchString.toLowerCase();
  return options.map((item) => (Object.assign(Object.assign({}, item), { hidden: !item.initiallyHidden && !item.value.toLowerCase().includes(lowerCaseSearchString) })));
};
const resetFilteredOptionMaps = (options) => options.map((item) => (Object.assign(Object.assign({}, item), { hidden: false })));
const hasFilterResults = (options) => options.some((item) => !item.hidden && !item.initiallyHidden);
const getNewOptionMapIndex = (options, direction) => {
  const validItems = getValidOptions(options);
  const validMax = validItems.length - 1;
  // prob. needs to be <= 0
  if (validMax < 0) {
    return;
  }
  let i = getHighlightedOptionMapIndex(validItems);
  if (direction === 'down') {
    i = i < validMax ? i + 1 : 0;
  }
  else if (direction === 'up') {
    i = i > 0 ? i - 1 : validMax;
  }
  return options.indexOf(validItems[i]);
};
const getDropdownVisibility = (isOpen, type, resetFilter) => {
  if (isOpen && (type === 'hide' || type === 'toggle')) {
    if (resetFilter) {
      resetFilter();
    }
    return false;
  }
  else if (!isOpen && (type === 'show' || type === 'toggle')) {
    return true;
  }
  else {
    return isOpen;
  }
};

const { primaryColor: themeLightBaseColor, backgroundSurfaceColor: themeLightBackgroundSurfaceColor } = validateProps.getThemedColors('light');
const dropdownPositionVar = '--p-dropdown-position';
const getButtonStyles = (isOpen, state, theme) => {
  const { contrastHighColor, contrastMediumColor } = validateProps.getThemedColors(theme);
  const { formStateColor } = required.getThemedFormStateColors(theme, state);
  return {
    '@global': {
      button: Object.assign(Object.assign(Object.assign(Object.assign({ position: 'absolute', top: 0, height: validateProps.pxToRemWithUnit(formStyles.INPUT_HEIGHT), width: '100%', padding: 0, background: 'transparent', border: `${formStateColor ? 2 : 1}px solid currentColor`, outline: '1px solid transparent', outlineOffset: '2px', cursor: 'pointer', color: 'currentColor', transition: validateProps.getTransition('color') }, (isOpen && {
        outlineColor: formStateColor || contrastMediumColor,
      })), { '&:focus': {
          outlineColor: formStateColor || contrastMediumColor,
        } }), validateProps.hoverMediaQuery({
        '&:not(:disabled):hover ~ ul': {
          borderColor: contrastHighColor,
        },
      })), { '&:disabled': {
          cursor: 'not-allowed',
        } }),
    },
  };
};
const getFilterStyles = (isOpen, disabled, state, theme) => {
  const { primaryColor, backgroundColor, contrastHighColor, contrastMediumColor, disabledColor } = validateProps.getThemedColors(theme);
  const { formStateColor } = required.getThemedFormStateColors(theme, state);
  const placeHolderJssStyle = {
    opacity: 1,
    color: disabled ? disabledColor : primaryColor,
  };
  return {
    '@global': {
      input: Object.assign(Object.assign(Object.assign(Object.assign({ display: 'block', position: 'absolute', zIndex: 1, bottom: validateProps.pxToRemWithUnit(2), left: validateProps.pxToRemWithUnit(2), width: `calc(100% - ${validateProps.pxToRemWithUnit(formStyles.INPUT_HEIGHT - 4)})`, height: validateProps.pxToRemWithUnit(formStyles.INPUT_HEIGHT - 4), padding: validateProps.pxToRemWithUnit(10), outline: 'none', appearance: 'none', boxSizing: 'border-box', border: 'none', opacity: 0 }, textSmallStyle.textSmallStyle), { textIndent: 0, cursor: disabled ? 'not-allowed' : 'text', color: primaryColor, background: backgroundColor, '&::placeholder': placeHolderJssStyle, '&::-webkit-input-placeholder': placeHolderJssStyle, '&::-moz-placeholder': placeHolderJssStyle, '&:focus': {
          opacity: disabled ? 0 : 1,
          '&+span': {
            outlineColor: formStateColor || contrastMediumColor,
          },
        } }), validateProps.hoverMediaQuery({
        '&:not(:disabled):hover ~ ul': {
          borderColor: contrastHighColor,
        },
      })), { '&+span': Object.assign(Object.assign(Object.assign({ 
          // for focus outline and click event on arrow
          position: 'absolute' }, validateProps.getInsetJssStyle()), { outline: '1px solid transparent', outlineOffset: '2px', transition: validateProps.getTransition('color'), pointerEvents: 'all', cursor: disabled ? 'not-allowed' : 'pointer', border: `${formStateColor ? 2 : 1}px solid currentColor` }), (isOpen && {
          outlineColor: formStateColor || contrastMediumColor,
        })) }),
    },
  };
};
const getListStyles = (direction, isOpen, theme) => {
  const isDirectionDown = direction === 'down';
  const isDarkTheme = validateProps.isThemeDark(theme);
  const { primaryColor, backgroundColor, contrastHighColor, contrastMediumColor, contrastLowColor, hoverColor, activeColor, disabledColor, } = validateProps.getThemedColors(theme);
  const highlightedSelectedColor = isDarkTheme ? themeLightBaseColor : themeLightBackgroundSurfaceColor; // TODO: strange that surfaceColor isn't used for dark theme
  const baseDirectionPseudoJssStyle = {
    content: '""',
    display: 'block',
    position: 'sticky',
    width: '100%',
    height: '1px',
    background: contrastLowColor,
  };
  return {
    '@global': {
      ul: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ display: 'block', position: `var(${dropdownPositionVar})`, padding: 0, margin: 0, marginTop: validateProps.pxToRemWithUnit(-1), color: primaryColor, background: backgroundColor }, textSmallStyle.textSmallStyle), { zIndex: 10, left: 0, right: 0, maxHeight: validateProps.pxToRemWithUnit(308), overflowY: 'auto', WebkitOverflowScrolling: 'touch', scrollBehavior: 'smooth', border: `1px solid ${contrastMediumColor}`, scrollbarWidth: 'thin', scrollbarColor: 'auto', transition: validateProps.getTransition('border-color'), transform: 'translate3d(0,0,0)', outline: 'none' }), validateProps.hoverMediaQuery({
        '&:hover': {
          borderColor: contrastHighColor,
        },
      })), (isDirectionDown
        ? {
          top: 'calc(100%-1px)',
          borderTop: 'none',
          boxShadow: '0 2px 4px 0 rgba(0,0,0,.05), 0 12px 25px 0 rgba(0,0,0,.1)',
          '&::before': Object.assign(Object.assign({}, baseDirectionPseudoJssStyle), { top: 0 }),
        }
        : {
          bottom: validateProps.pxToRemWithUnit(formStyles.INPUT_HEIGHT - 1),
          borderBottom: 'none',
          boxShadow: '0 -2px 4px 0 rgba(0,0,0,.05), 0 -12px 25px 0 rgba(0,0,0,.075)',
          '&::after': Object.assign(Object.assign({}, baseDirectionPseudoJssStyle), { bottom: 0 }),
        })), (!isOpen && {
        top: 'calc(100%-3px)',
        opacity: 0,
        overflow: 'hidden',
        height: '1px',
        pointerEvents: 'none',
      })),
    },
    option: Object.assign(Object.assign({ display: 'flex', padding: `${validateProps.pxToRemWithUnit(4)} ${validateProps.pxToRemWithUnit(11)}`, minHeight: validateProps.pxToRemWithUnit(OPTION_HEIGHT), cursor: 'pointer', textAlign: 'left', wordBreak: 'break-word', boxSizing: 'border-box', transition: validateProps.getTransition('color') + ',' + validateProps.getTransition('background-color'), '&[role="status"]': {
        cursor: 'not-allowed',
      }, '&__sr': validateProps.getTextHiddenJssStyle(true) }, validateProps.hoverMediaQuery({
      '&:not([aria-disabled]):not([role="status"]):hover': {
        color: hoverColor,
        background: highlightedSelectedColor,
      },
    })), { '&--highlighted, &--selected': {
        color: activeColor,
        background: highlightedSelectedColor,
      }, '&--selected': {
        cursor: 'default',
        pointerEvents: 'none',
      }, '&--disabled': {
        cursor: 'not-allowed',
        color: disabledColor,
      }, '&--hidden': {
        display: 'none',
      } }),
    icon: {
      marginLeft: validateProps.pxToRemWithUnit(4),
    },
    optgroup: {
      display: 'block',
      padding: `${validateProps.pxToRemWithUnit(8)} ${validateProps.pxToRemWithUnit(12)}`,
      marginTop: validateProps.pxToRemWithUnit(8),
      fontWeight: validateProps.fontWeight.bold,
      '&~$option': {
        paddingLeft: validateProps.pxToRemWithUnit(24),
      },
    },
    'sr-text': {
      display: 'none',
    },
  };
};
const getComponentCss = (direction, isOpen, disabled, state, filter, theme) => {
  const { primaryColor, contrastHighColor, contrastMediumColor, disabledColor } = validateProps.getThemedColors(theme);
  const { formStateColor, formStateHoverColor } = required.getThemedFormStateColors(theme, state);
  return validateProps.getCss(
  // merge because of global styles
  validateProps.mergeDeep({
    '@global': {
      ':host': Object.assign({ [dropdownPositionVar]: 'absolute', display: 'block', position: `var(${dropdownPositionVar})`, marginTop: validateProps.pxToRemWithUnit(-formStyles.INPUT_HEIGHT), paddingTop: validateProps.pxToRemWithUnit(formStyles.INPUT_HEIGHT), left: 0, right: 0, color: disabled ? disabledColor : formStateColor || contrastMediumColor }, (!disabled &&
        validateProps.hoverMediaQuery({
          '&(:hover)': {
            color: formStateHoverColor || (validateProps.isThemeDark(theme) ? contrastHighColor : primaryColor),
          },
        }))),
    },
  }, filter ? getFilterStyles(isOpen, disabled, state, theme) : getButtonStyles(isOpen, state, theme), getListStyles(direction, isOpen, theme)));
};

const SelectWrapperDropdown = class {
  constructor(hostRef) {
    validateProps.registerInstance(this, hostRef);
    this.onClickOutside = (e) => {
      if (this.isOpen && !e.composedPath().includes(this.host)) {
        this.setDropdownVisibility('hide');
      }
    };
    this.setDropdownVisibility = (type) => {
      this.isOpen = getDropdownVisibility(this.isOpen, type, this.filter && this.resetFilter);
      this.onOpenChange(this.isOpen);
    };
    this.onComboboxKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'Up':
          e.preventDefault();
          this.cycleDropdown('up');
          break;
        case 'ArrowDown':
        case 'Down':
          e.preventDefault();
          this.cycleDropdown('down');
          break;
        case ' ':
        case 'Spacebar':
        case 'Enter':
          if (this.filter) {
            if (e.key === 'Enter') {
              e.preventDefault();
              const matchingOptions = getMatchingOptionMaps(this.optionMaps, this.searchString);
              if (matchingOptions.length === 1) {
                this.setOptionSelected(this.optionMaps.indexOf(matchingOptions[0]));
              }
              else {
                this.setOptionSelected(getHighlightedOptionMapIndex(this.optionMaps));
              }
            }
          }
          else {
            e.preventDefault();
            if (this.isOpen) {
              this.setOptionSelected(getHighlightedOptionMapIndex(this.optionMaps));
            }
            else {
              this.setDropdownVisibility('show');
            }
          }
          break;
        case 'Escape':
        case 'Tab':
          this.setDropdownVisibility('hide');
          this.resetHighlightedToSelectedOptionMaps();
          break;
        case 'PageUp':
          if (this.isOpen) {
            e.preventDefault();
            this.optionMaps = setFirstHighlightedOptionMaps(this.optionMaps);
          }
          break;
        case 'PageDown':
          if (this.isOpen) {
            e.preventDefault();
            this.optionMaps = setLastHighlightedOptionMaps(this.optionMaps);
          }
          break;
        default:
          if (!this.filter) {
            // TODO: seems to be difficult to combine multiple keys as native select does
            this.optionMaps = setHighlightedFirstMatchingOptionMaps(this.optionMaps, e.key);
          }
      }
    };
    this.syncSelectedIndex = () => {
      this.optionMaps = setSelectedOptionMaps(this.optionMaps, this.selectedIndex);
    };
    this.setOptionMaps = () => {
      this.optionMaps = setSelectedOptionMaps(getOptionMaps(getOptionsElements(this.selectRef)), this.selectedIndex);
    };
    this.resetHighlightedToSelectedOptionMaps = () => {
      this.optionMaps = resetHighlightedToSelectedOptionMaps(this.optionMaps);
    };
    this.setOptionSelected = (newIndex) => {
      this.setDropdownVisibility('hide');
      if (this.selectedIndex !== newIndex) {
        this.selectRef.selectedIndex = newIndex;
        this.selectRef.dispatchEvent(new Event('change', { bubbles: true }));
      }
      else {
        this.resetHighlightedToSelectedOptionMaps();
        this.resetFilter();
      }
    };
    this.resetFilter = () => {
      if (this.filter) {
        this.searchString = '';
        this.optionMaps = resetFilteredOptionMaps(this.optionMaps);
        this.inputElement.value = '';
      }
    };
    this.onFilterChange = (e) => {
      this.searchString = e.target.value;
      if (this.searchString.startsWith(' ')) {
        this.resetFilter();
      }
      else {
        this.optionMaps = setFilteredOptionMaps(this.optionMaps, this.searchString);
      }
      // in case input is focused via tab instead of click
      this.setDropdownVisibility('show');
    };
    this.selectRef = undefined;
    this.label = undefined;
    this.description = undefined;
    this.message = undefined;
    this.state = undefined;
    this.direction = 'auto';
    this.theme = 'light';
    this.filter = false;
    this.required = false;
    this.disabled = false;
    this.onOpenChange = undefined;
    this.isOpenOverride = false;
    this.isOpen = this.isOpenOverride;
    this.optionMaps = [];
    this.searchString = '';
  }
  get selectedIndex() {
    return this.selectRef.selectedIndex;
  }
  connectedCallback() {
    throwIfRootNodeIsNotOneOfKind.throwIfRootNodeIsNotOneOfKind(this.host, ['p-select-wrapper']);
    validateProps.observeChildren(this.selectRef, () => {
      this.setOptionMaps();
      this.observeOptions(); // new option might have been added
    }, 
    // unfortunately we can't observe hidden property of option elements via observeProperties
    // therefore we do it here via attribute
    ['hidden', 'disabled', 'selected']);
  }
  componentDidRender() {
    handleScroll(this.listElement, getHighlightedOptionMapIndex(this.optionMaps));
  }
  componentWillLoad() {
    this.observeProperties();
    document.addEventListener('mousedown', this.onClickOutside, true);
  }
  disconnectedCallback() {
    document.removeEventListener('mousedown', this.onClickOutside, true);
    validateProps.unobserveChildren(this.host);
  }
  render() {
    var _a, _b;
    validateProps.attachComponentCss(this.host, getComponentCss, this.direction === 'auto' ? determineDirection(this.host) : this.direction, this.isOpen, this.disabled, this.state, this.filter, this.theme);
    const dropdownId = 'list';
    const labelId = 'label';
    const descriptionId = this.description && 'description';
    const buttonId = 'value';
    const PrefixedTagNames = validateProps.getPrefixedTagNames(this.host);
    return (validateProps.h(validateProps.Host, null, this.filter ? ([
      validateProps.h("input", Object.assign({ type: "text", role: "combobox", disabled: this.disabled, placeholder: ((_a = getSelectedOptionMap(this.optionMaps)) === null || _a === void 0 ? void 0 : _a.value) || null, autoComplete: "off", value: this.searchString }, getFilterInputAriaAttributes(this.isOpen, this.required, labelId, descriptionId, dropdownId, getHighlightedOptionMapIndex(this.optionMaps)), { onKeyDown: this.onComboboxKeyDown, onInput: this.onFilterChange, onClick: () => this.setDropdownVisibility('show'), ref: (el) => (this.inputElement = el) })),
      validateProps.h("span", { onClick: this.disabled ? undefined : () => this.setDropdownVisibility('toggle') }),
    ]) : (validateProps.h("button", Object.assign({ type: "button", role: "combobox", id: buttonId, disabled: this.disabled }, getSelectWrapperDropdownButtonAriaAttributes(this.isOpen, labelId, descriptionId, dropdownId, getHighlightedOptionMapIndex(this.optionMaps)), { onClick: () => this.setDropdownVisibility('toggle'), onKeyDown: this.onComboboxKeyDown }))), [
      validateProps.h("div", { class: "sr-text", id: labelId }, (_b = getSelectedOptionMap(this.optionMaps)) === null || _b === void 0 ? void 0 :
        _b.value, ", ", this.label, !!this.message && `. ${this.message}`),
      this.description && (validateProps.h("div", { class: "sr-text", id: descriptionId }, this.description)),
      validateProps.h("ul", Object.assign({ id: dropdownId, role: "listbox", tabIndex: -1 }, getListAriaAttributes(this.label, this.required, this.filter, this.isOpen), { ref: (el) => (this.listElement = el) }), this.filter && !hasFilterResults(this.optionMaps) ? (validateProps.h("li", { class: "option", "aria-live": "polite", role: "status" }, validateProps.h("span", { "aria-hidden": "true" }, "---"), validateProps.h("span", { class: "option__sr" }, "No results found"))) : (this.optionMaps.map((option, index) => {
        const { value, disabled, hidden, initiallyHidden, selected, highlighted, title } = option;
        return [
          title && (validateProps.h("span", { class: "optgroup", role: "presentation" }, title)),
          validateProps.h("li", Object.assign({ id: `option-${index}`, role: "option", class: {
              ['option']: true,
              ['option--selected']: selected,
              ['option--highlighted']: highlighted,
              ['option--disabled']: disabled,
              ['option--hidden']: hidden || initiallyHidden,
            }, onClick: !selected && !disabled ? () => this.setOptionSelected(index) : undefined }, getOptionAriaAttributes(option)), value, selected && !disabled && (validateProps.h(PrefixedTagNames.pIcon, { class: "icon", "aria-hidden": "true", name: "check", color: "inherit" }))),
        ];
      }))),
    ]));
  }
  observeProperties() {
    this.setOptionMaps(); // initial
    this.observeOptions(); // initial
    propertyObserver.observeProperties(this.selectRef, ['value', 'selectedIndex'], this.syncSelectedIndex);
  }
  observeOptions() {
    getOptionsElements(this.selectRef).forEach((el) => propertyObserver.observeProperties(el, ['selected', 'disabled'], this.setOptionMaps));
  }
  cycleDropdown(direction) {
    this.setDropdownVisibility('show');
    const newIndex = getNewOptionMapIndex(this.optionMaps, direction);
    this.optionMaps = setHighlightedOptionMaps(this.optionMaps, newIndex);
  }
  get host() { return validateProps.getElement(this); }
};

exports.p_select_wrapper = SelectWrapper;
exports.p_select_wrapper_dropdown = SelectWrapperDropdown;
