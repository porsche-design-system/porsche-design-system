import { Component, Element, forceUpdate, h, Host, type JSX, Listen, Prop, State } from '@stencil/core';
import { MultiSelectOptionUpdateEvent } from '../multi-select-option/multi-select-option-utils';
import {
  getDropdownDirection,
  getHighlightedOption,
  getHighlightedOptionIndex,
  hasFilterOptionResults,
  MultiSelectDropdownDirection,
  MultiSelectState,
  resetFilteredOptions,
  resetHighlightedOptions,
  setFirstOptionHighlighted,
  setLastOptionHighlighted,
  syncMultiSelectOptionProps,
  syncNativeSelect,
  updateHighlightedOption,
  updateMultiSelectOptionsFilterState,
  updateNativeOption,
  updateNativeSelectOptions,
} from './multi-select-utils';
import {
  AllowedTypes,
  attachComponentCss,
  FORM_STATES,
  getPrefixedTagNames,
  hasDescription,
  hasLabel,
  hasMessage,
  hasPropValueChanged,
  isClickOutside,
  isRequiredAndParentNotRequired,
  THEMES,
  throwIfChildrenAreNotOfKind,
  validateProps,
} from '../../../utils';
import type { BreakpointCustomizable, PropTypes, Theme } from '../../../types';
import { Required } from '../../common/required/required';
import { getComponentCss } from './multi-select-styles';
import { SELECT_DROPDOWN_DIRECTIONS, SelectDropdownDirectionInternal } from '../../../utils/select/select-dropdown';
import { StateMessage } from '../../common/state-message/state-message';
import { getFilterInputAriaAttributes, getListAriaAttributes } from '../../../utils/select/select-aria';

const propTypes: PropTypes<typeof MultiSelect> = {
  label: AllowedTypes.string,
  description: AllowedTypes.string,
  name: AllowedTypes.string,
  state: AllowedTypes.oneOf<MultiSelectState>(FORM_STATES),
  message: AllowedTypes.string,
  hideLabel: AllowedTypes.breakpoint('boolean'),
  disabled: AllowedTypes.boolean,
  required: AllowedTypes.boolean,
  dropdownDirection: AllowedTypes.oneOf<MultiSelectDropdownDirection>(SELECT_DROPDOWN_DIRECTIONS),
  theme: AllowedTypes.oneOf<Theme>(THEMES),
};

@Component({
  tag: 'p-multi-select',
  shadow: true,
})
export class MultiSelect {
  @Element() public host!: HTMLElement;

  /** The label text. */
  @Prop() public label?: string = '';

  /** The description text. */
  @Prop() public description?: string = '';

  /** This attribute is used to specify the name of the control. */
  @Prop() public name: string;

  /** The validation state. */
  @Prop() public state?: MultiSelectState = 'none';

  /** The message styled depending on validation state. */
  @Prop() public message?: string = '';

  /** Show or hide label. For better accessibility it is recommended to show the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  /** Disables the multi-select */
  @Prop() public disabled?: boolean = false;

  /** A Boolean attribute indicating that an option with a non-empty string value must be selected. */
  @Prop() public required?: boolean = false;

  /** Changes the direction to which the dropdown list appears. */
  @Prop() public dropdownDirection?: MultiSelectDropdownDirection = 'auto';

