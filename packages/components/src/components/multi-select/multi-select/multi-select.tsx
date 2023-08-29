import type { MultiSelectDropdownDirection, MultiSelectState } from './multi-select-utils';
import {
  getDropdownDirection,
  getHighlightedOption,
  getHighlightedOptionIndex,
  getSelectedOptions,
  getSelectedOptionsString,
  getSelectedOptionValues,
  hasFilterOptionResults,
  initNativeSelect,
  MultiSelectOption,
  MultiSelectUpdateEvent,
  resetFilteredOptions,
  resetHighlightedOptions,
  resetSelectedOptions,
  setFirstOptionHighlighted,
  setLastOptionHighlighted,
  setSelectedOptions,
  syncMultiSelectOptionProps,
  syncNativeSelect,
  updateHighlightedOption,
  updateNativeOptions,
  updateOptionsFilterState,
} from './multi-select-utils';
import type { BreakpointCustomizable, PropTypes, Theme } from '../../../types';
import type { SelectDropdownDirectionInternal } from '../../../utils/select/select-dropdown';
import { SELECT_DROPDOWN_DIRECTIONS } from '../../../utils/select/select-dropdown';
import type { HTMLElementWithRequiredProp } from '../../../utils/form/isRequired';
import {
  Component,
  Element,
  Event,
  EventEmitter,
  forceUpdate,
  h,
  Host,
  type JSX,
  Listen,
  Prop,
  State,
  Watch,
} from '@stencil/core';
import {
  AllowedTypes,
  attachComponentCss,
  FORM_STATES,
  getPrefixedTagNames,
  getShadowRootHTMLElement,
  hasDescription,
  hasLabel,
  hasMessage,
  hasPropValueChanged,
  isClickOutside,
  isRequiredAndParentNotRequired,
  isWithinForm,
  THEMES,
  throwIfElementIsNotOfKind,
  validateProps,
} from '../../../utils';
import { Required } from '../../common/required/required';
import { getComponentCss } from './multi-select-styles';
import { StateMessage } from '../../common/state-message/state-message';
import { getFilterInputAriaAttributes, getListAriaAttributes } from '../../../utils/a11y/select/select-aria';

