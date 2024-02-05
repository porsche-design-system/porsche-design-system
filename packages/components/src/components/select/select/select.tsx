import type { BreakpointCustomizable, PropTypes, Theme } from '../../../types';
import type { SelectDropdownDirection, SelectOption, SelectState, SelectUpdateEventDetail } from './select-utils';
import {
  getHighlightedSelectOption,
  getSelectDropdownDirection,
  getSelectedOptionString,
  initNativeSelect,
  setFirstSelectOptionHighlighted,
  setLastSelectOptionHighlighted,
  setMatchingSelectOptionHighlighted,
  setSelectedOption,
  syncSelectOptionProps,
  updateHighlightedSelectOption,
  updateNativeSelectOption,
  updateSelectOptions,
} from './select-utils';

import {
  Component,
  Element,
  Event,
  EventEmitter,
  forceUpdate,
  h,
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
  getClosestHTMLElement,
  getListAriaAttributes,
  getPrefixedTagNames,
  getShadowRootHTMLElement,
  hasPropValueChanged,
  isClickOutside,
  SELECT_DROPDOWN_DIRECTIONS,
  SelectDropdownDirectionInternal,
  THEMES,
  throwIfElementIsNotOfKind,
  validateProps,
} from '../../../utils';
import { getComponentCss } from './select-styles';
import { Label, labelId } from '../../common/label/label';
import { StateMessage } from '../../common/state-message/state-message';

const propTypes: PropTypes<typeof Select> = {
  label: AllowedTypes.string,
  description: AllowedTypes.string,
  name: AllowedTypes.string,
  value: AllowedTypes.string,
  state: AllowedTypes.oneOf<SelectState>(FORM_STATES),
  message: AllowedTypes.string,
  hideLabel: AllowedTypes.breakpoint('boolean'),
  disabled: AllowedTypes.boolean,
  required: AllowedTypes.boolean,
  dropdownDirection: AllowedTypes.oneOf<SelectDropdownDirection>(SELECT_DROPDOWN_DIRECTIONS),
  theme: AllowedTypes.oneOf<Theme>(THEMES),
};

@Component({
  tag: 'p-select',
  shadow: true,
})
export class Select {
  @Element() public host!: HTMLElement;

  /** The label text. */
  @Prop() public label?: string = '';

  /** The description text. */
  @Prop() public description?: string = '';

  /** The name of the control. */
  @Prop() public name: string;

  /** The selected value. */
  @Prop({ mutable: true }) public value?: string;

  /** The validation state. */
  @Prop() public state?: SelectState = 'none';

  /** The message styled depending on validation state. */
  @Prop() public message?: string = '';

  /** Show or hide label. For better accessibility it is recommended to show the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  /** Disables the select */
  @Prop() public disabled?: boolean = false;

  /** A Boolean attribute indicating that an option with a non-empty string value must be selected. */
  @Prop() public required?: boolean = false;

  /** Changes the direction to which the dropdown list appears. */
  @Prop() public dropdownDirection?: SelectDropdownDirection = 'auto';

  /** Adapts the select color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** Emitted when the selection is changed. */
  @Event({ bubbles: false }) public update: EventEmitter<SelectUpdateEventDetail>;

  @State() private isOpen = false;

  private nativeSelect: HTMLSelectElement;
  private inputContainer: HTMLDivElement;
  private listElement: HTMLDivElement;
  private selectOptions: SelectOption[] = [];
  private form: HTMLFormElement;
  private isWithinForm: boolean;
  private preventOptionUpdate = false; // Used to prevent value watcher from updating options when options are already updated

  @Listen('internalOptionUpdate')
  public updateOptionHandler(e: Event & { target: SelectOption }): void {
    this.preventOptionUpdate = true; // Avoid unnecessary updating of options in value watcher
    setSelectedOption(this.selectOptions, e.target);
    this.value = e.target.value;
    e.stopPropagation();
    this.emitUpdateEvent();
    this.isOpen = false;
  }

  @Watch('value')
  public onValueChange(): void {
    // When setting initial value the watcher gets called before the options are defined
    if (this.selectOptions.length > 0) {
      if (!this.preventOptionUpdate) {
        updateSelectOptions(this.selectOptions, this.value);
      }
      this.preventOptionUpdate = false;
      if (this.isWithinForm) {
        updateNativeSelectOption(this.nativeSelect, this.value);
      }
    }
  }

  public connectedCallback(): void {
    document.addEventListener('mousedown', this.onClickOutside, true);
    this.form = getClosestHTMLElement(this.host, 'form');
    this.isWithinForm = !!this.form;
  }

  public componentWillLoad(): void {
    this.updateOptions();
    updateSelectOptions(this.selectOptions, this.value);
    if (this.isWithinForm) {
      this.nativeSelect = initNativeSelect(this.host, this.name, this.disabled, this.required);
      updateNativeSelectOption(this.nativeSelect, this.value);
    }
  }

