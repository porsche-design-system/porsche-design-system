import { autoUpdate, computePosition, flip, offset, size } from '@floating-ui/dom';
import type { BreakpointCustomizable, PropTypes, Theme } from '../../../types';
import {
  OPTIONS_LIST_SAFE_ZONE,
  type SelectDropdownDirection,
  type SelectOptgroup,
  type SelectOption,
  type SelectState,
  type SelectUpdateEventDetail,
  getSelectedOptionString,
  getSrHighlightedOptionText,
  setSelectedOption,
  syncSelectChildrenProps,
  updateSelectOptions,
} from './select-utils';

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
import {
  AllowedTypes,
  FORM_STATES,
  SELECT_DROPDOWN_DIRECTIONS,
  SELECT_SEARCH_TIMEOUT,
  THEMES,
  applyConstructableStylesheetStyles,
  attachComponentCss,
  getActionFromKeyboardEvent,
  getComboboxAriaAttributes,
  getHasCSSAnchorPositioningSupport,
  getHasNativePopoverSupport,
  getHighlightedSelectOption,
  getHighlightedSelectOptionIndex,
  getListAriaAttributes,
  getMatchingSelectOptionIndex,
  getPrefixedTagNames,
  getUpdatedIndex,
  getUsableSelectOptions,
  hasMessage,
  hasPropValueChanged,
  isElementOfKind,
  setNextSelectOptionHighlighted,
  throwIfElementIsNotOfKind,
  validateProps,
} from '../../../utils';
import { Label, labelId } from '../../common/label/label';
import { StateMessage, messageId } from '../../common/state-message/state-message';
import { getComponentCss } from './select-styles';

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
  form: AllowedTypes.string,
  dropdownDirection: AllowedTypes.oneOf<SelectDropdownDirection>(SELECT_DROPDOWN_DIRECTIONS),
  compact: AllowedTypes.boolean,
  theme: AllowedTypes.oneOf<Theme>(THEMES),
};

/**
 * @slot {"name": "label", "description": "Shows a label. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 * @slot {"name": "description", "description": "Shows a description. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 * @slot {"name": "", "description": "Default slot for the `p-select-option` tags." }
 * @slot {"name": "message", "description": "Shows a state message. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 *
 * @controlled { "props": ["value"], "event": "update", "isInternallyMutated": true }
 */
@Component({
  tag: 'p-select',
  shadow: { delegatesFocus: true },
  formAssociated: true,
})
export class Select {
  @Element() public host!: HTMLElement;

  /** The label text. */
  @Prop() public label?: string = '';

  /** The description text. */
  @Prop() public description?: string = '';

  /** The name of the control. */
  @Prop({ reflect: true }) public name: string;
  // The "name" property is reflected as an attribute to ensure compatibility with native form submission.
  // In the React wrapper, all props are synced as properties on the element ref, so reflecting "name" as an attribute ensures it is properly handled in the form submission process.

  /** The selected value. */
  @Prop({ mutable: true }) public value?: string;

  /** The validation state. */
  @Prop() public state?: SelectState = 'none';

  /** The message styled depending on validation state. */
  @Prop() public message?: string = '';

  /** Show or hide label. For better accessibility it is recommended to show the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  /** Disables the select. */
  @Prop({ mutable: true }) public disabled?: boolean = false;

  /** A Boolean attribute indicating that an option with a non-empty string value must be selected. */
  @Prop() public required?: boolean = false;

  /** Changes the direction to which the dropdown list appears. */
  @Prop() public dropdownDirection?: SelectDropdownDirection = 'auto';

  /** Displays as compact version. */
  @Prop() public compact?: boolean = false;

  /** Adapts the select color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** The id of a form element the select should be associated with. */
  @Prop({ reflect: true }) public form?: string; // The ElementInternals API automatically detects the form attribute

  /** Emitted when the selection is changed. */
  @Event({ bubbles: false }) public update: EventEmitter<SelectUpdateEventDetail>;

  @State() private isOpen = false;
  @State() private srHighlightedOptionText = '';

  @AttachInternals() private internals: ElementInternals;

  private defaultValue: string;
  private buttonElement: HTMLButtonElement;
  private popoverElement: HTMLDivElement;
  private selectOptions: SelectOption[] = [];
  private selectOptgroups: SelectOptgroup[] = [];
  private preventOptionUpdate = false; // Used to prevent value watcher from updating options when options are already updated
  private searchString: string = '';
  private searchTimeout: ReturnType<typeof setTimeout> | number = null;
  private slottedImagePath: string = '';
  private hasNativePopoverSupport = getHasNativePopoverSupport();
  private hasNativeCSSAnchorPositioningSupport = getHasCSSAnchorPositioningSupport();
  private cleanUp: () => void;

