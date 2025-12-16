import { autoUpdate } from '@floating-ui/dom';
import {
  AttachInternals,
  Component,
  Element,
  Event,
  type EventEmitter,
  forceUpdate,
  h,
  type JSX,
  Listen,
  Prop,
  State,
  Watch,
} from '@stencil/core';
import type { BreakpointCustomizable, PropTypes } from '../../../types';
import {
  AllowedTypes,
  attachComponentCss,
  FORM_STATES,
  getComboboxAriaAttributes,
  getHasNativePopoverSupport,
  getLastSelectedOption,
  getMultiSelectActionFromKeyboardEvent,
  getNextOptionToHighlight,
  getPrefixedTagNames,
  getShadowRootHTMLElement,
  hasMessage,
  hasNamedSlot,
  hasPropValueChanged,
  isClickOutside,
  isElementOfKind,
  isUsableOption,
  type Option,
  optionListUpdatePosition,
  SELECT_DROPDOWN_DIRECTIONS,
  setHighlightedSelectOption,
  throwIfElementIsNotOfKind,
  updateFilterResults,
  updateHighlightedOption,
  validateProps,
} from '../../../utils';
import { Label } from '../../common/label/label';
import { labelId } from '../../common/label/label-utils';
import { NoResultsOption } from '../../common/no-results-option/no-results-option';
import { messageId, StateMessage } from '../../common/state-message/state-message';
import type { InputSearchInputEventDetail } from '../../input-search/input-search-utils';
import { getComponentCss } from './multi-select-styles';
import {
  type MultiSelectChangeEventDetail,
  type MultiSelectDropdownDirection,
  type MultiSelectOptgroup,
  type MultiSelectOption,
  type MultiSelectState,
  type MultiSelectToggleEventDetail,
  resetSelectedOptions,
  selectOptionsByValue,
  setSelectedMultiSelectOption,
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
  compact: AllowedTypes.boolean,
};

