import { autoUpdate } from '@floating-ui/dom';
import {
  AttachInternals,
  Component,
  Element,
  Event,
  type EventEmitter,
  Fragment,
  h,
  type JSX,
  Listen,
  Prop,
  State,
  Watch,
} from '@stencil/core';
import type { BreakpointCustomizable, PropTypes, ValidatorFunction } from '../../../types';
import {
  AllowedTypes,
  attachComponentCss,
  FORM_STATES,
  getComboboxAriaAttributes,
  getHasNativePopoverSupport,
  getListboxAriaAttributes,
  getMatchingSelectOptionIndex,
  getNextOptionToHighlight,
  getPrefixedTagNames,
  getSelectActionFromKeyboardEvent,
  getShadowRootHTMLElement,
  hasDescription,
  hasLabel,
  hasMessage,
  hasNamedSlot,
  hasPropValueChanged,
  isClickOutside,
  isElementOfKind,
  isUsableOption,
  optionListUpdatePosition,
  SELECT_DROPDOWN_DIRECTIONS,
  SELECT_SEARCH_TIMEOUT,
  setHighlightedSelectOption,
  throwIfElementIsNotOfKind,
  updateFilterResults,
  updateHighlightedOption,
  validateProps,
} from '../../../utils';
import { Label } from '../../common/label/label';
import { descriptionId, labelId } from '../../common/label/label-utils';
import { NoResultsOption } from '../../common/no-results-option/no-results-option';
import { messageId, StateMessage } from '../../common/state-message/state-message';
import type { InputSearchInputEventDetail } from '../../input-search/input-search-utils';
import { getComponentCss } from './select-styles';
import {
  type SelectChangeEventDetail,
  type SelectDropdownDirection,
  type SelectOptgroup,
  type SelectOption,
  type SelectState,
  type SelectToggleEventDetail,
  selectOptionByValue,
  setSelectedOption,
} from './select-utils';

const propTypes: PropTypes<typeof Select> = {
  label: AllowedTypes.string,
  description: AllowedTypes.string,
  name: AllowedTypes.string,
  value: AllowedTypes.oneOf<ValidatorFunction>([AllowedTypes.string, AllowedTypes.number, AllowedTypes.null]),
  state: AllowedTypes.oneOf<SelectState>(FORM_STATES),
  message: AllowedTypes.string,
  hideLabel: AllowedTypes.breakpoint('boolean'),
  disabled: AllowedTypes.boolean,
  required: AllowedTypes.boolean,
  form: AllowedTypes.string,
  dropdownDirection: AllowedTypes.oneOf<SelectDropdownDirection>(SELECT_DROPDOWN_DIRECTIONS),
  filter: AllowedTypes.boolean,
  compact: AllowedTypes.boolean,
};

/**
 * @slot {"name": "label", "description": "Shows a label. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 * @slot {"name": "label-after", "description": "Places additional content after the label text (for content that should not be part of the label, e.g. external links or `p-popover`)."}
 * @slot {"name": "description", "description": "Shows a description. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 * @slot {"name": "selected", "description": "Use this slot to provide custom markup for the selected option display in the button area." }
 * @slot {"name": "", "description": "Default slot for the `p-select-option` tags." }
 * @slot {"name": "options-status", "description": "When implementing a custom filter with the `filter` slot, use this slot for loading, error and no results status." }
 * @slot {"name": "message", "description": "Shows a state message. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 * @slot {"name": "filter", "description": "Optional slot for providing a custom `p-input-search` input. When used, the default filter input is replaced and the built-in filter logic is disabled, giving full control over filtering behavior." }
 *
 * @controlled { "props": ["value"], "event": "change", "isInternallyMutated": true }
 */
@Component({
  tag: 'p-select',
  shadow: { delegatesFocus: true },
  formAssociated: true,
})
export class Select {
  @Element() public host!: HTMLElement;

