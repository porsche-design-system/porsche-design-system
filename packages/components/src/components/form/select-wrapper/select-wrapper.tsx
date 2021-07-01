import { Component, Element, h, Host, JSX, Listen, Prop, State } from '@stencil/core';
import {
  getClosestHTMLElement,
  getHTMLElementAndThrowIfUndefined,
  getHTMLElements,
  getPrefixedTagNames,
  getRole,
  getTagName,
  hasDescription,
  hasLabel,
  hasMessage,
  insertSlottedStyles,
  isDark,
  isRequiredAndParentNotRequired,
  isTouchDevice,
  mapBreakpointPropToPrefixedClasses,
  observeProperties,
  prefix,
  setAriaAttributes,
  setAttribute,
} from '../../../utils';
import type { BreakpointCustomizable, FormState, Theme } from '../../../types';
import { applyFilterOnOptionMaps, OptionMap } from './select-wrapper-utils';
import { P_ANIMATION_HOVER_DURATION } from '../../../styles';

@Component({
  tag: 'p-select-wrapper',
  styleUrl: 'select-wrapper.scss',
  shadow: true,
})
export class SelectWrapper {
  @Element() public host!: HTMLElement;

  /** The label text. */
  @Prop() public label?: string = '';

  /** The description text. */
  @Prop() public description?: string = '';

  /** The validation state. */
  @Prop() public state?: FormState = 'none';

  /** The message styled depending on validation state. */
  @Prop() public message?: string = '';

  /** Show or hide label. For better accessibility it is recommended to show the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  /** Filters select options by typing a character */
  @Prop() public filter?: boolean = false;

  /** Adapts the select color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** Changes the direction to which the dropdown list appears. */
  @Prop() public dropdownDirection?: 'down' | 'up' | 'auto' = 'auto';

  /** Forces rendering of native browser select dropdown */
  @Prop() public native?: boolean = false;

  @State() private fakeOptionListHidden = true;
  @State() private optionMaps: OptionMap[] = [];
  @State() private filterHasResults = true;

  private select: HTMLSelectElement;
  private options: HTMLOptionElement[];
  private fakeOptionListNode: HTMLDivElement;
  private fakeOptionHighlightedNode: HTMLDivElement;
  private selectObserver: MutationObserver;
  private filterInput: HTMLInputElement;
  private fakeFilter: HTMLSpanElement;
  private searchString: string;
  private dropdownDirectionInternal: 'down' | 'up' = 'down';
  private renderCustomDropDown: boolean;

  // this stops click events when filter input is clicked
  @Listen('click', { capture: false })
  public handleOnClick(e: MouseEvent): void {
    if (this.filter) {
      e.stopPropagation();
    }
  }

  public connectedCallback(): void {
    this.setSelect();
    this.setOptions();
    this.observeSelect();
    this.addSlottedStyles();
  }

  public componentWillLoad(): void {
    this.defineTypeOfDropDown();
    observeProperties(this.select, ['value', 'selectedIndex'], this.setOptionList);
    this.options.forEach((x) => {
      observeProperties(x, ['selected'], this.setOptionList);
    });
  }

  public componentDidLoad(): void {
    if (this.filter) {
      this.fakeFilter.addEventListener('click', this.handleFilterInputClick);
      this.filterInput.addEventListener('mousedown', this.handleFilterInputClick);
      this.filterInput.addEventListener('keydown', this.handleKeyboardEvents);
      this.filterInput.addEventListener('input', this.handleFilterSearch);
    }
  }

  public componentDidRender(): void {
    /*
     * This is a workaround to improve accessibility because the select and the label/description/message text are placed in different DOM.
     * Referencing ID's from outside the component is impossible because the web component’s DOM is separate.
     * We have to wait for full support of the Accessibility Object Model (AOM) to provide the relationship between shadow DOM and slots.
     */
    setAriaAttributes(this.select, {
      label: this.label,
      message: this.message || this.description,
      state: this.state,
    });

    if (this.filter) {
      setAttribute(this.select, 'aria-hidden', 'true');
    }
  }

  public disconnectedCallback(): void {
    this.selectObserver.disconnect();
    if (this.renderCustomDropDown) {
      this.disconnectCustomDropDown();
    }
  }

