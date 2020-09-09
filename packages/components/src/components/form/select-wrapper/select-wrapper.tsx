import { JSX, Host, Component, Prop, h, Element, State, Listen } from '@stencil/core';
import {
  BreakpointCustomizable,
  getPrefixedTagNames,
  insertSlottedStyles,
  isTouchDevice,
  mapBreakpointPropToPrefixedClasses,
  prefix,
  transitionListener
} from '../../../utils';
import { FormState, Theme } from '../../../types';

type OptionMap = {
  readonly key: number;
  readonly value: string;
  readonly disabled: boolean;
  readonly hidden: boolean;
  readonly selected: boolean;
  readonly highlighted: boolean;
};

@Component({
  tag: 'p-select-wrapper',
  styleUrl: 'select-wrapper.scss',
  shadow: true
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

  /** Adapts the button color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** Changes the direction to which the dropdown list appears. */
  @Prop() public dropdownDirection?: 'down' | 'up' | 'auto' = 'down';

  @State() private disabled: boolean;
  @State() private fakeOptionListHidden = true;
  @State() private optionMaps: readonly OptionMap[] = [];
  @State() private filterHasResults = true;
  @State() private isTouchWithoutFilter: boolean = isTouchDevice() && !this.filter;

  private select: HTMLSelectElement;
  private options: NodeListOf<HTMLOptionElement>;
  private fakeOptionListNode: HTMLDivElement;
  private fakeOptionHighlightedNode: HTMLDivElement;
  private selectObserver: MutationObserver;
  private filterInput: HTMLInputElement;
  private fakeFilter: HTMLSpanElement;
  private searchString: string;
  private dropdownDirectionInternal: 'down' | 'up' = 'down';

  // this stops click events when filter input is clicked
  @Listen('click', { capture: false })
  public handleOnClick(e: MouseEvent): void {
    if (this.filter) {
      e.stopPropagation();
    }
  }

  public componentWillLoad(): void {
    this.initSelect();
    this.setAriaAttributes();
    this.setState();
    this.bindStateListener();
    this.addSlottedStyles();

    if (!this.isTouchWithoutFilter) {
      this.observeSelect();
      this.setOptionList();
      if (!this.filter) {
        this.select.addEventListener('mousedown', this.handleMouseEvents.bind(this));
      }
      this.select.addEventListener('keydown', this.handleKeyboardEvents.bind(this));
      if (typeof document !== 'undefined') {
        document.addEventListener('mousedown', this.handleClickOutside.bind(this), true);
      }
    }
  }

  public componentDidLoad(): void {
    if (!this.isTouchWithoutFilter && this.filter) {
      this.fakeFilter.addEventListener('click', this.handleFilterInputClick.bind(this));
      this.filterInput.addEventListener('mousedown', this.handleFilterInputClick.bind(this));
      this.filterInput.addEventListener('keydown', this.handleKeyboardEvents.bind(this));
      this.filterInput.addEventListener('input', this.handleFilterSearch.bind(this));
    }
  }

  public componentDidUpdate(): void {
    this.setAriaAttributes();
  }

  public disconnectedCallback(): void {
    if (!this.isTouchWithoutFilter) {
      this.selectObserver.disconnect();
      this.select.removeEventListener('mousedown', this.handleMouseEvents.bind(this));
      this.select.removeEventListener('keydown', this.handleKeyboardEvents.bind(this));
      if (typeof document !== 'undefined') {
        document.removeEventListener('mousedown', this.handleClickOutside.bind(this), true);
      }
    }
  }

  public render(): JSX.Element {
    const selectClasses = {
      [prefix('select-wrapper')]: true,
      [prefix(`select-wrapper--theme-${this.theme}`)]: true
    };
    const labelClasses = {
      [prefix('select-wrapper__label')]: true,
      [prefix('select-wrapper__label--disabled')]: this.disabled,
      ...mapBreakpointPropToPrefixedClasses('select-wrapper__label-', this.hideLabel, ['hidden', 'visible'])
    };
    const descriptionClasses = {
      [prefix('select-wrapper__description')]: true,
      [prefix('select-wrapper__description--disabled')]: this.disabled,
      ...mapBreakpointPropToPrefixedClasses('select-wrapper__description-', this.hideLabel, ['hidden', 'visible'])
    };
    const fakeSelectClasses = {
      [prefix('select-wrapper__fake-select')]: true,
      [prefix('select-wrapper__fake-select--disabled')]: this.disabled,
      [prefix(`select-wrapper__fake-select--${this.state}`)]: this.state !== 'none'
    };
    const fakeOptionListClasses = {
      [prefix('select-wrapper__fake-option-list')]: true,
      [prefix('select-wrapper__fake-option-list--hidden')]: this.fakeOptionListHidden,
      [prefix(
        `select-wrapper__fake-option-list--direction-${
          this.dropdownDirection === 'auto' ? this.dropdownDirectionInternal : this.dropdownDirection
        }`
      )]: true
    };
    const iconClasses = {
      [prefix('select-wrapper__icon')]: true,
      [prefix('select-wrapper__icon--disabled')]: this.disabled,
      [prefix('select-wrapper__icon--opened')]: !this.fakeOptionListHidden
    };
    const messageClasses = {
      [prefix('select-wrapper__message')]: true,
      [prefix(`select-wrapper--theme-${this.theme}`)]: true,
      [prefix(`select-wrapper__message--${this.state}`)]: this.state !== 'none'
    };
    const filterInputClasses = {
      [prefix('select-wrapper__filter-input')]: true,
      [prefix(`select-wrapper__filter-input--theme-${this.theme}`)]: true,
      [prefix('select-wrapper__filter-input--disabled')]: this.disabled,
      [prefix(`select-wrapper__filter-input--${this.state}`)]: this.state !== 'none'
    };
    const PrefixedTagNames = getPrefixedTagNames(this.host, ['p-icon', 'p-text']);

    return (
      <Host>
        <div class={selectClasses}>
          <label>
            {this.isLabelVisible && (
              <PrefixedTagNames.pText class={labelClasses} tag="span" color="inherit" onClick={this.labelClick}>
                {this.label || (
                  <span>
                    <slot name="label" />
                  </span>
                )}
              </PrefixedTagNames.pText>
            )}
            {this.isDescriptionVisible && (
              <PrefixedTagNames.pText
                class={descriptionClasses}
                tag="span"
                color="inherit"
                size="x-small"
                onClick={this.labelClick}
              >
                {this.description || (
                  <span>
                    <slot name="description" />
                  </span>
                )}
              </PrefixedTagNames.pText>
            )}
            <span class={fakeSelectClasses}>
              <PrefixedTagNames.pIcon class={iconClasses} name="arrow-head-down" color="inherit" />
              <slot />
            </span>
          </label>
          {this.filter &&
            !this.isTouchWithoutFilter && [
              <input
                type="text"
                class={filterInputClasses}
                role="combobox"
                aria-autocomplete="both"
                aria-controls="p-listbox"
                disabled={this.disabled}
                aria-expanded={this.fakeOptionListHidden ? 'false' : 'true'}
                aria-activedescendant={`option-${this.getHighlightedIndex(this.optionMaps)}`}
                ref={(el) => (this.filterInput = el)}
              />,
              <span ref={(el) => (this.fakeFilter = el)} />
            ]}
          {!this.isTouchWithoutFilter && (
            <div
              class={fakeOptionListClasses}
              role="listbox"
              id="p-listbox"
              aria-activedescendant={!this.filter && `option-${this.getHighlightedIndex(this.optionMaps)}`}
              tabIndex={-1}
              aria-expanded={!this.filter && (this.fakeOptionListHidden ? 'false' : 'true')}
              aria-labelledby={this.label}
              ref={(el) => (this.fakeOptionListNode = el)}
            >
              {this.createFakeOptionList()}
            </div>
          )}
        </div>
        {this.isMessageVisible && (
          <PrefixedTagNames.pText class={messageClasses} color="inherit" role={this.state === 'error' ? 'alert' : null}>
            {this.message || (
              <span>
                <slot name="message" />
              </span>
            )}
          </PrefixedTagNames.pText>
        )}
      </Host>
    );
  }

  private get isLabelVisible(): boolean {
    return !!this.label || !!this.host.querySelector('[slot="label"]');
  }

  private get isDescriptionVisible(): boolean {
    return !!this.description || !!this.host.querySelector('[slot="description"]');
  }

  private get isMessageDefined(): boolean {
    return !!this.message || !!this.host.querySelector('[slot="message"]');
  }

  private get isMessageVisible(): boolean {
    return ['success', 'error'].includes(this.state) && this.isMessageDefined;
  }

  /*
   * <START NATIVE SELECT>
   */
  private initSelect(): void {
    this.select = this.host.querySelector('select');
    if (this.filter) {
      this.select.setAttribute('tabindex', '-1');
    }
  }

  /*
   * This is a workaround to improve accessibility because the select and the label/description/message text are placed in different DOM.
   * Referencing ID's from outside the component is impossible because the web component’s DOM is separate.
   * We have to wait for full support of the Accessibility Object Model (AOM) to provide the relationship between shadow DOM and slots.
   */
  private setAriaAttributes(): void {
    if (this.label && this.message) {
      this.select.setAttribute('aria-label', `${this.label}. ${this.message}`);
    } else if (this.label && this.description) {
      this.select.setAttribute('aria-label', `${this.label}. ${this.description}`);
    } else if (this.label) {
      this.select.setAttribute('aria-label', this.label);
    }

    if (this.state === 'error') {
      this.select.setAttribute('aria-invalid', 'true');
    } else {
      this.select.removeAttribute('aria-invalid');
    }

    if (this.filter) {
      this.select.setAttribute('aria-hidden', 'true');
    }
  }

  private setState = (): void => {
    this.disabled = this.select.disabled;
  };

  private labelClick = (): void => {
    if (!this.filter) {
      this.select.focus();
    } else {
      this.filterInput.focus();
    }
  };

  private bindStateListener(): void {
    transitionListener(this.select, 'border-top-color', this.setState);
  }

  /*
   * <START CUSTOM SELECT DROPDOWN>
   */
  private observeSelect(): void {
    this.selectObserver = new MutationObserver((mutations) => {
      mutations.filter(({ type }) => type === 'childList' || type === 'attributes').forEach(this.setOptionList);
    });
    this.selectObserver.observe(this.select, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['disabled']
    });
  }

  private handleClickOutside(e): void {
    if (this.host.contains(e.target)) {
      return;
    } else {
      this.fakeOptionListHidden = true;
      if (this.filter) {
        this.filterInput.value = '';
      }
    }
  }

  private handleMouseEvents(e: MouseEvent): void {
    e.preventDefault();
    e.stopPropagation();
    this.select.focus();
    this.handleVisibilityOfFakeOptionList('toggle');
  }

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
      const listNodePageOffset = this.fakeOptionListNode.getBoundingClientRect().top;
      const listNodeOffset = this.fakeOptionListNode.offsetTop;
      const listNodeChildrenHeight = this.fakeOptionListNode.children[0].clientHeight;
      const numberOfChildNodes = this.fakeOptionListNode.children.length;
      // Max number of children visible is set to 5 (which equals fixed max-height of 200px defined in CSS)
      const listNodeHeight =
        numberOfChildNodes >= 5 ? listNodeChildrenHeight * 5 : listNodeChildrenHeight * numberOfChildNodes;
      const spaceTop = listNodePageOffset - listNodeOffset - listNodeHeight - window.scrollY;
      const spaceBottom = window.scrollY + window.innerHeight - (listNodePageOffset + listNodeHeight);
      if (spaceBottom < 0 && (spaceTop >= 0 || spaceTop > spaceBottom)) {
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
      }
    } else {
      if (type === 'hide' || type === 'toggle') {
        this.fakeOptionListHidden = true;
      }
    }
  }

  private handleKeyboardEvents(e: KeyboardEvent): void {
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
          this.handleVisibilityOfFakeOptionList('show');
          this.handleScroll();
        } else {
          e.preventDefault();
          this.handleVisibilityOfFakeOptionList('toggle');
          this.handleScroll();
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
            highlighted: index === 0
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
            highlighted: index === lastIndex
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
        this.nativeSearchOptions();
    }
  }

  private setOptionList = (): void => {
    this.options = this.select.querySelectorAll('option');
    this.optionMaps = Array.from(this.options).map((item, index) => {
      const disabled = item.hasAttribute('disabled');
      const selected = item.selected && !item.disabled;
      const highlighted = selected;
      const option: OptionMap = { key: index, value: item.text, disabled, hidden: false, selected, highlighted };
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
      this.filterInput.setAttribute('placeholder', this.options[this.select.selectedIndex].text);
      if (document.activeElement !== this.filterInput) {
        this.filterInput.focus();
      }
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
      hidden: false
    }));

    if (oldSelectedValue !== newSelectedValue) {
      // IE11 workaround for dispatchEvent
      let event: Event;
      if (typeof Event === 'function') {
        event = new Event('change', { bubbles: true });
      } else {
        event = document.createEvent('Event');
        event.initEvent('change', true, false);
      }
      this.select.dispatchEvent(event);
    }
  };

  private createFakeOptionList(): JSX.Element[][] {
    const PrefixedTagNames = getPrefixedTagNames(this.host, ['p-icon']);
    return !this.filterHasResults ? (
      <div class={prefix('select-wrapper__fake-option')}>
        <span>---</span>
      </div>
    ) : (
      Array.from(this.options).map((item, index) => {
        const { disabled, hidden, selected, highlighted } = this.optionMaps[index];
        return [
          item.parentElement.tagName === 'OPTGROUP' && item.previousElementSibling === null && (
            <span class={prefix('select-wrapper__fake-optgroup-label')} role="presentation">
              {item.closest('optgroup').label}
            </span>
          ),
          <div
            id={`option-${index}`}
            role="option"
            color="inherit"
            class={{
              [prefix('select-wrapper__fake-option')]: true,
              [prefix('select-wrapper__fake-option--selected')]: selected,
              [prefix('select-wrapper__fake-option--highlighted')]: highlighted,
              [prefix('select-wrapper__fake-option--disabled')]: disabled,
              [prefix('select-wrapper__fake-option--hidden')]: hidden
            }}
            onClick={(e) => (!disabled && !selected ? this.setOptionSelected(index) : this.handleFocus(e))}
            aria-selected={highlighted ? 'true' : null}
            aria-disabled={disabled ? 'true' : null}
            aria-hidden={hidden ? 'true' : null}
          >
            <span>{item.text}</span>
            {selected && (
              <PrefixedTagNames.pIcon
                class={prefix('select-wrapper__fake-option-icon')}
                aria-hidden="true"
                name="check"
                color="inherit"
              />
            )}
          </div>
        ];
      })
    );
  }

  private cycleFakeOptionList(direction: string): void {
    const validItems = this.optionMaps.filter((item) => !item.hidden && !item.disabled);
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
      highlighted: index === validItems[i].key
    }));

    if (direction === 'left' || direction === 'right') {
      this.setOptionSelected(this.getHighlightedIndex(this.optionMaps));
    }

    this.handleScroll();
  }

  private handleScroll(): void {
    const fakeOptionListNodeHeight = 200;
    if (this.fakeOptionListNode.scrollHeight > fakeOptionListNodeHeight) {
      this.fakeOptionHighlightedNode = this.fakeOptionListNode.querySelectorAll('div')[
        this.getHighlightedIndex(this.optionMaps)
      ];

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

  private nativeSearchOptions(): void {
    // timeout is needed if fast keyboard events are triggered and dom needs time to update state
    setTimeout(() => {
      const { selectedIndex } = this.select;
      this.optionMaps = this.optionMaps.map((item, index) => ({
        ...item,
        highlighted: index === selectedIndex,
        selected: index === selectedIndex
      }));

      this.handleScroll();
    }, 100);
  }

  private getHighlightedIndex = (arr: readonly OptionMap[]): number => arr.findIndex((item) => item.highlighted);

  /*
   * <START CUSTOM FILTER>
   */
  private handleFilterInputClick(): void {
    if (!this.disabled) {
      this.filterInput.focus();
      this.filterInput.value = '';
      this.searchString = '';
      this.handleVisibilityOfFakeOptionList('toggle');
      this.handleScroll();
    }
  }

  private handleFilterSearch(ev: InputEvent): void {
    this.searchString = (ev.target as HTMLInputElement).value;
    this.optionMaps = this.optionMaps.map((item) => ({
      ...item,
      hidden: !item.value.toLowerCase().startsWith(this.searchString.toLowerCase().trim())
    }));

    const hiddenItems = this.optionMaps.filter((item) => item.hidden);
    this.filterHasResults = hiddenItems.length !== this.optionMaps.length;
    this.handleVisibilityOfFakeOptionList('show');
  }

  private addSlottedStyles(): void {
    const tagName = this.host.tagName.toLowerCase();
    const style = `${tagName} a {
      outline: none transparent;
      color: inherit;
      text-decoration: underline;
      -webkit-transition: outline-color .24s ease, color .24s ease;
      transition: outline-color .24s ease, color .24s ease;
    }
    ${tagName} a:hover {
      color: #d5001c;
    }
    ${tagName} a:focus {
      outline: 2px solid #00d5b9;
      outline-offset: 1px;
    }`;

    insertSlottedStyles(this.host, style);
  }
}