  @Listen('internalOptionUpdate')
  public updateOptionHandler(e: Event & { target: SelectOption }): void {
    e.stopPropagation();
    this.updateSelectedOption(e.target);
  }

  @Watch('value')
  public onValueChange(): void {
    this.internals?.setFormValue(this.value);
    // When setting initial value the watcher gets called before the options are defined
    if (this.selectOptions.length > 0) {
      if (!this.preventOptionUpdate) {
        updateSelectOptions(this.selectOptions, this.value);
      }
      this.slottedImagePath = this.getSelectedOptionImagePath(this.selectOptions);
      this.preventOptionUpdate = false;
    }
  }

  @Watch('isOpen')
  public onIsOpenChange(): void {
    if (this.isOpen) {
      if (this.hasNativePopoverSupport) {
        this.popoverElement.showPopover();
      }
      if (!this.hasNativeCSSAnchorPositioningSupport && typeof this.cleanUp === 'undefined') {
        // ensures floating ui event listeners are added when options list is opened
        this.cleanUp = autoUpdate(this.buttonElement, this.popoverElement, this.updatePosition);
      }
    } else {
      if (this.hasNativePopoverSupport) {
        this.popoverElement.hidePopover();
      }
      if (!this.hasNativeCSSAnchorPositioningSupport && typeof this.cleanUp === 'function') {
        // ensures floating ui event listeners are removed when options list is closed
        this.cleanUp();
        this.cleanUp = undefined;
      }
    }
  }

  public connectedCallback(): void {
    applyConstructableStylesheetStyles(this.host, getSlottedAnchorStyles);
  }

  public disconnectedCallback(): void {
    if (typeof this.cleanUp === 'function') {
      // ensures floating ui event listeners are removed in case popover is removed from DOM
      this.cleanUp();
    }
  }

  public componentWillLoad(): void {
    this.defaultValue = this.value;
    this.internals?.setFormValue(this.value);
    this.updateOptions();
    updateSelectOptions(this.selectOptions, this.value);
    this.slottedImagePath = this.getSelectedOptionImagePath(this.selectOptions);
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public formDisabledCallback(disabled: boolean): void {
    this.disabled = disabled;
  }

  public formStateRestoreCallback(state: string): void {
    this.value = state;
  }

  public formResetCallback(): void {
    this.internals?.setFormValue(this.defaultValue);
    this.value = this.defaultValue;
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(
      this.host,
      getComponentCss,
      this.dropdownDirection,
      this.isOpen,
      this.disabled,
      this.hideLabel,
      this.state,
      this.hasNativeCSSAnchorPositioningSupport,
      this.compact,
      this.theme,
      !!this.slottedImagePath
    );
    syncSelectChildrenProps([...this.selectOptions, ...this.selectOptgroups], this.theme);

    const PrefixedTagNames = getPrefixedTagNames(this.host);
    const buttonId = 'value';
    const popoverId = 'list';
    const descriptionId = this.description ? 'description' : undefined;
    const selectMessageId = hasMessage(this.host, this.message, this.state) ? messageId : undefined;
    const initialStatusId = 'initial-status';
    const ariaDescribedBy = [descriptionId, selectMessageId, initialStatusId].filter(Boolean).join(' ');

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
        <span class="sr-only" id={initialStatusId}>
          {`${getSelectedOptionString(this.selectOptions) ? '' : 'No option selected. '} ${this.selectOptions.length} options in total.`}
        </span>
        <div class={{ wrapper: true, disabled: this.disabled }}>
          <button
            aria-invalid={this.state === 'error' ? 'true' : null}
            type="button"
            role="combobox"
            id={buttonId}
            {...getComboboxAriaAttributes(this.isOpen, this.required, labelId, ariaDescribedBy, popoverId)}
            disabled={this.disabled}
            onClick={this.onComboClick}
            onKeyDown={this.onComboKeyDown}
            ref={(el) => (this.buttonElement = el)}
          >
            {this.slottedImagePath ? (
              <span>
                <img src={this.slottedImagePath} alt="" />
                <span>{getSelectedOptionString(this.selectOptions)}</span>
              </span>
            ) : (
              getSelectedOptionString(this.selectOptions)
            )}
          </button>
          <PrefixedTagNames.pIcon
            class={{ icon: true, 'icon--rotate': this.isOpen }}
            name="arrow-head-down"
            theme={this.theme}
            color={this.disabled ? 'state-disabled' : 'primary'}
            aria-hidden="true"
          />
          <div
            id={popoverId}
            popover="auto"
            tabindex="-1"
            {...getListAriaAttributes(this.label, this.required, false, this.isOpen)}
            onToggle={(e: ToggleEvent) => (this.isOpen = e.newState === 'open')}
            ref={(el) => (this.popoverElement = el)}
          >
            <slot onSlotchange={this.onSlotchange} />
          </div>
        </div>
        <StateMessage state={this.state} message={this.message} theme={this.theme} host={this.host} />
        <span class="sr-only" role="status" aria-live="assertive" aria-relevant="additions text">
          {this.srHighlightedOptionText}
        </span>
      </div>
    );
  }

