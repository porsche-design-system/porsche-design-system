import { Component, Element, h, Host, JSX, Listen, Prop, State } from '@stencil/core';
import {
  getHTMLElementAndThrowIfUndefined,
  getHTMLElements,
  getPrefixedTagNames,
  getRole,
  hasDescription,
  hasLabel,
  hasMessage,
  isDark,
  isRequiredAndParentNotRequired,
  mapBreakpointPropToClasses,
  observeProperties,
  setAriaAttributes,
  setAttribute,
} from '../../../utils';
import type { BreakpointCustomizable, FormState, Theme } from '../../../types';
import {
  updateFilteredOptionMaps,
  CHANGE_EVENT_NAME,
  getHighlightedIndex,
  getOptionMaps,
  getOptionsElements,
  OptionMap,
  updateSelectedOptionMaps,
  updateHighlightedOptionMaps,
  updateLastHighlightedOptionMaps,
  InternalChangeEvent,
  resetFilteredOptionMaps,
  updateFirstHighlightedOptionMaps,
  updateHighlightedAndSelectedOptionMaps,
  isCustomDropdown,
} from './select-wrapper-utils';

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
  // @State() private filterHasResults = true;

  private select: HTMLSelectElement;
  private options: HTMLOptionElement[];
  private dropdown: HTMLPSelectWrapperDropdownElement;
  private fakeOptionHighlightedNode: HTMLDivElement;
  private selectObserver: MutationObserver;
  private filterInput: HTMLInputElement;
  private fakeFilter: HTMLSpanElement;
  private searchString: string;
  private dropdownDirectionInternal: 'down' | 'up' = 'down';
  private hasCustomDropDown: boolean;

  // this stops click events when filter input is clicked
  @Listen('click', { capture: false })
  public onClick(e: MouseEvent): void {
    if (this.filter) {
      e.stopPropagation();
    }
  }

  public connectedCallback(): void {
    this.setSelect();
    this.observeSelect();
    // this.addSlottedStyles();
  }

  public componentWillLoad(): void {
    this.defineTypeOfDropDown();
    this.options = getOptionsElements(this.select);

    // TODO: later added options should be tracked
    observeProperties(this.select, ['value', 'selectedIndex'], this.setOptionList);
    this.options.forEach((x) => {
      observeProperties(x, ['selected'], this.setOptionList);
    });
  }

  public componentDidLoad(): void {
    if (this.filter) {
      this.fakeFilter.addEventListener('click', this.onFilterInputClick);
      this.filterInput.addEventListener('mousedown', this.onFilterInputClick);
      this.filterInput.addEventListener('keydown', this.onKeyboardEvents);
      this.filterInput.addEventListener('input', this.onFilterSearch);
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
    if (this.hasCustomDropDown && typeof document !== 'undefined') {
      document.removeEventListener('mousedown', this.onClickOutside, true);
    }
  }

  public render(): JSX.Element {
    const rootClasses = {
      ['root']: true,
      [`root--${this.state}`]: this.state !== 'none',
      ['root--theme-dark']: isDark(this.theme),
    };
    const labelClasses = {
      ['label']: true,
      ['label--disabled']: this.disabled,
      ...mapBreakpointPropToClasses('label-', this.hideLabel, ['hidden', 'visible']),
    };
    const iconClasses = {
      ['icon']: true,
      ['icon--opened']: !this.fakeOptionListHidden,
    };

    const textProps = { tag: 'span', color: 'inherit' };
    const labelProps = { ...textProps, onClick: this.labelClick };

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host>
        <div class={rootClasses}>
          <label id="p-label" class={labelClasses}>
            {hasLabel(this.host, this.label) && (
              <PrefixedTagNames.pText class="label__text" {...labelProps}>
                {this.label || <slot name="label" />}
                {isRequiredAndParentNotRequired(this.host, this.select) && <span class="required" />}
              </PrefixedTagNames.pText>
            )}
            {hasDescription(this.host, this.description) && (
              <PrefixedTagNames.pText class="label__text label__text--description" {...labelProps} size="x-small">
                {this.description || <slot name="description" />}
              </PrefixedTagNames.pText>
            )}
            <span class="fake-select">
              <PrefixedTagNames.pIcon class={iconClasses} name="arrow-head-down" color="inherit" />
              <slot />
            </span>
          </label>
          {this.filter && [
            <input
              type="text"
              role="combobox"
              aria-autocomplete="both"
              aria-controls="p-listbox"
              disabled={this.disabled}
              aria-expanded={this.fakeOptionListHidden ? 'false' : 'true'}
              aria-activedescendant={`option-${getHighlightedIndex(this.optionMaps)}`}
              placeholder={this.options[this.select.selectedIndex].text}
              ref={(el) => (this.filterInput = el)}
            />,
            <span ref={(el) => (this.fakeFilter = el)} />,
          ]}
          {this.hasCustomDropDown && (
            <p-select-wrapper-dropdown
              ref={(el) => (this.dropdown = el)}
              optionMaps={this.optionMaps}
              dropdownDirection={this.dropdownDirectionInternal}
              hidden={this.fakeOptionListHidden}
              filter={this.filter}
              theme={this.theme}
            />
          )}
        </div>
        {hasMessage(this.host, this.message, this.state) && (
          <PrefixedTagNames.pText class="message" {...textProps} role={getRole(this.state)}>
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
    // TODO: use shared attribute observer
    // most likely observing attributes is redundant with property observer, so watching children is enough
    this.selectObserver = new MutationObserver((mutations) => {
      if (mutations.some(({ type }) => type === 'childList' || type === 'attributes')) {
        // console.log('mutation observer');
        this.setOptionList();
      }
    });
    this.selectObserver.observe(this.select, {
      childList: true,
      subtree: true,
      attributeFilter: ['disabled', 'selected', 'hidden', 'required'],
    });
  }

  private defineTypeOfDropDown(): void {
    this.hasCustomDropDown = isCustomDropdown(this.filter, this.native);

    if (this.hasCustomDropDown) {
      this.host.shadowRoot.addEventListener(CHANGE_EVENT_NAME, (e: CustomEvent<InternalChangeEvent>) => {
        e.stopPropagation();
        this.setOptionSelected(e.detail.newIndex);
      });

      this.setOptionList();
      this.select.addEventListener('keydown', this.onKeyboardEvents);

      if (!this.filter) {
        this.select.addEventListener('mousedown', this.onMouseEvents);
      }
      if (typeof document !== 'undefined') {
        document.addEventListener('mousedown', this.onClickOutside, true);
      }
    }
  }

  private onClickOutside = (e: MouseEvent): void => {
    if (!e.composedPath().includes(this.host)) {
      this.handleVisibilityOfFakeOptionList('hide');
    }
  };

  private onMouseEvents = (e: MouseEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    this.onFocus(e);
    this.handleVisibilityOfFakeOptionList('toggle');
  };

  private onFocus(e: MouseEvent): void {
    if (!this.filter) {
      this.select.focus();
    } else {
      e.preventDefault();
      this.filterInput.focus();
    }
  }

  private handleDropdownDirection(): void {
    if (this.dropdownDirection === 'auto') {
      const children = getHTMLElements(this.dropdown.shadowRoot, '.option:not([aria-hidden="true"])');
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

  // TODO: move into dropdown
  private onKeyboardEvents = (e: KeyboardEvent): void => {
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
            this.setOptionSelected(getHighlightedIndex(this.optionMaps));
          }
        }
        break;
      case 'Enter':
        e.preventDefault();
        this.handleVisibilityOfFakeOptionList('hide');
        if (!this.filter) {
          this.setOptionSelected(getHighlightedIndex(this.optionMaps));
        } else {
          const itemValue =
            !!this.searchString &&
            this.optionMaps.filter((item) => item.value.toLowerCase() === this.searchString.toLowerCase());
          if (itemValue.length === 1) {
            this.setOptionSelected(itemValue[0].key);
          } else {
            this.setOptionSelected(getHighlightedIndex(this.optionMaps));
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
          this.optionMaps = updateFirstHighlightedOptionMaps(this.optionMaps);
          this.handleScroll();
        }
        break;
      case 'PageDown':
        e.preventDefault();
        if (!this.fakeOptionListHidden) {
          this.optionMaps = updateLastHighlightedOptionMaps(this.optionMaps);
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
    this.options = getOptionsElements(this.select);
    this.optionMaps = updateSelectedOptionMaps(getOptionMaps(this.options), this.select.selectedIndex);
  };

  private setOptionSelected = (newIndex: number): void => {
    // const oldSelectedValue = this.select.options[this.select.selectedIndex].text;
    // this.select.selectedIndex = newIndex;
    // const newSelectedValue = this.select.options[this.select.selectedIndex].text;
    this.handleVisibilityOfFakeOptionList('hide');

    if (this.filter) {
      this.filterInput.value = '';
      this.searchString = '';
      // this.filterHasResults = true;
      this.filterInput.focus();
    } else {
      if (document.activeElement !== this.select) {
        this.select.focus();
      }
    }

    if (this.select.selectedIndex !== newIndex) {
      this.select.selectedIndex = newIndex;
      this.select.dispatchEvent(new Event('change', { bubbles: true }));
    }
  };

  private cycleFakeOptionList(direction: string): void {
    const validItems = this.optionMaps.filter((item) => !item.hidden && !item.initiallyHidden && !item.disabled);
    const validMax = validItems.length - 1;
    if (validMax < 0) {
      return;
    }
    let i = getHighlightedIndex(validItems);
    if (direction === 'down' || direction === 'right') {
      i = i < validMax ? i + 1 : 0;
    } else if (direction === 'up' || direction === 'left') {
      i = i > 0 ? i - 1 : validMax;
    }
    this.optionMaps = updateHighlightedOptionMaps(this.optionMaps, validItems[i].key);

    if (direction === 'left' || direction === 'right') {
      this.setOptionSelected(getHighlightedIndex(this.optionMaps));
    }

    this.handleScroll();
  }

  private handleScroll(): void {
    const fakeOptionListNodeHeight = 200;
    if (this.dropdown.scrollHeight > fakeOptionListNodeHeight) {
      this.fakeOptionHighlightedNode = getHTMLElements(this.dropdown, 'div')[getHighlightedIndex(this.optionMaps)];

      if (this.fakeOptionHighlightedNode) {
        const { scrollTop } = this.dropdown;
        const { offsetTop, offsetHeight } = this.fakeOptionHighlightedNode;
        const scrollBottom = fakeOptionListNodeHeight + scrollTop;
        const elementBottom = offsetTop + offsetHeight;
        if (elementBottom > scrollBottom) {
          this.dropdown.scrollTop = elementBottom - fakeOptionListNodeHeight;
        } else if (offsetTop < scrollTop) {
          this.dropdown.scrollTop = offsetTop;
        }
      }
    }
  }

  private handleNativeSearchOptions(): void {
    // timeout is needed if fast keyboard events are triggered and dom needs time to update state
    setTimeout(() => {
      this.optionMaps = updateHighlightedAndSelectedOptionMaps(this.optionMaps, this.select.selectedIndex);
      this.handleScroll();
    }, 100);
  }

  /*
   * <START CUSTOM FILTER>
   */
  private onFilterInputClick = (): void => {
    if (!this.disabled) {
      this.filterInput.focus();
      this.handleVisibilityOfFakeOptionList('toggle');
    }
  };

  private resetFilterInput = (): void => {
    this.filterInput.value = '';
    this.searchString = '';
    // this.filterHasResults = true;
    this.optionMaps = resetFilteredOptionMaps(this.optionMaps);
  };

  private onFilterSearch = (ev: InputEvent): void => {
    this.searchString = (ev.target as HTMLInputElement).value;
    this.optionMaps = updateFilteredOptionMaps(this.optionMaps, this.searchString);

    // const hiddenItems = this.optionMaps.filter((item) => item.hidden || item.initiallyHidden);
    // this.filterHasResults = hiddenItems.length !== this.optionMaps.length;
    this.handleVisibilityOfFakeOptionList('show');
  };
}