/**
 * @slot {"name": "label", "description": "Shows a label. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 * @slot {"name": "description", "description": "Shows a description. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 * @slot {"name": "selected", "description": "Use this slot to provide custom markup for the selected options display in the button area." }
 * @slot {"name": "", "description": "Default slot for the p-multi-select-option tags." }
 * @slot {"name": "options-status", "description": "When implementing a custom filter with the `filter` slot, use this slot for loading, error and no results status." }
 * @slot {"name": "message", "description": "Shows a state message. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 * @slot {"name": "filter", "description": "Optional slot for providing a custom `p-input-search` input. When used, the default filter input is replaced and the built-in filter logic is disabled, giving full control over filtering behavior." }
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
  @Prop({ mutable: true }) public disabled?: boolean = false;

  /** A Boolean attribute indicating that an option with a non-empty string value must be selected. */
  @Prop() public required?: boolean = false;

  /** Changes the direction to which the dropdown list appears. */
  @Prop() public dropdownDirection?: MultiSelectDropdownDirection = 'auto';

  /** Displays as compact version. */
  @Prop() public compact?: boolean = false;

  /** The id of a form element the multi-select should be associated with. */
  @Prop({ reflect: true }) public form?: string; // The ElementInternals API automatically detects the form attribute

  /** Emitted when the multi-select has lost focus. */
  @Event({ bubbles: false }) public blur: EventEmitter<void>;

  /** Emitted when the selection is changed. */
  @Event({ bubbles: true }) public change: EventEmitter<MultiSelectChangeEventDetail>;

  /** Emitted when the dropdown is toggled. */
  @Event({ bubbles: false }) public toggle: EventEmitter<MultiSelectToggleEventDetail>;

  @State() private isOpen = false;
  @State() private hasFilterResults = true;
  @State() private selectedOptions: MultiSelectOption[] = [];

  @AttachInternals() private internals: ElementInternals;

  private defaultValue: string[];
  private multiSelectOptions: MultiSelectOption[] = [];
  private multiSelectOptgroups: MultiSelectOptgroup[] = [];
  private buttonElement: HTMLButtonElement;
  private inputSearchElement: HTMLPInputSearchElement;
  private filterSlot: HTMLSlotElement;
  private listboxElement: HTMLDivElement;
  private resetButtonElement: HTMLElement;
  private preventOptionUpdate = false; // Used to prevent value watcher from updating options when options are already updated
  private popoverElement: HTMLDivElement;
  private hasNativePopoverSupport = getHasNativePopoverSupport();
  private cleanUpAutoUpdate: () => void;

  private currentlyHighlightedOption: Option | null = null;

  @Listen('internalOptionUpdate')
  public updateOptionHandler(e: Event & { target: MultiSelectOption }): void {
    e.stopPropagation();
    this.updateSelectedOption(e.target);
  }

  @Watch('value')
  public onValueChange(): void {
    this.setFormValue(this.value);
    // When setting initial value the watcher gets called before the options are defined
    if (this.multiSelectOptions.length > 0) {
      if (!this.preventOptionUpdate) {
        this.selectedOptions = selectOptionsByValue(this.host, this.multiSelectOptions, this.value, !!this.filterSlot);
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
        this.cleanUpAutoUpdate = autoUpdate(this.buttonElement, this.popoverElement, async (): Promise<void> => {
          await optionListUpdatePosition(this.dropdownDirection, this.buttonElement, this.popoverElement);
        });
      }
      this.highlightSelectedOption();
    } else {
      if (this.hasNativePopoverSupport) {
        this.popoverElement.hidePopover();
      }
      if (typeof this.cleanUpAutoUpdate === 'function') {
        // ensures floating ui event listeners are removed when options list is closed
        this.cleanUpAutoUpdate();
        this.cleanUpAutoUpdate = undefined;
      }
      if (this.currentlyHighlightedOption) {
        setHighlightedSelectOption(this.currentlyHighlightedOption, false);
        this.currentlyHighlightedOption = null;
      }
      // Reset filter on close, slotted filter has to implement this itself if needed
      if (!this.filterSlot) {
        this.resetFilter();
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
    this.selectedOptions = selectOptionsByValue(this.host, this.multiSelectOptions, this.value);
  }

  public componentDidLoad(): void {
    getShadowRootHTMLElement(this.host, 'slot:not([name])').addEventListener('slotchange', this.onSlotchange);
    this.inputSearchElement = this.filterSlot
      ? (this.filterSlot.assignedElements()[0] as HTMLPInputSearchElement)
      : this.inputSearchElement;
    this.filterSlot && this.inputSearchElement.addEventListener('keydown', this.onComboKeyDown);
    const nativeInput = this.inputSearchElement.shadowRoot.querySelector('input');
    // Avoid error in disconnectedCallback when inputSearchInputElement is not defined
    if (nativeInput) {
      (nativeInput as HTMLInputElement & { ariaControlsElements: HTMLElement[] }).ariaControlsElements = [
        this.listboxElement,
      ];
    }
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public formDisabledCallback(disabled: boolean): void {
    // Called when a parent fieldset is disabled or enabled
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
    attachComponentCss(
      this.host,
      getComponentCss,
      this.isOpen,
      this.disabled,
      this.hideLabel,
      this.state,
      this.compact
    );

    const hasCustomFilterSlot = hasNamedSlot(this.host, 'filter');
    const hasCustomSelectedSlot = hasNamedSlot(this.host, 'selected');

    const PrefixedTagNames = getPrefixedTagNames(this.host);
    const buttonId = 'button';
    const popoverId = 'list';
    const descriptionId = this.description ? 'description' : undefined;
    const selectMessageId = hasMessage(this.host, this.message, this.state) ? messageId : undefined;
    const ariaDescribedBy = [descriptionId, selectMessageId].filter(Boolean).join(' ');

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
        <button
          aria-invalid={this.state === 'error' ? 'true' : null}
          type="button"
          role="combobox"
          id={buttonId}
          {...getComboboxAriaAttributes(this.isOpen, this.required, labelId, ariaDescribedBy, popoverId)}
          disabled={this.disabled}
          onClick={this.onComboClick}
          onBlur={this.onComboBlur}
          onKeyDown={this.onComboKeyDown}
          ref={(el) => (this.buttonElement = el)}
        >
          {hasCustomSelectedSlot ? (
            <slot name="selected"></slot>
          ) : (
            <span>{this.selectedOptions.map((option) => (option.textContent ?? '').toString().trim()).join(', ')}</span>
          )}
          {this.value.length > 0 && (
            <PrefixedTagNames.pButtonPure
              type="button"
              class="button"
              icon="close"
              hideLabel={true}
              onClick={this.onResetClick}
              onKeyDown={(e: KeyboardEvent) => e.key === 'Tab' && (this.isOpen = false)}
              disabled={this.disabled}
              ref={(el: HTMLElement) => (this.resetButtonElement = el)}
            >
              Reset selection
            </PrefixedTagNames.pButtonPure>
          )}
          <PrefixedTagNames.pIcon class="icon" name="arrow-head-down" color="primary" aria-hidden="true" />
        </button>
        <div
          id={popoverId}
          popover="manual"
          tabIndex={-1}
          onToggle={() => this.onToggle()}
          onBlur={(e: any) => e.stopPropagation()}
          role="dialog"
          aria-label={this.label}
          aria-hidden={this.isOpen ? null : 'true'}
          ref={(el) => (this.popoverElement = el)}
        >
          {hasCustomFilterSlot ? (
            <slot name="filter" ref={(el: HTMLSlotElement) => (this.filterSlot = el)}></slot>
          ) : (
            <PrefixedTagNames.pInputSearch
              class="filter"
              name="filter"
              label="Filter options"
              hideLabel={true}
              autoComplete="off"
              clear={true}
              indicator={true}
              compact={true}
              onInput={this.onFilterInput}
              onBlur={(e: any) => e.stopPropagation()}
              onChange={(e: any) => e.stopPropagation()}
              onKeyDown={this.onComboKeyDown}
              ref={(el: HTMLPInputSearchElement) => (this.inputSearchElement = el)}
            />
          )}
          <div
            class="options"
            role="listbox"
            aria-label={this.label}
            aria-multiselectable="true"
            onPointerMove={this.onPointerMove}
            ref={(el) => (this.listboxElement = el)}
          >
            {!this.hasFilterResults && <NoResultsOption />}
            <slot name="options-status" />
            <slot />
          </div>
        </div>
        <StateMessage state={this.state} message={this.message} host={this.host} />
      </div>
    );
  }

  private onPointerMove = (e: MouseEvent): void => {
    const hoveredOption = e.target as Option;
    if (
      hoveredOption &&
      isElementOfKind(hoveredOption, 'p-multi-select-option') &&
      !hoveredOption.disabled &&
      hoveredOption !== this.currentlyHighlightedOption
    ) {
      this.currentlyHighlightedOption = updateHighlightedOption(this.currentlyHighlightedOption, hoveredOption, false);
    }
  };

  private onSlotchange = (): void => {
    this.updateOptions();
    const selectedOptions = selectOptionsByValue(this.host, this.multiSelectOptions, this.value, !!this.filterSlot);
    // Add new matching options if there is any but still keep the old ones as selected
    selectedOptions.forEach((option) => {
      if (!this.selectedOptions.some((o) => o.value === option.value)) {
        this.selectedOptions = [...this.selectedOptions, option];
      }
    });
  };

  private onComboClick = (_: MouseEvent): void => {
    this.updateMenuState(!this.isOpen);
  };

  private onClickOutside = (e: MouseEvent): void => {
    if (
      this.isOpen &&
      isClickOutside(e, this.buttonElement) &&
      isClickOutside(e, this.resetButtonElement) &&
      isClickOutside(e, this.popoverElement)
    ) {
      this.isOpen = false;
      this.blur.emit();
    }
  };

  private resetFilter = (): void => {
    this.inputSearchElement.value = '';
    this.hasFilterResults = true;
    for (const option of this.multiSelectOptions) {
      option.style.display = 'block';
    }
    for (const optgroup of this.multiSelectOptgroups) {
      optgroup.style.display = 'block';
    }
  };

  private onComboKeyDown = (event: KeyboardEvent): void => {
    const { key, code } = event;

    // Prevent closing the menu when pressing key on reset button
    if (event.composedPath()[0] === this.resetButtonElement?.shadowRoot?.firstElementChild) {
      return;
    }

    // When pressing space in filter input, we want to allow typing space, opening by Space is handled with onComboClick
    if (key === ' ' || code === 'Space') {
      return;
    }

    const action = getMultiSelectActionFromKeyboardEvent(event, this.isOpen);

    switch (action) {
      case 'Last':
      // biome-ignore lint/suspicious/noFallthroughSwitchClause: intentional fallthrough
      case 'First':
        this.updateMenuState(true);
      // intentional fallthrough
      case 'Next':
      case 'Previous':
      case 'PageUp':
      case 'PageDown': {
        event.preventDefault();
        this.currentlyHighlightedOption = updateHighlightedOption(
          this.currentlyHighlightedOption,
          getNextOptionToHighlight(this.multiSelectOptions, this.currentlyHighlightedOption, action)
        );
        const targetElement = (
          this.filterSlot ? this.inputSearchElement.shadowRoot.querySelector('input') : this.buttonElement
        ) as
          | (HTMLInputElement & { ariaActiveDescendantElement: HTMLElement })
          | (HTMLButtonElement & { ariaActiveDescendantElement: HTMLElement });
        targetElement.ariaActiveDescendantElement = this.currentlyHighlightedOption;
        break;
      }
      case 'Select': {
        event.preventDefault();
        this.updateSelectedOption(this.currentlyHighlightedOption as MultiSelectOption);
        break;
      }
      // intentional fallthrough
      case 'Close': {
        event.preventDefault();
        this.updateMenuState(false);
        this.buttonElement.focus();
        break;
      }
      case 'Open': {
        event.preventDefault();
        this.updateMenuState(true);
        break;
      }
    }
  };

  private highlightSelectedOption = (): void => {
    // Moves highlight to the first selected option if available
    if (!this.currentlyHighlightedOption) {
      const selectedOption = getLastSelectedOption(this.multiSelectOptions);
      if (selectedOption && isUsableOption(selectedOption)) {
        this.currentlyHighlightedOption = updateHighlightedOption(this.currentlyHighlightedOption, selectedOption);

        const targetElement = (
          this.filterSlot ? this.inputSearchElement.shadowRoot.querySelector('input') : this.buttonElement
        ) as
          | (HTMLInputElement & { ariaActiveDescendantElement: HTMLElement })
          | (HTMLButtonElement & { ariaActiveDescendantElement: HTMLElement });
        targetElement.ariaActiveDescendantElement = this.currentlyHighlightedOption;
      }
    }
  };

  private updateOptions = (): void => {
    this.multiSelectOptions = [];
    this.multiSelectOptgroups = [];

    for (const child of Array.from(this.host.children).filter(
      (el) =>
        el.tagName !== 'SELECT' &&
        el.slot !== 'label' &&
        el.slot !== 'description' &&
        el.slot !== 'message' &&
        el.slot !== 'filter'
    )) {
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

  private updateMenuState = (open: boolean): void => {
    if (this.isOpen === open) {
      return;
    }
    this.isOpen = open;
  };

  private updateSelectedOption = (selectedOption: MultiSelectOption): void => {
    // option can be undefined when no option is highlighted and keyboard action calls this
    if (selectedOption) {
      this.preventOptionUpdate = true; // Avoid unnecessary updating of options in value watcher
      setSelectedMultiSelectOption(selectedOption);
      if (selectedOption.selected) {
        this.selectedOptions = [...this.selectedOptions, selectedOption];
        this.value = [...this.value, selectedOption.value];
      } else {
        this.selectedOptions = this.selectedOptions.filter((option) => option.value !== selectedOption.value);
        this.value = this.value.filter((val) => val !== selectedOption.value);
      }
      this.emitUpdateEvent();
    }
  };

  private onResetClick = (e: MouseEvent): void => {
    e.stopPropagation(); // Prevent parent click event from closing the dropdown
    resetSelectedOptions(this.multiSelectOptions);
    this.selectedOptions = [];
    this.value = [];
    this.buttonElement.focus();
    this.emitUpdateEvent();
    forceUpdate(this.host);
  };

  private emitUpdateEvent = (): void => {
    this.change.emit({
      value: this.value,
      name: this.name,
    });
  };

  private onFilterInput = (e: CustomEvent<InputSearchInputEventDetail>): void => {
    e.stopPropagation();
    const { hasFilterResults, resetCurrentlyHighlightedOption } = updateFilterResults(
      this.multiSelectOptions,
      this.multiSelectOptgroups,
      (e.detail.target as HTMLInputElement).value
    );
    resetCurrentlyHighlightedOption && (this.currentlyHighlightedOption = null);
    this.hasFilterResults = hasFilterResults;
  };

  private onToggle = (): void => {
    this.toggle.emit({ open: this.isOpen });
    if (this.isOpen) {
      // Double requestAnimationFrame as Safari fix to make sure the input will receive focus
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          this.inputSearchElement.focus();
        });
      });
    }
  };

  private onComboBlur = (e: FocusEvent): void => {
    e.stopPropagation();

    // Don't emit blur when opening the dropdown or when clicking the reset button
    if (!this.isOpen && e.relatedTarget !== this.resetButtonElement) {
      this.blur.emit();
    }
  };
}