  public componentDidLoad(): void {
    getShadowRootHTMLElement(this.host, 'slot').addEventListener('slotchange', this.onSlotchange);
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
      getSelectDropdownDirection(this.dropdownDirection, this.inputContainer, this.selectOptions),
      this.isOpen,
      this.disabled,
      this.hideLabel,
      this.state,
      this.isWithinForm,
      this.theme
    );
    syncSelectOptionProps(this.selectOptions, this.theme);

    const PrefixedTagNames = getPrefixedTagNames(this.host);
    const buttonId = 'value';
    const dropdownId = 'list';

    return (
      <div class="root">
        <Label
          host={this.host}
          label={this.label}
          description={this.description}
          htmlFor={buttonId}
          isRequired={this.required}
          isDisabled={this.disabled}
        />
        <div class={{ wrapper: true, disabled: this.disabled }} ref={(el) => (this.inputContainer = el)}>
          <button
            type="button"
            role="combobox"
            id={buttonId}
            aria-labelledby={labelId}
            aria-controls={dropdownId}
            aria-haspopup="listbox"
            aria-expanded={`${this.isOpen}`}
            disabled={this.disabled}
            onClick={this.onInputClick}
            onKeyDown={this.onComboboxKeyDown}
          >
            {getSelectedOptionString(this.selectOptions)}
          </button>
          <PrefixedTagNames.pIcon
            class={{ icon: true, 'icon--rotate': this.isOpen }}
            name="arrow-head-down"
            theme={this.theme}
            color={this.disabled ? 'state-disabled' : 'primary'}
            aria-hidden="true"
          />
          <div
            id={dropdownId}
            class="listbox"
            {...getListAriaAttributes(this.label, this.required, false, this.isOpen)}
            tabindex="-1"
            ref={(el) => (this.listElement = el)}
          >
            <slot />
          </div>
        </div>
        <StateMessage state={this.state} message={this.message} theme={this.theme} host={this.host} />
        {this.isWithinForm && <slot name="internal-select" />}
      </div>
    );
  }

  private onSlotchange = (): void => {
    this.updateOptions();
    updateSelectOptions(this.selectOptions, this.value);
    if (this.isWithinForm) {
      updateNativeSelectOption(this.nativeSelect, this.value);
    }
    // Necessary to update selected options in placeholder
    forceUpdate(this.host);
  };

  private updateOptions = (): void => {
    this.selectOptions = Array.from(this.host.children).filter(
      (el) => el.tagName !== 'SELECT' && el.slot !== 'label' && el.slot !== 'description' && el.slot !== 'message'
    ) as HTMLPMultiSelectOptionElement[];
    this.selectOptions.forEach((child) => throwIfElementIsNotOfKind(this.host, child, 'p-select-option'));
  };

  private onInputClick = (): void => {
    this.isOpen = !this.isOpen;
  };

  private onComboboxKeyDown = (e: KeyboardEvent): void => {
    if (e.key.length === 1 && e.key !== ' ' && !e.altKey && !e.ctrlKey && !e.metaKey) {
      if (!this.isOpen) {
        this.isOpen = true;
      }
      setMatchingSelectOptionHighlighted(this.listElement, this.selectOptions, e.key);
    }
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
        const highlightedOption = getHighlightedSelectOption(this.selectOptions);
        if (highlightedOption) {
          setSelectedOption(this.selectOptions, highlightedOption);
          this.value = highlightedOption.value;
          this.emitUpdateEvent();
          forceUpdate(highlightedOption);
        }
        break;
      case 'Escape':
      case 'Tab':
        this.isOpen = false;
        break;
      case 'Home':
      case 'PageUp':
        if (this.isOpen) {
          e.preventDefault();
          setFirstSelectOptionHighlighted(this.listElement, this.selectOptions);
        }
        break;
      case 'End':
      case 'PageDown':
        if (this.isOpen) {
          e.preventDefault();
          setLastSelectOptionHighlighted(this.listElement, this.selectOptions);
        }
        break;
      case 'Backspace':
      case 'Clear':
        if (!this.isOpen) {
          this.isOpen = true;
        }
        setMatchingSelectOptionHighlighted(this.listElement, this.selectOptions, e.key);
    }
  };

  private cycleDropdown(direction: SelectDropdownDirectionInternal): void {
    if (this.isOpen) {
      updateHighlightedSelectOption(this.listElement, this.selectOptions, direction);
    } else {
      this.isOpen = true;
    }
  }

  private onClickOutside = (e: MouseEvent): void => {
    if (this.isOpen && isClickOutside(e, this.inputContainer) && isClickOutside(e, this.listElement)) {
      this.isOpen = false;
    }
  };

  private emitUpdateEvent = (): void => {
    this.update.emit({
      value: this.value,
      name: this.name,
    });
  };
}
