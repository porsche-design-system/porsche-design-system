import { Component, Element, forceUpdate, h, Host, JSX, Listen, Prop, State } from '@stencil/core';
import {
  getHTMLElementAndThrowIfUndefined,
  getPrefixedTagNames,
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
  resetHighlightedOptionMaps,
  getMatchingOptionMaps,
  hasFilterResults,
  getDropdownVisibility,
} from './select-wrapper-utils';
import type {
  OptionMap,
  DropdownDirection,
  DropdownInteractionType,
  KeyboardDirectionInternal,
} from './select-wrapper-utils';
import { addSlottedCss } from './select-wrapper-styles';
import { StateMessage } from '../../../common/state-message';

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
  @State() private searchString = '';

  private select: HTMLSelectElement;
  private filterElement: HTMLPSelectWrapperFilterElement;
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
    addSlottedCss(this.host);
  }

  public componentWillLoad(): void {
    this.hasCustomDropdown = isCustomDropdown(this.filter, this.native);

    if (this.hasCustomDropdown) {
      this.observePropertiesAndChildren();

      this.select.addEventListener('keydown', this.onKeyboardEvents);

      if (!this.filter) {
        this.select.addEventListener('mousedown', this.onMouseDown);
        this.select.addEventListener('change', this.syncSelectedIndex);
      }
      document.addEventListener('mousedown', this.onClickOutside, true);
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
    const { disabled } = this.select;

    const rootClasses = {
      ['root']: true,
      [`root--${this.state}`]: this.state !== 'none',
      ['root--disabled']: disabled,
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
    const labelProps = { ...textProps, onClick: this.onFocus };

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
          {this.filter && (
            <PrefixedTagNames.pSelectWrapperFilter
              class="filter"
              placeholder={getSelectedOptionMap(this.optionMaps)?.value}
              highlightedIndex={getHighlightedOptionMapIndex(this.optionMaps)}
              dropdownId={dropdownId}
              disabled={disabled}
              isOpen={this.isOpen}
              state={this.state}
              theme={this.theme}
              value={this.searchString}
              onChange={this.onFilterChange}
              onClick={() => this.setDropdownVisibility('toggle')}
              onKeyDown={this.onKeyboardEvents}
              ref={(el) => (this.filterElement = el)}
            />
          )}
          {this.hasCustomDropdown && (
            <PrefixedTagNames.pSelectWrapperDropdown
              id={dropdownId}
              class="dropdown"
              optionMaps={this.optionMaps}
              direction={this.dropdownDirection}
              open={this.isOpen}
              filter={this.filter}
              hasFilterResults={hasFilterResults(this.optionMaps)}
              theme={this.theme}
              onSelect={this.setOptionSelected}
              onFocus={this.onFocus}
              aria-labelledby={labelId}
            />
          )}
        </div>
        {hasMessage(this.host, this.message, this.state) && (
          <StateMessage state={this.state} message={this.message} host={this.host} />
        )}
      </Host>
    );
  }

  private get selectedIndex(): number {
    return this.select.selectedIndex;
  }

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

    observeProperties(this.select, ['value', 'selectedIndex'], this.syncSelectedIndex);
    observeChildren(
      this.select,
      () => {
        this.setOptionMaps();
        this.observeOptions(); // new option might have been added
      },
      // unfortunately we can't observe hidden property of option elements via observeProperties
      // therefore we do it here via attribute
      ['hidden']
    );
  }

  private observeOptions(): void {
    getOptionsElements(this.select).forEach((el) =>
      observeProperties(el, ['selected', 'disabled'], this.setOptionMaps)
    );
  }

  private onClickOutside = (e: MouseEvent): void => {
    if (!e.composedPath().includes(this.host)) {
      this.setDropdownVisibility('hide');
    }
  };

  private onMouseDown = (e: MouseEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    this.onFocus();
    this.setDropdownVisibility('toggle');
  };

  private onFocus = (): void => {
    (this.filter ? this.filterElement : this.select).focus();
  };

  private setDropdownVisibility = (type: DropdownInteractionType): void => {
    this.isOpen = getDropdownVisibility(this.isOpen, type, this.resetFilter);
  };

  private onKeyboardEvents = (e: KeyboardEvent): void => {
    switch (e.key) {
      case 'ArrowUp':
      case 'Up':
        e.preventDefault();
        this.setDropdownVisibility('show');
        this.cycleDropdown('up');
        break;
      case 'ArrowDown':
      case 'Down':
        e.preventDefault();
        this.setDropdownVisibility('show');
        this.cycleDropdown('down');
        break;
      case 'ArrowLeft':
      case 'Left':
        e.preventDefault();
        this.cycleDropdown('left');
        break;
      case 'ArrowRight':
      case 'Right':
        e.preventDefault();
        this.cycleDropdown('right');
        break;
      case ' ':
      case 'Spacebar':
        e.preventDefault();
        if (this.filter) {
          this.setDropdownVisibility('show');
        } else {
          this.setDropdownVisibility('toggle');
          if (!this.isOpen) {
            this.setOptionSelected(getHighlightedOptionMapIndex(this.optionMaps));
          }
        }
        break;
      case 'Enter':
        e.preventDefault();
        this.setDropdownVisibility('hide');
        if (this.filter) {
          const matchingOptions = getMatchingOptionMaps(this.optionMaps, this.searchString);
          if (matchingOptions.length === 1) {
            this.setOptionSelected(this.optionMaps.indexOf(matchingOptions[0]));
          } else {
            this.setOptionSelected(getHighlightedOptionMapIndex(this.optionMaps));
          }
        } else {
          this.setOptionSelected(getHighlightedOptionMapIndex(this.optionMaps));
        }
        break;
      case 'Escape':
      case 'Esc':
        this.resetFilter();
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
        this.setDropdownVisibility('hide');
        break;
    }
  };

  private syncSelectedIndex = (): void => {
    this.optionMaps = updateSelectedOptionMaps(this.optionMaps, this.selectedIndex);
  };

  private setOptionMaps = (): void => {
    this.optionMaps = updateSelectedOptionMaps(getOptionMaps(getOptionsElements(this.select)), this.selectedIndex);
  };

  private setOptionSelected = (newIndex: number): void => {
    this.setDropdownVisibility('hide');

    if (this.selectedIndex !== newIndex) {
      this.select.selectedIndex = newIndex;
      this.select.dispatchEvent(new Event('change', { bubbles: true }));
    } else {
      this.optionMaps = resetHighlightedOptionMaps(this.optionMaps);
    }

    this.resetFilter();
    this.onFocus();
  };

  private cycleDropdown(direction: KeyboardDirectionInternal): void {
    const newIndex = getNewOptionMapIndex(this.optionMaps, direction);
    this.optionMaps = updateHighlightedOptionMaps(this.optionMaps, newIndex);

    if (direction === 'left' || direction === 'right') {
      this.setOptionSelected(newIndex);
    }
  }

  /*
   * <START CUSTOM FILTER>
   */
  private resetFilter = (): void => {
    if (this.filter) {
      this.searchString = '';
      this.optionMaps = resetFilteredOptionMaps(this.optionMaps);
    }
  };

  private onFilterChange = (e: InputEvent): void => {
    this.searchString = (e.target as HTMLInputElement).value;
    this.optionMaps = updateFilteredOptionMaps(this.optionMaps, this.searchString);

    // in case input is focused via tab instead of click
    this.setDropdownVisibility('show');
  };
}
