import type { BreakpointCustomizable, PropTypes, Theme } from '../../../types';
import type { SelectDropdownDirection, SelectOption, SelectState, SelectUpdateEventDetail } from './select-utils';
import {
  getSelectDropdownDirection,
  getSelectedOptionString,
  initNativeSelect,
  setSelectedOption,
  syncNativeSelect,
  syncSelectOptionProps,
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
  getActionFromKey,
  getClosestHTMLElement,
  getHighlightedSelectOption,
  getHighlightedSelectOptionIndex,
  getListAriaAttributes,
  getMatchingSelectOptionIndex,
  getPrefixedTagNames,
  getShadowRootHTMLElement,
  getUpdatedIndex,
  getUsableSelectOptions,
  hasPropValueChanged,
  isClickOutside,
  SELECT_DROPDOWN_DIRECTIONS,
  SELECT_SEARCH_TIMEOUT,
  SelectAction,
  setNextSelectOptionHighlighted,
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

  private searchString: string = '';
  private searchTimeout: NodeJS.Timeout | number = null;

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
        updateNativeSelectOption(this.nativeSelect, this.selectOptions);
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
      updateNativeSelectOption(this.nativeSelect, this.selectOptions);
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
            onClick={this.onComboClick}
            onKeyDown={this.onComboKeyDown}
            onBlur={this.onComboBlur}
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
      updateNativeSelectOption(this.nativeSelect, this.selectOptions);
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

  private updateSelectedOption = () => {
    const highlightedOption = getHighlightedSelectOption(this.selectOptions);
    if (highlightedOption) {
      this.preventOptionUpdate = true; // Avoid unnecessary updating of options in value watcher
      setSelectedOption(this.selectOptions, highlightedOption);
      this.value = highlightedOption.value;
      this.emitUpdateEvent();
    }
    this.updateMenuState(false);
  };

  private onComboClick = (): void => {
    this.updateMenuState(!this.isOpen);
  };

  private updateMenuState = (open: boolean): void => {
    if (this.isOpen === open) {
      return;
    }
    this.isOpen = open;
  };

  private onComboBlur = (event: FocusEvent): void => {
    // do nothing if relatedTarget is contained within listboxEl
    if (this.listElement.contains(event.relatedTarget as Node)) {
      return;
    }
    // select current option and close
    if (this.isOpen) {
      this.updateSelectedOption();
    }
  };

  private onComboKeyDown = (event: KeyboardEvent): void => {
    const { key } = event;

    const action = getActionFromKey(event, this.isOpen);

    switch (action) {
      case SelectAction.Last:
      case SelectAction.First:
        this.updateMenuState(true);
      // intentional fallthrough
      case SelectAction.Next:
      case SelectAction.Previous:
      case SelectAction.PageUp:
      case SelectAction.PageDown:
        event.preventDefault();
        setNextSelectOptionHighlighted(
          this.listElement,
          this.selectOptions,
          getUpdatedIndex(
            getHighlightedSelectOptionIndex(this.selectOptions),
            getUsableSelectOptions(this.selectOptions).length - 1,
            action
          )
        );
        break;
      case SelectAction.CloseSelect:
        event.preventDefault();
        this.updateSelectedOption();
      // intentional fallthrough
      case SelectAction.Close:
        event.preventDefault();
        this.updateMenuState(false);
        break;
      case SelectAction.Type:
        this.onComboType(key);
        break;
      case SelectAction.Open:
        event.preventDefault();
        this.updateMenuState(true);
        break;
    }
  };

  private onComboType = (letter: string): void => {
    this.updateMenuState(true);

    const searchString = this.getSearchString(letter);
    const matchingIndex = getMatchingSelectOptionIndex(this.selectOptions, searchString);
    if (matchingIndex !== -1) {
      setNextSelectOptionHighlighted(this.listElement, this.selectOptions, matchingIndex);
    } else {
      window.clearTimeout(this.searchTimeout);
      this.searchString = '';
    }
  };

  private getSearchString = (char: string): string => {
    // reset typing timeout and start new timeout
    // this allows us to make multiple-letter matches, like a native select
    if (typeof this.searchTimeout === 'number') {
      window.clearTimeout(this.searchTimeout);
    }

    this.searchTimeout = window.setTimeout(() => {
      this.searchString = '';
    }, SELECT_SEARCH_TIMEOUT);

    // add most recent letter to saved search string
    this.searchString += char;
    return this.searchString;
  };

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