  /** Adapts the select color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  @State() private selectedString = '';
  @State() private isOpen = false;

  // TODO: only render nativeSelect if isWithinForm
  private nativeSelect: HTMLSelectElement = document.createElement('select');
  private multiSelectOptions: HTMLPMultiSelectOptionElement[] = [];
  private inputContainer: HTMLDivElement;
  private inputElement: HTMLInputElement;
  private listElement: HTMLUListElement;

  @Listen('internalOptionUpdate')
  public updateOptionHandler(event: CustomEvent<MultiSelectOptionUpdateEvent>): void {
    const index = this.multiSelectOptions.findIndex((el) => el === event.detail.optionElement);
    const nativeOption = this.nativeSelect.children[index] as HTMLOptionElement;
    updateNativeOption(nativeOption, event.detail.optionElement);
    this.updateSelectedString();
  }

  public connectedCallback(): void {
    syncNativeSelect(this.nativeSelect, this.host, this.name, this.disabled, this.required);
  }

  public componentWillLoad(): void {
    document.addEventListener('mousedown', this.onClickOutside, true);
  }

  public componentDidLoad(): void {
    this.updateOptions();
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public disconnectedCallback(): void {
    document.removeEventListener('mousedown', this.onClickOutside, true);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(
      this.host,
      getComponentCss,
      this.nativeSelect.selectedOptions.length > 0,
      getDropdownDirection(this.dropdownDirection, this.inputContainer, this.multiSelectOptions),
      this.isOpen,
      this.disabled,
      this.hideLabel,
      this.state,
      this.theme
    );
    syncMultiSelectOptionProps(this.host, this.theme);

    const PrefixedTagNames = getPrefixedTagNames(this.host);
    const dropdownId = 'list';
    const labelId = 'label';
    const descriptionId = this.description && 'description';

    return (
      <Host>
        <div class="root">
          <label class="label">
            {!this.hideLabel && hasLabel(this.host, this.label) && (
              <span class="label__text" onClick={() => this.inputElement.focus()}>
                {this.label || <slot name="label" />}
                {isRequiredAndParentNotRequired(this.host, this.nativeSelect) && <Required />}
              </span>
            )}
            {hasDescription(this.host, this.description) && (
              <span class="label__text" onClick={() => this.inputElement.focus()}>
                {this.description || <slot name="description" />}
              </span>
            )}
          </label>
          <div class={{ 'input-container': true, disabled: this.disabled }} ref={(el) => (this.inputContainer = el)}>
            <input
              placeholder={this.selectedString || null}
              autoComplete="off"
              onInput={this.onFilterChange}
              onClick={this.onInputClick}
              disabled={this.disabled}
              required={this.required}
              onKeyDown={this.onComboboxKeyDown}
              ref={(el) => (this.inputElement = el)}
              {...getFilterInputAriaAttributes(
                this.isOpen,
                this.required,
                labelId,
                descriptionId,
                dropdownId,
                getHighlightedOptionIndex(this.multiSelectOptions)
              )}
            />
            <PrefixedTagNames.pButtonPure
              class="icon reset-icon"
              icon="close"
              hideLabel="true"
              theme={this.theme}
              color={this.disabled ? 'state-disabled' : 'primary'}
              onClick={this.onResetClick}
              aria-hidden="true"
            ></PrefixedTagNames.pButtonPure>
            <PrefixedTagNames.pIcon
              class={{ icon: true, ['toggle-icon']: true, ['toggle-icon--open']: this.isOpen }}
              name="arrow-head-down"
              theme={this.theme}
              color={this.disabled ? 'state-disabled' : 'primary'}
              onClick={this.onIconClick}
              aria-hidden="true"
            />
          </div>
          <div class="sr-text" id={labelId}>
            {this.selectedString}, {this.label}
            {!!this.message && `. ${this.message}`}
          </div>
          {this.description && (
            <div class="sr-text" id={descriptionId}>
              {this.description}
            </div>
          )}
          <ul
            {...getListAriaAttributes(this.label, this.required, true, this.isOpen, true)}
            ref={(el) => (this.listElement = el)}
          >
            {!hasFilterOptionResults(this.multiSelectOptions) && (
              <li class="no-results" aria-live="polite" role="status">
                <span aria-hidden="true">---</span>
                <span class="no-results__sr">No results found</span>
              </li>
            )}
            <slot onSlotchange={() => this.updateOptions()} />
          </ul>
        </div>
        {hasMessage(this.host, this.message, this.state) && (
          <StateMessage state={this.state} message={this.message} theme={this.theme} host={this.host} />
        )}
      </Host>
    );
  }

  private updateOptions = (): void => {
    this.defineMultiSelectOptions();
    updateNativeSelectOptions(this.nativeSelect, this.multiSelectOptions);
    this.updateSelectedString();
  };

  private defineMultiSelectOptions(): void {
    throwIfChildrenAreNotOfKind(this.host, 'p-multi-select-option');
    this.multiSelectOptions = Array.from(this.host.children) as HTMLPMultiSelectOptionElement[];
  }

  private onFilterChange = (e: Event): void => {
    if ((e.target as HTMLInputElement).value.startsWith(' ')) {
      this.resetFilter();
    } else {
      updateMultiSelectOptionsFilterState((e.target as HTMLInputElement).value, this.multiSelectOptions);
      // TODO: Is this necessary in order to show No results found?
      forceUpdate(this.host);
    }
    // in case input is focused via tab instead of click
    this.isOpen = true;
  };

  private updateSelectedString = (): void => {
    this.selectedString = Array.from(this.nativeSelect.selectedOptions)
      .map((option) => option.textContent)
      .join(', ');
  };

  private onInputClick = (): void => {
    this.isOpen = true;
  };

  private onIconClick = (): void => {
    this.isOpen = !this.isOpen;
  };

  private onResetClick = (): void => {
    this.multiSelectOptions.forEach((option) => (option.selected = false));
  };

  private onClickOutside = (e: MouseEvent): void => {
    if (this.isOpen && isClickOutside(e, this.inputContainer) && isClickOutside(e, this.listElement)) {
      this.isOpen = false;
      this.resetFilter();
    }
  };

  private resetFilter = (): void => {
    this.inputElement.value = '';
    resetFilteredOptions(this.multiSelectOptions);
  };

  private onComboboxKeyDown = (e: KeyboardEvent): void => {
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
      case 'Enter':
        const highlightedOption = getHighlightedOption(this.multiSelectOptions);
        if (highlightedOption) {
          highlightedOption.selected = !highlightedOption.selected;
        }
        break;
      case 'Escape':
      case 'Tab':
        this.isOpen = false;
        resetHighlightedOptions(this.multiSelectOptions);
        break;
      case 'PageUp':
        if (this.isOpen) {
          e.preventDefault();
          setFirstOptionHighlighted(this.listElement, this.multiSelectOptions);
        }
        break;
      case 'PageDown':
        if (this.isOpen) {
          e.preventDefault();
          setLastOptionHighlighted(this.listElement, this.multiSelectOptions);
        }
        break;
      default:
      // TODO: seems to be difficult to combine multiple keys as native select does
    }
  };

  private cycleDropdown(direction: SelectDropdownDirectionInternal): void {
    this.isOpen = true;
    updateHighlightedOption(this.listElement, this.multiSelectOptions, direction);
    // TODO: Is this necessary only to update aria-activedescendant?
    forceUpdate(this.host);
  }
}
