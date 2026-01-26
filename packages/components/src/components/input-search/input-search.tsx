import {
  AttachInternals,
  Component,
  Element,
  Event,
  type EventEmitter,
  h,
  type JSX,
  Prop,
  State,
  Watch,
} from '@stencil/core';
import type { BreakpointCustomizable, PropTypes, Theme } from '../../types';
import {
  AllowedTypes,
  attachComponentCss,
  FORM_STATES,
  getPrefixedTagNames,
  hasPropValueChanged,
  implicitSubmit,
  THEMES,
  validateProps,
} from '../../utils';
import { InputBase } from '../common/input-base/input-base';
import { getComponentCss } from './input-search-styles';
import type {
  InputSearchBlurEventDetail,
  InputSearchChangeEventDetail,
  InputSearchInputEventDetail,
  InputSearchState,
} from './input-search-utils';

const propTypes: PropTypes<typeof InputSearch> = {
  label: AllowedTypes.string,
  description: AllowedTypes.string,
  placeholder: AllowedTypes.string,
  name: AllowedTypes.string,
  value: AllowedTypes.string,
  required: AllowedTypes.boolean,
  loading: AllowedTypes.boolean,
  disabled: AllowedTypes.boolean,
  maxLength: AllowedTypes.number,
  minLength: AllowedTypes.number,
  form: AllowedTypes.string,
  autoComplete: AllowedTypes.string,
  state: AllowedTypes.oneOf<InputSearchState>(FORM_STATES),
  message: AllowedTypes.string,
  hideLabel: AllowedTypes.breakpoint('boolean'),
  clear: AllowedTypes.boolean,
  indicator: AllowedTypes.boolean,
  readOnly: AllowedTypes.boolean,
  compact: AllowedTypes.boolean,
  theme: AllowedTypes.oneOf<Theme>(THEMES),
};

/**
 * @slot {"name": "label", "description": "Shows a label. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed."}
 * @slot {"name": "description", "description": "Shows a description. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed."}
 * @slot {"name": "message", "description": "Shows a state message. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed."}
 * @slot {"name": "start", "description": "Shows content at the start of the input (e.g. icon)."}
 * @slot {"name": "end", "description": "Shows content at the end of the input (e.g. search button)."}
 */
@Component({
  tag: 'p-input-search',
  shadow: { delegatesFocus: true },
  formAssociated: true,
})
export class InputSearch {
  @Element() public host!: HTMLElement;

  /** Text content for a user-facing label. */
  @Prop() public label?: string = '';

  /** Supplementary text providing more context or explanation for the input. */
  @Prop() public description?: string = '';

  /** A boolean value that, if present, renders the input field as a compact version. */
  @Prop() public compact?: boolean = false;

  /** The name of the input field, used when submitting the form data. */
  @Prop({ reflect: true }) public name: string;
  // The "name" property is reflected as an attribute to ensure compatibility with native form submission.
  // In the React wrapper, all props are synced as properties on the element ref, so reflecting "name" as an attribute ensures it is properly handled in the form submission process.

  /** The search input value. */
  @Prop({ mutable: true }) public value?: string = '';

  /** Provides a hint to the browser about what type of data the field expects, which can assist with autofill features (e.g., autocomplete='on'). */
  @Prop() public autoComplete?: string;

  /** Show clear input value button */
  @Prop() public clear?: boolean = false;

  /** Show search indicator icon */
  @Prop() public indicator?: boolean = false;

  /** A boolean value that, if present, makes the input field uneditable by the user, but its value will still be submitted with the form. */
  @Prop() public readOnly?: boolean = false;

  /** Specifies the id of the <form> element that the input belongs to (useful if the input is not a direct descendant of the form). */
  @Prop({ reflect: true }) public form?: string; // The ElementInternals API automatically detects the form attribute

  /** A non-negative integer specifying the maximum number of characters the user can enter into the input. */
  @Prop() public maxLength?: number;

  /** A non-negative integer specifying the minimum number of characters required for the input's value to be considered valid. */
  @Prop() public minLength?: number;

  /** A string that provides a brief hint to the user about what kind of information is expected in the field (e.g., placeholder='Search...'). This text is displayed when the input field is empty. */
  @Prop() public placeholder?: string = '';

  /** A boolean value that, if present, makes the input field unusable and unclickable. The value will not be submitted with the form. */
  @Prop({ mutable: true }) public disabled?: boolean = false;

  /** A boolean value that, if present, indicates that the input field must be filled out before the form can be submitted. */
  @Prop() public required?: boolean = false;

  /** @experimental Shows a loading indicator. */
  @Prop() public loading?: boolean = false;