const propTypes: PropTypes<typeof MultiSelect> = {
  label: AllowedTypes.string,
  description: AllowedTypes.string,
  name: AllowedTypes.string,
  value: AllowedTypes.array(AllowedTypes.string),
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

  /** The name of the control. */
  @Prop() public name: string;

  /** The selected values. */
  @Prop({ mutable: true }) public value?: string[] = [];

  /** The validation state. */
  @Prop() public state?: MultiSelectState = 'none';

  /** The message styled depending on validation state. */
  @Prop() public message?: string = '';

  /** Show or hide label. For better accessibility it is recommended to show the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  /** Disables the multi-select */
  @Prop() public disabled?: boolean = false;

  /** A Boolean attribute indicating that an option with a non-empty string or number value must be selected. */
  @Prop() public required?: boolean = false;

  /** Changes the direction to which the dropdown list appears. */
  @Prop() public dropdownDirection?: MultiSelectDropdownDirection = 'auto';

  /** Adapts the select color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** Emitted when the selection is changed. */
  @Event({ bubbles: false }) public update: EventEmitter<MultiSelectUpdateEvent>;

  @State() private isOpen = false;
  @State() private srHighlightedOptionText = '';
  @State() private hasFilterResults = true;

  private nativeSelect: HTMLSelectElement;
  private multiSelectOptions: MultiSelectOption[] = [];
  private inputContainer: HTMLDivElement;
  private inputElement: HTMLInputElement;
  private listElement: HTMLDivElement;
  private isWithinForm: boolean;
  private preventOptionUpdate = false; // Used to prevent value watcher from updating options when options are already updated

  private get currentValue(): string[] {
    return getSelectedOptionValues(this.multiSelectOptions);
  }

  @Listen('internalOptionUpdate')
  public updateOptionHandler(e: Event & { target: MultiSelectOption }): void {
    e.target.selected = !e.target.selected;
    forceUpdate(e.target);
    this.preventOptionUpdate = true; // Avoid unnecessary looping over options in setSelectedOptions in value watcher
    this.value = this.currentValue;
    e.stopPropagation();
    this.emitUpdateEvent();
  }

  @Watch('value')
  public onValueChange(): void {
    // When setting initial value the watcher gets called before the options are defined
    if (this.multiSelectOptions.length > 0) {
      if (!this.preventOptionUpdate) {
        setSelectedOptions(this.multiSelectOptions, this.value);
      }
      this.preventOptionUpdate = false;
      if (this.isWithinForm) {
        updateNativeOptions(this.nativeSelect, this.multiSelectOptions);
      }
    }
  }

  public connectedCallback(): void {
    document.addEventListener('mousedown', this.onClickOutside, true);
    this.isWithinForm = isWithinForm(this.host);
  }

  public componentWillLoad(): void {
    this.updateOptions();
    // Use initial value to set options
    setSelectedOptions(this.multiSelectOptions, this.value);
    if (this.isWithinForm) {
      this.nativeSelect = initNativeSelect(this.host, this.name, this.disabled, this.required);
      updateNativeOptions(this.nativeSelect, this.multiSelectOptions);
    }
  }

  public componentDidLoad(): void {
    getShadowRootHTMLElement(this.host, 'slot').addEventListener('slotchange', this.onSlotchange);
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public componentWillUpdate(): void {
    if (this.isWithinForm) {
      syncNativeSelect(this.nativeSelect, this.name, this.disabled, this.required);
    }
  }

  public disconnectedCallback(): void {
    document.removeEventListener('mousedown', this.onClickOutside, true);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(
      this.host,
      getComponentCss,
      getDropdownDirection(this.dropdownDirection, this.inputContainer, this.multiSelectOptions),
      this.isOpen,
      this.disabled,
      this.hideLabel,
      this.state,
      this.isWithinForm,
      hasLabel(this.host, this.label),
      this.theme
    );
    syncMultiSelectOptionProps(this.multiSelectOptions, this.theme);

    const PrefixedTagNames = getPrefixedTagNames(this.host);
    const dropdownId = 'list';

    return (
      <Host>
        <div class="root">
          <label class="label">
            {hasLabel(this.host, this.label) && (
              <span class="label__text" id="label" onClick={() => this.inputElement.focus()}>
                {this.label || <slot name="label" />}
                {isRequiredAndParentNotRequired(this.host, this.host as HTMLElementWithRequiredProp) && <Required />}
              </span>
            )}
            {/* TODO: Description should be separated from the label (affects all form components) */}
            {hasDescription(this.host, this.description) && (
              <span class="label__text" id="description" onClick={() => this.inputElement.focus()} aria-hidden="true">
                {this.description || <slot name="description" />}
              </span>
            )}
            {this.currentValue.length > 0 && (
              <span class="sr-text" id="options-selected">
                {getSelectedOptions(this.multiSelectOptions).length} options selected
              </span>
            )}
          </label>
          <div class={{ 'input-container': true, disabled: this.disabled }} ref={(el) => (this.inputContainer = el)}>
            <input
              role="combobox"
              placeholder={getSelectedOptionsString(this.multiSelectOptions) || null}
              autoComplete="off"
              disabled={this.disabled}
              required={this.required}
              onInput={this.onInputChange}
              onClick={this.onInputClick}
              onKeyDown={this.onInputKeyDown}
              ref={(el) => (this.inputElement = el)}
              aria-invalid={this.state === 'error' ? 'true' : null}
              {...getFilterInputAriaAttributes(
                this.isOpen,
                this.required,
                'label',
                'description options-selected state-message',
                dropdownId
              )}
            />
            {this.currentValue.length > 0 && (
              <PrefixedTagNames.pButtonPure
                class="icon reset-icon"
                icon="close"
                hideLabel="true"
                theme={this.theme}
                color={this.disabled ? 'state-disabled' : 'primary'}
                onClick={this.onResetClick}
                onKeyDown={(e) => e.key === 'Tab' && (this.isOpen = false)}
                disabled={this.disabled}
              >
                Reset selection
              </PrefixedTagNames.pButtonPure>
            )}
            <PrefixedTagNames.pIcon
              class={{ icon: true, 'toggle-icon': true, 'toggle-icon--open': this.isOpen }}
              name="arrow-head-down"
              theme={this.theme}
              color={this.disabled ? 'state-disabled' : 'primary'}
              onClick={this.onIconClick}
              aria-hidden="true"
            />
          </div>
          <div
            id={dropdownId}
            class="listbox"
            {...getListAriaAttributes(this.label, this.required, true, this.isOpen, true)}
            ref={(el) => (this.listElement = el)}
          >
            {!this.hasFilterResults && (
              <div class="no-results" aria-live="polite" role="status">
                <span aria-hidden="true">---</span>
                <span class="no-results__sr">No results found</span>
              </div>
            )}
            <slot />
          </div>
        </div>
        {this.isWithinForm && <slot name="select" />}
        {hasMessage(this.host, this.message, this.state) && (
          <StateMessage
            state={this.state}
            message={this.message}
            theme={this.theme}
            host={this.host}
            id="state-message"
          />
        )}
        <span class="sr-text" role="status" aria-live="assertive" aria-relevant="additions text">
          {this.srHighlightedOptionText}
        </span>
      </Host>
    );
  }

  private onSlotchange = (): void => {
    this.updateOptions();
    setSelectedOptions(this.multiSelectOptions, this.value);
    if (this.isWithinForm) {
      updateNativeOptions(this.nativeSelect, this.multiSelectOptions);
    }
    // Necessary to update selected options in placeholder
    forceUpdate(this.host);
  };

  private updateOptions = (): void => {
    this.multiSelectOptions = Array.from(this.host.children).filter(
      (el) => el.tagName !== 'SELECT' && el.slot !== 'label' && el.slot !== 'description' && el.slot !== 'message'
    ) as HTMLPMultiSelectOptionElement[];
    this.multiSelectOptions.forEach((child) => throwIfElementIsNotOfKind(this.host, child, 'p-multi-select-option'));
  };

  private onInputChange = (e: Event): void => {
    if ((e.target as HTMLInputElement).value.startsWith(' ')) {
      this.resetFilter();
    } else {
      updateOptionsFilterState((e.target as HTMLInputElement).value, this.multiSelectOptions);
      this.hasFilterResults = hasFilterOptionResults(this.multiSelectOptions);
    }
    // in case input is focused via tab instead of click
    this.isOpen = true;
  };

  private onInputClick = (): void => {
    this.isOpen = true;
  };

  private onIconClick = (): void => {
    this.isOpen = !this.isOpen;
  };

  private onResetClick = (): void => {
    resetSelectedOptions(this.multiSelectOptions);
    this.value = this.currentValue;
    this.inputElement.focus();
    this.emitUpdateEvent();
    forceUpdate(this.host);
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

  private onInputKeyDown = (e: KeyboardEvent): void => {
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
          this.value = this.currentValue;
          this.emitUpdateEvent();
          forceUpdate(highlightedOption);
        }
        this.updateSrHighlightedOptionText();
        break;
      case 'Escape':
        this.isOpen = false;
        resetHighlightedOptions(this.multiSelectOptions);
        break;
      case 'Tab':
        // If there is a value the reset button will be focused and the dropdown stays open
        if (!this.currentValue.length) {
          this.isOpen = false;
        }
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
    this.updateSrHighlightedOptionText();
  }

  private updateSrHighlightedOptionText = (): void => {
    const highlightedOptionIndex = getHighlightedOptionIndex(this.multiSelectOptions);
    const highlightedOption = this.multiSelectOptions[highlightedOptionIndex];
    this.srHighlightedOptionText =
      highlightedOption &&
      `${highlightedOption.textContent}${highlightedOption.selected ? ', selected' : ' not selected'} (${
        highlightedOptionIndex + 1
      } of ${this.multiSelectOptions.length})`;
  };

  private emitUpdateEvent = (): void => {
    this.update.emit({
      value: this.currentValue,
      name: this.name,
    });
  };
}
