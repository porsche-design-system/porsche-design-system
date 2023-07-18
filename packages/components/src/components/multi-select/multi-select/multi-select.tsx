import { Component, Element, forceUpdate, h, Host, type JSX, Listen, Prop, State } from '@stencil/core';
import { MultiSelectOptionUpdateEvent } from '../multi-select-option/multi-select-option-utils';
import {
  hasFilterResults,
  syncNativeSelect,
  updateMultiSelectOptionsFilterState,
  updateNativeOption,
  updateNativeSelectOptions,
} from './multi-select-utils';
import {
  AllowedTypes,
  attachComponentCss,
  getDirectChildHTMLElements,
  getPrefixedTagNames,
  hasLabel,
  isClickOutside,
  observeAttributes,
  THEMES,
  validateProps,
} from '../../../utils';
import type { BreakpointCustomizable, PropTypes, Theme } from '../../../types';
import { Required } from '../../common/required/required';
import { getComponentCss } from './multi-select-styles';
import { SELECT_DROPDOWN_DIRECTIONS, SelectDropdownDirection } from '../../../utils/select/select-dropdown';
import { determineDirection } from '../../select-wrapper/select-wrapper-dropdown/select-wrapper-dropdown-utils';

const propTypes: PropTypes<typeof MultiSelect> = {
  label: AllowedTypes.string,
  name: AllowedTypes.string,
  hideLabel: AllowedTypes.breakpoint('boolean'),
  disabled: AllowedTypes.boolean,
  required: AllowedTypes.boolean,
  theme: AllowedTypes.oneOf<Theme>(THEMES),
  dropdownDirection: AllowedTypes.oneOf<SelectDropdownDirection>(SELECT_DROPDOWN_DIRECTIONS),
};

@Component({
  tag: 'p-multi-select',
  shadow: true,
})
export class MultiSelect {
  @Element() public host!: HTMLElement;

  /** The label text. */
  @Prop() public label?: string = '';

  /** This attribute is used to specify the name of the control. */
  @Prop() public name: string;

  /** Show or hide label. For better accessibility it is recommended to show the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  /** This Boolean attribute indicates that the user cannot interact with the control. If this attribute is not specified, the control inherits its setting from the containing element, for example <fieldset>; if there is no containing element with the disabled attribute set, then the control is enabled. */
  @Prop() public disabled? = false;

  /** A Boolean attribute indicating that an option with a non-empty string value must be selected. */
  @Prop() public required? = false;

  /** Adapts the select color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** Changes the direction to which the dropdown list appears. */
  @Prop() public dropdownDirection?: SelectDropdownDirection = 'auto';

  @State() private selectedString = '';
  @State() private isOpen = false;

  // TODO: only render nativeSelect if isWithinForm
  private nativeSelect: HTMLSelectElement = document.createElement('select');
  private multiSelectOptions: HTMLPMultiSelectOptionElement[];
  // private filteredMultiSelectOptions: HTMLPMultiSelectOptionElement[] = [];
  private inputContainer: HTMLDivElement;
  private multiSelectDropdown: HTMLElement;
  private inputElement: HTMLInputElement;

  @Listen('internalOptionUpdate')
  public updateOptionHandler(event: CustomEvent<MultiSelectOptionUpdateEvent>): void {
    const index = this.multiSelectOptions.findIndex((el) => el === event.detail.optionElement);
    const nativeOption = this.nativeSelect.children[index] as HTMLOptionElement;
    updateNativeOption(nativeOption, event.detail.optionElement);
    this.updateSelectedString();
  }

  public connectedCallback(): void {
    this.observeAttributes(); // on every reconnect
    syncNativeSelect(this.nativeSelect, this.host, this.name, this.disabled, this.required);
  }

  public componentWillLoad(): void {
    this.observeAttributes(); // on every reconnect
    document.addEventListener('mousedown', this.onClickOutside, true);
  }

  public componentDidLoad(): void {
    this.updateOptions();
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
      this.dropdownDirection === 'auto' ? determineDirection(this.host) : this.dropdownDirection,
      this.isOpen,
      this.disabled,
      this.hideLabel,
      'none',
      this.theme
    );

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host>
        <div class="root">
          <label class="label">
            {!this.hideLabel && hasLabel(this.host, this.label) && (
              <span class="label__text">
                {this.label || <slot name="label" />}
                {this.required && <Required />}
              </span>
            )}
          </label>
          <div class="input-container" ref={(el) => (this.inputContainer = el)}>
            <input
              placeholder={this.selectedString || null}
              autoComplete="off"
              onInput={this.onFilterChange}
              onClick={this.onInputClick}
              ref={(el) => (this.inputElement = el)}
            />
            <PrefixedTagNames.pIcon
              class="icon reset-icon"
              name="close"
              theme={this.theme}
              color={this.disabled ? 'state-disabled' : 'primary'}
              onClick={this.onResetClick}
              aria-hidden="true"
            />
            <PrefixedTagNames.pIcon
              class={{ icon: true, ['toggle-icon']: true, ['toggle-icon--open']: this.isOpen }}
              name="arrow-head-down"
              theme={this.theme}
              color={this.disabled ? 'state-disabled' : 'primary'}
              onClick={this.onIconClick}
              aria-hidden="true"
            />
          </div>
          <PrefixedTagNames.pMultiSelectDropdown
            isOpen={this.isOpen}
            onOpenChange={this.onDropdownOpenChange}
            theme={this.theme}
            ref={(el) => (this.multiSelectDropdown = el)}
          >
            {!hasFilterResults(this.multiSelectOptions) && (
              <li class="no-results" aria-live="polite" role="status">
                <span aria-hidden="true">---</span>
                <span class="no-results__sr">No results found</span>
              </li>
            )}
            <slot onSlotchange={() => this.updateOptions()} />
          </PrefixedTagNames.pMultiSelectDropdown>
        </div>
      </Host>
    );
  }

  private updateOptions = (): void => {
    this.defineMultiSelectOptions();
    updateNativeSelectOptions(this.nativeSelect, this.multiSelectOptions);
    this.updateSelectedString();
  };

  private defineMultiSelectOptions(): void {
    // TODO: Validation
    // TODO: Prefix
    this.multiSelectOptions = getDirectChildHTMLElements(this.host, 'p-multi-select-option');
  }

  private onFilterChange = (e: Event): void => {
    if ((e.target as HTMLInputElement).value.startsWith(' ')) {
      this.resetFilter();
    } else {
      updateMultiSelectOptionsFilterState((e.target as HTMLInputElement).value, this.multiSelectOptions);
      // TODO: Is this necessary?
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

  private onDropdownOpenChange = (isOpen: boolean): void => {
    this.isOpen = isOpen;
  };

  private observeAttributes(): void {
    observeAttributes(this.nativeSelect, ['disabled', 'required'], () => forceUpdate(this.host));
  }

  private onClickOutside = (e: MouseEvent): void => {
    if (this.isOpen && isClickOutside(e, this.inputContainer) && isClickOutside(e, this.multiSelectDropdown)) {
      this.isOpen = false;
    }
  };

  private resetFilter = (): void => {
    this.inputElement.value = '';
  };
}