  /** Indicates the validation or overall status of the input component. */
  @Prop() public state?: InputSearchState = 'none';

  /** Dynamic feedback text for validation or status. */
  @Prop() public message?: string = '';

  /** Controls the visibility of the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  /** Controls the visual appearance of the component. */
  @Prop() public theme?: Theme = 'light';

  /** Emitted when the search input loses focus after its value was changed. */
  @Event({ bubbles: true }) public change: EventEmitter<InputSearchChangeEventDetail>;

  /** Emitted when the search input has lost focus. */
  @Event({ bubbles: false }) public blur: EventEmitter<InputSearchBlurEventDetail>;

  /** Emitted when the value has been changed as a direct result of a user action. */
  @Event({ bubbles: true }) public input: EventEmitter<InputSearchInputEventDetail>;

  @AttachInternals() private internals: ElementInternals;

  @State() private isClearable = false;

  private initialLoading: boolean = false;
  private inputElement: HTMLInputElement;
  private defaultValue: string;

  @Watch('value')
  public onValueChange(newValue: string): void {
    this.internals?.setFormValue(newValue);
    this.isClearable = !!newValue;
  }

  public connectedCallback(): void {
    this.initialLoading = this.loading;
  }

  public componentWillLoad(): void {
    this.defaultValue = this.value;
    this.isClearable = !!this.value;
    this.initialLoading = this.loading;
  }

  public componentWillUpdate(): void {
    if (this.loading) {
      this.initialLoading = true;
    }
  }

  public formResetCallback(): void {
    this.value = this.defaultValue; // triggers value watcher
  }

  public formDisabledCallback(disabled: boolean): void {
    // Called when a parent fieldset is disabled or enabled
    this.disabled = disabled;
  }

  public formStateRestoreCallback(state: string): void {
    this.value = state;
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public componentDidLoad(): void {
    this.internals?.setFormValue(this.value);
  }

  public componentDidRender(): void {
    if (!this.disabled && !this.readOnly) {
      this.internals?.setValidity(
        this.inputElement.validity,
        this.inputElement.validationMessage || ' ',
        this.inputElement
      );
    }
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);

    attachComponentCss(
      this.host,
      getComponentCss,
      this.disabled,
      this.loading,
      this.hideLabel,
      this.state,
      this.compact,
      this.readOnly,
      this.theme,
      this.clear
    );

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <InputBase
        host={this.host}
        label={this.label}
        description={this.description}
        id="input-search"
        refElement={(el: HTMLInputElement) => (this.inputElement = el)}
        onInput={this.onInput}
        onChange={this.onChange}
        onBlur={this.onBlur}
        onKeyDown={this.onKeyDown}
        name={this.name}
        form={this.form}
        type="search"
        required={this.required}
        placeholder={this.placeholder}
        maxLength={this.maxLength}
        minLength={this.minLength}
        value={this.value}
        readOnly={this.readOnly}
        autoComplete={this.autoComplete}
        disabled={this.disabled}
        state={this.state}
        message={this.message}
        theme={this.theme}
        loading={this.loading}
        initialLoading={this.initialLoading}
        {...(this.indicator && {
          start: <PrefixedTagNames.pIcon aria-hidden="true" name="search" color="state-disabled" theme={this.theme} />,
        })}
        {...(this.clear && {
          end: (
            <PrefixedTagNames.pButtonPure
              tabIndex={-1}
              hideLabel={true}
              theme={this.theme}
              class="button"
              type="button"
              icon="close"
              hidden={!this.isClearable}
              disabled={this.readOnly || this.disabled}
              onClick={() => this.onClear()}
            >
              Clear field
            </PrefixedTagNames.pButtonPure>
          ),
        })}
      />
    );
  }

  private onKeyDown = (e: KeyboardEvent): void => {
    implicitSubmit(e, this.internals, this.host);
  };

  private onChange = (e: Event): void => {
    e.stopPropagation();
    e.stopImmediatePropagation();
    this.change.emit(e);
  };

  private onBlur = (e: Event): void => {
    e.stopPropagation();
    e.stopImmediatePropagation();
    this.blur.emit(e);
  };

  private onInput = (e: InputEvent): void => {
    e.stopPropagation();
    e.stopImmediatePropagation();
    const target = e.target as HTMLInputElement;
    this.value = target.value; // triggers @Watch('value')
    this.input.emit(e);
  };

  private onClear = (): void => {
    this.inputElement.value = ''; // Clear value of native input and send an input event
    this.inputElement.dispatchEvent(new window.InputEvent('input', { bubbles: true, composed: true })); // triggers onInput
    this.inputElement.focus();
  };
}
