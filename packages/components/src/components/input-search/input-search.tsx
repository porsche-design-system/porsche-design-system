import {
  AttachInternals,
  Component,
  Element,
  Event,
  type EventEmitter,
  type JSX,
  Prop,
  State,
  Watch,
  h,
} from '@stencil/core';
import type { BreakpointCustomizable, PropTypes, Theme } from '../../types';
import {
  AllowedTypes,
  FORM_STATES,
  THEMES,
  attachComponentCss,
  getPrefixedTagNames,
  hasPropValueChanged,
  validateProps,
} from '../../utils';
import { InputBase } from '../common/input-base/input-base';
import { getComponentCss } from './input-search-styles';
import {
  INPUT_SEARCH_AUTO_COMPLETE,
  type InputSearchAutoComplete,
  type InputSearchBlurEventDetail,
  type InputSearchChangeEventDetail,
  type InputSearchInputEventDetail,
  type InputSearchState,
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
  form: AllowedTypes.string,
  autoComplete: AllowedTypes.oneOf<InputSearchAutoComplete>(INPUT_SEARCH_AUTO_COMPLETE),
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

  /** The label text. */
  @Prop() public label?: string = '';

  /** The description text. */
  @Prop() public description?: string = '';

  /** Displays as compact version. */
  @Prop() public compact?: boolean = false;

  /** The name of the search input. */
  @Prop({ reflect: true }) public name: string;
  // The "name" property is reflected as an attribute to ensure compatibility with native form submission.
  // In the React wrapper, all props are synced as properties on the element ref, so reflecting "name" as an attribute ensures it is properly handled in the form submission process.

  /** The search input value. */
  @Prop({ mutable: true }) public value?: string = '';

  /** Specifies whether the input can be autofilled by the browser */
  @Prop() public autoComplete?: InputSearchAutoComplete = '';

  /** Show clear input value button */
  @Prop() public clear?: boolean = false;

  /** Show search indicator icon */
  @Prop() public indicator?: boolean = true;

  /** Specifies whether the search input should be read-only. */
  @Prop() public readOnly?: boolean = false;

  /** The id of a form element the search input should be associated with. */
  @Prop({ reflect: true }) public form?: string; // The ElementInternals API automatically detects the form attribute

  /** The placeholder text. */
  @Prop() public placeholder?: string = '';

  /** Marks the search input as disabled. */
  @Prop() public disabled?: boolean = false;

  /** Marks the search input as required. */
  @Prop() public required?: boolean = false;

  /** @experimental Shows a loading indicator. */
  @Prop() public loading?: boolean = false;

  /** The validation state. */
  @Prop() public state?: InputSearchState = 'none';

  /** The message styled depending on validation state. */
  @Prop() public message?: string = '';

  /** Show or hide label and description text. For better accessibility it is recommended to show the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  /** Adapts the color depending on the theme. */
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
    this.internals?.setValidity(this.inputElement.validity, this.inputElement.validationMessage, this.inputElement);
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
        name={this.name}
        form={this.form}
        type="search"
        required={this.required}
        placeholder={this.placeholder}
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
    this.value = ''; // triggers @Watch('value')
    this.input.emit(new window.InputEvent('input', { bubbles: true, composed: true }));
    this.inputElement.focus();
  };
}
