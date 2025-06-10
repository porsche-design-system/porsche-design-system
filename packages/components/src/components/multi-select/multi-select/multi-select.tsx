import { autoUpdate } from '@floating-ui/dom';
import {
  AttachInternals,
  Component,
  Element,
  Event,
  type EventEmitter,
  type JSX,
  Listen,
  Prop,
  State,
  Watch,
  forceUpdate,
  h,
} from '@stencil/core';
import { getSlottedAnchorStyles } from '../../../styles';
import type { BreakpointCustomizable, PropTypes, Theme } from '../../../types';
import {
  AllowedTypes,
  FORM_STATES,
  SELECT_DROPDOWN_DIRECTIONS,
  type SelectDropdownDirectionInternal,
  THEMES,
  applyConstructableStylesheetStyles,
  attachComponentCss,
  getFilterInputAriaAttributes,
  getHasNativePopoverSupport,
  getListAriaAttributes,
  getPrefixedTagNames,
  getShadowRootHTMLElement,
  handleButtonEvent,
  hasPropValueChanged,
  isClickOutside,
  isElementOfKind,
  optionListUpdatePosition,
  throwIfElementIsNotOfKind,
  validateProps,
} from '../../../utils';
import { Label } from '../../common/label/label';
import { descriptionId, labelId } from '../../common/label/label-utils';
import { StateMessage, messageId } from '../../common/state-message/state-message';
import { getComponentCss } from './multi-select-styles';
import {
  type MultiSelectDropdownDirection,
  type MultiSelectOptgroup,
  type MultiSelectOption,
  type MultiSelectState,
  type MultiSelectUpdateEventDetail,
  getHighlightedOption,
  getSelectedOptionValues,
  getSelectedOptionsString,
  hasFilterOptionResults,
  resetFilteredOptions,
  resetHighlightedOptions,
  resetSelectedOptions,
  setFirstOptionHighlighted,
  setLastOptionHighlighted,
  setSelectedOptions,
  syncMultiSelectChildrenProps,
  updateHighlightedOption,
  updateOptionsFilterState,
  setAriaActiveDescendantElement,
} from './multi-select-utils';

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
  form: AllowedTypes.string,
  dropdownDirection: AllowedTypes.oneOf<MultiSelectDropdownDirection>(SELECT_DROPDOWN_DIRECTIONS),
  theme: AllowedTypes.oneOf<Theme>(THEMES),
};

/**
 * @slot {"name": "label", "description": "Shows a label. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 * @slot {"name": "description", "description": "Shows a description. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 * @slot {"name": "", "description": "Default slot for the p-multi-select-option tags." }
 * @slot {"name": "message", "description": "Shows a state message. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 *
 * @controlled { "props": ["value"], "event": "update", "isInternallyMutated": true }
 */
@Component({
  tag: 'p-multi-select',
  shadow: { delegatesFocus: true },
  formAssociated: true,
})
export class MultiSelect {
  @Element() public host!: HTMLElement;

  /** The label text. */
  @Prop() public label?: string = '';

  /** The description text. */
  @Prop() public description?: string = '';

  /** The name of the control. */
  @Prop({ reflect: true }) public name: string;
  // The "name" property is reflected as an attribute to ensure compatibility with native form submission.
  // In the React wrapper, all props are synced as properties on the element ref, so reflecting "name" as an attribute ensures it is properly handled in the form submission process.

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

  /** A Boolean attribute indicating that an option with a non-empty string value must be selected. */
  @Prop() public required?: boolean = false;

  /** Changes the direction to which the dropdown list appears. */
  @Prop() public dropdownDirection?: MultiSelectDropdownDirection = 'auto';

  /** Adapts the multi-select color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** The id of a form element the multi-select should be associated with. */
  @Prop({ reflect: true }) public form?: string; // The ElementInternals API automatically detects the form attribute

  /** Emitted when the selection is changed. */
  @Event({ bubbles: false }) public update: EventEmitter<MultiSelectUpdateEventDetail>;

  @State() private isOpen = false;
  @State() private hasFilterResults = true;

  @AttachInternals() private internals: ElementInternals;

