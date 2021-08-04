import { Component, Element, forceUpdate, h, Host, JSX, Listen, Prop, State } from '@stencil/core';
import {
  booleanToString,
  getHTMLElementAndThrowIfUndefined,
  getPrefixedTagNames,
  getRole,
  hasDescription,
  hasLabel,
  hasMessage,
  isDark,
  isRequiredAndParentNotRequired,
  mapBreakpointPropToClasses,
  observeAttributes,
  observeChildren,
  observeProperties,
  setAriaAttributes,
  setAttribute,
} from '../../../../utils';
import type { BreakpointCustomizable, FormState, Theme } from '../../../../types';
import {
  updateFilteredOptionMaps,
  getHighlightedOptionMapIndex,
  getOptionMaps,
  getOptionsElements,
  updateSelectedOptionMaps,
  updateHighlightedOptionMaps,
  updateLastHighlightedOptionMaps,
  resetFilteredOptionMaps,
  updateFirstHighlightedOptionMaps,
  isCustomDropdown,
  getSelectedOptionMap,
  getNewOptionMapIndex,
  resetHighlightedIndex,
} from './select-wrapper-utils';
import type { OptionMap, DropdownDirection, KeyboardDirectionInternal } from './select-wrapper-utils';

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
  @Prop() public dropdownDirection?: DropdownDirection = 'auto';

  /** Forces rendering of native browser select dropdown */
  @Prop() public native?: boolean = false;

  @State() private isOpen = false;
  @State() private optionMaps: OptionMap[] = [];

  private select: HTMLSelectElement;
  private filterInput: HTMLInputElement;
  private fakeFilter: HTMLSpanElement;
  private searchString: string; // TODO: refactor into getter
  private hasCustomDropdown: boolean;

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
    this.hasCustomDropdown = isCustomDropdown(this.filter, this.native);

    if (this.hasCustomDropdown) {
      this.observePropertiesAndChildren();

      this.select.addEventListener('keydown', this.onKeyboardEvents);

      if (!this.filter) {
        this.select.addEventListener('mousedown', this.onMouseDown);
      }
      document.addEventListener('mousedown', this.onClickOutside, true);
    }
  }

  public componentDidLoad(): void {
    if (this.filter) {
      this.fakeFilter.addEventListener('click', this.onFilterInputClick); // span element
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
  }

  public disconnectedCallback(): void {
    if (this.hasCustomDropdown) {
      document.removeEventListener('mousedown', this.onClickOutside, true);
    }
  }

  public render(): JSX.Element {
    const rootClasses = {
      ['root']: true,
      [`root--${this.state}`]: this.state !== 'none',
      ['root--disabled']: this.disabled,
      ['root--theme-dark']: isDark(this.theme),
    };
    const labelClasses = {
      ['label']: true,
      ...mapBreakpointPropToClasses('label-', this.hideLabel, ['hidden', 'visible']),
    };
    const iconClasses = {
      ['icon']: true,
      ['icon--open']: this.isOpen,
    };

    const labelId = 'label';
    const dropdownId = 'dropdown';

    const textProps = { tag: 'span', color: 'inherit' };
    const labelProps = { ...textProps, onClick: this.onLabelClick };

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host>
        <div class={rootClasses}>
          <label id={labelId} class={labelClasses}>
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
            <PrefixedTagNames.pIcon class={iconClasses} name="arrow-head-down" color="inherit" />
            <slot />
          </label>
          {this.filter && [
            <input
              type="text"
              role="combobox"
              disabled={this.disabled}
              placeholder={getSelectedOptionMap(this.optionMaps)?.value}
              aria-autocomplete="both"
              aria-controls={dropdownId}
              aria-expanded={booleanToString(this.isOpen)}
              aria-activedescendant={`option-${getHighlightedOptionMapIndex(this.optionMaps)}`}
              ref={(el) => (this.filterInput = el)}
            />,
            <span ref={(el) => (this.fakeFilter = el)} />,
          ]}
          {this.hasCustomDropdown && (
            <PrefixedTagNames.pSelectWrapperDropdown
              id={dropdownId}
              class="dropdown"
              optionMaps={this.optionMaps}
              direction={this.dropdownDirection}
              open={this.isOpen}
              filter={this.filter}
              theme={this.theme}
              onSelect={this.setOptionSelected}
              onFocus={this.onFocus}
              aria-labelledby={labelId}
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

  private get disabled(): boolean {
    return this.select.disabled;
  }

  private get selectedIndex(): number {
    return this.select.selectedIndex;
  }

  private onLabelClick = (): void => {
    if (this.filter) {
      this.filterInput.focus();
    } else {
      this.select.focus();
    }
  };

  /*
   * <START NATIVE SELECT>
   */
  private setSelect(): void {
    this.select = getHTMLElementAndThrowIfUndefined(this.host, 'select');

    if (this.filter) {
      setAttribute(this.select, 'tabindex', '-1');
      setAttribute(this.select, 'aria-hidden', 'true');
    }
  }

  private observeSelect(): void {
    observeAttributes(this.select, ['disabled', 'required'], () => forceUpdate(this.host));
  }

  /*
   * <START CUSTOM DROPDOWN>
   */
  private observePropertiesAndChildren(): void {
    this.setOptionMaps(); // initial
    this.observeOptions(); // initial

    observeProperties(this.select, ['value', 'selectedIndex'], this.setOptionMaps);
    observeChildren(this.select, () => {
      this.setOptionMaps();
      this.observeOptions(); // new option might have been added
    });
  }

  private observeOptions(): void {
    getOptionsElements(this.select).forEach((el) =>
      observeProperties(el, ['selected', 'disabled'], this.setOptionMaps)
    );
  }

  private onClickOutside = (e: MouseEvent): void => {
    if (!e.composedPath().includes(this.host)) {
      this.handleVisibilityOfFakeOptionList('hide');
    }
  };

  private onMouseDown = (e: MouseEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    this.onFocus();
    this.handleVisibilityOfFakeOptionList('toggle');
  };

  private onFocus = (): void => {
    (this.filter ? this.filterInput : this.select).focus();
  };

  private handleVisibilityOfFakeOptionList(type: 'show' | 'hide' | 'toggle'): void {
    if (!this.isOpen) {
      if (type === 'show' || type === 'toggle') {
        this.isOpen = true;
      }
    } else {
      if (type === 'hide' || type === 'toggle') {
        this.isOpen = false;
        this.resetFilter();
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
          if (!this.isOpen) {
            e.preventDefault();
            this.handleVisibilityOfFakeOptionList('show');
          }
        } else {
          e.preventDefault();
          this.handleVisibilityOfFakeOptionList('toggle');
          if (!this.isOpen) {
            this.setOptionSelected(getHighlightedOptionMapIndex(this.optionMaps));
          }
        }
        break;
      case 'Enter':
        e.preventDefault();
        this.handleVisibilityOfFakeOptionList('hide');
        if (this.filter) {
          const itemValue =
            !!this.searchString &&
            this.optionMaps.filter((item) => item.value.toLowerCase() === this.searchString.toLowerCase());
          if (itemValue.length === 1) {
            this.setOptionSelected(itemValue[0].key);
          } else {
            this.setOptionSelected(getHighlightedOptionMapIndex(this.optionMaps));
          }
        } else {
          this.setOptionSelected(getHighlightedOptionMapIndex(this.optionMaps));
        }
        break;
      case 'Escape':
      case 'Esc':
        if (this.filter) {
          this.filterInput.value = '';
        }
        this.setOptionSelected(this.selectedIndex);
        break;
      case 'PageUp':
        e.preventDefault();
        if (this.isOpen) {
          this.optionMaps = updateFirstHighlightedOptionMaps(this.optionMaps);
        }
        break;
      case 'PageDown':
        e.preventDefault();
        if (this.isOpen) {
          this.optionMaps = updateLastHighlightedOptionMaps(this.optionMaps);
        }
        break;
      case 'Tab':
        if (this.isOpen) {
          this.handleVisibilityOfFakeOptionList('hide');
        }
        break;
      default:
        // timeout is needed if fast keyboard events are triggered and dom needs time to update state
        setTimeout(() => {
          this.optionMaps = updateSelectedOptionMaps(this.optionMaps, this.selectedIndex);
        }, 100);
    }
  };

  private setOptionMaps = (): void => {
    this.optionMaps = updateSelectedOptionMaps(getOptionMaps(getOptionsElements(this.select)), this.selectedIndex);
  };

  private setOptionSelected = (newIndex: number): void => {
    this.handleVisibilityOfFakeOptionList('hide');

    if (this.selectedIndex !== newIndex) {
      this.select.selectedIndex = newIndex;
      this.select.dispatchEvent(new Event('change', { bubbles: true }));
    } else {
      this.optionMaps = resetHighlightedIndex(this.optionMaps);
    }

    this.resetFilter();
    this.onFocus();
  };

  private cycleFakeOptionList(direction: KeyboardDirectionInternal): void {
    const newIndex = getNewOptionMapIndex(this.optionMaps, direction);
    this.optionMaps = updateHighlightedOptionMaps(this.optionMaps, newIndex);

    if (direction === 'left' || direction === 'right') {
      this.setOptionSelected(newIndex);
    }
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

  private resetFilter = (): void => {
    if (this.filter) {
      this.filterInput.value = '';
      this.searchString = '';
      this.optionMaps = resetFilteredOptionMaps(this.optionMaps);
    }
  };

  private onFilterSearch = (ev: InputEvent): void => {
    this.searchString = (ev.target as HTMLInputElement).value;
    this.optionMaps = updateFilteredOptionMaps(this.optionMaps, this.searchString);

    this.handleVisibilityOfFakeOptionList('show');
  };
}