  /** Sets the visible label text displayed above the select control to identify its purpose. */
  @Prop() public label?: string = '';

  /** Sets a supplementary description displayed below the label to give users additional guidance about the select. */
  @Prop() public description?: string = '';

  /** Sets the name of the control submitted with the form data, identifying the selected value on the server. */
  @Prop({ reflect: true }) public name: string;
  // The "name" property is reflected as an attribute to ensure compatibility with native form submission.
  // In the React wrapper, all props are synced as properties on the element ref, so reflecting "name" as an attribute ensures it is properly handled in the form submission process.

  /**
   * The selected value. Matches an option strictly by type and value, meaning
   * null matches only an option with value null, undefined matches only an option
   * with value undefined (no preselection by default), and string or number only match
   * an option whose value has the same type and equal value.
   *
   * Please note that FormData always serializes values as
   * strings, so when participating in a native (uncontrolled) form a
   * number value is restored as string via formStateRestoreCallback
   * and will no longer strictly match a number-typed option. This limitation
   * only applies to native form state restoration; in controlled forms
   * (where the consumer manages value directly via the change event),
   * the number type is preserved end-to-end.
   */
  @Prop({ mutable: true }) public value?: string | number | null;

  /** Sets the validation state of the select, which controls its visual appearance and feedback message style (`none`, `success`, `error`). */
  @Prop() public state?: SelectState = 'none';

  /** Sets the validation feedback message displayed below the select when `state` is `success` or `error`. */
  @Prop() public message?: string = '';

  /** Hides the visible label while keeping it accessible to screen readers. Supports responsive breakpoint values. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  /** Prevents user interaction with the select and excludes its value from form submissions. */
  @Prop({ mutable: true }) public disabled?: boolean = false;

  /** Marks the select as required so the form cannot be submitted unless a non-empty option is selected. */
  @Prop() public required?: boolean = false;

  /** Controls whether the dropdown list opens upward (`up`) or downward (`down`), or determines the direction automatically (`auto`). */
  @Prop() public dropdownDirection?: SelectDropdownDirection = 'auto';

  /** Shows a text input inside the dropdown that filters the visible options as the user types. Ignored when the `filter` slot is used. */
  @Prop() public filter?: boolean = false;

  /** Reduces the control height and padding for use in dense layouts where vertical space is limited. */
  @Prop() public compact?: boolean = false;

  /** Associates the select with a form element by its ID when it is not a direct descendant of that form. */
  @Prop({ reflect: true }) public form?: string; // The ElementInternals API automatically detects the form attribute

  /** Emitted when the select component loses focus, useful for triggering validation on blur. */
  @Event({ bubbles: false }) public blur: EventEmitter<void>;

  /** Emitted when the user selects a different option, carrying the new value in the event detail. */
  @Event({ bubbles: true }) public change: EventEmitter<SelectChangeEventDetail>;

  /** Emitted when the dropdown list opens or closes, carrying the new `isOpen` state in the event detail. */
  @Event({ bubbles: false }) public toggle: EventEmitter<SelectToggleEventDetail>;

  @State() private isOpen = false;
  @State() private hasFilterResults = true;
  @State() private selectedOption: SelectOption;

  @AttachInternals() private internals: ElementInternals;

  private defaultValue: string | number | null | undefined;
  private buttonElement: HTMLButtonElement;
  private popoverElement: HTMLDivElement;
  private inputSearchElement: HTMLPInputSearchElement;
  private filterSlot: HTMLSlotElement;
  private listboxElement: HTMLDivElement;
  private selectOptions: SelectOption[] = [];
  private selectOptgroups: SelectOptgroup[] = [];
  private preventOptionUpdate = false; // Used to prevent value watcher from updating options when options are already updated
  private searchString: string = '';
  private searchTimeout: ReturnType<typeof setTimeout> | number = null;
  private hasNativePopoverSupport = getHasNativePopoverSupport();
  private cleanUpAutoUpdate: () => void;

