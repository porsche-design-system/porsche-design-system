import type { BreakpointCustomizable, PropTypes, Theme } from '../../../types';
import type { SelectDirection, SelectOption, SelectState, SelectUpdateEventDetail } from './select-utils';
import {
  getSelectDropdownDirection,
  initNativeSelect,
  setSelectedOption,
  setSelectedValue,
  updateNativeOption,
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
  getPrefixedTagNames,
  getShadowRootHTMLElement,
  hasPropValueChanged,
  isClickOutside,
  SELECT_DROPDOWN_DIRECTIONS,
  THEMES,
  throwIfElementIsNotOfKind,
  validateProps,
} from '../../../utils';
import { getComponentCss } from './select-styles';
import { Label } from '../../common/label/label';
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
  dropdownDirection: AllowedTypes.oneOf<SelectDirection>(SELECT_DROPDOWN_DIRECTIONS),
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
  @Prop({ mutable: true }) public value?: string = '';

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
  @Prop() public dropdownDirection?: SelectDirection = 'auto';

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
  }

  // TODO: Similar to multi-select
  // TODO: Maybe better to find selected option here and pass it into setSelectedValue & updateNativeOption
  @Watch('value')
  public onValueChange(): void {
    // When setting initial value the watcher gets called before the options are defined
    if (this.selectOptions.length > 0) {
      if (!this.preventOptionUpdate) {
        setSelectedValue(this.selectOptions, this.value);
      }
      this.preventOptionUpdate = false;
      if (this.isWithinForm) {
        updateNativeOption(this.nativeSelect, this.selectOptions);
      }
    }
  }

  // TODO: Same as multi-select
  public connectedCallback(): void {
    document.addEventListener('mousedown', this.onClickOutside, true);
    this.form = getClosestHTMLElement(this.host, 'form');
    this.isWithinForm = !!this.form;
  }

  // TODO: Similar to multi-select
  public componentWillLoad(): void {
    this.updateOptions();
    setSelectedValue(this.selectOptions, this.value);
    if (this.isWithinForm) {
      this.nativeSelect = initNativeSelect(this.host, this.name, this.disabled, this.required);
      updateNativeOption(this.nativeSelect, this.selectOptions);
    }
  }

  public componentDidLoad(): void {
    getShadowRootHTMLElement(this.host, 'slot').addEventListener('slotchange', this.onSlotchange);
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  // TODO: Same as multi-select
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
            disabled={this.disabled}
            onClick={this.onInputClick}
            onKeyDown={this.onComboboxKeyDown}
          />
          <PrefixedTagNames.pIcon
            class={{ icon: true, 'icon--rotate': this.isOpen }}
            name="arrow-head-down"
            theme={this.theme}
            color={this.disabled ? 'state-disabled' : 'primary'}
            aria-hidden="true"
          />
          <div id={dropdownId} class="listbox" ref={(el) => (this.listElement = el)}>
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
    setSelectedValue(this.selectOptions, this.value);
    if (this.isWithinForm) {
      updateNativeOption(this.nativeSelect, this.selectOptions);
    }
    // Necessary to update selected options in placeholder
    forceUpdate(this.host);
  };

  // TODO: Similar to multi-select
  private updateOptions = (): void => {
    this.selectOptions = Array.from(this.host.children).filter(
      (el) => el.tagName !== 'SELECT' && el.slot !== 'label' && el.slot !== 'description' && el.slot !== 'message'
    ) as HTMLPMultiSelectOptionElement[];
    this.selectOptions.forEach((child) => throwIfElementIsNotOfKind(this.host, child, 'p-select-option'));
  };

  private onInputClick = (): void => {
    this.isOpen = true;
  };

  private onComboboxKeyDown = (e: KeyboardEvent): void => {
    console.log(e);
  };

  // TODO: Mostly similar to multi-select
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