  private onSlotchange = (): void => {
    this.updateOptions();
    updateSelectOptions(this.selectOptions, this.value);
    this.slottedImagePath = this.getSelectedOptionImagePath(this.selectOptions);
    // Necessary to update selected options in placeholder
    forceUpdate(this.host);
  };

  private onComboClick = (): void => {
    this.updateMenuState(!this.isOpen);
  };

  private onComboKeyDown = (event: KeyboardEvent): void => {
    const { key } = event;

    const action = getActionFromKeyboardEvent(event, this.isOpen);

    switch (action) {
      case 'Last':
      case 'First':
        // biome-ignore lint/suspicious/noFallthroughSwitchClause: intentional fallthrough
        this.updateMenuState(true);
      // intentional fallthrough
      case 'Next':
      case 'Previous':
      case 'PageUp':
      case 'PageDown': {
        event.preventDefault();
        setNextSelectOptionHighlighted(
          this.popoverElement,
          this.selectOptions,
          getUpdatedIndex(
            getHighlightedSelectOptionIndex(this.selectOptions),
            getUsableSelectOptions(this.selectOptions).length - 1,
            action
          )
        );
        this.updateSrHighlightedOptionText();
        break;
      }
      case 'CloseSelect': {
        // biome-ignore lint/suspicious/noFallthroughSwitchClause: intentional fallthrough
        event.preventDefault();
        this.updateSelectedOption(getHighlightedSelectOption(this.selectOptions));
      }
      // intentional fallthrough
      case 'Close': {
        event.preventDefault();
        this.updateMenuState(false);
        break;
      }
      case 'Type':
        this.onComboType(key);
        break;
      case 'Open': {
        event.preventDefault();
        this.updateMenuState(true);
        break;
      }
    }
  };

  private onComboType = (letter: string): void => {
    this.updateMenuState(true);

    this.updateSearchString(letter);
    const matchingIndex = getMatchingSelectOptionIndex(this.selectOptions, this.searchString);
    if (matchingIndex !== -1) {
      setNextSelectOptionHighlighted(this.popoverElement, this.selectOptions, matchingIndex);
      this.updateSrHighlightedOptionText();
    } else {
      window.clearTimeout(this.searchTimeout);
      this.searchString = '';
    }
  };

  private updateOptions = (): void => {
    this.selectOptions = [];
    this.selectOptgroups = [];

    for (const child of Array.from(this.host.children).filter(
      (el) => el.tagName !== 'SELECT' && el.slot !== 'label' && el.slot !== 'description' && el.slot !== 'message'
    )) {
      throwIfElementIsNotOfKind(this.host, child as HTMLElement, ['p-select-option', 'p-optgroup']);

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
      this.emitUpdateEvent();
      this.updateSrHighlightedOptionText();
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

  private updateSrHighlightedOptionText = (): void => {
    this.srHighlightedOptionText = getSrHighlightedOptionText(this.selectOptions);
  };

  private emitUpdateEvent = (): void => {
    this.update.emit({
      value: this.value,
      name: this.name,
    });
  };

  private getSelectedOptionImagePath = (options: SelectOption[]): string => {
    return (
      options
        .find((option) => option.selected)
        ?.querySelector('img')
        ?.getAttribute('src') ?? ''
    );
  };

  private updatePosition = async (): Promise<void> => {
    const { x, y } = await computePosition(this.buttonElement, this.popoverElement, {
      placement: this.dropdownDirection === 'up' ? 'top' : 'bottom',
      middleware: [
        size({
          // @ts-expect-error
          apply({ rects, elements }) {
            Object.assign(elements.floating.style, {
              width: `${rects.reference.width}px`,
            });
          },
        }),
        offset(OPTIONS_LIST_SAFE_ZONE),
        flip({
          padding: OPTIONS_LIST_SAFE_ZONE,
          fallbackAxisSideDirection: 'none',
        }),
      ],
    });

    Object.assign(this.popoverElement.style, {
      left: `${x}px`,
      top: `${y}px`,
    });
  };
}