  private defaultValue: string[];
  private multiSelectOptions: MultiSelectOption[] = [];
  private multiSelectOptgroups: MultiSelectOptgroup[] = [];
  private inputElement: HTMLInputElement;
  private resetButtonElement: HTMLElement;
  private preventOptionUpdate = false; // Used to prevent value watcher from updating options when options are already updated
  private popoverElement: HTMLDivElement;
  private hasNativePopoverSupport = getHasNativePopoverSupport();
  private cleanUpAutoUpdate: () => void;

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
    this.setFormValue(this.value);
    // When setting initial value the watcher gets called before the options are defined
    if (this.multiSelectOptions.length > 0) {
      if (!this.preventOptionUpdate) {
        setSelectedOptions(this.multiSelectOptions, this.value);
      }
      this.preventOptionUpdate = false;
    }
  }

  @Watch('isOpen')
  public onIsOpenChange(): void {
    if (this.isOpen) {
      if (this.hasNativePopoverSupport) {
        this.popoverElement.showPopover();
      }
      if (typeof this.cleanUpAutoUpdate === 'undefined') {
        // ensures floating ui event listeners are added when options list is opened
        this.cleanUpAutoUpdate = autoUpdate(this.inputElement, this.popoverElement, async (): Promise<void> => {
          await optionListUpdatePosition(this.dropdownDirection, this.inputElement, this.popoverElement);
        });
      }
    } else {
      if (this.hasNativePopoverSupport) {
        this.popoverElement.hidePopover();
      }
      if (typeof this.cleanUpAutoUpdate === 'function') {
        // ensures floating ui event listeners are removed when options list is closed
        this.cleanUpAutoUpdate();
        this.cleanUpAutoUpdate = undefined;
      }
    }
  }

  public setFormValue(value: string[]): void {
    const formData = new FormData();
    for (const val of value) {
      formData.append(this.name, val);
    }
    this.internals?.setFormValue(formData);
  }

  public connectedCallback(): void {
    applyConstructableStylesheetStyles(this.host, getSlottedAnchorStyles);
    document.addEventListener('mousedown', this.onClickOutside, true);
  }

  public disconnectedCallback(): void {
    document.removeEventListener('mousedown', this.onClickOutside, true);
    if (typeof this.cleanUpAutoUpdate === 'function') {
      // ensures floating ui event listeners are removed in case popover is removed from DOM
      this.cleanUpAutoUpdate();
    }
  }

  public componentWillLoad(): void {
    this.defaultValue = this.value;
    this.setFormValue(this.value);
    this.updateOptions();
    // Use initial value to set options
    setSelectedOptions(this.multiSelectOptions, this.value);
  }

  public componentDidLoad(): void {
    getShadowRootHTMLElement(this.host, 'slot').addEventListener('slotchange', this.onSlotchange);
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public formDisabledCallback(disabled: boolean): void {
    this.disabled = disabled;
  }

  public formStateRestoreCallback(state: FormData): void {
    this.value = state.getAll(this.name) as string[];
  }

  public formResetCallback(): void {
    this.setFormValue(this.defaultValue);
    this.value = this.defaultValue;
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.isOpen, this.disabled, this.hideLabel, this.state, this.theme);
    syncMultiSelectChildrenProps([...this.multiSelectOptions, ...this.multiSelectOptgroups], this.theme);

    const PrefixedTagNames = getPrefixedTagNames(this.host);
    const inputId = 'filter';
    const popoverId = 'list';

    return (
      <div class="root">
        <Label
          host={this.host}
          label={this.label}
          description={this.description}
          htmlFor={inputId}
          isRequired={this.required}
          isDisabled={this.disabled}
        />
        <div class={{ wrapper: true, disabled: this.disabled }}>
          <input
            id={inputId}
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
              labelId,
              `${descriptionId} ${messageId}`,
              popoverId
            )}
          />
          <PrefixedTagNames.pIcon
            class={{ icon: true, 'icon--rotate': this.isOpen }}
            name="arrow-head-down"
            theme={this.theme}
            color={this.disabled ? 'state-disabled' : 'primary'}
            aria-hidden="true"
          />
          {this.currentValue.length > 0 && (
            <PrefixedTagNames.pButtonPure
              type="button"
              class="button"
              icon="close"
              hideLabel={true}
              theme={this.theme}
              onClick={this.onResetClick}
              onKeyDown={(e: KeyboardEvent) => e.key === 'Tab' && (this.isOpen = false)}
              disabled={this.disabled}
              ref={(el: HTMLElement) => (this.resetButtonElement = el)}
            >
              Reset selection
            </PrefixedTagNames.pButtonPure>
          )}
          <div
            id={popoverId}
            popover="manual"
            tabIndex={-1}
            {...getListAriaAttributes(this.label, this.required, true, this.isOpen, true)}
            ref={(el) => (this.popoverElement = el)}
          >
            {!this.hasFilterResults && (
              <div class="no-results" role="option">
                <span aria-hidden="true">---</span>
                <span class="sr-only">No results found</span>
              </div>
            )}
            <slot />
          </div>
        </div>
        <StateMessage state={this.state} message={this.message} theme={this.theme} host={this.host} />
      </div>
    );
  }

  private onSlotchange = (): void => {
    this.updateOptions();
    setSelectedOptions(this.multiSelectOptions, this.value);
    // Necessary to update selected options in placeholder
    forceUpdate(this.host);
  };

  private updateOptions = (): void => {
    this.multiSelectOptions = [];
    this.multiSelectOptgroups = [];

    for (const child of Array.from(this.host.children).filter(
      (el) => el.tagName !== 'SELECT' && el.slot !== 'label' && el.slot !== 'description' && el.slot !== 'message'
    )) {
      throwIfElementIsNotOfKind(this.host, child as HTMLElement, ['p-multi-select-option', 'p-optgroup']);

      if (isElementOfKind(child as HTMLElement, 'p-multi-select-option')) {
        this.multiSelectOptions.push(child as MultiSelectOption);
      } else if (isElementOfKind(child as HTMLElement, 'p-optgroup')) {
        this.multiSelectOptgroups.push(child as MultiSelectOptgroup);

        for (const optGroupChild of Array.from(child.children)) {
          throwIfElementIsNotOfKind(child as HTMLElement, optGroupChild as HTMLElement, 'p-multi-select-option');
          this.multiSelectOptions.push(optGroupChild as MultiSelectOption);
        }
      }
    }
  };

  private onClickOutside = (e: MouseEvent): void => {
    if (
      this.isOpen &&
      isClickOutside(e, this.inputElement) &&
      isClickOutside(e, this.resetButtonElement) &&
      isClickOutside(e, this.popoverElement)
    ) {
      this.isOpen = false;
      this.resetFilter();
    }
  };

  private onInputChange = (e: InputEvent & { target: HTMLInputElement }): void => {
    if (e.target.value.startsWith(' ')) {
      this.resetFilter();
    } else {
      updateOptionsFilterState(
        (e.target as HTMLInputElement).value,
        this.multiSelectOptions,
        this.multiSelectOptgroups
      );
      this.hasFilterResults = hasFilterOptionResults(this.multiSelectOptions);
    }
    // in case input is focused via tab instead of click
    this.isOpen = true;
  };

  private onInputClick = (): void => {
    this.isOpen = true;
  };

  private onResetClick = (): void => {
    resetSelectedOptions(this.multiSelectOptions);
    this.value = this.currentValue;
    this.inputElement.focus();
    this.emitUpdateEvent();
    forceUpdate(this.host);
  };

  private resetFilter = (): void => {
    this.inputElement.value = '';
    resetFilteredOptions(this.multiSelectOptions, this.multiSelectOptgroups);
  };

  private onInputKeyDown = (e: KeyboardEvent): void => {
    switch (e.key) {
      case 'ArrowUp':
      case 'Up': {
        e.preventDefault();
        this.cycleDropdown('up');
        break;
      }
      case 'ArrowDown':
      case 'Down': {
        e.preventDefault();
        this.cycleDropdown('down');
        break;
      }
      case 'Enter': {
        const highlightedOption = getHighlightedOption(this.multiSelectOptions);
        if (highlightedOption) {
          highlightedOption.selected = !highlightedOption.selected;
          this.value = this.currentValue;
          this.emitUpdateEvent();
          forceUpdate(highlightedOption);
        } else if (this.internals?.form) {
          handleButtonEvent(
            e,
            this.host,
            () => 'submit',
            () => this.disabled
          );
        }
        break;
      }
      case 'Escape': {
        this.isOpen = false;
        resetHighlightedOptions(this.multiSelectOptions);
        break;
      }
      case 'Tab': {
        // If there is a value the reset button will be focused and the dropdown stays open
        if (this.currentValue.length === 0) {
          this.isOpen = false;
        }
        resetHighlightedOptions(this.multiSelectOptions);
        break;
      }
      case 'PageUp':
        if (this.isOpen) {
          e.preventDefault();
          setFirstOptionHighlighted(this.popoverElement, this.multiSelectOptions);
          setAriaActiveDescendantElement(this.inputElement, this.multiSelectOptions);
        }
        break;
      case 'PageDown':
        if (this.isOpen) {
          e.preventDefault();
          setLastOptionHighlighted(this.popoverElement, this.multiSelectOptions);
          setAriaActiveDescendantElement(this.inputElement, this.multiSelectOptions);
        }
        break;
      default:
      // TODO: seems to be difficult to combine multiple keys as native select does
    }
  };

  private cycleDropdown(direction: SelectDropdownDirectionInternal): void {
    this.isOpen = true;
    updateHighlightedOption(this.popoverElement, this.multiSelectOptions, direction);
    setAriaActiveDescendantElement(this.inputElement, this.multiSelectOptions);
  }

  private emitUpdateEvent = (): void => {
    this.update.emit({
      value: this.currentValue,
      name: this.name,
    });
  };
}