  private currentlyHighlightedOption: SelectOption | null = null;

  private get hasFilter(): boolean {
    return !!(this.filter || this.filterSlot);
  }

  @Listen('internalOptionUpdate')
  public updateOptionHandler(e: Event & { target: SelectOption }): void {
    e.stopPropagation();
    this.updateSelectedOption(e.target);
  }

  @Listen('internalOptgroupUpdate')
  public optgroupUpdateHandler(e: Event): void {
    e.stopPropagation();
    this.updateOptions();
  }

  @Watch('value')
  public onValueChange(): void {
    this.setFormValue();
    // When setting initial value the watcher gets called before the options are defined
    if (this.selectOptions.length > 0) {
      if (!this.preventOptionUpdate) {
        this.selectedOption = selectOptionByValue(this.host, this.selectOptions, this.value);
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
      if (this.filter) {
        this.resetFilter();
      }
    }
  }

  public setFormValue(): void {
    // `null`/`undefined` → `undefined`, removing the select from form submission (mirrors native behavior)
    this.internals?.setFormValue(this.value === null || this.value === undefined ? undefined : String(this.value));
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
    // Preserve the original value (incl. number/null) so a form reset restores the exact same type
    this.defaultValue = this.value;
    this.setFormValue();
    this.updateOptions();
    this.selectedOption = selectOptionByValue(this.host, this.selectOptions, this.value);
  }

  public componentDidLoad(): void {
    getShadowRootHTMLElement(this.host, 'slot:not([name])').addEventListener('slotchange', this.onSlotchange);
    if (this.hasFilter) {
      // Does not work if filterSlot is added dynamically after component load, but should be fine
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
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public formDisabledCallback(disabled: boolean): void {
    // Called when a parent fieldset is disabled or enabled
    this.disabled = disabled;
  }

  public formStateRestoreCallback(state: string): void {
    this.value = state;
  }

  public formResetCallback(): void {
    this.value = this.defaultValue; // triggers value watcher which syncs form value
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
    const listboxId = 'listbox';
    const selectDescriptionId = hasDescription(this.host, this.description) ? descriptionId : undefined;
    const selectMessageId = hasMessage(this.host, this.message, this.state) ? messageId : undefined;

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
          // only needed for Safari to recognize focus state on click
          tabIndex={0}
          {...getComboboxAriaAttributes(
            this.isOpen,
            this.required,
            hasLabel(this.host, this.label) && labelId,
            selectMessageId,
            selectDescriptionId,
            listboxId
          )}
          aria-autocomplete="none"
          disabled={this.disabled}
          onClick={this.onComboClick}
          onBlur={this.onComboBlur}
          onKeyDown={this.onComboKeyDown}
          ref={(el) => (this.buttonElement = el)}
        >
          {hasCustomSelectedSlot ? (
            <slot name="selected"></slot>
          ) : (
            <Fragment>
              {this.selectedOption?.querySelector?.('img') && (
                <img src={this.selectedOption.querySelector('img').src} alt="" />
              )}
              <span>{this.selectedOption?.textContent ?? ''}</span>
            </Fragment>
          )}
          <PrefixedTagNames.pIcon class="icon" name="arrow-head-down" color="primary" aria-hidden="true" />
        </button>
        <div popover="manual" tabIndex={0} onToggle={() => this.onToggle()} ref={(el) => (this.popoverElement = el)}>
          {this.filter && !hasCustomFilterSlot && (
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
          {hasCustomFilterSlot && <slot name="filter" ref={(el: HTMLSlotElement) => (this.filterSlot = el)}></slot>}
          {/** biome-ignore lint/a11y/noStaticElementInteractions: role listbox is added through getListboxAriaAttributes */}
          <div
            id={listboxId}
            class="options"
            {...getListboxAriaAttributes(
              this.required,
              hasLabel(this.host, this.label) && labelId,
              selectMessageId,
              selectDescriptionId,
              false
            )}
            tabIndex={-1}
            onPointerMove={this.onPointerMove}
            onBlur={(e: any) => e.stopPropagation()}
            ref={(el) => (this.listboxElement = el)}
          >
            {this.filter && !this.hasFilterResults && <NoResultsOption />}
            <slot name="options-status" />
            <slot />
          </div>
        </div>
        <StateMessage state={this.state} message={this.message} host={this.host} />
      </div>
    );
  }

  private onPointerMove = (e: MouseEvent): void => {
    const hoveredOption = e.target as SelectOption;
    if (
      hoveredOption &&
      isElementOfKind(hoveredOption, 'p-select-option') &&
      !hoveredOption.disabled &&
      !hoveredOption.disabledParent &&
      hoveredOption !== this.currentlyHighlightedOption
    ) {
      this.currentlyHighlightedOption = updateHighlightedOption(this.currentlyHighlightedOption, hoveredOption, false);
    }
  };

  private onSlotchange = (): void => {
    this.updateOptions();
    const selectedOption = selectOptionByValue(this.host, this.selectOptions, this.value, !!this.filterSlot);
    // Keep selectedOption state even if value does not match any options
    if (selectedOption !== null && selectedOption !== this.selectedOption) {
      this.selectedOption = selectedOption;
    }
  };

  private onComboClick = (_: MouseEvent): void => {
    this.updateMenuState(!this.isOpen);
  };

  private onClickOutside = (e: MouseEvent): void => {
    if (this.isOpen && isClickOutside(e, this.buttonElement) && isClickOutside(e, this.popoverElement)) {
      this.isOpen = false;
      this.blur.emit();
    }
  };

  private resetFilter = (): void => {
    this.inputSearchElement.value = '';
    this.hasFilterResults = true;
    for (const option of this.selectOptions) {
      option.style.display = 'block';
    }
    for (const optgroup of this.selectOptgroups) {
      optgroup.style.display = 'block';
    }
  };

  private onComboKeyDown = (event: KeyboardEvent): void => {
    const { key, code } = event;

    // When pressing space in filter input, we want to allow typing space
    if (this.hasFilter && (key === ' ' || code === 'Space')) {
      return;
    }

    const action = getSelectActionFromKeyboardEvent(event, this.isOpen);

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
          getNextOptionToHighlight(this.selectOptions, this.currentlyHighlightedOption, action)
        );
        const targetElement = (
          this.hasFilter ? this.inputSearchElement.shadowRoot.querySelector('input') : this.buttonElement
        ) as
          | (HTMLInputElement & { ariaActiveDescendantElement: HTMLElement })
          | (HTMLButtonElement & { ariaActiveDescendantElement: HTMLElement });
        targetElement.ariaActiveDescendantElement = this.currentlyHighlightedOption;
        break;
      }
      // biome-ignore lint/suspicious/noFallthroughSwitchClause: intentional fallthrough
      case 'CloseSelect': {
        event.preventDefault();
        this.updateSelectedOption(this.currentlyHighlightedOption);
      }
      // intentional fallthrough
      case 'Close': {
        event.preventDefault();
        this.updateMenuState(false);
        if (this.hasFilter) {
          this.buttonElement.focus();
        }
        break;
      }
      case 'Type':
        // Filter uses onInput
        if (!this.hasFilter) {
          this.onComboType(key);
        }
        break;
      case 'Open': {
        event.preventDefault();
        this.updateMenuState(true);
        break;
      }
    }
  };

  private highlightSelectedOption = (): void => {
    // Moves highlight to the selected option if available
    if (!this.currentlyHighlightedOption) {
      if (this.selectedOption && isUsableOption(this.selectedOption)) {
        this.currentlyHighlightedOption = updateHighlightedOption(this.currentlyHighlightedOption, this.selectedOption);
        const targetElement = (
          this.hasFilter ? this.inputSearchElement.shadowRoot.querySelector('input') : this.buttonElement
        ) as
          | (HTMLInputElement & { ariaActiveDescendantElement: HTMLElement })
          | (HTMLButtonElement & { ariaActiveDescendantElement: HTMLElement });
        targetElement.ariaActiveDescendantElement = this.currentlyHighlightedOption;
      }
    }
  };

  private onComboType = (letter: string): void => {
    this.updateMenuState(true);

    this.updateSearchString(letter);
    const matchingOption = getMatchingSelectOptionIndex(this.selectOptions, this.searchString);
    if (matchingOption) {
      this.currentlyHighlightedOption = updateHighlightedOption(this.currentlyHighlightedOption, matchingOption);
    } else {
      window.clearTimeout(this.searchTimeout);
      this.searchString = '';
    }
  };

  private updateOptions = (): void => {
    this.selectOptions = [];
    this.selectOptgroups = [];

    for (const child of Array.from(this.host.children).filter(
      (el) =>
        el.tagName !== 'SELECT' &&
        el.slot !== 'label' &&
        el.slot !== 'label-after' &&
        el.slot !== 'description' &&
        el.slot !== 'message' &&
        el.slot !== 'filter'
    )) {
      if (isElementOfKind(child as HTMLElement, 'p-select-option')) {
        this.selectOptions.push(child as SelectOption);
      } else if (isElementOfKind(child as HTMLElement, 'p-optgroup')) {
        this.selectOptgroups.push(child as SelectOptgroup);
        for (const optGroupChild of Array.from(child.children)) {
          throwIfElementIsNotOfKind(child as HTMLElement, optGroupChild as HTMLElement, 'p-select-option');
          this.selectOptions.push(optGroupChild as SelectOption);
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

  private updateSelectedOption = (selectedOption: SelectOption): void => {
    // option can be undefined when no option is highlighted and keyboard action calls this
    if (selectedOption) {
      this.preventOptionUpdate = true; // Avoid unnecessary updating of options in value watcher
      setSelectedOption(this.selectOptions, selectedOption);
      this.value = selectedOption.value;
      this.selectedOption = selectedOption;
      this.emitUpdateEvent();
    }
    this.updateMenuState(false);
    this.buttonElement.focus();
  };

  private updateSearchString = (char: string): void => {
    // reset typing timeout and start new timeout
    // this allows us to make multiple-letter matches, like a native select
    if (this.searchTimeout) {
      window.clearTimeout(this.searchTimeout);
    }

    this.searchTimeout = window.setTimeout(() => {
      this.searchString = '';
    }, SELECT_SEARCH_TIMEOUT);

    // add most recent letter to saved search string
    this.searchString += char;
  };

  private emitUpdateEvent = (): void => {
    this.change.emit({
      // Read the raw option value so the event detail preserves the original type
      // (`string | number | null`). When no option is selected we emit `undefined`.
      value: this.selectedOption ? this.selectedOption.value : undefined,
      name: this.name,
    });
  };

  private onFilterInput = (e: CustomEvent<InputSearchInputEventDetail>): void => {
    e.stopPropagation();
    const { hasFilterResults, resetCurrentlyHighlightedOption } = updateFilterResults(
      this.selectOptions,
      this.selectOptgroups,
      (e.detail.target as HTMLInputElement).value
    );
    resetCurrentlyHighlightedOption && (this.currentlyHighlightedOption = null);
    this.hasFilterResults = hasFilterResults;
  };

  private onToggle = (): void => {
    this.toggle.emit({ open: this.isOpen });
    if (this.isOpen && this.hasFilter) {
      // Double requestAnimationFrame as a Safari fix to make sure the input will receive focus
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          this.inputSearchElement.focus();
        });
      });
    }
  };

  private onComboBlur = (e: FocusEvent): void => {
    e.stopPropagation();
    // Don't emit blur when opening the dropdown
    if (!this.isOpen) {
      this.blur.emit();
    }
  };
}