  public render(): JSX.Element {
    const selectClasses = {
      [prefix('select-wrapper')]: true,
      [prefix(`select-wrapper--theme-${this.theme}`)]: true,
    };
    const labelClasses = {
      [prefix('select-wrapper__label')]: true,
      [prefix('select-wrapper__label--disabled')]: this.disabled,
      ...mapBreakpointPropToPrefixedClasses('select-wrapper__label-', this.hideLabel, ['hidden', 'visible']),
    };
    const requiredFlagClasses = {
      [prefix('select-wrapper__required')]: true,
      [prefix('select-wrapper__required--theme-dark')]: isDark(this.theme),
    };
    const descriptionClasses = {
      [prefix('select-wrapper__description')]: true,
      [prefix('select-wrapper__description--disabled')]: this.disabled,
      ...mapBreakpointPropToPrefixedClasses('select-wrapper__description-', this.hideLabel, ['hidden', 'visible']),
    };
    const fakeSelectClasses = {
      [prefix('select-wrapper__fake-select')]: true,
      [prefix('select-wrapper__fake-select--disabled')]: this.disabled,
      [prefix(`select-wrapper__fake-select--${this.state}`)]: this.state !== 'none',
    };
    const fakeOptionListClasses = {
      [prefix('select-wrapper__fake-option-list')]: true,
      [prefix('select-wrapper__fake-option-list--hidden')]: this.fakeOptionListHidden,
      [prefix(
        `select-wrapper__fake-option-list--direction-${
          this.dropdownDirection === 'auto' ? this.dropdownDirectionInternal : this.dropdownDirection
        }`
      )]: true,
    };
    const iconClasses = {
      [prefix('select-wrapper__icon')]: true,
      [prefix('select-wrapper__icon--disabled')]: this.disabled,
      [prefix('select-wrapper__icon--opened')]: !this.fakeOptionListHidden,
    };
    const messageClasses = {
      [prefix('select-wrapper__message')]: true,
      [prefix(`select-wrapper--theme-${this.theme}`)]: true,
      [prefix(`select-wrapper__message--${this.state}`)]: this.state !== 'none',
    };
    const filterInputClasses = {
      [prefix('select-wrapper__filter-input')]: true,
      [prefix(`select-wrapper__filter-input--theme-${this.theme}`)]: true,
      [prefix('select-wrapper__filter-input--disabled')]: this.disabled,
      [prefix(`select-wrapper__filter-input--${this.state}`)]: this.state !== 'none',
    };

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host>
        <div class={selectClasses}>
          <label id="p-label">
            {hasLabel(this.host, this.label) && (
              <PrefixedTagNames.pText class={labelClasses} tag="span" color="inherit" onClick={this.labelClick}>
                {this.label || <slot name="label" />}
                {isRequiredAndParentNotRequired(this.host, this.select) && <span class={requiredFlagClasses} />}
              </PrefixedTagNames.pText>
            )}
            {hasDescription(this.host, this.description) && (
              <PrefixedTagNames.pText
                class={descriptionClasses}
                tag="span"
                color="inherit"
                size="x-small"
                onClick={this.labelClick}
              >
                {this.description || <slot name="description" />}
              </PrefixedTagNames.pText>
            )}
            <span class={fakeSelectClasses}>
              <PrefixedTagNames.pIcon class={iconClasses} name="arrow-head-down" color="inherit" />
              <slot />
            </span>
          </label>
          {this.filter && [
            <input
              type="text"
              class={filterInputClasses}
              role="combobox"
              aria-autocomplete="both"
              aria-controls="p-listbox"
              disabled={this.disabled}
              aria-expanded={this.fakeOptionListHidden ? 'false' : 'true'}
              aria-activedescendant={`option-${this.getHighlightedIndex(this.optionMaps)}`}
              placeholder={this.options[this.select.selectedIndex].text}
              ref={(el) => (this.filterInput = el)}
            />,
            <span ref={(el) => (this.fakeFilter = el)} />,
          ]}
          {this.renderCustomDropDown && (
            <div
              class={fakeOptionListClasses}
              role="listbox"
              id="p-listbox"
              aria-activedescendant={!this.filter && `option-${this.getHighlightedIndex(this.optionMaps)}`}
              tabIndex={-1}
              aria-expanded={!this.filter && (this.fakeOptionListHidden ? 'false' : 'true')}
              aria-labelledby="p-label"
              ref={(el) => (this.fakeOptionListNode = el)}
            >
              {this.createFakeOptionList()}
            </div>
          )}
        </div>
        {hasMessage(this.host, this.message, this.state) && (
          <PrefixedTagNames.pText class={messageClasses} color="inherit" role={getRole(this.state)}>
            {this.message || <slot name="message" />}
          </PrefixedTagNames.pText>
        )}
      </Host>
    );
  }

  /*
   * <START NATIVE SELECT>
   */
  private setSelect(): void {
    this.select = getHTMLElementAndThrowIfUndefined(this.host, 'select');

    if (this.filter) {
      setAttribute(this.select, 'tabindex', '-1');
    }
  }

  private setOptions(): void {
    this.options = getHTMLElements(this.select, 'option');
  }

  private get disabled(): boolean {
    return this.select.disabled;
  }

  private labelClick = (): void => {
    if (!this.filter) {
      this.select.focus();
    } else {
      this.filterInput.focus();
    }
  };

  /*
   * <START CUSTOM SELECT DROPDOWN>
   */
  private observeSelect(): void {
    this.selectObserver = new MutationObserver((mutations) => {
      if (mutations.some(({ type }) => type === 'childList' || type === 'attributes')) {
        this.setOptionList();
      }
    });
    this.selectObserver.observe(this.select, {
      childList: true,
      subtree: true,
      attributeFilter: ['disabled', 'selected', 'hidden'],
    });
  }

  private defineTypeOfDropDown(): void {
    if (this.filter) {
      this.renderCustomDropDown = true;
    } else if (this.native) {
      this.renderCustomDropDown = false;
    } else {
      this.renderCustomDropDown = !isTouchDevice();
    }

    if (this.renderCustomDropDown) {
      this.setOptionList();
      this.select.addEventListener('keydown', this.handleKeyboardEvents);

      if (!this.filter) {
        this.select.addEventListener('mousedown', this.handleMouseEvents);
      }
      if (typeof document !== 'undefined') {
        document.addEventListener('mousedown', this.handleClickOutside, true);
      }
    }
  }

  private disconnectCustomDropDown(): void {
    this.select.removeEventListener('mousedown', this.handleMouseEvents);
    this.select.removeEventListener('keydown', this.handleKeyboardEvents);
    if (typeof document !== 'undefined') {
      document.removeEventListener('mousedown', this.handleClickOutside, true);
    }
  }

  private handleClickOutside = (e: MouseEvent): void => {
    if (!e.composedPath().includes(this.host)) {
      this.handleVisibilityOfFakeOptionList('hide');
    }
  };

  private handleMouseEvents = (e: MouseEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    this.handleFocus(e);
    this.handleVisibilityOfFakeOptionList('toggle');
  };

  private handleFocus(e: MouseEvent): void {
    if (!this.filter) {
      this.select.focus();
    } else {
      e.preventDefault();
      this.filterInput.focus();
    }
  }

  private handleDropdownDirection(): void {
    if (this.dropdownDirection === 'auto') {
      const children = getHTMLElements(
        this.fakeOptionListNode,
        `.${prefix('select-wrapper__fake-option')}:not([aria-hidden="true"])`
      );
      const { top: spaceTop } = this.select.getBoundingClientRect();
      const listNodeChildrenHeight = children[0].clientHeight;
      const numberOfChildNodes = children.length;

      // Max number of children visible is set to 10
      const listNodeHeight =
        numberOfChildNodes >= 10 ? listNodeChildrenHeight * 10 : listNodeChildrenHeight * numberOfChildNodes;
      const spaceBottom = window.innerHeight - spaceTop - this.select.clientHeight;
      if (spaceBottom <= listNodeHeight && spaceTop >= listNodeHeight) {
        this.dropdownDirectionInternal = 'up';
      } else {
        this.dropdownDirectionInternal = 'down';
      }
    }
  }

  private handleVisibilityOfFakeOptionList(type: 'show' | 'hide' | 'toggle'): void {
    if (this.fakeOptionListHidden) {
      if (type === 'show' || type === 'toggle') {
        this.fakeOptionListHidden = false;
        this.handleDropdownDirection();
        this.handleScroll();
      }
    } else {
      if (type === 'hide' || type === 'toggle') {
        this.fakeOptionListHidden = true;
        if (this.filter) {
          this.resetFilterInput();
        }
      }
    }
  }

  private handleKeyboardEvents = (e: KeyboardEvent): void => {
    switch (e.key) {
      case 'ArrowUp':
      case 'Up':
        e.preventDefault();
        this.handleVisibilityOfFakeOptionList('show');
        this.cycleFakeOptionList('up');
        break;
      case 'ArrowDown':
      case 'Down':
        e.preventDefault();
        this.handleVisibilityOfFakeOptionList('show');
        this.cycleFakeOptionList('down');
        break;
      case 'ArrowLeft':
      case 'Left':
        e.preventDefault();
        this.cycleFakeOptionList('left');
        break;
      case 'ArrowRight':
      case 'Right':
        e.preventDefault();
        this.cycleFakeOptionList('right');
        break;
      case ' ':
      case 'Spacebar':
        if (this.filter) {
          if (this.fakeOptionListHidden) {
            e.preventDefault();
            this.handleVisibilityOfFakeOptionList('show');
          }
        } else {
          e.preventDefault();
          this.handleVisibilityOfFakeOptionList('toggle');
          if (this.fakeOptionListHidden) {
            this.setOptionSelected(this.getHighlightedIndex(this.optionMaps));
          }
        }
        break;
      case 'Enter':
        e.preventDefault();
        this.handleVisibilityOfFakeOptionList('hide');
        if (!this.filter) {
          this.setOptionSelected(this.getHighlightedIndex(this.optionMaps));
        } else {
          const itemValue =
            !!this.searchString &&
            this.optionMaps.filter((item) => item.value.toLowerCase() === this.searchString.toLowerCase());
          if (itemValue.length === 1) {
            this.setOptionSelected(itemValue[0].key);
          } else {
            this.setOptionSelected(this.getHighlightedIndex(this.optionMaps));
          }
        }
        break;
      case 'Escape':
      case 'Esc':
        if (this.filter) {
          this.filterInput.value = '';
        }
        this.setOptionSelected(this.select.selectedIndex);
        break;
      case 'PageUp':
        e.preventDefault();
        if (!this.fakeOptionListHidden) {
          this.optionMaps = this.optionMaps.map((item, index) => ({
            ...item,
            highlighted: index === 0,
          }));
          this.handleScroll();
        }
        break;
      case 'PageDown':
        e.preventDefault();
        if (!this.fakeOptionListHidden) {
          const lastIndex = this.options.length - 1;
          this.optionMaps = this.optionMaps.map((item, index) => ({
            ...item,
            highlighted: index === lastIndex,
          }));
          this.handleScroll();
        }
        break;
      case 'Tab':
        if (!this.fakeOptionListHidden) {
          this.handleVisibilityOfFakeOptionList('hide');
        }
        break;
      default:
        this.handleNativeSearchOptions();
    }
  };

  private setOptionList = (): void => {
    this.setOptions();
    this.optionMaps = this.options.map((item, index) => {
      const initiallyHidden = item.hasAttribute('hidden');
      const disabled = item.hasAttribute('disabled');
      const selected = item.selected;
      const highlighted = selected;
      const option: OptionMap = {
        key: index,
        value: item.text,
        disabled,
        hidden: false,
        initiallyHidden,
        selected,
        highlighted,
      };
      return option;
    });
  };

  private setOptionSelected = (newIndex: number): void => {
    const oldSelectedValue = this.select.options[this.select.selectedIndex].text;
    this.select.selectedIndex = newIndex;
    const newSelectedValue = this.select.options[this.select.selectedIndex].text;
    this.handleVisibilityOfFakeOptionList('hide');

    if (this.filter) {
      this.filterInput.value = '';
      this.searchString = '';
      this.filterHasResults = true;
      this.filterInput.focus();
    } else {
      if (document.activeElement !== this.select) {
        this.select.focus();
      }
    }

    const { selectedIndex } = this.select;
    this.optionMaps = this.optionMaps.map((item, index) => ({
      ...item,
      selected: index === selectedIndex,
      highlighted: index === selectedIndex,
      hidden: false,
    }));

    if (oldSelectedValue !== newSelectedValue) {
      this.select.dispatchEvent(new Event('change', { bubbles: true }));
    }
  };

  private createFakeOptionList(): JSX.Element[][] {
    const PrefixedTagNames = getPrefixedTagNames(this.host);
    return !this.filterHasResults ? (
      <div class={prefix('select-wrapper__fake-option')} aria-live="polite" role="status">
        <span aria-hidden="true">---</span>
        <span class={prefix('select-wrapper__fake-option-sr')}>No results found</span>
      </div>
    ) : (
      // TODO: OptionMaps should contain information about optgroup. This way we would not request dom nodes while rendering.
      this.options.map((item, index) => {
        const { disabled, hidden, initiallyHidden, selected, highlighted } = this.optionMaps[index];
        return [
          getTagName(item.parentElement) === 'optgroup' && item.previousElementSibling === null && (
            <span class={prefix('select-wrapper__fake-optgroup-label')} role="presentation">
              {getClosestHTMLElement(item, 'optgroup').label}
            </span>
          ),
          <div
            id={`option-${index}`}
            role="option"
            class={{
              [prefix('select-wrapper__fake-option')]: true,
              [prefix('select-wrapper__fake-option--selected')]: selected,
              [prefix('select-wrapper__fake-option--highlighted')]: highlighted,
              [prefix('select-wrapper__fake-option--disabled')]: disabled,
              [prefix('select-wrapper__fake-option--hidden')]: hidden || initiallyHidden,
            }}
            onClick={(e) => (!disabled && !selected ? this.setOptionSelected(index) : this.handleFocus(e))}
            aria-selected={highlighted ? 'true' : null}
            aria-disabled={disabled ? 'true' : null}
            aria-hidden={hidden || initiallyHidden ? 'true' : null}
            aria-label={!item.text ? 'Empty value' : null}
          >
            {item.text && <span>{item.text}</span>}
            {selected && !disabled && (
              <PrefixedTagNames.pIcon
                class={prefix('select-wrapper__fake-option-icon')}
                aria-hidden="true"
                name="check"
                color="inherit"
              />
            )}
          </div>,
        ];
      })
    );
  }

  private cycleFakeOptionList(direction: string): void {
    const validItems = this.optionMaps.filter((item) => !item.hidden && !item.initiallyHidden && !item.disabled);
    const validMax = validItems.length - 1;
    if (validMax < 0) {
      return;
    }
    let i = this.getHighlightedIndex(validItems);
    if (direction === 'down' || direction === 'right') {
      i = i < validMax ? i + 1 : 0;
    } else if (direction === 'up' || direction === 'left') {
      i = i > 0 ? i - 1 : validMax;
    }
    this.optionMaps = this.optionMaps.map((item, index) => ({
      ...item,
      highlighted: index === validItems[i].key,
    }));

    if (direction === 'left' || direction === 'right') {
      this.setOptionSelected(this.getHighlightedIndex(this.optionMaps));
    }

    this.handleScroll();
  }

  private handleScroll(): void {
    const fakeOptionListNodeHeight = 200;
    if (this.fakeOptionListNode.scrollHeight > fakeOptionListNodeHeight) {
      this.fakeOptionHighlightedNode = getHTMLElements(this.fakeOptionListNode, 'div')[
        this.getHighlightedIndex(this.optionMaps)
      ];

      if (this.fakeOptionHighlightedNode) {
        const { scrollTop } = this.fakeOptionListNode;
        const { offsetTop, offsetHeight } = this.fakeOptionHighlightedNode;
        const scrollBottom = fakeOptionListNodeHeight + scrollTop;
        const elementBottom = offsetTop + offsetHeight;
        if (elementBottom > scrollBottom) {
          this.fakeOptionListNode.scrollTop = elementBottom - fakeOptionListNodeHeight;
        } else if (offsetTop < scrollTop) {
          this.fakeOptionListNode.scrollTop = offsetTop;
        }
      }
    }
  }

  private handleNativeSearchOptions(): void {
    // timeout is needed if fast keyboard events are triggered and dom needs time to update state
    setTimeout(() => {
      const { selectedIndex } = this.select;
      this.optionMaps = this.optionMaps.map((item, index) => ({
        ...item,
        highlighted: index === selectedIndex,
        selected: index === selectedIndex,
      }));

      this.handleScroll();
    }, 100);
  }

  private getHighlightedIndex = (arr: readonly OptionMap[]): number => arr.findIndex((item) => item.highlighted);

  /*
   * <START CUSTOM FILTER>
   */
  private handleFilterInputClick = (): void => {
    if (!this.disabled) {
      this.filterInput.focus();
      this.handleVisibilityOfFakeOptionList('toggle');
    }
  };

  private resetFilterInput = (): void => {
    this.filterInput.value = '';
    this.searchString = '';
    this.filterHasResults = true;
    this.optionMaps = this.optionMaps.map((item) => ({
      ...item,
      hidden: false,
    }));
  };

  private handleFilterSearch = (ev: InputEvent): void => {
    this.searchString = (ev.target as HTMLInputElement).value;
    this.optionMaps = applyFilterOnOptionMaps(this.optionMaps, this.searchString);

    const hiddenItems = this.optionMaps.filter((item) => item.hidden || item.initiallyHidden);
    this.filterHasResults = hiddenItems.length !== this.optionMaps.length;
    this.handleVisibilityOfFakeOptionList('show');
  };

  private addSlottedStyles(): void {
    const tagName = getTagName(this.host);
    const style = `${tagName} a {
      color: inherit !important;
      text-decoration: underline !important;
      transition: color ${P_ANIMATION_HOVER_DURATION} ease !important;
      outline: transparent solid 1px !important;
      outline-offset: 1px !important;
    }

    ${tagName} a:hover {
      color: #d5001c !important;
    }

    ${tagName} a:focus {
      outline-color: currentColor !important;
    }

    ${tagName} a:focus:not(:focus-visible) {
      outline-color: transparent !important;
    }`;

    insertSlottedStyles(this.host, style);
  }
}
